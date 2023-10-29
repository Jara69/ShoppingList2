import React, { useState } from 'react';
import './ShoppingList.css';
import MembersList from './MembersList';

function ShoppingList({ data }) {
  const [showList, setShowList] = useState(false);
  const [items, setItems] = useState(data);
  const [listName, setListName] = useState('Nákupní seznam');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showOnlyUnpurchased, setShowOnlyUnpurchased] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [members, setMembers] = useState([]);
  const [newItemName, setNewItemName] = useState(''); // Nový stav pro název nové položky
  const [newItemId, setNewItemId] = useState(0); // Nový stav pro ID nové položky

  const handleTogglePurchase = (itemId) => {
    const updatedItems = items.map(item => {
      if (item.id === itemId) {
        return { ...item, purchased: !item.purchased };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleSaveListName = () => {
    // Implementace pro uložení názvu seznamu na backendu nebo v aplikaci
    setIsAdmin(false);
  };

  const handleAddMember = () => {
    setMembers([...members, newMemberName]);
    setNewMemberName('');
  };

  const handleRemoveMember = (memberName) => {
    if (isAdmin) {
      const updatedMembers = members.filter(member => member !== memberName);
      setMembers(updatedMembers);
    }
  };

  const handleAddItem = () => {
    const newItem = {
      id: newItemId, // Přidáme nové ID pro položku
      item: newItemName,
      purchased: false,
    };
    setItems([...items, newItem]);
    setNewItemName(''); // Vymažeme název nové položky
    setNewItemId(newItemId + 1); // Inkrementujeme ID pro další položku
  };

  const handleRemoveItem = (itemId) => {
    const updatedItems = items.filter(item => item.id !== itemId);
    setItems(updatedItems);
  };

  return (
    <div className="shopping-list">
      <h2>
        {isAdmin ? (
          <div>
            <input
              type="text"
              value={listName}
              onChange={e => setListName(e.target.value)}
            />
            <button onClick={handleSaveListName}>Uložit</button>
          </div>
        ) : (
          listName
        )}
      </h2>
      {isAdmin && (
        <div>
          <label>
            <input
              type="text"
              placeholder="Jméno nového člena"
              value={newMemberName}
              onChange={e => setNewMemberName(e.target.value)}
            />
            <button onClick={handleAddMember}>Přidat člena</button>
          </label>
        </div>
      )}
      <MembersList members={members}/>
      
      <div>
        <input
          type="text"
          placeholder="Nová položka"
          value={newItemName}
          onChange={e => setNewItemName(e.target.value)}
        />
        <button onClick={handleAddItem}>Přidat položku</button>
      </div>
      <ul>
        {showList && (
          <ul>
            {items
              .filter(item => !showOnlyUnpurchased || !item.purchased)
              .map(item => (
                <li key={item.id}>
                  <input
                    type="checkbox"
                    checked={item.purchased}
                    onChange={() => handleTogglePurchase(item.id)}
                  />
                  {item.item}
                  {(isAdmin || !isAdmin) && (
                    <button onClick={() => handleRemoveItem(item.id)}>Odebrat</button>
                  )}
                </li>
              ))}
          </ul>
        )}
      </ul>
      <div>
        <button onClick={() => setShowList(!showList)}>
          {showList ? 'Skrýt' : 'Zobrazit'}
        </button>
        <button onClick={() => setIsAdmin(!isAdmin)}>
          Admin: {isAdmin ? 'true' : 'false'}
        </button>
        <label>
          <input
            type="checkbox"
            checked={showOnlyUnpurchased}
            onChange={() => setShowOnlyUnpurchased(!showOnlyUnpurchased)}
          />
          Zobrazit Nevyřešené
        </label>
      </div>
    </div>
  );
}

export default ShoppingList;