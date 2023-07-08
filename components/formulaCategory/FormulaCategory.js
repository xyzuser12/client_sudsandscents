import classes from "../../styles/formulaCategory/FormulaCategory.module.css";
import FormulaCategoryList from "./FormulaCategoryList";

const FormulaCategory = ({ categories }) => {
  return (
    <div className={classes.container}>
      <h2 className={classes.subtitle}>
        Design Your Routine, Craft Your Perfect Blend
      </h2>
      <FormulaCategoryList categories={categories} />
    </div>
  );
};

export default FormulaCategory;
