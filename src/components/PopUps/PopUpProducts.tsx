import React, { useState } from "react";
import "../../index.css";

export const PopUpProducts: React.FC<any> = ({
  products,
  handleAddProduct,
  handleRemoveProduct,
  setPopUpViewProducts,
}) => {
  const [newProduct, setNewProduct] = useState("");
  const [newPrice, setNewPrice] = useState(0);

  const clickOutside = (e: React.MouseEvent) => {
    e.target !== e.currentTarget
      ? setPopUpViewProducts(true)
      : setPopUpViewProducts(false);
  };

  const handleAddNewProducts = () => {
    if (newProduct.length > 0 && newPrice > 0) {
      setNewProduct(newProduct.trim());
      const styledProduct = newProduct[0].toUpperCase() + newProduct.slice(1);

      const newObj = {
        id: Date.now(),
        name: styledProduct,
        price: newPrice,
      };
      handleAddProduct(newObj);
      setNewProduct("");
      setNewPrice(0);
    }
  };

  return (
    <>
      <div className="b-popup" onClick={(e) => clickOutside(e)}>
        <div className="b-popup-content">
          {
            <ul>
              <li>
                <div>
                  <div className="popup-userName-line-add">
                    <div className="popup-product-Addline-name">Название</div>
                    <div className="popup-product-Addline-price">Цена</div>
                    <div className="product-line">Удаление </div>
                  </div>
                </div>
              </li>
              {products.map((product: any) => {
                return (
                  <li key={product.id}>
                    <div className="popup-userName-line-add">
                      <div className="popup-product-Addline-name">
                        {product.name}
                      </div>
                      <div className="popup-product-Addline-price">
                        {product.price} &#8381;
                      </div>
                      <div className="product-line">
                        <i
                          className="material-icons right"
                          onClick={() => handleRemoveProduct(product.id)}
                        >
                          delete_forever
                        </i>
                      </div>
                    </div>
                  </li>
                );
              })}

              <div className="popup-userName-line-add">
                <div className="popup-product-Addline-name">
                  <input
                    type="text"
                    placeholder="Продукт"
                    value={newProduct}
                    onChange={(e) => setNewProduct(e.target.value)}
                  ></input>
                </div>
                <div className="popup-product-Addline-price">
                  <input
                    type="number"
                    placeholder="Цена"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                  ></input>
                </div>
                <button
                  className="waves-effect waves-light btn-small pink darken-3"
                  onClick={() => handleAddNewProducts()}
                >
                  Добавить
                </button>
              </div>
            </ul>
          }
        </div>
      </div>
    </>
  );
};
