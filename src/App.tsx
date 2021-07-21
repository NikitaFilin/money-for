import React, { useEffect, useState } from "react";
import { NavBar } from "./components/NavBar/NavBar";
import { PopUpUsers } from "./components/PopUps/PopUpUser/PopUpUsers";
import { PopUpProducts } from "./components/PopUps/PopUpProduct/PopUpProducts";
import { UserDesktop } from "./components/UserDesktop/UserDesktop";
import "./index.css";

import { IUser, IProduct } from "./types/types";

//////////////////// user
// id: 1626770267035
// name:"Vd"
// totalCosts:  // товары которые он выбрал
//   {
//     "12"{productId} : 80{personCost}
//   },
//   {
//     "2" : 2000
//   }
// ]

//////////////////// product;
// [
//  {
//   productId: 1626770276272;
//   name: "Хлеб";
//   price: 20;
//   personCost: 0
//   checked:
//   {
//     userCheckedId : true,
//     userCheckedId : false,
//   };
//   userSelected: [1626770276272, 1626770276272];
//  }
// ]

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
          totalCosts: [],
        },
      ]);
    } else {
      setUsers([
        {
          id: userId,
          name: nameFormated,
          totalCosts: [],
        },
      ]);
    }
  };
  const handleRemoveUser = (id: number) => {
    if (users) {
      setUsers(users.filter((el) => el.id !== id));
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

  // добавляем в товары участников, которые их выбрали
  // считаем Персональную сумму товара
  // const moneyManagerCheck = (userId: number, productId: number): void => {
  //   let someProperty = { ...moneyManager };

  //   // console.log(someProperty, someProperty);

  //   if (
  //     someProperty[productId] &&
  //     someProperty[productId].userSelected.includes(userId)
  //   ) {
  //     someProperty[productId].userSelected = someProperty[
  //       productId
  //     ].userSelected.filter((el) => el !== userId);
  //   } else {
  //     someProperty[productId].userSelected.push(userId);
  //   }
  //   someProperty[productId].personCost =
  //     someProperty[productId].cost /
  //     someProperty[productId].userSelected.length;

  //   if (someProperty[productId].personCost === Infinity) {
  //     someProperty[productId].personCost = 0;
  //   }

  //   setMoneyManager(someProperty);
  // };

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
