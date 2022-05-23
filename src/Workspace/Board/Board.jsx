import { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { dndTypes } from "../../dnd/dndTypes";
import { dropCard, removeBoard } from "../../redux/actions";

import Card from "../Cards/Card/Card";
import EditTitle from "./Title/EditTitle"; import EditForm from "./EditForm";

import boardCancel2 from "../../assets/images/boardCancel2.svg";
import "./Board.css";
import Dialog from "./Dialog/Dialog";

const Board = ({ board }) => {
    const [visibleForm, setVisibleForm] = useState(false);

    const [editTitle, setEditTitle] = useState(false);

    const [showDialog, setShowDialog] = useState(false);

    const [delBoard, setDelBoard] = useState(false)

    const dispatch = useDispatch();

    const openFormHandle = () => {
        setVisibleForm(!visibleForm);
    };


    useEffect( () => {
        delBoard && dispatch(removeBoard(board.id))
}, [delBoard])

    const removeBoardHandle = () => {
        setShowDialog(!showDialog)
    };

    const onDrop = (itemId, sourceBoardId, targetBoardId, payload) => {
        if (sourceBoardId !== targetBoardId)
            dispatch(dropCard(itemId, sourceBoardId, targetBoardId, payload));
    }

    const [{ isOver }, drop] = useDrop(() => ({
        accept: dndTypes.CARD,
        drop: (item) => onDrop(item.id, item.from, board.id, item.payload),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    const titleClickHandle = () => {
        setEditTitle(!editTitle);
    };


    const boardStyle = {
        opacity: isOver ? 0.8 : 1,
    };

    return (
        <div className="board" style={boardStyle}>
            <div className="board__content" ref={drop}>
                <div className="board__header">
                    <div
                        className="board__removebtn"
                        onClick={() => removeBoardHandle()}
                    >
                        <img src={boardCancel2} alt="removeBoard" />
                    </div>

                   {showDialog && <Dialog setDelBoard={setDelBoard} setShowDialog={setShowDialog}/>}
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
                    <Card key={i.id} card={i} tgboardId={board.id} />
                ))}

                {visibleForm && <EditForm board={board} setVisibleForm={setVisibleForm} />}

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
