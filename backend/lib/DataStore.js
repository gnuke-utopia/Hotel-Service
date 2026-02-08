// DataStore - Simple in-memory data store for demo purposes
// backend/lib/DataStore.js
// backend/lib/DataStore.js
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class DataStore {
    constructor() {
        this.dataDir = path.join(__dirname, '../data');
        this.ensureDataDir();
    }

    async ensureDataDir() {
        try {
            await fs.access(this.dataDir);
        } catch {
            await fs.mkdir(this.dataDir, { recursive: true });
            console.log('Created data directory');
        }
    }

    getFilePath(collection) {
        return path.join(this.dataDir, `${collection}.json`);
    }

    async read(collection) {
        try {
            const filePath = this.getFilePath(collection);
            const data = await fs.readFile(filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error(`Error reading ${collection} from ${this.getFilePath(collection)}:`, error.message);
            console.log(`Creating new ${collection} file`);
            return [];
        }
    }

    async write(collection, data) {
        const filePath = this.getFilePath(collection);
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
        return data;
    }

    async find(collection, query) {
        const data = await this.read(collection);
        return data.filter(item => {
            return Object.keys(query).every(key => item[key] === query[key]);
        });
    }

    async findOne(collection, query) {
        const results = await this.find(collection, query);
        return results[0] || null;
    }

    async insert(collection, item) {
        const data = await this.read(collection);
        const newItem = {
            id: Date.now().toString(),
            ...item,
            createdAt: new Date().toISOString()
        };
        data.push(newItem);
        await this.write(collection, data);
        return newItem;
    }

    async update(collection, id, updates) {
        const data = await this.read(collection);
        const index = data.findIndex(item => item.id === id);
        if (index === -1) return null;

        data[index] = { ...data[index], ...updates, updatedAt: new Date().toISOString() };
        await this.write(collection, data);
        return data[index];
    }

    async delete(collection, id) {
        const data = await this.read(collection);
        const filtered = data.filter(item => item.id !== id);
        await this.write(collection, filtered);
        return filtered.length < data.length;
    }
}

export default new DataStore();



//Backup DataStore
// class DataStore {
//     constructor() {
//         this.data = {
//             users: [
//                 { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
//                 { id: 2, username: 'frontdesk', password: 'desk123', role: 'front_desk' },
//                 { id: 3, username: 'housekeeper', password: 'house123', role: 'housekeeping' }
//             ],
//             reservations: [],
//             guests: [],
//             rooms: [
//                 { id: 1, number: '101', type: 'double', status: 'available', rate: 125, floor: 1, occupancy: 2 },
//                 { id: 2, number: '102', type: 'single', status: 'available', rate: 95, floor: 1, occupancy: 1 },
//                 { id: 3, number: '205', type: 'suite', status: 'occupied', rate: 250, floor: 2, occupancy: 4 },
//                 { id: 4, number: '206', type: 'double', status: 'cleaning', rate: 135, floor: 2, occupancy: 2 },
//                 { id: 5, number: '312', type: 'king', status: 'maintenance', rate: 180, floor: 3, occupancy: 2 }
//             ],
//             transactions: [],
//             inventory: [
//                 { id: 1, name: 'Mineral Water', price: 3.50, stock: 50, category: 'beverages' },
//                 { id: 2, name: 'Coffee', price: 4.00, stock: 30, category: 'beverages' },
//                 { id: 3, name: 'Tea', price: 3.75, stock: 25, category: 'beverages' },
//                 { id: 4, name: 'Snack Mix', price: 5.25, stock: 40, category: 'food' },
//                 { id: 5, name: 'Chocolate Bar', price: 2.50, stock: 35, category: 'food' }
//             ],
//             housekeeping_tasks: [],
//             pos_transactions: [],
//             invoices: [],
//             audit_logs: [],
//             notifications: [],
//             loyalty_points: []
//         };
//     }

//     async read(collection) {
//         // Return a *copy* of the array to prevent accidental mutations
//         return [...this.data[collection]] || [];
//     }

//     async write(collection, data) {
//         this.data[collection] = data;
//         return true;
//     }

//     async findById(collection, id) {
//         const items = await this.read(collection);
//         return items.find(item => item.id == id);
//     }

//     async create(collection, item) {
//         const items = await this.read(collection);
//         const newItem = {
//             id: Date.now(),
//             ...item,
//             createdAt: new Date().toISOString(),
//             updatedAt: new Date().toISOString()
//         };
//         items.push(newItem);
//         await this.write(collection, items);
//         return newItem;
//     }

//     async update(collection, id, updates) {
//         const items = await this.read(collection);
//         const index = items.findIndex(item => item.id == id);
//         if (index !== -1) {
//             items[index] = {
//                 ...items[index],
//                 ...updates,
//                 updatedAt: new Date().toISOString()
//             };
//             await this.write(collection, items);
//             return items[index];
//         }
//         return null;
//     }

//     async delete(collection, id) {
//         const items = await this.read(collection);
//         const filteredItems = items.filter(item => item.id != id);
//         await this.write(collection, filteredItems);
//         return true;
//     }

//     async findBy(collection, field, value) {
//         const items = await this.read(collection);
//         return items.filter(item => item[field] == value);
//     }
// }

// // Export the class instance as the default export for ES modules
// export default new DataStore();

