import styles from "./SurveyInfoBlock.module.scss";
import thumbUp from "../../../../public/thumb_up.svg";
import flag from "../../../../public/flag.svg";
import Image from "next/image";

export const SurveyInfoBlock = () => {
	return (
		<div className={styles.info_block}>
			<div className={styles.info_block__row}>
				<Image
					alt="Thumb up image"
					src={thumbUp.src}
					width={thumbUp.width}
					height={thumbUp.height}
				/>
				<p className={styles.info_text}>
					Пожалуйста, внимательно прочитайте каждый вопрос и выберите
					наиболее подходящий вариант ответа, отражающий поведение и
					эмоциональное состояние вашего ребенка в течение последних
					2-4 недель. Отвечайте максимально честно и искренне, так как
					от этого зависит точность оценки психоэмоционального
					развития Вашего ребенка.
				</p>
			</div>
			<div className={styles.info_block__row}>
				<Image
					alt="Green flag image"
					src={flag.src}
					width={flag.width}
					height={flag.height}
				/>
				<p className={styles.info_text}>
					Все вопросы обязательны к заполнению
				</p>
			</div>
		</div>
	);
};

export default SurveyInfoBlock;
