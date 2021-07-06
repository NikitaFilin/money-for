export interface IUserProps {
  id: number;
  name: string;
  checked: boolean;
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
}

export interface IPopUpProductsProps {
  products: IProductProps[];
  handleAddProduct: (products: IProductProps) => void;
  handleRemoveProduct: (id: number) => void;
  setPopUpViewProducts: (popUpViewProducts: boolean) => void;
}
