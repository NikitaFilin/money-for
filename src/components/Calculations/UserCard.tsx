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
              {products.map((product) => {
                return (
                  <div className="user-card" key={product.id}>
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
                        /* {
                  id: 1,
                  name: "Никита",
                  checked: true,
                  userProducts: [
                     1 :{ name: "Хлеб", count: 0, checked: false },
                    { productId: 2, name: "Молоко", count: 0, checked: false },
                    { productId: 3, name: "Яйца", count: 0, checked: false },
                  ],
                  productCosts: [8, 612],
                }, */
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
