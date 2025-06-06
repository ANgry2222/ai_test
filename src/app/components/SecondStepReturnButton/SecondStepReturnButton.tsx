import styles from "./SecondStepReturnButton.module.scss";

export interface ISecondStepReturnButtonProps {
	onClick: () => void;
}

export const SecondStepReturnButton = (props: ISecondStepReturnButtonProps) => {
	return (
		<button onClick={props.onClick} className={styles.button}>
			<svg
				width="7"
				height="12"
				viewBox="0 0 7 12"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M6 1L1 6L6 11"
					stroke="#293244"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
			К загрузке рисунков
		</button>
	);
};

export default SecondStepReturnButton;
