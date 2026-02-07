
BEGIN TRANSACTION;

-- Users table
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role ENUM('admin', 'front_desk', 'housekeeping', 'manager') DEFAULT 'front_desk',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_role (role)
);

-- Guests table
CREATE TABLE guests (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(50),
    country VARCHAR(50),
    nationality VARCHAR(50),
    id_number VARCHAR(50),
    date_of_birth DATE,
    preferences TEXT, -- JSON string for preferences
    loyalty_tier ENUM('bronze', 'silver', 'gold', 'platinum') DEFAULT 'bronze',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_name (last_name, first_name)
);

-- Rooms table
CREATE TABLE rooms (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    room_number VARCHAR(10) UNIQUE NOT NULL,
    floor INTEGER NOT NULL,
    type ENUM('single', 'double', 'twin', 'suite', 'king', 'presidential') NOT NULL,
    status ENUM('available', 'occupied', 'cleaning', 'maintenance', 'reserved', 'out_of_order') DEFAULT 'available',
    rate DECIMAL(10,2) NOT NULL,
    max_occupancy INTEGER DEFAULT 1,
    features JSON, -- JSON array of features
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_room_number (room_number),
    INDEX idx_status (status),
    INDEX idx_type (type)
);

-- Reservations table
CREATE TABLE reservations (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    confirmation_number VARCHAR(20) UNIQUE NOT NULL,
    guest_id INTEGER NOT NULL,
    room_id INTEGER NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    status ENUM('pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled', 'no_show') DEFAULT 'pending',
    adults INTEGER DEFAULT 1,
    children INTEGER DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    nights INTEGER NOT NULL,
    special_requests TEXT,
    created_by INTEGER NOT NULL, -- User who created reservation
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (guest_id) REFERENCES guests(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    FOREIGN KEY (created_by) REFERENCES users(id),
    INDEX idx_confirmation (confirmation_number),
    INDEX idx_guest (guest_id),
    INDEX idx_room (room_id),
    INDEX idx_check_in (check_in_date),
    INDEX idx_status (status)
);

-- Transactions table
CREATE TABLE transactions (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    reservation_id INTEGER,
    amount DECIMAL(10,2) NOT NULL,
    method ENUM('cash', 'credit_card', 'debit_card', 'bank_transfer', 'mobile_payment') NOT NULL,
    reference VARCHAR(100),
    description TEXT,
    status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    created_by INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reservation_id) REFERENCES reservations(id),
    FOREIGN KEY (created_by) REFERENCES users(id),
    INDEX idx_reservation (reservation_id),
    INDEX idx_method (method),
    INDEX idx_status (status)
);

-- Invoices table
CREATE TABLE invoices (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    invoice_number VARCHAR(20) UNIQUE NOT NULL,
    reservation_id INTEGER NOT NULL,
    guest_id INTEGER NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    tax_rate DECIMAL(5,4) DEFAULT 0.10,
    tax_amount DECIMAL(10,2) NOT NULL,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('draft', 'sent', 'paid', 'overdue', 'cancelled') DEFAULT 'draft',
    issued_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    due_date TIMESTAMP NOT NULL,
    paid_date TIMESTAMP NULL,
    created_by INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (reservation_id) REFERENCES reservations(id),
    FOREIGN KEY (guest_id) REFERENCES guests(id),
    FOREIGN KEY (created_by) REFERENCES users(id),
    INDEX idx_invoice_number (invoice_number),
    INDEX idx_reservation (reservation_id),
    INDEX idx_status (status)
);

-- Line Items table
CREATE TABLE line_items (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    invoice_id INTEGER NOT NULL,
    description VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE,
    INDEX idx_invoice (invoice_id)
);

-- Payments table
CREATE TABLE payments (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    invoice_id INTEGER NOT NULL,
    transaction_id INTEGER,
    amount DECIMAL(10,2) NOT NULL,
    method ENUM('cash', 'credit_card', 'debit_card', 'bank_transfer', 'mobile_payment') NOT NULL,
    reference VARCHAR(100),
    status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    verified BOOLEAN DEFAULT FALSE,
    verified_at TIMESTAMP NULL,
    processed_by INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (invoice_id) REFERENCES invoices(id),
    FOREIGN KEY (transaction_id) REFERENCES transactions(id),
    FOREIGN KEY (processed_by) REFERENCES users(id),
    INDEX idx_invoice (invoice_id),
    INDEX idx_method (method),
    INDEX idx_status (status)
);

-- Housekeeping Tasks table
CREATE TABLE housekeeping_tasks (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    task_id VARCHAR(20) UNIQUE NOT NULL,
    room_id INTEGER NOT NULL,
    task_type ENUM('daily_clean', 'deep_clean', 'inspection', 'maintenance') NOT NULL,
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    status ENUM('pending', 'in_progress', 'completed', 'cancelled') DEFAULT 'pending',
    assigned_to INTEGER, -- User assigned to task
    scheduled_time TIMESTAMP NOT NULL,
    completed_at TIMESTAMP NULL,
    notes TEXT,
    created_by INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    FOREIGN KEY (assigned_to) REFERENCES users(id),
    FOREIGN KEY (created_by) REFERENCES users(id),
    INDEX idx_task_id (task_id),
    INDEX idx_room (room_id),
    INDEX idx_assigned_to (assigned_to),
    INDEX idx_status (status)
);

-- Maintenance Requests table
CREATE TABLE maintenance_requests (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    request_id VARCHAR(20) UNIQUE NOT NULL,
    room_id INTEGER NOT NULL,
    issue_type ENUM('plumbing', 'electrical', 'ac', 'furniture', 'other') NOT NULL,
    description TEXT NOT NULL,
    priority ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium',
    status ENUM('reported', 'in_progress', 'resolved', 'closed') DEFAULT 'reported',
    reported_by INTEGER NOT NULL,
    assigned_to INTEGER, -- Technician assigned
    reported_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP NULL,
    resolution_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    FOREIGN KEY (reported_by) REFERENCES users(id),
    FOREIGN KEY (assigned_to) REFERENCES users(id),
    INDEX idx_request_id (request_id),
    INDEX idx_room (room_id),
    INDEX idx_status (status)
);

-- Audit Logs table
CREATE TABLE audit_logs (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_id INTEGER NOT NULL,
    action VARCHAR(100) NOT NULL, -- e.g., 'create_reservation', 'update_room_status'
    entity_type VARCHAR(50) NOT NULL, -- e.g., 'Reservation', 'Room', 'Guest'
    entity_id INTEGER, -- ID of the entity affected
    old_values JSON, -- JSON string of old values before change
    new_values JSON, -- JSON string of new values after change
    ip_address VARCHAR(45), -- Support IPv6 addresses
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_user (user_id),
    INDEX idx_action (action),
    INDEX idx_entity (entity_type, entity_id),
    INDEX idx_created_at (created_at)
);

-- Notifications table -- Might not make use
CREATE TABLE notifications (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    recipient_id INTEGER NOT NULL, -- Can be user_id or guest_id
    recipient_type ENUM('user', 'guest') NOT NULL, -- Who receives the notification
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('email', 'sms', 'push', 'in_app') NOT NULL,
    status ENUM('pending', 'sent', 'delivered', 'failed') DEFAULT 'pending',
    priority ENUM('low', 'normal', 'high') DEFAULT 'normal',
    sent_at TIMESTAMP NULL,
    delivered_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (recipient_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_recipient (recipient_id, recipient_type),
    INDEX idx_status (status),
    INDEX idx_type (type),
    INDEX idx_created_at (created_at)
);

-- Loyalty Points table
CREATE TABLE loyalty_points (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    guest_id INTEGER NOT NULL,
    points_earned DECIMAL(10,2) NOT NULL,
    points_redeemed DECIMAL(10,2) DEFAULT 0,
    points_balance AS (points_earned - points_redeemed) STORED, -- Computed column
    expiry_date DATE,
    source VARCHAR(50), -- e.g., 'reservation', 'promotion', 'bonus'
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (guest_id) REFERENCES guests(id),
    INDEX idx_guest (guest_id),
    INDEX idx_expiry (expiry_date)
);

-- Insert demo data
INSERT INTO users (username, email, password_hash, role) VALUES
('admin', 'admin@hotelsys.com', '$2b$10$8K1p/a0dum8/OGJlxQIMBeQbJOf0Jl7sYrrqIKz.Vlg8tl3qjprgK', 'admin'), -- password: admin123
('frontdesk', 'frontdesk@hotelsys.com', '$2b$10$8K1p/a0dum8/OGJlxQIMBeQbJOf0Jl7sYrrqIKz.Vlg8tl3qjprgK', 'front_desk'),
('housekeeper', 'housekeeper@hotelsys.com', '$2b$10$8K1p/a0dum8/OGJlxQIMBeQbJOf0Jl7sYrrqIKz.Vlg8tl3qjprgK', 'housekeeping');

INSERT INTO rooms (room_number, floor, type, status, rate, max_occupancy) VALUES
('101', 1, 'double', 'available', 125.00, 2),
('102', 1, 'single', 'available', 95.00, 1),
('205', 2, 'suite', 'occupied', 250.00, 4),
('206', 2, 'double', 'cleaning', 135.00, 2),
('312', 3, 'king', 'maintenance', 180.00, 2);

COMMIT;