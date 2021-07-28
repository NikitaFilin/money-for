import React, { useState } from "react";
import { NavBar } from "./components/NavBar/NavBar";
import { PopUpUsers } from "./components/PopUps/PopUpUser/PopUpUsers";
import { PopUpProducts } from "./components/PopUps/PopUpProduct/PopUpProducts";
import { UserDesktop } from "./components/UserDesktop/UserDesktop";

import { IUser, IProduct } from "./types/types";

import "./index.css";

const App = () => {
  const [users, setUsers] = useState<IUser[] | null>(null);
  const [products, setProducts] = useState<IProduct[] | null>(null);

  // открывает/ закрывает PopUp
  const [popUpViewUsers, setPopUpViewUsers] = useState<boolean>(false);
  const [popUpViewProducts, setPopUpViewProducts] = useState<boolean>(false);

  // Добавление/удаление участников
  const handleAddUser = (userId: number, nameFormated: string) => {
    if (users) {
      setUsers([
        ...users,
        {
          id: userId,
          name: nameFormated,
        },
      ]);
    } else {
      setUsers([
        {
          id: userId,
          name: nameFormated,
        },
      ]);
    }
  };
  const handleRemoveUser = (id: number) => {
    if (users) {
      setUsers(users.filter((el) => el.id !== id));
    }
    if (products) {
      setProducts(
        products.map((product) => {
          return {
            ...product,
            userSelected: product.userSelected.filter(
              (userId) => userId !== id
            ),
            personCost: product.price / (product.userSelected?.length - 1),
          };
        })
      );
    }
  };

  // добавление/удаление продуктов
  const handleAddProduct = (productObj: IProduct) => {
    if (!products) {
      setProducts([productObj]);
    } else {
      setProducts([...products, productObj]);
    }
    //добавление продукта Юзерам
  };
  const handleRemoveProduct = (id: number) => {
    if (products) {
      setProducts(products.filter((el) => el.productId !== id));
    }
  };

  // Добавляем/удаляем в products Юзеров, выбравших товар
  const handleUserProducts = (
    userId: number,
    productId: number,
    status: boolean
  ) => {
    if (products) {
      setProducts(
        products.map((product) => {
          if (product.productId === productId) {
            return {
              ...product,
              userSelected: status
                ? product.userSelected.concat([userId])
                : product.userSelected.filter((el) => el !== userId),
            };
          }
          return product;
        })
      );
    }
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
      <UserDesktop
        users={users}
        products={products}
        setProducts={setProducts}
        handleUserProducts={handleUserProducts}
      />
    </>
  );
};
export default App;
