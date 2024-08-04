import { useEffect, useState } from "react";
import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import States from "./components/States";
import { IItem } from "./interfaces";

function App() {
  const [items, setItems] = useState<IItem[]>(() => {
    const savedItems = localStorage.getItem("items");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  function handleDeleteItems() {
    const confirmed = window.confirm("Are you sure you want to delete All items?");
    if (confirmed) setItems([]);
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

export default App;
