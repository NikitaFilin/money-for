import React from "react";
import "../../styles/calculationBlock.css";

import { IUser, IProduct, IMoneyManager } from "../../types/types";
import { UserCard } from "../Calculations/UserCard";

interface ICalculationBlock {
  users: IUser[] | null;
  products: IProduct[] | null;
  moneyManager: IMoneyManager;
  handleUserProducts: (id: number, productId: number, index: number) => void;
}

export const CalculationBlock: React.FC<ICalculationBlock> = ({
  users,
  products,
  moneyManager,
  handleUserProducts,
}) => {
  return (
    <div className="calculation-container">
      <div className="content-container-wrapper">
        {users ? (
          <div className="content-container-users">
            <UserCard
              users={users}
              products={products}
              moneyManager={moneyManager}
              handleUserProducts={handleUserProducts}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};
