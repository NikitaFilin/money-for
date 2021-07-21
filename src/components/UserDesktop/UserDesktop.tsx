import React, { useEffect } from "react";
import "../../styles/calculationBlock.css";

import { IUserDesktop } from "../../types/types";
import { UserCard } from "../UserCard/UserCard";

export const UserDesktop: React.FC<IUserDesktop> = ({
  users,
  products,
  handleUserProducts,
  setProducts,
}) => {
  return (
    <div className="calculation-container">
      <div className="content-container-wrapper">
        {users ? (
          <div className="content-container-users">
            <UserCard
              users={users}
              products={products}
              handleUserProducts={handleUserProducts}
              setProducts={setProducts}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};
