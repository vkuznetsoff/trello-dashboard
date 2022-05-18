import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/actions";
import Card from "../Cards/Card/Card";
import "./Boards.css"

const Board = ({board}) => {
    const [visibleForm, setVisibleForm] = useState(false);
    const [editText, setEditText] = useState();
    const dispatch = useDispatch()

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

    const addCardHandle = (boardId, text) => {
        dispatch(addItem(boardId, text))
    }

    const cancelHandle = () => {
        closeEditForm();
    };

    return (
        <div className="board">
            <div className="board__content">
                <div className="board__title" contentEditable="true">
                    {board.title}
                </div>


                {board.items.map((i) => (
                    <Card card={i} boardId={board.id} />
                ))}

                {visibleForm && (
                    <div className="board__form">
                        <textarea
                            placeholder="Enter content"
                            value={editText}
                            onChange={(e) => changeEditForm(e)}
                        ></textarea>
                        <div class="board__form__bottom">
                            <button className="board__form__addbtn" style={style}
                            onClick={() => addCardHandle(board.id, editText)} >
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
    )
}

export default Board