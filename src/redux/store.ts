import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { filtersReducer } from "./slices/filtersReducer.ts";
import {userReducer} from "./slices/userReducer.ts";
import {themeReducer} from "./slices/themeReducer.ts";
import { useDispatch, useSelector } from "react-redux";
import { postsReducer } from "./slices/postsReducer.ts";

const persistedState = localStorage.getItem("socialNetwork")
  ? JSON.parse(localStorage.getItem("socialNetwork") as string)
  : {};
//  JSON.pars - ожидает аргумент типа string, localStorage.getItem - возвращает string или null  и поэтому нужно типизировать localStorage.getItem - "as string"

// получение сохраненного состояния (все хранилище redux), если состояние было сохранено, то оно парсится и записывается, иначе записывается пустой объект

const rootReducer = combineReducers({
  posts: postsReducer,
  filters: filtersReducer,
  user: userReducer,
  theme: themeReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
  // preloadedState - отвечает за предзагруженное состояние (загрузится до основного)
});

store.subscribe(() => {
  localStorage.setItem("socialNetwork", JSON.stringify(store.getState()));
});

export type AppDispatch = typeof store.dispatch; // - дефолтная запись для store
export type RootState = ReturnType<typeof store.getState>; // - дефолтная запись для store
export const useAppDispatch = useDispatch.withTypes<AppDispatch>(); // - дефолтная запись для store
export const useAppSelector = useSelector.withTypes<RootState>(); // - дефолтная запись для store

// подписываем (метод subscribe, как onClick, но срабатывае на каждое изменение) состояние на событие, чтобы при каждом его изменении оно записывалось в localStorage
