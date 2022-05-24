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
    title: "Новая доска",
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
      console.log('drop_card')
      const { itemId, sourceBoardId, targetBoardId, text } = action.payload;
       state.map((b) => {
        if (sourceBoardId === targetBoardId) {
          return b;
        } else if (b.id === sourceBoardId) {
          return { ...b, items: b.items.filter((i) => i.id !== itemId) };
        } else if (b.id === targetBoardId) {
          return {
            ...b,
            items: [...b.items, { id: uniqid(), text }],
          };
        } else return b;
      });

    case SORT_CARDS:
      console.log('drop_card')
      const {sourceCardId, targetCardId, scBoardId, tgBoardId} = action.payload;
      
      // // sourceCardId, targetCardId, scBoardId, tgBoardId
      // console.log("s_before: ", state)
      // const board1 = state.find((b) => b.id === action.scBoardId);
      // const board2 = state.find((b) => b.id === action.tgBoardId);
      // console.log("b1: ", board1)
      // console.log("b2: ", board2)
      // console.log("s: ", state)

      // const newCard = board1.items.find((i) => i.id === action.sourceCardId)

      // const removeIndex = board1.items.findIndex(i => i.id === action.sourceCardId)
      // const dropIndex = board2.items.findIndex(i => i.id === action.targetCardId);

      // // board1.items.splice(removeIndex, 1);

      // // board2.items.splice(dropIndex, 0, newCard);

      // const newState = state.map((b) => {
      //   if (b.id === action.tgBoardId) {
      //     return {...b, items: b.items.splice(dropIndex, 0, newCard)};
      //   } else if (b.id === action.scBoardId) {
      //     return {...b, items: b.items.splice(removeIndex, 1)};
      //   } else {
      //     return b;
      //   }
      // });
      
      const board1 = state.find((b) => b.id === scBoardId);
      const board2 = state.find((b) => b.id === tgBoardId);
      const newCard = board1.items.find((i) => i.id === sourceCardId)

      const removeIndex = board1.items.findIndex(i => i.id === sourceCardId)
      const dropIndex = board2.items.findIndex(i => i.id === targetCardId);

      board1.items.splice(removeIndex, 1);

      board2.items.splice(dropIndex, 0, newCard);

      const newState = state.map((b) => {
        if (b.id === tgBoardId) {
          return board2;
        } else if (b.id === scBoardId) {
          return board1;
        } else {
          return b;
        }
      });

      return newState;

    case ADD_BOARD:
      return [...state, { id: uniqid(), title: "Новая доска", items: [] }];

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
