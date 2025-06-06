import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface CurrentStepSlice {
	currentStep: number;
}

const initialState: CurrentStepSlice = {
	currentStep: 0,
};

export const CurrentStepSlice = createSlice({
	name: "currentStep",
	initialState,
	reducers: {
		setCurrentStep: (state, action: PayloadAction<number>) => {
			state.currentStep = action.payload;
		},
	},
});

export const { setCurrentStep } = CurrentStepSlice.actions;
export const selectCurrentStep = (state: RootState) =>
	state.currentStep.currentStep;
export default CurrentStepSlice.reducer;
