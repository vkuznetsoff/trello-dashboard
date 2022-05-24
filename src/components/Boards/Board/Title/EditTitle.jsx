import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeBoardTitle } from "../../../../redux/actions";

const EditTitle = ({ initialValue, setEditTitle, boardId }) => {
  const [tempTitle, setTempTitle] = useState(initialValue);
  const dispatch = useDispatch();

  const deactivateEditMode = (boardId) => {
    setEditTitle(false);
    dispatch(changeBoardTitle(tempTitle, boardId));
  };


  return (
    <div>
      <input
        value={tempTitle}
        type="text"
        autoFocus={true}
        onBlur={() => deactivateEditMode(boardId)}
        onChange={(e) => setTempTitle(e.target.value)}

      />
    </div>
  );
};

export default EditTitle;
