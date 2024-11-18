import styles from "./app.module.css";
import data from "./data.json";
import { useState } from "react";

export const App = () => {
	const [steps, setSteps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	const goToBack = () => {
		setActiveIndex(activeIndex - 1);
	};

	const goToNext = () => {
		setActiveIndex(activeIndex + 1);
	};

	const goToStart = () => {
		setActiveIndex(0);
	};

	const isFirstStep = activeIndex === 0;
	const isLastStep = activeIndex === steps.length - 1;

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles["steps-content"]}>{steps[activeIndex].content}</div>
					<ul className={styles["steps-list"]}>
						{steps.map((step, index) => {
							const numbericId = parseInt(step.id, 10);

							const classNames = [
								styles["steps-item"],
								index === activeIndex ? styles.active : "",
								index < activeIndex ? styles.done : "",
							]
								.join(" ")
								.trim();

							return (
								<li key={step.id} className={classNames}>
									<button
										className={styles["steps-item-button"]}
										onClick={() => {
											setActiveIndex(index);
										}}
									>
										{numbericId}
									</button>
									{step.title}
								</li>
							);
						})}
					</ul>
					<div className={styles["buttons-container"]}>
						<button className={styles.button} disabled={isFirstStep} onClick={goToBack}>
							Назад
						</button>
						<button className={styles.button} onClick={!isLastStep ? goToNext : goToStart}>
							{!isLastStep ? "Далее" : "Начать сначала"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
