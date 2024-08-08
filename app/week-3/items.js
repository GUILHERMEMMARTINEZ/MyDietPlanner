const Item = ({ name, quantity, category }) => {
  return (
    <li className="flex flex-col justify-between items-start p-4 border border-black bg-emerald-900 rounded-lg mb-4 last:mb-0 max-w-md mx-auto">
      <span className="font-medium text-lg">{name}</span>
      <span className="text-white">Buy {quantity} in {category}</span>
    </li>
  );
};

export default Item;
