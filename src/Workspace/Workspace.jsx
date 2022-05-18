import "./Workspace.css";
import { useDispatch, useSelector } from "react-redux";
import Boards from "./Board/Boards";
import { addBoard } from "../redux/actions";

const Workspace = () => {
  const boards = useSelector((state) => state.boards);
  const dispatch = useDispatch()

  const addBoardHandle = () => {
    dispatch(addBoard())
  }

  return (
    <div className="workspace">

      <div className="content">
        <Boards boards={boards} />
      </div>

      <div class="bottom">
        <button className="bottom__addboard" onClick={addBoardHandle}>+ Add board</button>
      </div>

    </div>
  );
};

export default Workspace;
