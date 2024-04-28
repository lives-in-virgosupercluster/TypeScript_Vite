import React from "react";
import styles from "./categorygraph.module.css";

export const CategoryGraph = ({ range, categoryName, category }) => {
  const dynamicClass = styles[categoryName];
  return (
    <div className={styles.container}>
      <div className={dynamicClass}>
        {category === categoryName ? (
          // Render content when category is "Healthy"
          <div className={styles.cursor}>
            {/* Your content for "Healthy" */}

            {/* Additional elements as needed */}
          </div>
        ) : (
          // Render an empty fragment for other categories
          <>{/* Nothing to render here */}</>
        )}
      </div>
      <div className={styles.heading}>{categoryName}</div>
      <div className={styles.range}>{range}</div>
    </div>
  );
};
