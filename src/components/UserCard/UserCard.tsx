import React, { useEffect } from "react";
import { IUser, IUserCard } from "../../types/types";

import { Checkbox } from "../UserCard/Checkbox/Checkbox";

import "../../styles/userCard.css";

export const UserCard: React.FC<IUserCard> = ({
  users,
  products,
  handleUserProducts,
  setProducts,
}) => {
  console.log("UserCard", products);

  // useEffect(() => {
  //   console.log("useEffect");
  //   // let someProducts = [...products];
  //   // console.log("someProducts", someProducts, "and", products);
  //   if (products) {
  //     const result = products.map((product) => {
  //       return {
  //         ...product,
  //         personCost: Number(
  //           (product.price / product.userSelected.length).toFixed()
  //         ),
  //       };
  //     });
  //     console.log("result", result, products);

  //     // return products;
  //     setProducts(result);
  //   }
  // }, []);

  return (
    <>
      {users.map((user: IUser) => {
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
              Итого {}
              {/* Итого: {user.productSelected?.reduce((acc, el) => (acc += el), 0)} */}
            </span>
          </div>
        );
      })}
    </>
  );
};
