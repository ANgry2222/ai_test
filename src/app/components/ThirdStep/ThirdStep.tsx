import { useAppSelector } from "@/app/store/hooks";
import { useEffect, useRef, useState } from "react";
import styles from "./ThirdStep.module.scss";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import DownloadButton from "../DownloadButton/DownloadButton";

//"https://sirius-draw-test-94500a1b4a2f.herokuapp.com/report/8265c881-b5b1-4123-8196-64ece107a8e9"

export const ThirdStep = () => {
	const taskId = useAppSelector((state) => state.taskId.taskId);
	const [responseText, setResponseText] =
		useState<string>("ожидание статуса");
	const [lastUpdated, setLastUpdated] = useState<string>("ещё не обновлено");
	const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
	const pdfUrlRef = useRef<string | null>(null);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		function startPolling() {
			intervalRef.current = setInterval(() => {
				fetch(
					`https://sirius-draw-test-94500a1b4a2f.herokuapp.com/report/${taskId}`
				)
					.then((response) => {
						console.log(response);
						console.log(response.headers.get("content-type"));

						if (
							response.headers.get("content-type") ===
							"application/json"
						) {
							return response.json();
						} else {
							setResponseText("Результат готов");
							return response.blob();
						}
					})
					.then((result) => {
						if (!(result instanceof Blob)) {
							console.log("Данные:", result.status);
							setResponseText(result.status);
						} else {
							setPdfBlob(result);
							pdfUrlRef.current = URL.createObjectURL(result);
							setResponseText(" результат готов");
							if (intervalRef.current) {
								clearInterval(intervalRef.current);
							}
						}
						setLastUpdated(new Date().toLocaleTimeString());
					})
					.catch((error) => console.error("Ошибка:", error));
			}, 10000);
		}

		startPolling();
		return () => {
			if (pdfUrlRef.current) {
				URL.revokeObjectURL(pdfUrlRef.current);
			}
		};
	}, [taskId]);

	const openInNewTab = () => {
		if (pdfUrlRef.current) {
			window.open(pdfUrlRef.current, "_blank");
		}
	};

	const downloadPdf = () => {
		if (pdfBlob && pdfUrlRef.current) {
			const a = document.createElement("a");
			a.href = pdfUrlRef.current;
			a.download = "results.pdf";
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		}
	};

	const onCheckout = () => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}
		fetch(
			"https://sirius-draw-test-94500a1b4a2f.herokuapp.com/report/8265c881-b5b1-4123-8196-64ece107a8e9"
		)
			.then((response) => {
				setResponseText(" результат готов");
				return response.blob();
			})
			.then((result) => {
				setPdfBlob(result);
				pdfUrlRef.current = URL.createObjectURL(result);
				setResponseText(" результат готов");
				if (intervalRef.current) {
					clearInterval(intervalRef.current);
				}
			})
			.catch((error) => console.error("Ошибка:", error));
	};

	return (
		<div className={styles.step_container}>
			<button onClick={onCheckout}>Отладка</button>
			<h1>Данные отправлены. Пожалуйста, дождитесь ответа</h1>
			<p>Текущий статус: {responseText}</p>
			{pdfUrlRef && pdfBlob ? (
				<div className={styles.buttons_container}>
					<DownloadButton onClick={openInNewTab} text="Просмотреть" />
					<DownloadButton onClick={downloadPdf} text="Скачать" />
				</div>
			) : (
				<div>
					{lastUpdated === "ещё не обновлено" ? null : (
						<p>Обновлено в {lastUpdated}</p>
					)}

					<LoadingSpinner />
				</div>
			)}
		</div>
	);
};

export default ThirdStep;
