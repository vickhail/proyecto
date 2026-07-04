import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import List from './components/List';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedItems =
      JSON.parse(localStorage.getItem('items')) || [];
    setItems(storedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const addOrUpdateItem = (value) => {
    if (itemToEdit) {
      setItems(items.map(item => item.id ===
      itemToEdit.id ? { ...item, value } : item));
      setItemToEdit(null);
    } else {
      setItems([...items, { id: Date.now(), value, completed: false }]);
    }
  };

  const deleteItem = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este elemento?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const editItem = (item) => {
    setItemToEdit(item);
  };

  const toggleComplete = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteAllItems = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar todos los elementos?')) {
      setItems([]);
    }
  };

  const filteredItems = items.filter(item =>
    item.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>CRUD con LocalStorage</h1>
      <p>Total: {items.length}</p>
      
      <div>
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: '15px', width: '100%' }}
        />
      </div>

      <Form
        addOrUpdateItem={addOrUpdateItem}
        itemToEdit={itemToEdit}
      />

      {items.length > 0 && (
        <button 
          onClick={deleteAllItems}
          className="delete-all-btn"
        >
          Borrar todo
        </button>
      )}

      <List 
        items={filteredItems} 
        deleteItem={deleteItem} 
        editItem={editItem}
        toggleComplete={toggleComplete}
      />
    </div>
  );
}

export default App;