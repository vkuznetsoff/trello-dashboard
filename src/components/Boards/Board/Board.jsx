import { useCallback, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { dndTypes } from "../../../dnd/dndTypes";
import { dropCard, removeBoard, thunkAction } from "../../../redux/actions";

import Card from "../../Cards/Card";
import EditTitle from "./Title/EditTitle";
import EditForm from "./EditForm";
import Dialog from "../Dialog/Dialog";

import boardCancel2 from "../../../assets/images/boardCancel2.svg";
import "./Board.css";
import { SORT_CARDS } from './../../../redux/actionTypes';
import { SORTED } from './../../../redux/actions';


const Board = ({ board }) => {
    
    const [visibleForm, setVisibleForm] = useState(false);

    const [editTitle, setEditTitle] = useState(false);

    const [showDialog, setShowDialog] = useState(false);

    const [delBoard, setDelBoard] = useState(false)

    const dispatch = useDispatch();






    const openFormHandle = () => {
        setVisibleForm(!visibleForm);
    };


    useEffect(() => {
        delBoard && dispatch(removeBoard(board.id))
    }, [delBoard, board])

    const removeBoardHandle = () => {
        setShowDialog(!showDialog)
    };

    const [hasCardSorted, setHasCardSorted] = useState(false)

    const [{ isOver }, drop] = useDrop(() => ({
        accept: dndTypes.CARD,
        drop(item, monitor) {
            const above = monitor.isOver() 
            above && onDrop(item.id, item.from, board.id, item.text)
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        })
    }));


    const onDrop = (dragCardId, sourceBoardId, targetBoardId, text) => {
        dispatch(dropCard(dragCardId, sourceBoardId, targetBoardId, text));     
    }


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

                    {showDialog && <Dialog setDelBoard={setDelBoard} setShowDialog={setShowDialog} />}
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
                    <Card key={i.id} card={i} tgboardId={board.id} setHasCardSorted={setHasCardSorted} />
                ))}

                {visibleForm && <EditForm board={board} setVisibleForm={setVisibleForm} />}

                {!visibleForm && (
                    <button className="board__addbtn" onClick={openFormHandle}>
                        + ???????????????? ????????????????
                    </button>
                )}
            </div>
        </div>
    );
};

export default Board;
