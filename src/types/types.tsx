export interface INavBar {
  popUpViewUsers: boolean;
  setPopUpViewUsers: (popUpViewUsers: boolean) => void;
  popUpViewProducts: boolean;
  setPopUpViewProducts: (popUpViewProducts: boolean) => void;
}

export interface IUser {
  id: number;
  name: string;
}

export interface IProduct {
  productId: number;
  name: string;
  price: number;
  personCost: number;
  checked: {
    [userCheckedId: number]: boolean;
  };
  userSelected: number[];
}

export interface IUserDesktop {
  users: IUser[] | null;
  products: IProduct[] | null;
  handleUserProducts: (
    id: number,
    productId: number,
    status: boolean,
    index?: number
  ) => void;
  setProducts: (prev: any) => void | null;
}

export interface IUserCard {
  users: IUser[];
  products: IProduct[] | null;
  handleUserProducts: (
    id: number,
    productId: number,
    status: boolean,
    index?: number
  ) => void;
  setProducts: (prev: any) => void | null;
}

export interface IPopUpUsersProps {
  users: IUser[] | null;
  handleAddUser: (userId: number, nameFormated: string) => void;
  handleRemoveUser: (id: number) => void;
  setPopUpView: (popUpView: boolean) => void;
}

export interface IPopUpProductsProps {
  products: IProduct[] | null;
  handleAddProduct: (products: IProduct) => void;
  handleRemoveProduct: (id: number) => void;
  setPopUpViewProducts: (popUpViewProducts: boolean) => void;
}

export interface IFooter {
  users: IUser[] | null;
  user: IUser | null;
  products: IProduct[] | null;
  setUsers: (prev: any) => void | null;
}

export interface ICheckbox {
  userId: number;
  productId: number;
  productName: string;
  personCost: number;

  products: IProduct[] | null;
  setProducts: (prev: any) => void | null;
  handleUserProducts: (id: number, productId: number, status: boolean) => void;
}
