import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface TaskIdSlice {
	taskId: string;
}

const initialState: TaskIdSlice = {
	taskId: "",
};

export const TaskIdSlice = createSlice({
	name: "taskId",
	initialState,
	reducers: {
		setTaskId: (state, action: PayloadAction<string>) => {
			state.taskId = action.payload;
		},
	},
});

export const { setTaskId } = TaskIdSlice.actions;
export const selectTaskId = (state: RootState) => state.taskId.taskId;
export default TaskIdSlice.reducer;
