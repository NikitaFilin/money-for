import React from "react";
import "../../styles/calculationBlock.css";

import { IUser, IProduct } from "../../types/types";
import { UserCard } from "../Calculations/UserCard";
import { ProductCard } from "../Calculations/ProductCard";

interface ICalculationBlock {
  users: IUser[];
  products: IProduct[];
  handleUserProducts: (id: number) => void;
}

export const CalculationBlock: React.FC<ICalculationBlock> = ({
  users,
  products,
  handleUserProducts,
}) => {
  return (
    <div className="calculation-container">
      {/* <ProductCard products={products} /> */}
      <div className="content-container-wrapper">
        <div className="content-container-users">
          <UserCard
            users={users}
            products={products}
            handleUserProducts={handleUserProducts}
          />
        </div>
      </div>
    </div>
  );
};