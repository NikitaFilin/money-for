import React, { useEffect, useState } from "react";
import { NavBar } from "./components/NavBar";
import { PopUpUsers } from "./components/PopUps/PopUpUsers";
import { PopUpProducts } from "./components/PopUps/PopUpProducts";
import { CalculationBlock } from "./components/Calculations/CalculationBlock";
import "./index.css";

import { IUser, IProduct } from "./types/types";

// let moneyState = [
//   {
//     id: 1,
//     name: "Никита",
//     checked: true,
//     products: [
//       {
//         productId: 2,
//         checked: false,
//         count: 0
//       }
//      ],
//     productCosts: [0, 100],
//   },
//   {
//     id: 1,
//     name: "Никита",
//     checked: true,
//     products: [
//       {
//         productId: 3,
//         checked: false,
//         count: 0
//       }
//      ],
//     productCosts: [0, 100],
//   },
// ];

const App = () => {
  const [users, setUsers] = useState<IUser[]>([
    {
      id: 1,
      name: "Никита",
      checked: true,
      userProducts: [
        { productId: 1, name: "Хлеб", count: 0, checked: false },
        { productId: 2, name: "Молоко", count: 0, checked: false },
        { productId: 3, name: "Яйца", count: 0, checked: false },
      ],
      productCosts: [8, 612],
    },
    {
      id: 2,
      name: "Олег",
      checked: true,
      userProducts: [
        { productId: 1, name: "Хлеб", count: 0, checked: false },
        { productId: 2, name: "Молоко", count: 0, checked: false },
        { productId: 3, name: "Яйца", count: 0, checked: false },
      ],
      productCosts: [19],
    },
    {
      id: 3,
      name: "Алина",
      checked: true,
      userProducts: [
        { productId: 1, name: "Хлеб", count: 0, checked: false },
        { productId: 2, name: "Молоко", count: 0, checked: false },
        { productId: 3, name: "Яйца", count: 0, checked: false },
      ],
      productCosts: [],
    },
    {
      id: 4,
      name: "Наташа",
      checked: true,
      userProducts: [
        // { 1: [{ name: "Хлеб" }, { count: 0 }, { checked: false }] },
        { productId: 2, name: "Молоко", count: 0, checked: false },
        { productId: 3, name: "Яйца", count: 0, checked: false },
      ],
      productCosts: [],
    },
  ]);

  const [products, setProducts] = useState<IProduct[]>([
    {
      id: 1,
      name: "Хлеб",
      price: 54,
    },
    {
      id: 2,
      name: "Молоко",
      price: 69,
    },
    {
      id: 3,
      name: "Яйца",
      price: 70,
    },
  ]);

  // открывает/ закрывает PopUp
  const [popUpViewUsers, setPopUpViewUsers] = useState<boolean>(false);
  const [popUpViewProducts, setPopUpViewProducts] = useState<boolean>(false);

  // добавление/удаление нового участника
  const handleAddUser = (userObj: IUser) => {
    setUsers([...users, userObj]);
  };

  const handleRemoveUser = (id: number) => {
    setUsers(users.filter((el) => el.id !== id));
  };
  // добавление/удаление продуктов
  const handleAddProduct = (productObj: IProduct) => {
    setProducts([...products, productObj]);

    //добавление продукта Юзерам
    setUsers((prev: IUser[]) => {
      return prev.map((el: IUser) => ({
        ...el,
        userProducts: [
          ...el.userProducts,
          {
            productId: productObj.id,
            name: productObj.name,
            count: 0,
            checked: false,
          },
        ],
      }));
    });
  };

  const handleRemoveProduct = (id: number) => {
    setProducts(products.filter((el) => el.id !== id));
    //удаление продукта у Юзеров
    console.log(id);

    setUsers((prev) => {
      return prev.map((el: IUser) => ({
        ...el,
        userProducts: [...el.userProducts.filter((x) => x.productId !== id)],
      }));
    });
  };

  const handleCheckedUser = (id: number) => {
    setUsers(
      users.map((user) => {
        if (user.id !== id) return user;

        return {
          ...user,
          checked: !user.checked,
        };
      })
    );
  };
  const handleUserProducts = (id: number) => {
    console.log(id);
  };

  return (
    <>
      <NavBar
        popUpViewUsers={popUpViewUsers}
        setPopUpViewUsers={setPopUpViewUsers}
        popUpViewProducts={popUpViewProducts}
        setPopUpViewProducts={setPopUpViewProducts}
      />
      {popUpViewUsers ? (
        <PopUpUsers
          users={users}
          handleAddUser={handleAddUser}
          handleRemoveUser={handleRemoveUser}
          setPopUpView={setPopUpViewUsers}
          handleCheckedUser={handleCheckedUser}
        />
      ) : null}
      {popUpViewProducts ? (
        <PopUpProducts
          products={products}
          handleAddProduct={handleAddProduct}
          handleRemoveProduct={handleRemoveProduct}
          setPopUpViewProducts={setPopUpViewProducts}
        />
      ) : null}
      <CalculationBlock
        users={users}
        products={products}
        handleUserProducts={handleUserProducts}
      />
    </>
  );
};

export default App;
