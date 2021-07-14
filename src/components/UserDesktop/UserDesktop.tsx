import React from "react";
import "../../styles/calculationBlock.css";

import { IUserDesktop } from "../../types/types";
import { UserCard } from "../UserCard/UserCard";

export const UserDesktop: React.FC<IUserDesktop> = ({
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