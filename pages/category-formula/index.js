import FormulaCategory from "../../components/formulaCategory/FormulaCategory";
import { ReactNode } from "react";

import { Category } from "../../models/Category";
import { Product } from "../../models/Product";
import { mongooseConnect } from "../../lib/mongoose";

const CreateFormulaCategoryPage = ({ categories, ingredients }) => {
  return <FormulaCategory ingredients={ingredients} categories={categories} />;
};

export default CreateFormulaCategoryPage;

export async function getServerSideProps() {
  await mongooseConnect();
  const category = await Category.find();
  const ingredient = await Product.find();

  return {
    props: {
      categories: JSON.parse(JSON.stringify(category)),
      ingredients: JSON.parse(JSON.stringify(ingredient)),
    },
  };
}
