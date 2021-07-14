import React, { useState } from "react";
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
  const [users, setUsers] = useState<IUser[]>([]);

  const [products, setProducts] = useState<IProduct[] | null>(null);

  const [moneyManager, setMoneyManager] = useState<IMoneyManager>({
    1626165146992: {
      cost: 54,
      userSelected: [1626080975341],
      personCost: 0,
    },
  });
  // открывает/ закрывает PopUp
  const [popUpViewUsers, setPopUpViewUsers] = useState<boolean>(false);
  const [popUpViewProducts, setPopUpViewProducts] = useState<boolean>(false);

  // добавление/удаление нового участника
  const handleAddUser = (userId: number, nameFormated: string) => {
    if (products) {
      setUsers([
        ...users,
        {
          id: userId,
          name: nameFormated,
          checked: true,
          userProducts: [...products],
          productSelected: [],
        },
      ]);
    } else {
      setUsers([
        ...users,
        {
          id: userId,
          name: nameFormated,
          checked: true,
          userProducts: [],
          productSelected: [],
        },
      ]);
    }
  };

  const handleRemoveUser = (id: number) => {
    setUsers(users.filter((el) => el.id !== id));
  };

  // добавление/удаление продуктов
  const handleAddProduct = (productObj: IProduct) => {
    if (!products) {
      setProducts([productObj]);
    } else {
      setProducts([...products, productObj]);
    }
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
    if (products) {
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
    }
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
            console.log(product, productId);

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

  // добавляем в товары участников, которые их выбрали
  // считаем Персональную сумму товара
  const moneyManagerCheck = (userId: number, productId: number): void => {
    let someProperty = { ...moneyManager };
    if (
      someProperty[productId] &&
      someProperty[productId].userSelected.includes(userId)
    ) {
      someProperty[productId].userSelected = someProperty[
        productId
      ].userSelected.filter((el) => el !== userId);
    } else {
      someProperty[productId].userSelected.push(userId);
    }
    someProperty[productId].personCost =
      someProperty[productId].cost /
      someProperty[productId].userSelected.length;

    if (someProperty[productId].personCost === Infinity) {
      someProperty[productId].personCost = 0;
    }

    setMoneyManager(someProperty);
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
