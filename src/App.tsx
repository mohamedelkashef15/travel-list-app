import { useEffect, useState } from "react";

interface IItem {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
  onDeleteItem?: (val: number) => void;
  onToggleItem?: (val: number) => void;
}

interface IPackingList {
  items: IItem[];
  onDeleteItem: (val: number) => void;
  onToggleItem: (val: number) => void;
  onClear: () => void;
}

function App() {
  const [items, setItems] = useState<IItem[]>(() => {
    const savedItems = localStorage.getItem("items");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  function handleDeleteItems() {
    setItems([]);
  }

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  function handleAddItem(item: IItem) {
    setItems((prevItems: IItem[]) => [...prevItems, item]);
  }

  function onDeleteItem(id: number) {
    setItems(items.filter((item) => item.id !== id));
  }

  function onToggleItem(id: number) {
    setItems(items.map((item) => (item.id === id ? { ...item, packed: !item.packed } : item)));
  }

  return (
    <main>
      <section id="app">
        <Logo />
        <Form onAddItem={handleAddItem} />
        <PackingList
          items={items}
          onDeleteItem={onDeleteItem}
          onToggleItem={onToggleItem}
          onClear={handleDeleteItems}
        />
        <States items={items} />
      </section>
    </main>
  );
}

function Logo() {
  return (
    <div className="logo">
      <h1>🏝️ FAR AWAY 🧳</h1>
    </div>
  );
}

function Form({ onAddItem }: { onAddItem: (val: IItem) => void }) {
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!description) return;

    const newItem = {
      id: Date.now(),
      quantity,
      description,
      packed: false,
    };

    setDescription("");
    setQuantity(1);
    onAddItem(newItem);
  }

  return (
    <form id="form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num}>{num}</option>
        ))}
      </select>
      <input type="text" placeholder="Item..." value={description} onChange={(e) => setDescription(e.target.value)} />
      <button type="submit">ADD</button>
    </form>
  );
}
function PackingList({ items, onDeleteItem, onToggleItem, onClear }: IPackingList) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems: IItem[] = [];
  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description") sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed") sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="packing-list">
      <ul className="list">
        {sortedItems.map((item: IItem) => (
          <Item
            id={item.id}
            key={item.id}
            description={item.description}
            packed={item.packed}
            quantity={item.quantity}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="buttons">
        <div className="sort">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="input">sort by input order</option>
            <option value="description">sort by description</option>
            <option value="packed">sort by packed status</option>
          </select>
        </div>
        <button className="btn-clear" onClick={onClear}>
          Clear List
        </button>
      </div>
    </div>
  );
}

function Item({ id, description, packed, quantity, onDeleteItem, onToggleItem }: IItem) {
  // if (id === undefined) return;

  return (
    <li className={`list-item ${packed && "selected"}`}>
      <input type="checkbox" onClick={() => onToggleItem && onToggleItem(id)} />
      <span className="text">
        {quantity} {description}
      </span>
      <span className="close" onClick={() => onDeleteItem && onDeleteItem(id)}>
        ❌
      </span>
    </li>
  );
}

function States({ items }: { items: IItem[] }) {
  const numOfItems = items.length;
  const packedItems = items.filter((item) => item.packed === true).length;
  const percentage = Math.round((packedItems / numOfItems) * 100);

  if (percentage === 100) {
    return (
      <footer className="footer">
        <em>You got everything! Ready to go ✈️</em>
      </footer>
    );
  }

  return (
    <footer className="footer">
      <em>
        {numOfItems ? (
          ` 💼 You have ${numOfItems} items on your list, and you already packed ${packedItems} (${percentage}%)`
        ) : (
          <span className="footer">Start adding some items to your packing list 🚀</span>
        )}
      </em>
    </footer>
  );
}

export default App;
