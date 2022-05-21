import uniqid from "uniqid";
import {
  ADD_BOARD,
  ADD_ITEM,
  CHANGE_BOARD_TITLE,
  DROP_CARD,
  REMOVE_BOARD,
  REMOVE_ITEM,
  SORT_CARDS,
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
          return b;
        } else if (b.id === sourceBoardId) {
          return { ...b, items: b.items.filter((i) => i.id !== itemId) };
        } else if (b.id === targetBoardId) {
          return {
            ...b,
            items: [...b.items, { id: uniqid(), text: payload }],
          };
        } else return b;
      });

    //   const dropIndex = board.items.indexOf(item);
    // board.items.splice(dropIndex + 1, 0, currentItem);

    // const removeIndex = currentBoard.items.indexOf(currentItem)
    // currentBoard.items.splice(removeIndex, 1)

    case SORT_CARDS:
      const { sourceCard, targetCard, scBoardId, tgBoardId } = action.payload
      const board1 = state.find(b => b.id === scBoardId)
      const board2 = state.find(b => b.id === tgBoardId)
      
      const item1 = board1.items.find(item => item.id === sourceCard.id)
      const removeIndex = board1.items.indexOf(item1)
      
      const item2 = board2.items.find(item => item.id === targetCard.id)
      const dropIndex = board2.items.indexOf(item2);
      // debugger
      
   return state.map(b => {
     if (b.id === targetBoardId) {
       debugger
       return {...b, items: b.items.splice(dropIndex + 1, 0, sourceCard) }
     } else if (b.id === scBoardId) {
      debugger
       return {...b, items: b.items.splice(removeIndex, 1)}
     } else return b
   })

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
