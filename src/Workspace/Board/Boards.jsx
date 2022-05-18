import "./Boards.css";

import Board from "./Board";

const Boards = ({ boards }) => {

  return (
    <>
      {boards.map(b => (
        <Board board={b} />
      ))
      }
    </>
  );
};

export default Boards;
