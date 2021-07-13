import React from "react";
import { IProduct } from "../../types/types";

import "../../styles/userCard.css";

interface IProductCard {
  products: IProduct[];
}

export const ProductCard: React.FC<IProductCard> = ({ products }): any => {
  return (
    <>
      <div className="product-card-container">
        <span className="product-card-container-header">Продукты:</span>
        <div className="product-card-line">
          {products.map((product) => {
            return (
              <div className="product-card" key={product.productId}>
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
