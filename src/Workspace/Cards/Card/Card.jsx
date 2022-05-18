import "./Card.css"
import remove2 from "..//../../assets/images/remove2.svg";

const Card = () => {

    const removeHandle = () => {
        return;
      };
    return (
        <div className="card" draggable="true">
            <div className="card__text">Card_1</div>
            <div className="card__removebtn" onClick={removeHandle}>
                <img src={remove2} />
            </div>
        </div>

    )
}

export default Card
