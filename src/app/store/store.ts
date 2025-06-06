import { combineReducers, configureStore } from "@reduxjs/toolkit";
import currentStepReducer from "./slices/currentStepSlice";
import taskIdReducer from "./slices/taskIdSlice";

const rootReducer = combineReducers({
	currentStep: currentStepReducer,
	taskId: taskIdReducer,
});

const store = configureStore({
	reducer: rootReducer,
	preloadedState: {
		currentStep: { currentStep: 0 },
		taskId: { taskId: "" },
	},
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
