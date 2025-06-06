import styles from "./FileRestrictionsBanner.module.scss";

export const FileRestrictionsBanner = () => {
	return (
		<div className={styles.banner}>
			<svg
				width="14"
				height="14"
				viewBox="0 0 14 14"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M7 1V1C10.314 1 13 3.686 13 7V7C13 10.314 10.314 13 7 13V13C3.686 13 1 10.314 1 7V7C1 3.686 3.686 1 7 1Z"
					stroke="#E12828"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M6.99935 7.33333V4"
					stroke="#E12828"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M6.99868 9.66667C6.90668 9.66667 6.83202 9.74133 6.83268 9.83333C6.83268 9.92533 6.90735 10 6.99935 10C7.09135 10 7.16602 9.92533 7.16602 9.83333C7.16602 9.74133 7.09135 9.66667 6.99868 9.66667"
					stroke="#E12828"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
			<p>
				Допустимые форматы файлов: jpg, jpeg, png, pdf. Размер не более
				5 Мб
			</p>
		</div>
	);
};

export default FileRestrictionsBanner;
