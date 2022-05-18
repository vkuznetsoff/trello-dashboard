import "./Board.css";

import { useState } from "react";
import Card from "../Cards/Card/Card";

const Board = () => {
  const [visibleForm, setVisibleForm] = useState(false);
  const [editText, setEditText] = useState();

  const style = {
    visibility: (editText === undefined | editText === "") ? "hidden" : "visible",
    //  display: (editText == undefined | editText === "") ? "none" : "block"
   
  };

  

  const openFormHandle = () => {
    setVisibleForm(!visibleForm);
   
  };

  const closeEditForm = () => {
    setVisibleForm(false);
    setEditText("");
  };

const changeEditForm = (e) => {
    const value = e.target.value
    setEditText(value); 
}

  const cancelHandle = () => {
    closeEditForm();
  };

  return (
    <div className="workspace">
      <div className="content">
        <div className="board">
          <div className="board__content">
            <div className="board__title" contentEditable="true">
              Заголовок
            </div>


            <Card />

            {visibleForm && (
              <div className="board__form">
                <textarea
                  placeholder="Enter content"
                  value={editText}
                  onChange={(e) => changeEditForm(e)}
                ></textarea>
                <div class="board__form__bottom">
                  <button className="board__form__addbtn" style={style}>
                    Add card
                  </button>
                  <button
                    className="board__form__canlelbtn"
                    onClick={cancelHandle}
                  >
                    X
                  </button>
                </div>
              </div>
            )}

            {!visibleForm && (
              <button className="board__addbtn" onClick={openFormHandle}>
                + Добавить карточку
              </button>
            )}
          </div>
        </div>
      </div>

      <div class="bottom">
        <button className="bottom__addboard">+ Add board</button>
      </div>
    </div>
  );
};

export default Board;
