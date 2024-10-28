import React, { useState } from 'react';

const ListConverter: React.FC = () => {
  const [inputList, setInputList] = useState('');
  const [outputList, setOutputList] = useState('');
  const [outputFormat, setOutputFormat] = useState('comma');

  const convertList = () => {
    const items = inputList.split('\n').map(item => item.trim()).filter(item => item !== '');
    let convertedList = '';

    switch (outputFormat) {
      case 'comma':
        convertedList = items.join(', ');
        break;
      case 'doubleQuotes':
        convertedList = items.map(item => `"${item}"`).join('\n');
        break;
      case 'singleQuotes':
        convertedList = items.map(item => `'${item}'`).join('\n');
        break;
      case 'commaDoubleQuotes':
        convertedList = items.map(item => `"${item}"`).join(', ');
        break;
      case 'commaSingleQuotes':
        convertedList = items.map(item => `'${item}'`).join(', ');
        break;
    }

    setOutputList(convertedList);
  };

  const clearList = () => {
    setInputList('');
    setOutputList('');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputList);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Input List</h2>
        <textarea
          value={inputList}
          onChange={(e) => setInputList(e.target.value)}
          placeholder="Enter your list here (one item per line)..."
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          rows={10}
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Output Format</h2>
        <select
          value={outputFormat}
          onChange={(e) => setOutputFormat(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="comma">Comma Separated</option>
          <option value="doubleQuotes">Double Quotes (New Line)</option>
          <option value="singleQuotes">Single Quotes (New Line)</option>
          <option value="commaDoubleQuotes">Comma Separated with Double Quotes</option>
          <option value="commaSingleQuotes">Comma Separated with Single Quotes</option>
        </select>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={convertList}
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Convert
        </button>
        <button
          onClick={clearList}
          className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Clear
        </button>
      </div>

      {outputList && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Converted List</h2>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto whitespace-pre-wrap">
            {outputList}
          </pre>
          <button
            onClick={copyToClipboard}
            className="mt-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
};

export default ListConverter;