"use client";

import FirstStep from "./components/FirstStep/FirstStep";
import SecondStep from "./components/SecondStep/SecondStep";
import ThirdStep from "./components/ThirdStep/ThirdStep";
import WelcomeScreen from "./components/WelcomeScreen/WelcomeScreen";
import { useAppSelector } from "./store/hooks";

export default function Home() {
	const testStep = useAppSelector((state) => state.currentStep.currentStep);

	switch (testStep) {
		case 0:
			return <WelcomeScreen />;
		case 1:
			return <FirstStep />;
		case 2:
			return <SecondStep />;
		case 3:
			return <ThirdStep />;
		default:
			return null;
	}
}
