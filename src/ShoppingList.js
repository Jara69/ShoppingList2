import React, { useState } from 'react';
import './ShoppingList.css';
import MembersList from './MembersList';

function ShoppingList({ data, listName: initialListName, onArchive }) {
  const [showList, setShowList] = useState(false);
  const [items, setItems] = useState(data);
  const [listName, setListName] = useState(initialListName);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showOnlyUnpurchased, setShowOnlyUnpurchased] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [members, setMembers] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemId, setNewItemId] = useState(0);

  const handleTogglePurchase = (itemId) => {
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, purchased: !item.purchased };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleSaveListName = () => {
    setIsAdmin(false);
  };

  const handleAddMember = () => {
    if (isAdmin) {
      setMembers([...members, newMemberName]);
      setNewMemberName('');
    }
  };

  const handleRemoveMember = (memberName) => {
    if (isAdmin) {
      const updatedMembers = members.filter((member) => member !== memberName);
      setMembers(updatedMembers);
    }
  };

  const handleAddItem = () => {
    const newItem = {
      id: newItemId,
      item: newItemName,
      purchased: false,
    };
    setItems([...items, newItem]);
    setNewItemName('');
    setNewItemId(newItemId + 1);
  };

  const handleRemoveItem = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
  };

  const handleArchive = () => {
    onArchive(); // Zavoláme funkci z nadřazené komponenty
  };

  return (
    <div className="shopping-list">
      <h2>
        {isAdmin ? (
          <div>
            <input
              type="text"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
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
              onChange={(e) => setNewMemberName(e.target.value)}
            />
            <button onClick={handleAddMember}>Přidat člena</button>
          </label>
        </div>
      )}
      <MembersList members={members} onRemoveMember={handleRemoveMember} />
      <div>
        <input
          type="text"
          placeholder="Nová položka"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <button onClick={handleAddItem}>Přidat položku</button>
      </div>
      <ul>
        {showList &&
          items
            .filter((item) => !showOnlyUnpurchased || !item.purchased)
            .map((item) => (
              <li key={item.id}>
                <input
                  type="checkbox"
                  checked={item.purchased}
                  onChange={() => handleTogglePurchase(item.id)}
                />
                {item.item}
                <button onClick={() => handleRemoveItem(item.id)}>Odebrat</button>
              </li>
            ))}
      </ul>
      <div>
        <button onClick={() => setShowList(!showList)}>
          {showList ? 'Skrýt' : 'Zobrazit'}
        </button>
        <button onClick={() => setIsAdmin(!isAdmin)}>
          Admin: {isAdmin ? 'true' : 'false'}
        </button>
        {isAdmin && (
          <label>
            <input
              type="checkbox"
              checked={showOnlyUnpurchased}
              onChange={() => setShowOnlyUnpurchased(!showOnlyUnpurchased)}
            />
            Zobrazit Nevyřešené
          </label>
        )}
        <button onClick={handleArchive}>Archivovat</button>
      </div>
    </div>
  );
}

export default ShoppingList;
