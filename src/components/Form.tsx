import { useState } from "react";
import { IItem } from "../interfaces";

export default function Form({ onAddItem }: { onAddItem: (val: IItem) => void }) {
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
