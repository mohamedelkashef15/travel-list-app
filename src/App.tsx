import { useState } from "react";

interface IItem {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
  onDeleteItem?: (val: number) => void;
  onToggleItem?: (val: number) => void;
}

function App() {
  const [items, setItems] = useState<IItem[]>([]);

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
        <PackagingList items={items} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} />
        <States />
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

    onAddItem(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form id="form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num}>{num}</option>
        ))}
      </select>
      <input type="text" placeholder="Item..." onChange={(e) => setDescription(e.target.value)} />
      <button type="submit">ADD</button>
    </form>
  );
}
function PackagingList({
  items,
  onDeleteItem,
  onToggleItem,
}: {
  items: IItem[];
  onDeleteItem: (val: number) => void;
  onToggleItem: (val: number) => void;
}) {
  return (
    <ul className="list">
      {items.map((item: IItem) => (
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
  );
}

function Item({ id, description, packed, quantity, onDeleteItem, onToggleItem }: IItem) {
  // if (id === undefined) return;

  return (
    <li className="list-item">
      <input type="checkbox" onClick={() => onToggleItem && onToggleItem(id)} />
      <span className={`text ${packed && "selected"}`}>
        {quantity} {description}
      </span>
      <span className="close" onClick={() => onDeleteItem && onDeleteItem(id)}>
        ❌
      </span>
    </li>
  );
}

function States() {
  return (
    <footer>
      <em>💼 You have 1 items on your list, and you already packed 0 (0%)</em>
    </footer>
  );
}

export default App;
