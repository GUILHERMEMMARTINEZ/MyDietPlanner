import ItemList from './item-list';

export default function Page() {
  return (
    <main className="flex flex-col items-center p-6 relative">
        <a
          href="/"
          className="text-amber-700 text-lg font-semibold absolute top-0 left-0 m-4">&lt; Back       
        </a>
      <h1 className="text-4xl font-bold m-6 text-center text-yellow-300">
        Shopping List
      </h1>
      <ItemList />
    </main>
  );
}


