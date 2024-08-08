"use client";

import { useState } from 'react';

export default function NewItem({ onAddItem }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState('produce');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      quantity,
      category,
    };
    onAddItem(newItem);
    setName('');
    setQuantity(1);
    setCategory('produce');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md w-full">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-yellow-300">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 p-2 block w-full bg-gray-900 border border-gray-700 rounded-md text-white"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="quantity" className="block text-sm font-medium text-yellow-300">Quantity</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="1"
          max="99"
          required
          className="mt-1 p-2 block w-full bg-gray-900 border border-gray-700 rounded-md text-white"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-yellow-300">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="mt-1 p-2 block w-full bg-gray-900 border border-gray-700 rounded-md text-white"
        >
          <option value="produce">Produce</option>
          <option value="dairy">Dairy</option>
          <option value="bakery">Bakery</option>
          <option value="meat">Meat</option>
          <option value="frozen foods">Frozen Foods</option>
          <option value="canned goods">Canned Goods</option>
          <option value="dry goods">Dry Goods</option>
          <option value="beverages">Beverages</option>
          <option value="snacks">Snacks</option>
          <option value="household">Household</option>
          <option value="other">Other</option>
        </select>
      </div>
      <button type="submit" className="w-full bg-gray-900 text-white p-2 rounded-md hover:bg-gray-700">
        Add Item
      </button>
    </form>
  );
}
