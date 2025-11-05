import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'database', 'appointments.db');

let db;

export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    // Ensure database directory exists
    const dbDir = path.dirname(DB_PATH);
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        console.error('Error opening database:', err);
        reject(err);
      } else {
        console.log('✅ Connected to SQLite database');
        createTables().then(resolve).catch(reject);
      }
    });
  });
};

const createTables = async () => {
  return new Promise((resolve, reject) => {
    const tables = [
      // Doctors table
      `CREATE TABLE IF NOT EXISTS doctors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        phone TEXT NOT NULL,
        specialty TEXT NOT NULL,
        bio TEXT,
        photo_url TEXT,
        is_active BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,

      // Doctor schedules table
      `CREATE TABLE IF NOT EXISTS doctor_schedules (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        doctor_id INTEGER NOT NULL,
        day_of_week INTEGER NOT NULL, -- 0-6 (Sunday-Saturday)
        start_time TEXT NOT NULL, -- HH:MM format
        end_time TEXT NOT NULL, -- HH:MM format
        is_available BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (doctor_id) REFERENCES doctors (id) ON DELETE CASCADE
      )`,

      // Patients table
      `CREATE TABLE IF NOT EXISTS patients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        phone TEXT NOT NULL,
        date_of_birth DATE,
        medical_aid TEXT,
        medical_aid_number TEXT,
        allergies TEXT,
        medications TEXT,
        medical_history TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,

      // Appointments table
      `CREATE TABLE IF NOT EXISTS appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        patient_id INTEGER NOT NULL,
        doctor_id INTEGER NOT NULL,
        appointment_date DATE NOT NULL,
        appointment_time TEXT NOT NULL, -- HH:MM format
        duration_minutes INTEGER DEFAULT 30,
        appointment_type TEXT NOT NULL DEFAULT 'consultation', -- consultation, follow-up, procedure
        status TEXT DEFAULT 'scheduled', -- scheduled, confirmed, completed, cancelled, no-show
        notes TEXT,
        reason_for_visit TEXT,
        is_new_patient BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (patient_id) REFERENCES patients (id) ON DELETE CASCADE,
        FOREIGN KEY (doctor_id) REFERENCES doctors (id) ON DELETE CASCADE
      )`,

      // Appointment exceptions (days when doctor is not available)
      `CREATE TABLE IF NOT EXISTS appointment_exceptions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        doctor_id INTEGER NOT NULL,
        exception_date DATE NOT NULL,
        reason TEXT,
        is_available BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (doctor_id) REFERENCES doctors (id) ON DELETE CASCADE
      )`
    ];

    let completed = 0;
    tables.forEach((sql, index) => {
      db.run(sql, (err) => {
        if (err) {
          console.error(`Error creating table ${index + 1}:`, err);
          reject(err);
        } else {
          completed++;
          if (completed === tables.length) {
            console.log('✅ Database tables created successfully');
            seedInitialData().then(resolve).catch(reject);
          }
        }
      });
    });
  });
};

const seedInitialData = async () => {
  return new Promise((resolve, reject) => {
    // Check if doctors table is empty
    db.get("SELECT COUNT(*) as count FROM doctors", (err, row) => {
      if (err) {
        reject(err);
        return;
      }

      if (row.count === 0) {
        // Insert initial doctors
        const doctors = [
          [
            'Dr. Thando Vilakazi',
            'thando.vilakazi@drvilakazisurgery.co.za',
            '(555) 123-4567',
            'General Surgery & Minimally Invasive Surgery',
            'Board-certified general surgeon with over 15 years of experience in general and minimally invasive surgery.',
            null,
            1
          ],
          [
            'Dr. James Chen',
            'james.chen@drvilakazisurgery.co.za',
            '(555) 123-4568',
            'General & Colorectal Surgery',
            'Specializes in colorectal surgery and advanced laparoscopic procedures with expertise in minimally invasive colorectal cancer surgery.',
            null,
            1
          ],
          [
            'Dr. Sarah Moyo',
            'sarah.moyo@drvilakazisurgery.co.za',
            '(555) 123-4569',
            'General & Breast Surgery',
            'Specializes in breast surgery and oncoplastic techniques, providing comprehensive breast care with excellent cosmetic outcomes.',
            null,
            1
          ]
        ];

        const insertDoctor = db.prepare(`
          INSERT INTO doctors (name, email, phone, specialty, bio, photo_url, is_active)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `);

        let completed = 0;
        doctors.forEach((doctor, index) => {
          insertDoctor.run(doctor, function(err) {
            if (err) {
              console.error(`Error inserting doctor ${index + 1}:`, err);
              reject(err);
              return;
            }

            // Insert default schedule for each doctor (Monday-Friday, 8AM-5PM)
            const scheduleInsert = db.prepare(`
              INSERT INTO doctor_schedules (doctor_id, day_of_week, start_time, end_time, is_available)
              VALUES (?, ?, ?, ?, ?)
            `);

            for (let day = 1; day <= 5; day++) { // Monday (1) to Friday (5)
              scheduleInsert.run([this.lastID, day, '08:00', '17:00', 1]);
            }

            completed++;
            if (completed === doctors.length) {
              console.log('✅ Initial data seeded successfully');
              resolve();
            }
          });
        });
      } else {
        resolve();
      }
    });
  });
};

export const getDB = () => {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return db;
};

// Database helper functions
export const runQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    getDB().all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

export const runGet = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    getDB().get(sql, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

export const runRun = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    getDB().run(sql, params, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID, changes: this.changes });
      }
    });
  });
};

export default { initDatabase, getDB, runQuery, runGet, runRun };