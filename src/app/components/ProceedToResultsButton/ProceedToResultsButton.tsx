import styles from "./ProceedToResultsButton.module.scss";

export interface IProceedToResultsButtonProps {
	isDisabled: boolean;
	onClick: () => void;
}

export const ProceedToResultsButton = (props: IProceedToResultsButtonProps) => {
	return (
		<button
			onClick={props.onClick}
			disabled={props.isDisabled}
			className={styles.button}>
			Узнать результаты
			<svg
				width="14"
				height="12"
				viewBox="0 0 14 12"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M8.5 10L12.5 6L8.5 2M1.5 11L6.5 6L1.5 1"
					stroke={!props.isDisabled ? "white" : "#969EAF"}
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</button>
	);
};

export default ProceedToResultsButton;
