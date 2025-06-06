import styles from "./DownloadButton.module.scss";

export interface IDownloadButtonProps {
	text: string;
	onClick: () => void;
}

export const DownloadButton = (props: IDownloadButtonProps) => {
	return (
		<button onClick={props.onClick} className={styles.button}>
			{props.text}
		</button>
	);
};

export default DownloadButton;
