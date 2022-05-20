import uniqid from "uniqid";
import {
  ADD_BOARD,
  ADD_ITEM,
  CHANGE_BOARD_TITLE,
  DROP_CARD,
  REMOVE_BOARD,
  REMOVE_ITEM,
} from "./actionTypes";

const initState = [
  {
    id: "b1",
    title: "Название",
    items: [],
  },
];

const boardReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return state.map((b) => {
        if (b.id === action.payload.boardId) {
          return {
            ...b,
            items: [...b.items, { id: uniqid(), text: action.payload.text }],
          };
        } else return b;
      });

    case REMOVE_ITEM:
      const { cardId, boardId } = action.payload;
      return state.map((b) => {
        if (b.id === boardId) {
          return { ...b, items: b.items.filter((i) => i.id !== cardId) };
        } else return b;
      });

    case DROP_CARD:
      const { itemId, sourceBoardId, targetBoardId, payload } = action.payload;
      return state.map((b) => {
        if (sourceBoardId === targetBoardId) {
          debugger
          return b;
        } else if (b.id === sourceBoardId) {
          debugger
          return { ...b, items: b.items.filter((i) => i.id !== itemId) };
        } else if (b.id === targetBoardId) {
          debugger
          return {
            ...b,
            items: [...b.items, { id: uniqid(), text: payload }],
          };
        } else return b;
    
      });

    case ADD_BOARD:
      return [...state, { id: uniqid(), title: "New board", items: [] }];

    case REMOVE_BOARD:
      return state.filter((b) => b.id !== action.payload);

    case CHANGE_BOARD_TITLE:
      return state.map((b) => {
        if (b.id === action.payload.id) {
          return { ...b, title: action.payload.title };
        } else return b;
      });

    default:
      return state;
  }
};

export default boardReducer;
