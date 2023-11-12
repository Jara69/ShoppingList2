// components/ShoppingListDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';

const ShoppingListDetail = ({ data }) => {
  const { listName } = useParams();

  // Najděte odpovídající nákupní seznam na základě listName

  return (
    <div>
      <h2>Detail nákupního seznamu: {listName}</h2>
      {/* Zobrazte detail seznamu */}
    </div>
  );
};

export default ShoppingListDetail;
