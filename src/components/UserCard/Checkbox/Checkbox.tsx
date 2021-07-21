import React, { useEffect, useState } from "react";

import { ICheckbox } from "../../../types/types";
import "../../../styles/userCard.css";

export const Checkbox: React.FC<ICheckbox> = ({
  userId,
  productId,
  handleUserProducts,
  productName,
  personCost,
  products,
  setProducts,
}) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    // Рассчитываем Персональную сумму товара
    console.log("useEffect");
    if (products) {
      const result = products.map((product) => {
        return {
          ...product,
          personCost: Number(
            (product.price / product.userSelected.length).toFixed()
          ),
        };
      });

      setProducts(result);
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
