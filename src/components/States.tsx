import { IItem } from "../interfaces";

export default function States({ items }: { items: IItem[] }) {
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
