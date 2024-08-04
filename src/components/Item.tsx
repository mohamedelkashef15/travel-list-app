import { IItem } from "../interfaces";

export default function Item({ id, description, packed, quantity, onDeleteItem, onToggleItem }: IItem) {
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
