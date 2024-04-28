import React from "react";
import styles from "./chart.module.css";
import { CategoryGraph } from "../components/CategoryGraph/CategoryGraph";

const WeightChart = ({ bmiValue, height, lower, upper, category }) => {
  return (
    <div className={styles.chartcont}>
      <h3 className={styles.para1}>
        Your Body Mass Index(BMI) is{" "}
        <span className={styles.text}>{bmiValue}</span>
      </h3>
      <h3 className={styles.para2}>
        According to your height your weight is in the
      </h3>
      <h3 className={styles.para3}>
        <span className={styles.text}>{category}</span> Category
      </h3>

      <div className={styles.container}>
        <CategoryGraph
          range={"(Under 18)"}
          categoryName="UnderWeight"
          category={category}
        ></CategoryGraph>
        <CategoryGraph
          range={"(18.5-24.9)"}
          categoryName="Healthy"
          category={category}
        ></CategoryGraph>
        <CategoryGraph
          range={"(25.0-29.9)"}
          categoryName="OverWeight"
          category={category}
        ></CategoryGraph>
        <CategoryGraph
          range={"(30.0 & above)"}
          categoryName="Obese"
          category={category}
        ></CategoryGraph>
      </div>
      <h3 className={styles.para4}>
        Your Weight should be between <span className={styles.textweight}>{lower} & {upper}</span>kilograms
      </h3>
    </div>
  );
};

export default WeightChart;
