import styles from "./CustomButton.module.scss";

export interface ICustomButtonProps {
	text: string;
	onClick?: () => void;
	disabled?: boolean;
	onSubmitClick?: (e: React.FormEvent) => void;
}

export const CustomButton = (props: ICustomButtonProps) => {
	return (
		<button
			disabled={props.disabled || false}
			onClick={props.onClick || props.onSubmitClick}
			className={styles.button}>
			{props.text}
			<svg
				width="16"
				height="12"
				viewBox="0 0 16 12"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M15 6L1 6M15 6L10 11M15 6L10 1"
					stroke={
						!props.disabled ? "white" : "rgba(68, 83, 113, 0.5)"
					}
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</button>
	);
};

export default CustomButton;
