import React from "react";
import { IUser, IUserCard } from "../../types/types";
import { Checkbox } from "../UserCard/Checkbox/Checkbox";

import "../../styles/userCard.css";

export const UserCard: React.FC<IUserCard> = ({
  users,
  products,
  handleUserProducts,
  setProducts,
}) => {
  return (
    <>
      {users?.map((user: IUser) => {
        return (
          <div className="user-card-container" key={user.id}>
            <span className="user-card-container-header">{user.name}</span>
            <div className="user-card-line">
              {products?.map((product) => {
                return (
                  <div className="user-card" key={product.productId}>
                    <Checkbox
                      userId={user.id}
                      productId={product.productId}
                      handleUserProducts={handleUserProducts}
                      productName={product.name}
                      personCost={product.personCost}
                      products={products}
                      setProducts={setProducts}
                    />
                  </div>
                );
              })}
            </div>

            <span className="user-card-container-footer">
              <span>Итого: </span>
              {products?.reduce((acc, el) => {
                if (el.userSelected.includes(Number(user?.id))) {
                  acc += Number(el.personCost);
                }
                return acc;
              }, 0)}{" "}
              &#8381;
            </span>
          </div>
        );
      })}
    </>
  );
};
