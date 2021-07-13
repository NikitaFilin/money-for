import React from "react";

import { IUser, IProduct } from "../../types/types";

import "../../styles/userCard.css";

interface IUserCard {
  users: IUser[];
  products: IProduct[];
  handleUserProducts: (id: number, productId: number, index: number) => void;
}

export const UserCard: React.FC<IUserCard> = ({
  users,
  products,
  handleUserProducts,
}) => {
  return (
    // Структура
    // "users": [
    //   {
    //     "id": 4,
    //     "name": "Наташа",
    //     "checked": true,
    //     "userProducts": [
    //       "{checked: false, name: \"Кишмиш\", price: 244, produc…}"
    //     ],
    //     "productCosts": []
    //   },
    //   {
    //     "id": 1625828201163,
    //     "name": "Ваня",
    //     "checked": true,
    //     "userProducts": "[{…}, {…}]",
    //     "productCosts": "[]"
    //   },
    //   {
    //     "id": 1625828231585,
    //     "name": "Никта",
    //     "checked": true,
    //     "userProducts": "[{…}, {…}]",
    //     "productCosts": "[]"
    //   }
    // ],
    <>
      {users.map((user: IUser) => {
        return user.checked ? (
          <div className="user-card-container" key={user.id}>
            <span className="user-card-container-header">{user.name}</span>
            <div className="user-card-line">
              {user.userProducts?.map((product, index) => {
                return (
                  <div className="user-card" key={product.productId}>
                    <div>
                      <input
                        type="checkbox"
                        checked={user.userProducts[index].checked}
                        onChange={() =>
                          handleUserProducts(user.id, product.productId, index)
                        }
                      />
                    </div>
                    <div>{product.name}</div>
                    <div> {product.price}</div>
                  </div>
                );
              })}
            </div>

            <span className="user-card-container-footer">
              Итого
              {/* Итого: {user.productSelected?.reduce((acc, el) => (acc += el), 0)} */}
            </span>
          </div>
        ) : null;
      })}
    </>
  );
};
