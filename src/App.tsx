import React, { useState } from "react";
import { NavBar } from "./components/NavBar/NavBar";
import { PopUpUsers } from "./components/PopUps/PopUpUser/PopUpUsers";
import { PopUpProducts } from "./components/PopUps/PopUpProduct/PopUpProducts";
import { UserDesktop } from "./components/UserDesktop/UserDesktop";
import "./index.css";

import {
  IUser,
  IProduct,
  IMoneyManager,
  IMoneyManagerProps,
} from "./types/types";

const App = () => {
  const [users, setUsers] = useState<IUser[] | null>(null);
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [moneyManager, setMoneyManager] = useState<IMoneyManager>({});

  // открывает/ закрывает PopUp
  const [popUpViewUsers, setPopUpViewUsers] = useState<boolean>(false);
  const [popUpViewProducts, setPopUpViewProducts] = useState<boolean>(false);

  // добавление/удаление нового участника
  // !
  const handleAddUser = (userId: number, nameFormated: string) => {
    if (users) {
      if (products) {
        setUsers([
          ...users,
          {
            id: userId,
            name: nameFormated,
            checked: true,
            userProducts: [...products],
            totalCosts: [],
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
            totalCosts: [],
          },
        ]);
      }
    } else {
      if (products) {
        setUsers([
          {
            id: userId,
            name: nameFormated,
            checked: true,
            userProducts: [...products],
            totalCosts: [],
          },
        ]);
      } else {
        setUsers([
          {
            id: userId,
            name: nameFormated,
            checked: true,
            userProducts: [],
            totalCosts: [],
          },
        ]);
      }
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
    if (users) {
      setUsers(
        users.map((el: IUser) => ({
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
        }))
      );
    }

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
      if (users) {
        setUsers(
          users.map((el: IUser) => ({
            ...el,
            userProducts: [
              ...el.userProducts.filter((x) => x.productId !== id),
            ],
          }))
        );
      }

      //удаление товара из moneyManager
      setMoneyManager((prev) => {
        delete prev[id];
        return { ...prev };
      });
    }
  };

  // Выбор участника
  const handleCheckedUser = (id: number) => {
    if (users) {
      setUsers(
        users.map((user) => {
          if (user.id !== id) return user;

          return {
            ...user,
            checked: !user.checked,
          };
        })
      );
    }
  };

  const handleUserProducts = (
    userId: number,
    productId: number,
    index: number
  ) => {
    if (users) {
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
    }
  };
  // добавляем в товары участников, которые их выбрали
  // считаем Персональную сумму товара
  const moneyManagerCheck = (userId: number, productId: number): void => {
    let someProperty = { ...moneyManager };

    // console.log(someProperty, someProperty);

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

  const calculatingUserAmount = (): void => {
    for (let productId in moneyManager) {
      // Берём каждый продукт из списка
      const arrUserSelected = moneyManager[productId]; // Массив людей, выбравших товар

      for (let i = 0; i < arrUserSelected.userSelected.length; i++) {
        users?.forEach((user) => {
          if (arrUserSelected.userSelected[i] === user.id) {
            // Если в списке людей, выбравших товар есть наш Юзер, то
            // мы должны этому юзеру закинуть в totalCosts - personCost из массива moneyManager
            console.log(
              "Юзер",
              user.name,
              "выбрал товар, его personCost -",
              arrUserSelected.personCost
            );

            // user.totalCosts.push( {
            //   productId :
            // })
          }
        });
      }
    }
  };

  calculatingUserAmount();

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
      <UserDesktop
        users={users}
        handleUserProducts={handleUserProducts}
        moneyManager={moneyManager}
      />
    </>
  );
};
export default App;
