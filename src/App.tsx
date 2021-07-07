import React, { useEffect, useState } from "react";
import { NavBar } from "./components/NavBar";
import { PopUpUsers } from "./components/PopUps/PopUpUsers";
import { PopUpProducts } from "./components/PopUps/PopUpProducts";
import { CalculationBlock } from "./components/Calculations/CalculationBlock";
import "./index.css";

import { IUserProps, IProductProps } from "./types/types";

const App = () => {
  const [users, setUsers] = useState<IUserProps[]>([
    { id: 1, name: "Никита", checked: true, products: [] },
    { id: 2, name: "Олег", checked: true, products: [] },
    { id: 3, name: "Алина", checked: true, products: [] },
    { id: 4, name: "Наташа", checked: true, products: [] },
  ]);

  const [products, setProducts] = useState<IProductProps[]>([
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

  const [moneyState, setMoneyState] = useState([users]);

  const moneyCount = (users: IUserProps[], products: IProductProps[]) => {};

  console.log(moneyState);

  // let moneyState = [
  //   {
  //     Никита: [
  //       { хлеб: 1, money: 100 },
  //       { молоко: 0, money: 0 },
  //     ],
  //   },
  //   {
  //     Олег: [
  //       { хлеб: 0, money: 0 },
  //       { молоко: 1, money: 200 },
  //     ],
  //   },
  // ];

  // открывает/ закрывает PopUp
  const [popUpViewUsers, setPopUpViewUsers] = useState<boolean>(false);
  const [popUpViewProducts, setPopUpViewProducts] = useState<boolean>(false);

  // добавление/удаление нового участника
  const handleAddUser = (userObj: IUserProps) => {
    setUsers([...users, userObj]);
    console.log("userObj", userObj);

    // setMoneyState([...moneyState]);
  };

  const handleRemoveUser = (id: number) => {
    setUsers(users.filter((el) => el.id !== id));
  };
  // добавление/удаление продуктов
  const handleAddProduct = (productObj: IProductProps) => {
    setProducts([...products, productObj]);
  };
  const handleRemoveProduct = (id: number) => {
    setProducts(products.filter((el) => el.id !== id));
  };

  const handleCheckedUser = (id: number): void => {
    // setUsers:( (value: React.SetStateAction<IUserProps[]>) :void => {
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
      <CalculationBlock users={users} products={products} />
    </>
  );
};

export default App;
