import styles from "./LoadFileButton.module.scss";

export const LoadFileButton = () => {
	return (
		<div className={styles.button_wrapper}>
			<svg
				className={styles.svg_large}
				width="27"
				height="28"
				viewBox="0 0 27 28"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M18.8354 12.6661L13.4991 18.0023M13.4991 18.0023L8.16291 12.6661M13.4991 18.0023V1.99512M25.5041 20.6687C25.5041 23.6158 23.115 26.0049 20.1679 26.0049H6.83036C3.88325 26.0049 1.49414 23.6158 1.49414 20.6687"
					stroke="#293244"
					strokeWidth="2.25"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
			<svg
				className={styles.svg_small}
				width="18"
				height="18"
				viewBox="0 0 18 18"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M12.5608 8.11396L9.00333 11.6714M9.00333 11.6714L5.44585 8.11396M9.00333 11.6714L9.00333 1M17.0067 13.4491C17.0067 15.4138 15.4139 17.0066 13.4492 17.0066H4.55748C2.59274 17.0066 1 15.4138 1 13.4491"
					stroke="#293244"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</div>
	);
};

export default LoadFileButton;
