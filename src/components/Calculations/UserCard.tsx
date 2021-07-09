import React from "react";

import { IUser, IProduct, IUserProducts } from "../../types/types";

import "../../styles/userCard.css";

interface IUserCard {
  users: IUser[];
  products: IProduct[];
  handleUserProducts: (id: number) => void;
}

export const UserCard: React.FC<IUserCard> = ({
  users,
  products,
  handleUserProducts,
}) => {
  return (
    <>
      {users.map((user: IUser) => {
        return user.checked ? (
          <div className="user-card-container" key={user.id}>
            <span className="user-card-container-header">{user.name}</span>
            <div className="user-card-line">
              {user.userProducts?.map((product) => {
                return (
                  <div className="user-card" key={product.productId}>
                    <div>
                      <input
                        type="checkbox"
                        // checked={
                        //   user[
                        //     user.userProducts.filter(
                        //       (el) => el.productId === product.id
                        //     )
                        //   ].checked
                        // }
                        onChange={() => handleUserProducts(user.id)}
                      />
                    </div>
                    <div>{product.name}</div>
                    <div> {product.price}</div>
                  </div>
                );
              })}
            </div>

            <span className="user-card-container-footer">
              Итого: {user.productCosts?.reduce((acc, el) => (acc += el), 0)}
            </span>
          </div>
        ) : null;
      })}
    </>
  );
};
