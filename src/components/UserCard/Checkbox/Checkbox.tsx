import React, { useEffect, useState } from "react";
import { ICheckbox } from "../../../types/types";

import "../../../styles/userCard.css";

export const Checkbox: React.FC<ICheckbox> = ({
  products,
  setProducts,
  userId,
  productId,
  productName,
  personCost,
  handleUserProducts,
}) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    // Рассчитываем Персональную сумму товара
    if (products) {
      const resultPersonCost = products.map((product) => {
        let cost =
          product.userSelected.length > 1
            ? Number((product.price / product.userSelected.length).toFixed())
            : product.price;

        return {
          ...product,
          personCost: cost,
        };
      });

      setProducts(resultPersonCost);
    }
  }, [selected]);

  return (
    <>
      <input
        type="checkbox"
        checked={selected}
        onChange={() => {
          handleUserProducts(userId, productId, !selected);
          setSelected(!selected);
        }}
      />
      <div>{productName}</div>
      {selected ? (
        <div className="checkbox-userCard-price">{personCost}</div>
      ) : (
        <div className="checkbox-userCard-price"></div>
      )}
    </>
  );
};
