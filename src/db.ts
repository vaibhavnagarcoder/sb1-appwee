import Dexie, { Table } from 'dexie';
import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, firestore } from './firebase';

export { auth }; // Re-export auth

export interface UniversalTable {
  id?: number;
  name: string;
  columns: string[];
}

export interface CustomTable {
  id?: number;
  name: string;
  columns: string[];
  userId: string;
}

export interface Folder {
  id?: number;
  name: string;
  userId: string;
}

class FormatProDatabase extends Dexie {
  universalTables!: Table<UniversalTable>;
  customTables!: Table<CustomTable>;
  folders!: Table<Folder>;

  constructor() {
    super('FormatProDatabase');
    this.version(1).stores({
      universalTables: '++id, name',
      customTables: '++id, name, userId',
      folders: '++id, name, userId',
    });
  }
}

export const db = new FormatProDatabase();

export const syncWithFirestore = async () => {
  // Sync universal tables
  const universalTablesSnapshot = await getDocs(collection(firestore, 'universalTables'));
  universalTablesSnapshot.forEach((doc) => {
    const data = doc.data() as UniversalTable;
    db.universalTables.put(data);
  });

  // Sync folders
  const foldersSnapshot = await getDocs(collection(firestore, 'folders'));
  foldersSnapshot.forEach((doc) => {
    const data = doc.data() as Folder;
    db.folders.put(data);
  });
};

export const initializeFirebaseAuth = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export const addCustomTable = async (table: Omit<CustomTable, 'id'>) => {
  await db.customTables.add(table);
};

// Call this function when the app starts
syncWithFirestore();