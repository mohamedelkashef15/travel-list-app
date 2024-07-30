import { useState } from "react";

interface IItem {
  quantity: number;
  description: string;
  packed: boolean;
}

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
];

function App() {
  return (
    <main>
      <section id="app">
        <Logo />
        <Form />
        <PackagingList />
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

function Form() {
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      quantity,
      description,
      packed: false,
    };

    console.log(newItem);
  }

  return (
    <form id="form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input type="text" placeholder="Item..." onChange={(e) => setDescription(e.target.value)} />
      <button type="submit">ADD</button>
    </form>
  );
}
function PackagingList() {
  return (
    <ul className="list">
      {initialItems.map((item) => {
        return <Item key={item.id} quantity={item.quantity} description={item.description} packed={item.packed} />;
      })}
    </ul>
  );
}

function Item({ quantity, description, packed }: IItem) {
  return (
    <li className="list-item">
      <input type="checkbox" />
      <span className={`text ${packed && "selected"}`}>
        {quantity} {description}
      </span>
      <button className="close">❌</button>
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
