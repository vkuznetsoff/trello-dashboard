import "./Card.css";
import remove2 from "..//../../assets/images/remove2.svg";
import { useDispatch } from "react-redux";
import { removeItem } from "../../../redux/actions";
import { useDrag } from "react-dnd";
import { dndTypes } from "../../../dnd/dndTypes";
import { useState } from "react";

const Card = ({ card, boardId }) => {
  const dispatch = useDispatch();
  const [currentBoard, setCurrentBoard] = useState();
  const [currentCard, setCurrentCard] = useState();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: dndTypes.CARD,
    item: { id: card.id,
            from: boardId,
            payload: card.text
     },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  }));

  const removeHandle = (cardId, boardId) => {
    dispatch(removeItem(cardId, boardId));
  };

  return (
    <div
      ref={drag}
      className="card"
      draggable="true"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="card__text">{card.text}</div>
      <div
        className="card__removebtn"
        onClick={() => removeHandle(card.id, boardId)}
      >
        <img src={remove2} />
      </div>
    </div>
  );
};

export default Card;
