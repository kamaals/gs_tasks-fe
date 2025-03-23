import { configureStore } from "@reduxjs/toolkit";
import {taskApi} from "@/lib/store/api/taskService";

export const makeStore = () => {
    return configureStore({
        reducer: {
            [taskApi.reducerPath]: taskApi.reducer,
        },
        devTools: true,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                taskApi.middleware,
            ),
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
