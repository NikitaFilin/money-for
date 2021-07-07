import React from "react";

import { IUserProps, IProductProps } from "../../types/types";

import "../../styles/userCard.css";

interface IUserCard {
  users: IUserProps[];
  products: IProductProps[];
}

export const UserCard: React.FC<IUserCard> = ({ users, products }) => {
  return (
    <>
      {users.map((user: IUserProps) => {
        return user.checked ? (
          <div className="user-card-container" key={user.id}>
            <span className="user-card-container-header">{user.name}</span>
            <div className="user-card-line">
              {products.map((product) => {
                return (
                  <div className="user-card" key={product.id}>
                    <div>
                      <input type="checkbox" />
                    </div>
                    <div>{product.name}</div>
                    <div> {product.price}</div>
                  </div>
                );
              })}
            </div>
            <span className="user-card-container-footer">итого 2321</span>
          </div>
        ) : null;
      })}
    </>
  );
};
