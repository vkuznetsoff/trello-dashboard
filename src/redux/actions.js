import { ADD_BOARD, ADD_ITEM, REMOVE_ITEM } from "./actionTypes"

export const removeItem = (cardId, boardId) => {
    return {
        type: REMOVE_ITEM,
        payload: {cardId, boardId}
    }
}

export const addItem = (boardId, text) => {
    return {
        type: ADD_ITEM,
        payload: {boardId, text}
    }
}

export const addBoard = () => {
    return {
        type: ADD_BOARD
    }
}