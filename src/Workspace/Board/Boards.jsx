import "./Boards.css";

import Board from "./Board";
import { useState } from "react";

const Boards = ({ boards }) => {
  const [currentBoard, setCurrentBoard] = useState();
  
  return (
    <>
      {boards.map(b => (
        <Board key={b.id} board={b} />
      ))
      }
    </>
  );
};

export default Boards;
