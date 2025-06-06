import styles from "./LoadingSpinner.module.scss";

export const LoadingSpinner = () => {
	return (
		<div className={styles.loading_indicator__wrapper}>
			<div className={styles.indicator_spinner}></div>
		</div>
	);
};

export default LoadingSpinner;
