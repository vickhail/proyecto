import React from 'react';

function Item({ item, deleteItem, editItem, toggleComplete }) {
  return (
    <li style={{ 
      textDecoration: item.completed ? 'line-through' : 'none',
      opacity: item.completed ? 0.7 : 1
    }}>
      <span>{item.value}</span>
      <div className="button-group">
        <button 
          onClick={() => toggleComplete(item.id)}
          className="complete-btn"
        >
          {item.completed ? 'Desmarcar' : 'Completar'}
        </button>
        <button 
          onClick={() => editItem(item)}
          className="edit-btn"
        >
          Editar
        </button>
        <button 
          onClick={() => deleteItem(item.id)}
          className="delete-btn"
        >
          Eliminar
        </button>
      </div>
    </li>
  );
}

export default Item;