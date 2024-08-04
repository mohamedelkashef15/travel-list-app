import { IItem, IPackingList } from "../interfaces";
import { useState } from "react";
import Item from "./Item";

export default function PackingList({ items, onDeleteItem, onToggleItem, onClear }: IPackingList) {
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
