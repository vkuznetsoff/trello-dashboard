import "./Boards.css";

import Board from "./Board";

const Boards = ({ boards }) => {

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
