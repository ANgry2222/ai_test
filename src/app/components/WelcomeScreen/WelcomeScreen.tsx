import { useAppDispatch } from "@/app/store/hooks";
import { setCurrentStep } from "@/app/store/slices/currentStepSlice";
import styles from "./WelcomeScreen.module.scss";
import CustomButton from "../CustomButton/CustomButton";

export const WelcomeScreen = () => {
	const dispatch = useAppDispatch();
	return (
		<div className={styles.welcome_container}>
			<h1>Добрый день!</h1>
			<p>
				Вы собираетесь пройти тест &laquo;ИИ-психодиагностика для Вашего
				ребёнка&raquo;
			</p>
			<CustomButton
				onClick={() => dispatch(setCurrentStep(1))}
				text="Пройти тест"
			/>
		</div>
	);
};

export default WelcomeScreen;
