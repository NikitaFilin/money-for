import React, { useEffect, useState } from "react";
import { NavBar } from "./components/NavBar";
import { PopUpUsers } from "./components/PopUps/PopUpUsers";
import { PopUpProducts } from "./components/PopUps/PopUpProducts";
import { CalculationBlock } from "./components/Calculations/CalculationBlock";
import "./index.css";

import {
  IUser,
  IProduct,
  IMoneyManager,
  IMoneyManagerProps,
} from "./types/types";

const App = () => {
  const [users, setUsers] = useState<IUser[]>([
    {
      id: 1626080975341,
      name: "Олег",
      checked: true,
      userProducts: [
        { productId: 101, name: "Хлеб", price: 100, checked: false },
        { productId: 202, name: "Молоко", price: 120, checked: false },
        { productId: 303, name: "Яйцо", price: 300, checked: false },
      ],
      productSelected: [],
    },
    {
      id: 1626081159435,
      name: "Наташа",
      checked: true,
      userProducts: [
        { productId: 101, name: "Хлеб", price: 100, checked: false },
        { productId: 202, name: "Молоко", price: 120, checked: false },
        { productId: 303, name: "Яйцо", price: 300, checked: false },
      ],
      productSelected: [],
    },
  ]);

  const [products, setProducts] = useState<IProduct[]>([
    {
      productId: 101,
      name: "Хлеб",
      price: 54,
      checked: false,
      userSelected: [],
    },
    {
      productId: 202,
      name: "Молоко",
      price: 69,
      checked: false,
      userSelected: [],
    },
    {
      productId: 303,
      name: "Яйца",
      price: 70,
      checked: false,
      userSelected: [],
    },
  ]);

  const [moneyManager, setMoneyManager] = useState<IMoneyManager>({
    1626165146992: {
      cost: 22,
      userSelected: [767676],
      personCost: 0,
    },
  });
  // открывает/ закрывает PopUp
  const [popUpViewUsers, setPopUpViewUsers] = useState<boolean>(false);
  const [popUpViewProducts, setPopUpViewProducts] = useState<boolean>(false);

  // добавление/удаление нового участника
  const handleAddUser = (userObj: IUser) => {
    setUsers([
      ...users,
      {
        id: userObj.id,
        name: userObj.name,
        checked: false,
        userProducts: [...products],
        productSelected: [],
      },
    ]);
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
            productId: productObj.productId,
            name: productObj.name,
            price: productObj.price,
            checked: false,
          },
        ],
      }));
    });

    //Добавляем товар в moneyManager
    const { productId, price } = productObj;
    const moneyManagerObj: IMoneyManagerProps = {
      cost: price,
      userSelected: [],
      personCost: 0,
    };

    setMoneyManager((prev) => {
      return { ...prev, [productId]: moneyManagerObj };
    });
  };

  const handleRemoveProduct = (id: number) => {
    setProducts(products.filter((el) => el.productId !== id));

    //удаление продукта у Юзеров
    setUsers((prev) => {
      return prev.map((el: IUser) => ({
        ...el,
        userProducts: [...el.userProducts.filter((x) => x.productId !== id)],
      }));
    });

    //удаление товара из moneyManager
    setMoneyManager((prev) => {
      delete prev[id];
      return { ...prev };
    });
  };

  // Выбор участника
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

  const handleUserProducts = (
    userId: number,
    productId: number,
    index: number
  ) => {
    setUsers(
      users.map((user) => {
        if (user.id === userId) {
          user.userProducts.map((product, i) => {
            if (index === i) {
              product.checked = !product.checked;
            }
            return product;
          });
        }
        return user;
      })
    );
    moneyManagerCheck(userId, productId);
  };

  const moneyManagerCheck = (userId: number, productId: number) => {
    // setMoneyManager({
    //   ...moneyManager,
    //   [productId]: {
    //     userSelected: [...userSelected, userId],
    //   },
    // });
  };

  // 1626165146992: {
  //   cost: 22,
  //   userSelected: [],
  //   personCost: 0,
  // },

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
