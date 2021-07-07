import React from "react";
import { IProductProps } from "../../types/types";

import "../../styles/userCard.css";

interface IProductCardProps {
  products: IProductProps[];
}

export const ProductCard: React.FC<IProductCardProps> = ({ products }): any => {
  return (
    <>
      <div className="product-card-container">
        <span className="product-card-container-header">Продукты:</span>
        <div className="product-card-line">
          {products.map((product) => {
            return (
              <div className="product-card" key={product.id}>
                <div>{product.name}</div>
                <div>{product.price}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
