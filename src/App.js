import React, { useState } from 'react';
import ShoppingList from './ShoppingList';

const App = () => {
  const [shoppingLists, setShoppingLists] = useState([]);
  const [showArchived, setShowArchived] = useState(false);
  const [newListName, setNewListName] = useState('');

  const handleArchiveList = (listIndex) => {
    const updatedLists = shoppingLists.map((list, index) => {
      if (index === listIndex) {
        return { ...list, archived: true };
      }
      return list;
    });
    setShoppingLists(updatedLists);
  };

  const handleCreateList = () => {
    const newList = {
      name: newListName,
      items: [],
      archived: false,
    };
    setShoppingLists([...shoppingLists, newList]);
    setNewListName('');
  };

  const filteredLists = shoppingLists.filter((list) => (showArchived ? list.archived : !list.archived));

  return (
    <div>
      <h1>Nákupní Seznamy</h1>
      <button
        style={{
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          padding: '5px 10px',
          marginLeft: '10px',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
        }}
        onClick={() => setShowArchived(!showArchived)}
      >
        {showArchived ? 'Zobrazit Nearchivované ' : 'Zobrazit archivované'}
      </button>
      {filteredLists.map((list, index) => (
        <ShoppingList
          key={index}
          data={list.items}
          listName={list.name}  
          onArchive={() => handleArchiveList(index)}
        />
      ))}
      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Název nového seznamu"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
        />
        <button
          style={{
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            padding: '5px 10px',
            marginLeft: '10px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onClick={handleCreateList}
        >
          Vytvořit seznam
        </button>
      </div>
    </div>
  );
};

export default App;