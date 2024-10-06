import React, { useState } from "react";
import "./index.css";

const App = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      name: "Office Task - 1",
      description: "This is the description for My First Task",
      status: "not completed",
    },
    {
      id: 2,
      name: "Office Task - 2",
      description: "This is the description for My Second Task",
      status: "completed",
    },
    {
      id: 3,
      name: "Office Task - 3",
      description: "This is the description for My Third Task",
      status: "not completed",
    },
  ]);

  const [formData, setFormData] = useState({ name: "", description: "" });
  const [editingCard, setEditingCard] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all"); // Add state for filter

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle status change in dropdown
  const handleStatusChange = (id, newStatus) => {
    setCards(
      cards.map((card) =>
        card.id === id ? { ...card, status: newStatus } : card
      )
    );
  };

  // Add new card or update existing card
  const handleAddCard = () => {
    if (!formData.name || !formData.description) return;

    if (editingCard) {
      setCards(
        cards.map((card) =>
          card.id === editingCard.id
            ? { ...card, name: formData.name, description: formData.description }
            : card
        )
      );
      setEditingCard(null); // Exit editing mode
    } else {
      const newCard = {
        id: cards.length + 1, // Increment ID
        name: formData.name,
        description: formData.description,
        status: "not completed",
      };
      setCards([...cards, newCard]);
    }

    // Reset form
    setFormData({ name: "", description: "" });
  };

  // Edit card
  const handleEditCard = (card) => {
    setEditingCard(card);
    setFormData({ name: card.name, description: card.description });
  };

  // Delete card
  const handleDeleteCard = (id) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  // Handle status filter change
  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  // Filtered cards based on status
  const filteredCards = cards.filter((card) => {
    if (filterStatus === "all") return true;
    return card.status === filterStatus;
  });

  return (
    <div className="container">
      <h2 className="title">My todo</h2>
      <br></br>
      <div className="form-group">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Todo Name"
          className="form-control"
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Todo Description"
          className="form-control"
        />
        <button
          onClick={handleAddCard}
          className={`btn ${editingCard ? "btn-save" : "btn-add"}`}
        >
          {editingCard ? "Save Todo" : "Add Todo"}
        </button>
      </div>


      
      <div className="header-container">
  <h4 className="todos-heading">My Todos</h4>
  <div className="filter-container">
    <h5>Status Filter: </h5>
    <select
      value={filterStatus}
      onChange={handleFilterChange}
      className={`filter-select status-dropdown-filter ${
        filterStatus === "completed" ? "completed-dropdown" : "not-completed-dropdown"
      }`}
    >
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="not completed">Not Completed</option>
    </select>
  </div>
</div>






      <div className="card-container">
        {filteredCards.map((card) => (
          <div className="card" key={card.id}>
            <h5>Name: {card.name}</h5>
            <p>Description: {card.description}</p>
            <div>
              <label>Status: </label>
              <select
                value={card.status}
                onChange={(e) => handleStatusChange(card.id, e.target.value)}
                className={`form-control status-dropdown ${
                  card.status === "completed" ? "completed-dropdown" : "not-completed-dropdown"
                }`}
              >
                <option value="completed">Completed</option>
                <option value="not completed">Not Completed</option>
              </select>
            </div>
            <div className="card-actions">
              <button onClick={() => handleEditCard(card)} className="btn btn-edit">
                Edit
              </button>
              <button onClick={() => handleDeleteCard(card.id)} className="btn btn-delete">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
