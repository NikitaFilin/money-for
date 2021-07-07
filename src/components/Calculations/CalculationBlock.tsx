import React from "react";
import "../../styles/calculationBlock.css";

import { IUserProps, IProductProps } from "../../types/types";
import { UserCard } from "../Calculations/UserCard";
import { ProductCard } from "../Calculations/ProductCard";

interface ICalculationBlock {
  users: IUserProps[];
  products: IProductProps[];
}

export const CalculationBlock: React.FC<ICalculationBlock> = ({
  users,
  products,
}) => {
  return (
    <div className="calculation-container">
      {/* <ProductCard products={products} /> */}
      <div className="content-container-wrapper">
        <div className="content-container-users">
          <UserCard users={users} products={products} />
        </div>
      </div>
    </div>
  );
};
