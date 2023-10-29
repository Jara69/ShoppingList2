import React from 'react';
import ShoppingList from './ShoppingList'; // Importujte komponentu ShoppingList

const shoppingListData = [
  { id: 1, item: 'Mléko', purchased: false },
  { id: 2, item: 'Chléb', purchased: true },
  { id: 3, item: 'Vajíčka', purchased: false },
  // Další položky seznamu
];


function App() {
  return (
    <div>
      <h1>Nákupní Seznamy.</h1>
      <ShoppingList data={shoppingListData}/>
    </div>
  );
}

export default App;