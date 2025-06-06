import SurveyData from "../../../../public/survey.json";
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setCurrentStep } from "@/app/store/slices/currentStepSlice";
import styles from "./SecondStep.module.scss";
import SurveyInfoBlock from "../SurveyInfoBlock/SurveyInfoBlock";
import SecondStepReturnButton from "../SecondStepReturnButton/SecondStepReturnButton";
import ProceedToResultsButton from "../ProceedToResultsButton/ProceedToResultsButton";

interface IQuestion {
	name: string;
	question_text: string;
	question_type: string;
	answer_options?: Array<{ label: string; value: string | number }>;
}

export const SecondStep = () => {
	const formRef = useRef<HTMLFormElement>(null);
	const [isFormValid, setIsFormValid] = useState(false);
	const taskId = useAppSelector((state) => state.taskId.taskId);
	const dispatch = useAppDispatch();

	const predefinedKeys = [
		"childName",
		"childDOB",
		"childGender",
		"parentName",
		"emotionalState",

		...Array.from({ length: 4 }, (_, section) =>
			Array.from(
				{ length: 10 },
				(_, question) => `q${section + 1}_${question + 1}`
			)
		).flat(),
	];

	const checkFormValidity = () => {
		if (!formRef.current) return;
		console.log(formRef.current.checkValidity());
		setIsFormValid(formRef.current.checkValidity());
	};

	useEffect(() => {
		const form = formRef.current;
		if (!form) return;

		form.addEventListener("input", checkFormValidity);
		return () => form.removeEventListener("input", checkFormValidity);
	}, []);

	function renderQuestionInput(question: IQuestion) {
		switch (question.question_type) {
			case "radio":
				return (
					<div className={styles.radio_question}>
						{question.answer_options?.map((answerOption, index) => (
							<label
								className={styles.radio_label}
								key={`${question.name}_${index}`}>
								<input
									className={styles.radio_input}
									type="radio"
									value={answerOption.value}
									name={question.name}
									required
								/>
								<svg
									className={styles.checkbox_svg}
									width="18"
									height="18"
									viewBox="0 0 18 18">
									<circle
										cx="9"
										cy="9"
										r="8"
										className={styles.radio_outer}
									/>
									<circle
										className={styles.radio_inner}
										cx="9"
										cy="9"
										r="3.3"
									/>
								</svg>
								{answerOption.label}
							</label>
						))}
					</div>
				);
			case "textarea":
				return (
					<div className={styles.textarea_wrapper}>
						<textarea
							rows={4}
							className={styles.textarea}
							name={question.name}
							required
						/>
					</div>
				);
			case "textline":
				return (
					<input
						className={styles.single_line_input}
						name={question.name}
						type="text"
						required
					/>
				);
			case "datepicker":
				return (
					<input
						className={styles.input_date}
						name={question.name}
						type="date"
						required
					/>
				);
			default:
				return null;
		}
	}

	const onSubmitButtonClick = () => {
		(
			document.getElementById("survey_form") as HTMLFormElement
		).requestSubmit();
	};

	const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		console.log("1234");
		event.preventDefault();

		if (formRef.current) {
			const formData = new FormData(formRef.current);
			predefinedKeys.forEach((key) => {
				if (!formData.has(key)) formData.append(key, "");
			});
			console.log(JSON.stringify(Object.fromEntries(formData)));

			const requestBody = {
				task_id: taskId,
				survey: Object.fromEntries([...formData]),
			};

			try {
				const response = await fetch(
					"https://sirius-draw-test-94500a1b4a2f.herokuapp.com/submit-survey",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(requestBody),
					}
				);

				if (!response.ok) {
					throw new Error(`Ошибка сервера: ${response.status}`);
				} else {
					dispatch(setCurrentStep(3));
				}

				const result = await response.json();
				console.log("result: ", result);
				if (!result.task_id) {
					throw new Error("Сервер не вернул task_id");
				}
			} catch {}
		} else {
			console.log("form ref is null");
		}
	};

	return (
		<div className={styles.step_container}>
			<form
				className={styles.form}
				ref={formRef}
				name="survey_form"
				id="survey_form"
				onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
					onFormSubmit(event);
				}}>
				{SurveyData.survey.map((item, index) => (
					<div key={item.name}>
						<h1 className={styles.section_header}>
							{item.header_text}
						</h1>
						{item.questions.map((question: IQuestion) => (
							<div
								className={styles.question}
								key={question.name}>
								<p>{question.question_text}</p>
								{renderQuestionInput(question)}
							</div>
						))}
						{index == 0 ? <SurveyInfoBlock /> : null}
					</div>
				))}
			</form>
			<div className={styles.footer}>
				<p className={styles.step_text}>Шаг 2/3</p>
				<div className={styles.footer__nav_section}>
					<SecondStepReturnButton
						onClick={() => dispatch(setCurrentStep(1))}
					/>
					<ProceedToResultsButton
						onClick={onSubmitButtonClick}
						isDisabled={!isFormValid}
					/>
				</div>
				<p className={styles.step_text_small}>Шаг 2/3</p>
			</div>
		</div>
	);
};

export default SecondStep;
