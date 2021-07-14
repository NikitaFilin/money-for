import React, { useState } from "react";
import "../../index.css";

import { IUser, IPopUpUsersProps } from "../../types/types";

export const PopUpUsers: React.FC<IPopUpUsersProps> = ({
  users,
  handleAddUser,
  handleRemoveUser,
  setPopUpView,
  handleCheckedUser,
}) => {
  const [newUser, setNewUser] = useState("");

  // открываем/ закрываем окошко PopUpUsers
  const clickOutside = (e: React.MouseEvent) => {
    e.target !== e.currentTarget ? setPopUpView(true) : setPopUpView(false);
  };

  // добавляем нового участника
  const handleAddNewUser = () => {
    if (newUser.length > 0) {
      setNewUser(newUser.trim());

      const userId = Date.now();
      const nameFormated =
        newUser[0].toUpperCase() + newUser.toLowerCase().slice(1);

      handleAddUser(userId, nameFormated);
      setNewUser("");
    }
  };

  // ввод имени по enter
  const handleChangeNewUser = (code: number) => {
    if (code === 13) {
      handleAddNewUser();
    }
  };

  return (
    <>
      <div className="b-popup" onClick={(e) => clickOutside(e)}>
        <div className="b-popup-content">
          {
            <ul>
              {users.length > 0 ? (
                users.map((user: IUser) => {
                  return (
                    <li key={user.id}>
                      <div className="popup-userName-line">
                        <div className="popup-userName-line-icons">
                          <input
                            type="checkbox"
                            checked={user.checked}
                            onChange={() => handleCheckedUser(user.id)}
                          />
                        </div>
                        <div className="popup-userName-line-userName">
                          {user.name}
                        </div>
                        <div className="popup-userName-line-icons">
                          <i
                            className="material-icons right"
                            onClick={() => handleRemoveUser(user.id)}
                          >
                            close
                          </i>
                        </div>
                      </div>
                    </li>
                  );
                })
              ) : (
                <div className="popup-userName-null">Участников пока нет</div>
              )}
              <div className="popup-userName-line-add">
                <input
                  placeholder="Новый участник"
                  value={newUser}
                  onChange={(e) => setNewUser(e.target.value)}
                  onKeyUp={(e) => handleChangeNewUser(e.keyCode)}
                ></input>
                <button
                  className="waves-effect waves-light btn-small pink darken-3"
                  onClick={() => handleAddNewUser()}
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
