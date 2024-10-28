import React, { useState, useEffect } from 'react';
import { Database, Settings, List, FileSpreadsheet, Code } from 'lucide-react';
import SQLQueryBuilder from './components/SQLQueryBuilder';
import SQLFixer from './components/SQLFixer';
import ListConverter from './components/ListConverter';
import CustomTableCreator from './components/CustomTableCreator';
import DeveloperSystem from './components/DeveloperSystem';
import Auth from './components/Auth';
import { auth } from './firebase';
import { User } from 'firebase/auth';

function App() {
  const [activeTab, setActiveTab] = useState('sqlBuilder');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">FormatPro by Tushar Kukreja</h1>
          <Auth user={user} />
        </div>
      </header>

      {/* ... rest of the component remains the same ... */}
    </div>
  );
}

export default App;