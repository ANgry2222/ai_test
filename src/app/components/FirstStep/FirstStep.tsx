"use client";

import { useAppDispatch } from "@/app/store/hooks";
import { useState } from "react";
import { setCurrentStep } from "@/app/store/slices/currentStepSlice";
import { setTaskId } from "@/app/store/slices/taskIdSlice";
import styles from "./FirstStep.module.scss";
import FileRestrictionsBanner from "../FileRestrictionsBanner/FileRestrictionsBanner";
import CustomButton from "../CustomButton/CustomButton";
import LoadFileButton from "../LoadFileButton/LoadFileButton";

interface IImageForm {
	image1: File | null;
	image2: File | null;
	image3: File | null;
}

export const FirstStep = () => {
	const [imageFormValues, setImageFormValues] = useState<IImageForm>({
		image1: null,
		image2: null,
		image3: null,
	});
	const [isValid, setIsValid] = useState(false);
	const dispatch = useAppDispatch();

	const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const name = e.target.name;
		const value = e.target.files ? e.target.files[0] : null;
		const newValues = {
			...imageFormValues,
			[name]: value,
		};

		setIsValid(Object.values(newValues).every(Boolean));
		setImageFormValues(newValues);
	};

	const submitForm = async (event: React.FormEvent) => {
		event.preventDefault();
		const formData = new FormData();
		if (
			imageFormValues.image1 &&
			imageFormValues.image2 &&
			imageFormValues.image3
		) {
			formData.append("files", imageFormValues.image1);
			formData.append("files", imageFormValues.image2);
			formData.append("files", imageFormValues.image3);
		}

		console.log(formData);

		try {
			const response = await fetch(
				"https://sirius-draw-test-94500a1b4a2f.herokuapp.com/upload",
				{
					method: "POST",
					body: formData,
				}
			);

			console.log("123");

			if (!response.ok) {
				throw new Error(`Ошибка сервера: ${response.status}`);
			}
			dispatch(setCurrentStep(2));

			const result = await response.json();
			console.log("result: ", result);
			if (!result.task_id) {
				throw new Error("Сервер не вернул task_id");
			}

			console.log("Успешная отправка. Task ID:", result.task_id);
			dispatch(setTaskId(result.task_id));
		} catch {}
	};

	return (
		<div className={styles.step_container}>
			<p>Загрузите фотографии рисунков</p>
			<FileRestrictionsBanner />
			<form className={styles.form} id="imageForm">
				<div className={styles.image_load_container}>
					<p className={styles.image_load_text}>
						Дом, дерево, человек
					</p>
					<div
						style={
							imageFormValues.image1
								? {
										backgroundImage: `url(${URL.createObjectURL(
											imageFormValues.image1
										)})`,
								  }
								: {}
						}
						className={styles.input_wrapper}>
						<div className={styles.button_wrapper}>
							<LoadFileButton />
							<input
								className={styles.input}
								name="image1"
								type="file"
								accept=".jpg,.jpeg,.png,.pdf"
								onChange={handleFormChange}
								required
							/>
						</div>
					</div>
				</div>
				<div className={styles.image_load_container}>
					<p className={styles.image_load_text}>
						Несуществующее животное
					</p>
					<div
						style={
							imageFormValues.image2
								? {
										backgroundImage: `url(${URL.createObjectURL(
											imageFormValues.image2
										)})`,
								  }
								: {}
						}
						className={styles.input_wrapper}>
						<div className={styles.button_wrapper}>
							<LoadFileButton />
							<input
								className={styles.input}
								name="image2"
								type="file"
								accept=".jpg,.jpeg,.png,.pdf"
								onChange={handleFormChange}
								required
							/>
						</div>
					</div>
				</div>
				<div className={styles.image_load_container}>
					<p className={styles.image_load_text}>Автопортрет</p>
					<div
						style={
							imageFormValues.image3
								? {
										backgroundImage: `url(${URL.createObjectURL(
											imageFormValues.image3
										)})`,
								  }
								: {}
						}
						className={styles.input_wrapper}>
						<div className={styles.button_wrapper}>
							<LoadFileButton />
							<input
								className={styles.input}
								name="image3"
								type="file"
								accept=".jpg,.jpeg,.png,.pdf"
								onChange={handleFormChange}
								required
							/>
						</div>
					</div>
				</div>
			</form>
			<div className={styles.container_footer}>
				<p className={styles.current_step_label}>Шаг 1/3</p>
				<CustomButton
					text="Далее"
					disabled={!isValid}
					onSubmitClick={(e: React.FormEvent) => submitForm(e)}
				/>
			</div>
		</div>
	);
};

export default FirstStep;
