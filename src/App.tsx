// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
// ];

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
  return (
    <form id="form">
      <h3>What do you need for your 😍 trip?</h3>
      <select>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <input type="text" placeholder="Item..." />
      <button type="submit">ADD</button>
    </form>
  );
}
function PackagingList() {
  return (
    <div className="list">
      <ul>
        <Item />
      </ul>
    </div>
  );
}

function Item() {
  return (
    <li className="list-item">
      <input type="checkbox" />
      <span className="text">1 test</span>
      <span className="close">❌</span>
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
