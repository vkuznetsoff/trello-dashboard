import uniqid from "uniqid";
import { ADD_BOARD, ADD_ITEM, REMOVE_ITEM } from "./actionTypes";

const initState = [
  {
    id: "1",
    title: "Board-1",
    items: [
      {
        id: "1-1",
        text: "Task-1",
      },
      {
        id: "1-2",
        text: "Task-2",
      },
      {
        id: "1-3",
        text: "Task-3",
      },
    ],
  },
];

const boardReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return state.map((b) => {
        if (b.id === action.payload.boardId) {
          return {
            ...b,
            items: [
              ...b.items,
              { id: uniqid(), text: action.payload.text },
            ],
          };
        } else return { ...b };
      });

    case REMOVE_ITEM:
      const { cardId, boardId } = action.payload;
      return state.map((b) => {
        if (b.id === boardId) {
          return { ...b, items: b.items.filter((i) => i.id !== cardId) };
        } else return { ...b };
      });

      case ADD_BOARD:
      return [...state, {id: uniqid(), title: "New board", items: []}]

    default:
      return state;
  }
};

export default boardReducer;
