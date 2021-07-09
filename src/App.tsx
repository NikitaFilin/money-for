import React, { useState } from "react";
import { NavBar } from "./components/NavBar";
import { PopUpUsers } from "./components/PopUps/PopUpUsers";
import { PopUpProducts } from "./components/PopUps/PopUpProducts";
import { CalculationBlock } from "./components/Calculations/CalculationBlock";
import "./index.css";

import { IUser, IProduct } from "./types/types";

const App = () => {
  const [users, setUsers] = useState<IUser[]>([
    {
      id: 3,
      name: "Олег",
      checked: true,
      userProducts: [
        { productId: 1, name: "Хлеб", price: 100, checked: false },
        { productId: 2, name: "Молоко", price: 120, checked: false },
        { productId: 3, name: "Яйцо", price: 300, checked: false },
      ],
      productCosts: [],
    },
    {
      id: 4,
      name: "Наташа",
      checked: true,
      userProducts: [
        { productId: 1, name: "Хлеб", price: 100, checked: false },
        { productId: 2, name: "Молоко", price: 120, checked: false },
        { productId: 3, name: "Яйцо", price: 300, checked: false },
      ],
      productCosts: [],
    },
  ]);

  const [products, setProducts] = useState<IProduct[]>([
    {
      productId: 1,
      name: "Хлеб",
      price: 54,
      checked: false,
      userSelected: [],
    },
    {
      productId: 2,
      name: "Молоко",
      price: 69,
      checked: false,
      userSelected: [],
    },
    {
      productId: 3,
      name: "Яйца",
      price: 70,
      checked: false,
      userSelected: [],
    },
  ]);

  // открывает/ закрывает PopUp
  const [popUpViewUsers, setPopUpViewUsers] = useState<boolean>(false);
  const [popUpViewProducts, setPopUpViewProducts] = useState<boolean>(false);

  // добавление/удаление нового участника
  const handleAddUser = (userObj: IUser) => {
    console.log("prod", [...products]);
    setUsers([
      ...users,
      {
        id: userObj.id,
        name: userObj.name,
        checked: false,
        userProducts: [...products],
        productCosts: [],
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
  };

  const handleRemoveProduct = (id: number) => {
    setProducts(products.filter((el) => el.productId !== id));
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
  const handleUserProducts = (userId: number, index: number) => {
    console.log(userId, index);

    setUsers((prev) => {
      return prev.map((user) => {
        if (user.id === userId) {
          user.userProducts.map((product, i) => {
            if (index === i) {
              product.checked = !product.checked;
            }
            return product;
          });
        }

        return user;
      });
    });
  };

  // return users.map((user) => {
  //   //Ищем пользователя по id
  //   if (user.id === userId) {
  //     user.userProducts[index].checked = !user.userProducts[index].checked;
  //   }

  //   return user;
  // });

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
