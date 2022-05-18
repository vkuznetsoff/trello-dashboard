import "./Card.css"
import remove2 from "..//../../assets/images/remove2.svg";
import { useDispatch } from "react-redux";
import { removeItem } from "../../../redux/actions";

const Card = ({card, boardId}) => {
    const dispatch = useDispatch()
    
    const removeHandle = (cardId, boardId) => {
        dispatch(removeItem(cardId, boardId))
      };

    return (
        <div className="card" draggable="true">
            <div className="card__text">{card.text}</div>
            <div className="card__removebtn" onClick={() => removeHandle(card.id, boardId)}>
                <img src={remove2} />
            </div>
        </div>

    )
}

export default Card
