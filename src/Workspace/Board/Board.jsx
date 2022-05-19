import { useState } from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { dndTypes } from "../../dnd/dndTypes";
import { addItem, dropCard, removeBoard } from "../../redux/actions";
import Card from "../Cards/Card/Card";
import "./Boards.css";
import EditTitle from "./Title/EditTitle";
import boardCancel2 from "../../assets/images/boardCancel2.svg";
const Board = ({ board }) => {
  const [visibleForm, setVisibleForm] = useState(false);
  const [editText, setEditText] = useState();
  const dispatch = useDispatch();

  const style = {
    visibility:
      (editText === undefined) | (editText === "") ? "hidden" : "visible",
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
    const value = e.target.value;
    setEditText(value);
  };

  const addCardHandle = (boardId, text) => {
    dispatch(addItem(boardId, text));
    closeEditForm();
  };

  const cancelHandle = () => {
    closeEditForm();
  };

  const removeBoardHandle = (id) => {
      dispatch(removeBoard(id))
  }

  const onDrop = (itemId, sourceBoardId, targetBoardId, payload) => {
    dispatch(dropCard(itemId, sourceBoardId, targetBoardId, payload));
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: dndTypes.CARD,
    drop: (item, monitor) => onDrop(item.id, item.from, board.id, item.payload),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));
  

  const boardStyle = {
    opacity: isOver ? 0.4 : 1,
  };

  const [editTitle, setEditTitle] = useState(false);

  const titleClickHandle = () => {
    setEditTitle(!editTitle);
  };

  return (
    <div className="board" style={boardStyle}>
      <div className="board__content" ref={drop}>
        <div className="board__header">
          <div className="board__removebtn" onClick={() => removeBoardHandle(board.id)}>
            <img src={boardCancel2} alt="removeBoard" />
          </div>
        </div>
        <div className="board__title" onClick={titleClickHandle}>
          {!editTitle ? (
            board.title
          ) : (
            <EditTitle
              initialValue={board.title}
              setEditTitle={setEditTitle}
              boardId={board.id}
            />
          )}
        </div>

        {board.items.map((i) => (
          <Card key={i.id} card={i} boardId={board.id} />
        ))}

        {visibleForm && (
          <div className="board__form">
            <textarea
              placeholder="Enter content"
              value={editText}
              onChange={(e) => changeEditForm(e)}
              autoFocus={true}
            ></textarea>
            <div class="board__form__bottom">
              <button
                className="board__form__addbtn"
                style={style}
                onClick={() => addCardHandle(board.id, editText)}
              >
                Add card
              </button>
              <button className="board__form__canlelbtn" onClick={cancelHandle}>
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
  );
};

export default Board;
