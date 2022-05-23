import { useState } from "react"
import { useDispatch } from "react-redux";
import { removeBoard } from "../../../redux/actions";
import "./Dialog.css"

const Dialog = ({ setDelBoard, setShowDialog}) => {
    const dispatch = useDispatch();

    const clickYesHandle = () => {
        setShowDialog(false)
        setDelBoard(true)  
    }

    const clickNoHandle = () => {
        setShowDialog(false)
    }

    return (
        <div class='board__header__del'>
            <p>Удалить?</p>
            <div class='del_btns'>
                <div class='del_yes' onClick={() => clickYesHandle()}>Да</div>
                <div class='del_no' onClick={clickNoHandle}>Нет</div>
            </div>
        </div>

    )
}

export default Dialog

