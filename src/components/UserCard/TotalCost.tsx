import React from "react";
import { IProduct, IUser } from "../../types/types";

import "../../styles/userCard.css";

interface ITotalCost {
  user: IUser;
  products: IProduct[] | null;
}

export const TotalCost: React.FC<ITotalCost> = ({ user, products }) => {
  return (
    <span className="user-card-container-footer">
      <span>Итого: </span>
      {products?.reduce((acc: number, el: IProduct) => {
        if (el.userSelected.includes(Number(user.id))) {
          acc += Number(el.personCost);
        }
        return acc;
      }, 0)}{" "}
      &#8381;
    </span>
  );
};
