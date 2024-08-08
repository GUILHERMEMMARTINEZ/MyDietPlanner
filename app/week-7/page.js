"use client";

import { useState } from 'react';
import NewItem from './new-item';
import ItemList from './item-list';
import MealIdeas from './meal-ideas';
import itemsData from './items.json';

export default function Page() {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState('');

  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleItemSelect = (itemName) => {
    const cleanedName = itemName.split(',')[0].replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|[\u2011-\u26FF])/g, '').trim();
    setSelectedItemName(cleanedName);
  };

  return (
    <main className="flex flex-col items-center p-6">
      <a
        href="/"
        className="text-amber-700 text-lg font-semibold mb-4">&lt; Back
      </a>
      <h1 className="text-4xl font-bold mb-4 text-center text-yellow-300">
        Shopping List
      </h1>
      <div className="flex flex-col w-full max-w-4xl space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div className="w-full md:w-1/2">
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>
        <div className="w-full md:w-1/2">
          {selectedItemName && <MealIdeas ingredient={selectedItemName} />}
        </div>
      </div>
    </main>
  );
}
