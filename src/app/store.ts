import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.ts";
import { documentsApi } from "../features/documents/documentsApi.ts";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [documentsApi.reducerPath]: documentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(documentsApi.middleware),
});

// Типы для будущего использования в наших хуках
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
