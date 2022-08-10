import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { batchedSubscribe } from "redux-batched-subscribe";
import _ from "lodash";

import { userAPI } from "../services/UserService";
import auth from "./reducers/authReducer";
import hints from "./reducers/hintsReducer";
import input from "./reducers/inputReducer";
import user from "./reducers/usersReducer";
import button from "./reducers/buttonReducer";
import chessBoard from "./reducers/chessReducer";

const rootReducer = combineReducers({
    user,
    auth,
    input,
    hints,
    button,
    chessBoard,
    [userAPI.reducerPath]: userAPI.reducer,
});

const debounceNotify = _.debounce(notify => notify());

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(userAPI.middleware),
        enhancers: [batchedSubscribe(debounceNotify)],
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
