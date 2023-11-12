import React from 'react';

const ShoppingItem = ({ item, handleTogglePurchase, handleRemoveItem }) => {
  return (
    <li key={item.id} className={item.archived ? 'archived' : ''}>
      <input
        type="checkbox"
        checked={item.purchased}
        onChange={() => handleTogglePurchase(item.id)}
      />
      {item.item}
      <button onClick={() => handleRemoveItem(item.id)}>Odebrat</button>
      {item.archived && <span>Archivováno</span>}
    </li>
  );
};

export default ShoppingItem;
