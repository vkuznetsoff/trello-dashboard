import "./Card.css";
import remove2 from "..//../../assets/images/remove2.svg";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, sortCards } from "../../../redux/actions";
import { useDrag, useDrop } from "react-dnd";
import { dndTypes } from "../../../dnd/dndTypes";
import { useState } from "react";

const Card = ({ card, tgboardId }) => {
  const dispatch = useDispatch();
  const dropIndex = useSelector(state => state.boards)
  const [currentBoard, setCurrentBoard] = useState();
  const [currentCard, setCurrentCard] = useState();

  let style = undefined;

  const [{ isDragging}, drag] = useDrag(() => ({
    type: dndTypes.CARD,
    item: { id: card.id, from: tgboardId, payload: card.text },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));


  const onDrop = (dragCard, targetCard, scBoardId, tgboardId ) => {
    
    dispatch(sortCards(dragCard, targetCard, scBoardId, tgboardId ))
    // console.log('drag', dragCard) 
    // console.log('targetCard', targetCard)
    // console.log('scBoard ', scBoardId);
    // console.log('tgBoard ',tgboardId);
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: dndTypes.CARD,
    drop: (item, monitor) => onDrop(item, card, item.from, tgboardId), //onDrop(item.id, item.from, board.id, item.payload),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const dragStyle = {
    opacity: isDragging ? 0.5 : 1,
  };

  const dropStyle = {
    opacity: isOver ? 1 : undefined,
   
    transform: isOver ? "translateX(-10px) " : undefined,
  };

  const endDragStyle = {
    background: "red"
  };

  

  if (isDragging) {
    style = dragStyle;
  } else if (isOver) {
    style = dropStyle;
  } 
  // else if (endDragging) {
  //   style = endDragStyle
  // }

  const removeHandle = (cardId, boardId) => {
    dispatch(removeItem(cardId, boardId));
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      className="card"
      draggable="true"
      style={style}
    >
      <div className="card__text">{card.text}</div>
      <div
        className="card__removebtn"
        onClick={() => removeHandle(card.id, tgboardId)}
      >
        <img src={remove2} />
      </div>
    </div>
  );
};

export default Card;
