import "./Workspace.css";
import { useDispatch, useSelector } from "react-redux";
import Boards from "./Board/Boards";
import { addBoard } from "../redux/actions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Workspace = () => {
  const boards = useSelector((state) => state.boards);
  const dispatch = useDispatch();

  const addBoardHandle = () => {
    dispatch(addBoard());
  };

  return (
    <div className="workspace">
      <div className="content">
        <DndProvider backend={HTML5Backend}>
          <Boards boards={boards} />
        </DndProvider>
      </div>

      <div class="bottom">
        <button className="bottom__addboard" onClick={addBoardHandle}>
          + Add board
        </button>
      </div>
    </div>
  );
};

export default Workspace;
