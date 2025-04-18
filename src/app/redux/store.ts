import { combineReducers, configureStore } from "@reduxjs/toolkit";
import apiErrorReducer from "./slice/apiErrorSlice";
import loadingReducer from "./slice/loadingSlice";
import { baseApi } from "../apis/baseApi";

const rootReducer = combineReducers({
  apiError: apiErrorReducer,
  loading: loadingReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});
export type RootState = ReturnType<typeof rootReducer>;
const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(baseApi.middleware)
  });
};
const store = makeStore();
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export default store;