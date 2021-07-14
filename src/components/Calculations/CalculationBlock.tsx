import React from "react";
import "../../styles/calculationBlock.css";

import { IUser, IProduct } from "../../types/types";
import { UserCard } from "../Calculations/UserCard";

interface ICalculationBlock {
  users: IUser[];
  products: IProduct[] | null;
  handleUserProducts: (id: number, productId: number, index: number) => void;
}

export const CalculationBlock: React.FC<ICalculationBlock> = ({
  users,
  products,
  handleUserProducts,
}) => {
  return (
    <div className="calculation-container">
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
