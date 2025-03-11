import React, { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  // Fetch Users
  useEffect(() => {
    fetch(`${API_URL}/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // Handle Form Submission
  const addUser = async (e) => {
    e.preventDefault();

    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      setUsers([...users, { id: users.length + 1, name }]); // Update UI instantly
      setName(""); // Clear input field
    }
  };

  return (
    <div>
      <h1>Hello from React!</h1>
      <h2>Users List:</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <h2>Add a New User</h2>
      <form onSubmit={addUser}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          required
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default App;
