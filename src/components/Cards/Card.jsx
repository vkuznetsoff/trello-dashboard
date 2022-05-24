import "./Card.css";
import remove2 from "../../assets/images/remove2.svg";
import { useDispatch } from "react-redux";
import { removeItem, sortCards } from "../../redux/actions";
import { useDrag, useDrop } from "react-dnd";
import { dndTypes } from "../../dnd/dndTypes";

const Card = ({ card, tgboardId }) => {
  const dispatch = useDispatch();

  let style = undefined;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: dndTypes.CARD,
    item: { id: card.id, from: tgboardId, text: card.text },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));


  const onDrop = (dragCardId, targetCardId, scBoardId, tgboardId) => {
    
    dispatch(sortCards(dragCardId, targetCardId, scBoardId, tgboardId))
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: dndTypes.CARD,
    drop: (item) => onDrop(item.id, card.id, item.from, tgboardId),
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


  if (isDragging) {
    style = dragStyle;
  } else if (isOver) {
    style = dropStyle;
  }

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
