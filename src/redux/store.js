import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./boards_reducer";

export const store = configureStore({
    reducer: {
        boards: boardReducer
    },
    devTools: process.env.NODE_ENV !== 'production',
})
