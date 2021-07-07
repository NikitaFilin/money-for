export interface IUser {
  id: number;
  name: string;
  checked: boolean;
  userProducts: IUserProducts[];
  productCosts: number[];
}
export interface IProduct {
  id: number;
  name: string;
  price: number;
}
export interface IUserProducts {
  productId: number;
  name: string;
  count: number;
  checked: boolean;
}

export interface IPopUpUsersProps {
  users: IUser[];
  handleAddUser: (props: IUser) => void;
  handleRemoveUser: (id: number) => void;
  setPopUpView: (popUpView: boolean) => void;
  handleCheckedUser: (props: any) => void;
}

export interface IPopUpProductsProps {
  products: IProduct[];
  handleAddProduct: (products: IProduct) => void;
  handleRemoveProduct: (id: number) => void;
  setPopUpViewProducts: (popUpViewProducts: boolean) => void;
}

export interface IMoneyCount {
  users?: IUser[];
  products?: IProduct[];
}

// let moneyState = [
//   { Никита: [{ хлеб: 1 }, { молоко: 0 }] },
//   { Олег: [{ молоко: 1 }] },
// ];
