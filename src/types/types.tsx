export interface IUserProps {
  id: number;
  name: string;
  checked: boolean;
  products?: [];
}
export interface IProductProps {
  id: number;
  name: string;
  price: number;
}

export interface IPopUpUsersProps {
  users: IUserProps[];
  handleAddUser: (props: IUserProps) => void;
  handleRemoveUser: (id: number) => void;
  setPopUpView: (popUpView: boolean) => void;
  handleCheckedUser: (props: any) => void;
}

export interface IPopUpProductsProps {
  products: IProductProps[];
  handleAddProduct: (products: IProductProps) => void;
  handleRemoveProduct: (id: number) => void;
  setPopUpViewProducts: (popUpViewProducts: boolean) => void;
}

export interface IMoneyCount {
  users?: IUserProps[];
  products?: IProductProps[];
}

// let moneyState = [
//   { Никита: [{ хлеб: 1 }, { молоко: 0 }] },
//   { Олег: [{ молоко: 1 }] },
// ];
