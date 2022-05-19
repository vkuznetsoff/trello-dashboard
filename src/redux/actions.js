import {
  ADD_BOARD,
  ADD_ITEM,
  CHANGE_BOARD_TITLE,
  DROP_CARD,
  REMOVE_BOARD,
  REMOVE_ITEM,
} from "./actionTypes";

export const removeItem = (cardId, boardId) => {
  return {
    type: REMOVE_ITEM,
    payload: { cardId, boardId },
  };
};

export const addItem = (boardId, text) => {
  return {
    type: ADD_ITEM,
    payload: { boardId, text },
  };
};

export const addBoard = () => {
  return {
    type: ADD_BOARD,
  };
};

export const removeBoard = (id) => {
  return {
    type: REMOVE_BOARD,
    payload: id,
  };
};

export const changeBoardTitle = (title, id) => {
  return {
    type: CHANGE_BOARD_TITLE,
    payload: { title, id },
  };
};

export const dropCard = (itemId, sourceBoardId, targetBoardId, payload) => {
  return {
    type: DROP_CARD,
    payload: { itemId, sourceBoardId, targetBoardId, payload },
  };
};
