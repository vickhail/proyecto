import React, { useState, useEffect } from 'react';

function Form({ addOrUpdateItem, itemToEdit }) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (itemToEdit) {
      setInputValue(itemToEdit.value);
      setError("");
    } else {
      setInputValue("");
    }
  }, [itemToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue.trim()) {
      addOrUpdateItem(inputValue);
      setInputValue("");
      setError("");
    } else {
      setError("No se permiten campos vacíos");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (error) setError("");
          }}
        />
        <button type="submit">
          {itemToEdit ? 'Actualizar' : 'Agregar'}
        </button>
      </form>
      {error && <p style={{ color: 'red', fontSize: '14px', marginTop: '5px', marginBottom: '10px' }}>{error}</p>}
    </div>
  );
}

export default Form;