"use client";

const Item = ({ name, quantity, category, onSelect }) => {
  return (
    <li onClick={() => onSelect(name)} className="flex flex-col justify-between items-start p-4 border border-black bg-emerald-900 rounded-lg mb-4 last:mb-0 max-w-md mx-auto cursor-pointer hover:bg-emerald-700">
      <span className="font-medium text-lg">{name}</span>
      <span className="text-white">Buy {quantity} in {category}</span>
    </li>
  );
};

export default Item;
