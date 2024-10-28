import React, { useState } from 'react';
import { format } from 'sql-formatter';

const SQLFixer: React.FC = () => {
  const [inputQuery, setInputQuery] = useState('');
  const [outputQuery, setOutputQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fixQuery = () => {
    try {
      let fixedQuery = inputQuery;

      // Basic syntax fixes
      fixedQuery = fixedQuery.replace(/\bselect\b/gi, 'SELECT');
      fixedQuery = fixedQuery.replace(/\bfrom\b/gi, 'FROM');
      fixedQuery = fixedQuery.replace(/\bwhere\b/gi, 'WHERE');
      fixedQuery = fixedQuery.replace(/\band\b/gi, 'AND');
      fixedQuery = fixedQuery.replace(/\bor\b/gi, 'OR');
      fixedQuery = fixedQuery.replace(/\bgroup by\b/gi, 'GROUP BY');
      fixedQuery = fixedQuery.replace(/\border by\b/gi, 'ORDER BY');
      fixedQuery = fixedQuery.replace(/\bhaving\b/gi, 'HAVING');

      // Add missing semicolon at the end if not present
      if (!fixedQuery.trim().endsWith(';')) {
        fixedQuery += ';';
      }

      // Format the query
      const formattedQuery = format(fixedQuery, { language: 'plsql' });
      setOutputQuery(formattedQuery);
      setErrorMessage(null);
    } catch (error) {
      setOutputQuery('');
      setErrorMessage('Error: Unable to fix the query. Please check your syntax.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Input Oracle SQL Query</h2>
        <textarea
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Enter your Oracle SQL query here..."
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          rows={10}
        />
      </div>

      <button
        onClick={fixQuery}
        className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Fix and Format Query
      </button>

      {errorMessage && (
        <div className="mt-4 text-red-600">
          {errorMessage}
        </div>
      )}

      {outputQuery && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Fixed and Formatted Query</h2>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto whitespace-pre-wrap">
            {outputQuery}
          </pre>
        </div>
      )}
    </div>
  );
};

export default SQLFixer;