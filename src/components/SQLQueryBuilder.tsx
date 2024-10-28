import React, { useState, useEffect } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, UniversalTable, CustomTable } from '../db';

const SQLQueryBuilder: React.FC<{ userId: string }> = ({ userId }) => {
  const [query, setQuery] = useState('');
  const [selectedTables, setSelectedTables] = useState<string[]>([]);

  const universalTables = useLiveQuery(() => db.universalTables.toArray());
  const customTables = useLiveQuery(() => 
    userId ? db.customTables.where('userId').equals(userId).toArray() : []
  );

  const handleTableSelection = (tableName: string) => {
    setSelectedTables(prev => 
      prev.includes(tableName) 
        ? prev.filter(t => t !== tableName)
        : [...prev, tableName]
    );
  };

  const generateQuery = () => {
    if (selectedTables.length === 0) {
      alert('Please select at least one table');
      return;
    }

    const queryParts = selectedTables.map(table => `SELECT * FROM ${table}`);
    setQuery(queryParts.join('\nUNION ALL\n'));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">SQL Query Builder</h2>
      <div className="flex space-x-4">
        <div className="w-1/2">
          <h3 className="text-md font-medium mb-2">Universal Tables</h3>
          <ul className="space-y-2">
            {universalTables?.map((table) => (
              <li key={table.id}>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedTables.includes(table.name)}
                    onChange={() => handleTableSelection(table.name)}
                    className="form-checkbox"
                  />
                  <span>{table.name}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-1/2">
          <h3 className="text-md font-medium mb-2">Custom Tables</h3>
          <ul className="space-y-2">
            {customTables?.map((table) => (
              <li key={table.id}>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedTables.includes(table.name)}
                    onChange={() => handleTableSelection(table.name)}
                    className="form-checkbox"
                  />
                  <span>{table.name}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button
        onClick={generateQuery}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Generate Query
      </button>
      {query && (
        <div>
          <h3 className="text-md font-medium mb-2">Generated Query</h3>
          <pre className="bg-gray-100 p-4 rounded">{query}</pre>
        </div>
      )}
    </div>
  );
};

export default SQLQueryBuilder;