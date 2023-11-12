// components/Main.js
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ShoppingList from './ShoppingList';
import ShoppingListDetail from './ShoppingListDetail';

const Main = ({ data }) => {
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <h1>Nákupní Seznamy</h1>
          <ShoppingList data={data} />
        </Route>
        <Route path="/shopping-list/:listName" exact>
          <ShoppingListDetail data={data} />
        </Route>
      </Switch>
    </div>
  );
};

export default Main;
