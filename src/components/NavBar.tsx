import React from "react";

export const NavBar: React.FC<any> = ({
  popUpViewUsers,
  setPopUpViewUsers,
  popUpViewProducts,
  setPopUpViewProducts,
}) => {
  return (
    <nav>
      <div className="nav-wrapper pink darken-3 cursor">
        <div className="navBar-container">
          <div
            className="navBar-container-icon"
            onClick={() => setPopUpViewProducts(!popUpViewProducts)}
          >
            <i className="material-icons right">list</i>
            <span>Продукты</span>
          </div>
          <div
            className="navBar-container-icon"
            onClick={() => setPopUpViewUsers(!popUpViewUsers)}
          >
            <i className="material-icons right">group_add</i>
            <span>Участники</span>
          </div>
        </div>
      </div>
    </nav>
  );
};
