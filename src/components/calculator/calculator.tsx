

import styles from "./calculator.module.css";
import { useState } from "react";
import WeightChart from "../chart/chart.js";
import { useForm } from "react-hook-form";
import Select from "../Select/select.js";
interface formValues{
  agecategory:string,
  unit:string,
  gender:string,
  weightUnit:string
}

export const Calculator:React.FC= () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<formValues>({
    defaultValues: {
      agecategory: "adult",
      unit: "feet",
      gender: "male",

      weightUnit: "kilograms",
    },
  });
  const watchAge = watch("agecategory");
  const watchUnit = watch("unit");
  const [bmivalue, setBmiValue] = useState<number | null>();
  // const [finalweight, setfinalWeight] = useState<number | undefined>();
  const [finalheight, setfinalHeight] = useState<number | null>();
  const [lowerweight, setlowerWeight] = useState<number | null>();
  const [upperWeight, setUpperWeight] = useState<number | null>();
  const [category, setcategory] = useState();
  const options = [
    { label: "Adult (20+)", value: "adult" },
    { label: "Child (5-19)", value: "child" },
  ];
  // const customStyle = {
  //   // width: '100px',
  //   color:'blue',
    

  //   // Add more styles as needed
  // };
  const onSubmit = async (data) => {
    // const queryParams = new URLSearchParams({
    //   weight: data.weight,
    //   heightfeet: data.heightfeet,
    //   heightinch: data.heightinch,
    //   heightcm: data.heightcm,
    //   unit: data.unit,

    //   weightUnit: data.weightUnit,
    // });

    // const response = await fetch(`/api/calculate-bmi?${queryParams}`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    // if (response.ok) {
    //   const data = await response.json();
    //   console.log(data);
    //   setBmiValue(data.bmi);

    //   setfinalHeight(data.height);

    //   setfinalWeight(data.weight);
    //   setlowerWeight(data.lower);
    //   setUpperWeight(data.upper);
    //   setcategory(data.category);
    // }
    let finweight = 0;
    let finheight = 0;
    const weightUnit=data.weightUnit;
    const weight=data.weigth;
    if (weightUnit === 'pounds') {
      finweight = 0.453592 * parseFloat(weight);
    } else if (weightUnit === 'kilograms') {
      finweight = parseFloat(weight);
    }

  

    if (unit === 'feet') {
      finheight = heightfeet * 0.3048;
      finheight += heightinch * 0.0254;
    } else if (unit === 'cm') {
      finheight =heightcm * 0.01;
    }

    let bmivalue = finweight / (finheight * finheight);
    let category;
    let upper;
    let lower;

    if (bmivalue < 18.5) {
      category = "UnderWeight";
    } else if (bmivalue >= 18.5 && bmivalue <= 24.9) {
      category = "Healthy";
    } else if (bmivalue >= 24.9 && bmivalue <= 29.9) {
      category = "OverWeight";
    } else if (bmivalue > 29.9) {
      category = "Obese";
    }

    lower = 18.5 * (finheight) * (finheight);
    upper = 24.9 * (finheight) * (finheight);
    lower = lower.toFixed(0);
    upper = upper.toFixed(0);

   
  };

  return (
    <div className={styles.chartcalc}>
      <div className ={styles.calctemp}>
      <div className={styles.container}>
        <label className={`${styles.label} ${styles.inputdivs} `}>
          <p className={styles.bottomspace}> Select</p>
          
          <Select options={options} register={register("agecategory")} isstyle={false} ></Select>
        </label>

        {watchAge === "child" && (
          <div className={styles.inputdivs1}>
            <label className={styles.label}>Age</label>
            <div className={styles.inputcontainer}>
              <input
              
                className={`${styles.input} ${styles.inputsmall}`}
                {...register("year", { required: true, min: 5, max: 19 })}
              />

              <div className={styles.fakeYear}>months</div>
              {errors.year && errors.year.type === "required" && (
                <span className={styles.errorYear}>This field is required</span>
              )}
              {errors.year && errors.year.type === "min" && (
                <span className={styles.errorYear}>year should be above 4</span>
              )}
              {errors.year && errors.year.type === "max" && (
                <span className={styles.errorYear}>
                  year should be below 20
                </span>
              )}
              <input
               
                className={`${styles.input} ${styles.inputsmall}`}
                {...register("month", { required: true, min: 0, max: 12 })}
              />

              <div className={styles.fakeMonth}>years</div>
              {errors.month && errors.month.type === "required" && (
                <span className={styles.errorMonth}>
                  This field is required
                </span>
              )}
              {errors.month && errors.month.type === "min" && (
                <span className={styles.errorMonth}>
                  month should not be negative
                </span>
              )}
              {errors.month && errors.month.type === "max" && (
                <span className={styles.errorMonth}>
                  month should be below 13
                </span>
              )}
            </div>
          </div>
        )}

        <label className={styles.label}>
          <p className={styles.bottomspace}>Height</p>
        </label>
        <div className={`${styles.radiocontainer} ${styles.inputdivs}`}>
          <div className={styles.radalign}>
            <input
              type="radio"
              value="feet"
            
              className={`${styles.radinput} ${styles.radiobutton}`}
              {...register("unit", { required: true })}
            />

            <p className={styles.para}> Feet & Inches</p>
          </div>
          <div className={styles.radalign}>
            <input
              type="radio"
              value="cm"
             
              className={`${styles.radinput} ${styles.radiobutton}`}
              {...register("unit", { required: true })}
            />
            <p className={styles.para}> Centimeters</p>
          </div>
        </div>
        {watchUnit === "feet" && (
          <div className={`${styles.inputcontainer} ${styles.inputdivs}`}>
            <input
             
              className={`${styles.input} ${styles.inputsmall}`}
              {...register("heightfeet", { required: true, min: 5, max: 6 })}
            />
            <div className={styles.fakeft}>ft</div>
            {errors.heightfeet && errors.heightfeet.type === "required" && (
              <span className={styles.errorFeet}>This field is required</span>
            )}
            {errors.heightfeet && errors.heightfeet.type === "min" && (
              <span className={styles.errorFeet}>should be more than 4</span>
            )}
            {errors.heightfeet && errors.heightfeet.type === "max" && (
              <span className={styles.errorFeet}>should be less than 7</span>
            )}
            <input
            

              {...register("heightinch", { required: true, min: 0, max: 11 })}
              className={`${styles.input} ${styles.inputsmall}`}
            />
            <div className={styles.fakein}>in</div>
            {errors.heightinch && errors.heightinch.type === "required" && (
              <span className={styles.errorInch}>This field is required</span>
            )}
            {errors.heightinch && errors.heightinch.type === "min" && (
              <span className={styles.errorInch}>should not be negative</span>
            )}
            {errors.heightinch && errors.heightinch.type === "max" && (
              <span className={styles.errorInch}>should be less than 12</span>
            )}
          </div>
        )}
        {watchUnit === "cm" && (
          <div className={`${styles.inputcontainer} ${styles.inputdivs}`}>
            <input
              
              {...register("heightcm", { required: true, min: 120, max: 200 })}
              className={`${styles.input} ${styles.inputbig}`}
            />
            {errors.heightcm && errors.heightcm.type === "required" && (
              <span className={styles.error}>This field is required</span>
            )}
            {errors.heightcm && errors.heightcm.type === "min" && (
              <span className={styles.error}>should be more than 119</span>
            )}
            {errors.heightcm && errors.heightcm.type === "max" && (
              <span className={styles.error}>should be less than 201</span>
            )}
          </div>
        )}
        <div className={styles.weightcont}>
          <label className={styles.label}>
            <p className={styles.bottomspace}> Weight</p>
          </label>
          <div className={`${styles.radiocontainer} ${styles.inputdivs}`}>
            <div className={styles.radalign}>
              <input
                type="radio"
                value="kilograms"
             
                className={`${styles.radinput} ${styles.radiobutton}`}
                {...register("weightUnit", { required: true })}
              />

              <p className={styles.para}>Kilograms</p>
            </div>
            <div className={styles.radalign}>
              <input
                type="radio"
                value="pounds"
               
                className={`${styles.radinput} ${styles.radiobutton}`}
                {...register("weightUnit", { required: true })}
              />
              <p className={styles.para}> Pounds</p>
            </div>
          </div>
        </div>
        <div className={styles.weightcontainer}>
          <input
            
            className={`${styles.input} ${styles.inputbig}`}
            {...register("weight", { required: true, min: 50, max: 100 })}
          />
          {errors.weight && errors.weight.type === "required" && (
            <span className={styles.errorWeight}>This field is required</span>
          )}
          {errors.weight && errors.weight.type === "min" && (
            <span className={styles.errorWeight}>
              should not be less than 50
            </span>
          )}
          {errors.weight && errors.weight.type === "max" && (
            <span className={styles.errorWeight}>
              should not be more than 100
            </span>
          )}
        </div>
        <div className={styles.inputdivs}>
          <label className={`${styles.label} ${styles.gender}`}>
            <p className={styles.bottomspace}>Gender:</p>
            <div className={styles.gendercontainer}>
              <div className={styles.radalign}>
                <input
                  type="radio"
                  value="male"
                
                  className={styles.radiobutton}
                  {...register("gender", { required: true })}
                />
                <p className={styles.para}>Male</p>
              </div>
              <div className={styles.radalign}>
                <input
                  type="radio"
                  value="female"
                
                  className={styles.radiobutton}
                  {...register("gender", { required: true })}
                />
                <p className={styles.para}> Female</p>
              </div>
            </div>
          </label>
        </div>
        <button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          className={styles.btn}
        >
          Calculate
        </button>
      </div>
      </div>
      <div className={styles.chart}>
        {bmivalue ? (
          <WeightChart
            bmiValue={bmivalue}
            height={finalheight}
            lower={lowerweight}
            upper={upperWeight}
            category={category}
          />
        ) : (
          <div className={styles.textdiv}>
            <p className={styles.text}>
              Use this calculator to check your body mass index(BMI)
            </p>
            <p className={styles.text}>
              which can be a helpful tool in determining your weight{" "}
            </p>
            <p className={styles.text}>
              category. Or,you use it to calculate your child's BMI
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
