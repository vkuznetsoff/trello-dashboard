import "./Workspace.css";
import { useSelector } from "react-redux";
import Boards from "./Board/Boards";

const Workspace = () => {
    const boards = useSelector(state => state.boards)
    

   return (
    <div className="workspace">
      <div className="content">
        <Boards boards={boards} />
      </div>
    </div>
  );
};

export default Workspace;
