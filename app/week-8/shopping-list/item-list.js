"use client";

import { useState } from 'react';
import Item from './item';

export default function ItemList({ items, onItemSelect }) {
  const [sortBy, setSortBy] = useState('name');

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'category') {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const renderGroupedItems = () => {
    return Object.keys(groupedItems).sort().map((category) => (
      <div key={category}>
        <h2 className="text-lg font-semibold capitalize mt-4">{category}</h2>
        <ul className="divide-y divide-black space-y-4">
          {groupedItems[category].sort((a, b) => a.name.localeCompare(b.name)).map((item) => (
            <Item key={item.id} {...item} onSelect={onItemSelect} />
          ))}
        </ul>
      </div>
    ));
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex justify-end mb-4">
        <button
          className={`px-4 py-2 mr-2 ${sortBy === 'name' ? 'bg-amber-700 text-white active:bg-amber-800' : 'bg-orange-500 text-white active:bg-orange-600'} rounded`}
          onClick={() => setSortBy('name')}
        >
          Sort by Name
        </button>
        <button
          className={`px-4 py-2 mr-2 ${sortBy === 'category' ? 'bg-amber-700 text-white active:bg-amber-800' : 'bg-orange-500 text-white active:bg-orange-600'} rounded`}
          onClick={() => setSortBy('category')}
        >
          Sort by Category
        </button>
        <button
          className={`px-4 py-2 ${sortBy === 'group' ? 'bg-amber-700 text-white active:bg-amber-800' : 'bg-orange-500 text-white active:bg-orange-600'} rounded`}
          onClick={() => setSortBy('group')}
        >
          Group by Category
        </button>
      </div>
      {sortBy === 'group' ? (
        renderGroupedItems()
      ) : (
        <ul className="divide-y divide-black space-y-4">
          {sortedItems.map((item) => (
            <Item key={item.id} {...item} onSelect={onItemSelect} />
          ))}
        </ul>
      )}
    </div>
  );
}
