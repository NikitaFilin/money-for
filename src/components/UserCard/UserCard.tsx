import React from "react";

import { IUser, IProduct, IMoneyManager } from "../../types/types";

import "../../styles/userCard.css";

interface IUserCard {
  users: IUser[];
  products: IProduct[] | null;
  moneyManager: IMoneyManager;
  handleUserProducts: (id: number, productId: number, index: number) => void;
}

export const UserCard: React.FC<IUserCard> = ({
  users,
  products,
  moneyManager,
  handleUserProducts,
}) => {
  // {
  //   1626270507409: {
  //     cost: 200
  //     personCost: 200
  //     userSelected: [1626270492597]
  //   }
  // }

  return (
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
                    <div>
                      {moneyManager[product.productId].personCost.toFixed(0)}
                    </div>
                  </div>
                );
              })}
            </div>

            <span className="user-card-container-footer">
              Итого {}
              {/* Итого: {user.productSelected?.reduce((acc, el) => (acc += el), 0)} */}
            </span>
          </div>
        ) : null;
      })}
    </>
  );
};
