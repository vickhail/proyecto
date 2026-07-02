import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import List from './components/List';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    console.log('Items cargados:', storedItems);
    setItems(storedItems);
  }, []);

  useEffect(() => {
    console.log('Guardando items:', items);
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const addOrUpdateItem = (value) => {
    if (itemToEdit) {
      setItems(prevItems => 
        prevItems.map(item => 
          item.id === itemToEdit.id ? { ...item, value } : item
        )
      );
      setItemToEdit(null);
    } else {
      setItems(prevItems => {
        const newItem = { id: Date.now(), value: value.trim() };
        console.log('Nuevo item:', newItem);
        return [...prevItems, newItem];
      });
    }
  };

  const deleteItem = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este elemento?')) {
      setItems(prevItems => prevItems.filter(item => item.id !== id));
    }
  };

  const editItem = (item) => {
    setItemToEdit(item);
  };

  return (
    <div className="App">
      <h1>CRUD con LocalStorage</h1>
      <p>Total: {items.length}</p>
      <Form
        addOrUpdateItem={addOrUpdateItem}
        itemToEdit={itemToEdit}
      />
      <List 
        items={items} 
        deleteItem={deleteItem} 
        editItem={editItem} 
      />
    </div>
  );
}

export default App;