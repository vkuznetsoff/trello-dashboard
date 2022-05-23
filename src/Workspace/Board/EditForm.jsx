import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/actions";
import Tooltip from "./Tooltip/Tooltip";

const EditForm = ({board, setVisibleForm}) => {
    const [editText, setEditText] = useState();
    const [showTooltip, setShowTooltip] = useState(false);
    const dispatch = useDispatch()
    
    const style = {
        visibility:
            (editText === undefined) | (editText === "") ? "hidden" : "visible",
    };

    const closeEditForm = () => {
        setVisibleForm(false);
        setEditText("");
        setShowTooltip(false)
    };

    const changeEditForm = (e) => {
        setShowTooltip(true)
        const value = e.target.value;
        setEditText(value);
    };

    const addCardHandle = (boardId, text) => {
        if (editText.trim()) {
            dispatch(addItem(boardId, text));
            closeEditForm();
        }
    };

    const cancelHandle = () => {
        closeEditForm();
    };

    const onKeyDown = (e) => {
        if (e.key === "Enter" && editText.trim()) {
            addCardHandle(board.id, editText);
        }
    };

    return (
        <div className="board__form">
            {showTooltip && <Tooltip text="Нажмите Enter для добавления карточки"/> }
            <textarea
                placeholder="Введите текст"
                value={editText}
                onChange={(e) => changeEditForm(e)}
                onKeyDown={(e) => onKeyDown(e)}
                autoFocus={true}
            ></textarea>
            <div class="board__form__bottom">
                <button
                    className="board__form__addbtn"
                    style={style}
                    onClick={() => addCardHandle(board.id, editText)}
                >
                    + Добавить
                </button>
                <button className="board__form__canlelbtn" onClick={cancelHandle}>
                    X Отмена
                </button>
            </div>
        </div>
    )
}

export default EditForm