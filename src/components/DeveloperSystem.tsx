import React, { useState, useEffect } from 'react';
import { db, UniversalTable, Folder } from '../db';

const DeveloperSystem: React.FC = () => {
  const [universalTables, setUniversalTables] = useState<UniversalTable[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const tables = await db.universalTables.toArray();
      const folderList = await db.folders.toArray();
      setUniversalTables(tables);
      setFolders(folderList);
    };
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Developer System</h2>
      <div>
        <h3 className="text-md font-medium">Universal Tables</h3>
        <ul className="list-disc pl-5">
          {universalTables.map((table) => (
            <li key={table.id}>{table.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-md font-medium">Folders</h3>
        <ul className="list-disc pl-5">
          {folders.map((folder) => (
            <li key={folder.id}>{folder.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DeveloperSystem;