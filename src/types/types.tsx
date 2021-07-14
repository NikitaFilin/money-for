export interface INavBar {
  popUpViewUsers: boolean;
  setPopUpViewUsers: (popUpViewUsers: boolean) => void;
  popUpViewProducts: boolean;
  setPopUpViewProducts: (popUpViewProducts: boolean) => void;
}

export interface IUser {
  id: number;
  name: string;
  checked: boolean;
  userProducts: IUserProducts[];
  productSelected: string[];
}
export interface IUserProducts {
  productId: number;
  name: string;
  price: number;
  checked: boolean;
}
export interface IProduct {
  productId: number;
  name: string;
  price: number;
  checked: boolean;
  userSelected: string[];
}

export interface IUserDesktop {
  users: IUser[] | null;
  products: IProduct[] | null;
  moneyManager: IMoneyManager;
  handleUserProducts: (id: number, productId: number, index: number) => void;
}

export interface IMoneyManager {
  [id: number]: IMoneyManagerProps;
}

export interface IMoneyManagerProps {
  cost: number;
  userSelected: number[];
  personCost: number;
}

export interface IPopUpUsersProps {
  users: IUser[] | null;
  handleAddUser: (userId: number, nameFormated: string) => void;
  handleRemoveUser: (id: number) => void;
  setPopUpView: (popUpView: boolean) => void;
  handleCheckedUser: (props: any) => void;
}

export interface IPopUpProductsProps {
  products: IProduct[] | null;
  handleAddProduct: (products: IProduct) => void;
  handleRemoveProduct: (id: number) => void;
  setPopUpViewProducts: (popUpViewProducts: boolean) => void;
}

export interface IMoneyCount {
  users?: IUser[];
  products?: IProduct[];
}
