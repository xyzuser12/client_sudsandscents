import classes from "../../styles/formulaCategory/FormulaCategory.module.css";
import FormulaCategoryList from "./FormulaCategoryList";

const FormulaCategory = ({ ingredients, categories }) => {
  console.log(ingredients);
  console.log(categories);
  return (
    <div className={classes.container}>
      <h2 className={classes.subtitle}>
        Design Your Routine, Craft Your Perfect Blend
      </h2>
      <FormulaCategoryList ingredients={ingredients} categories={categories} />
    </div>
  );
};

export default FormulaCategory;
