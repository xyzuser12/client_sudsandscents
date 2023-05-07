import FormulaCategory from "../../components/formulaCategory/FormulaCategory";
import { ReactNode } from "react";

import { Category } from "../../models/Category";
import { Product } from "../../models/Product";
import { mongooseConnect } from "../../lib/mongoose";

// import { useQuery } from "@tanstack/react-query";

// import FethcCategories from "../../api/FetchCategories";

// const DUMMY_CATEGORY = [
//   {
//     id: "custom-perfume",
//     category: "Custom Perfume",
//     classification: "Cosmetics",
//     categoryImage: {
//       categoryImageSmall: "/assets/images/products/perfume-small.png",
//       categoryImageLarge: "/assets/images/products/Perfume.png",
//     },
//   },
//   {
//     id: "custom-facial-wash",
//     category: "Custom Facial Wash",
//     classification: "Hygiene",
//     categoryImage: {
//       categoryImageSmall: "/assets/images/products/Facial-wash.png",
//       categoryImageLarge: "/assets/images/products/Facial-wash.png",
//     },
//   },
//   {
//     id: "custom-lotion",
//     category: "Custom lotion",
//     classification: "Cosmetics",
//     categoryImage: {
//       categoryImageSmall: "/assets/images/products/Lotion.png",
//       categoryImageLarge: "/assets/images/products/Lotion.png",
//     },
//   },
//   {
//     id: "custom-shampoo",
//     category: "Custom Shampoo",
//     classification: "Hygiene",
//     categoryImage: {
//       categoryImageSmall: "/assets/images/products/Shampoo.png",
//       categoryImageLarge: "/assets/images/products/Shampoo.png",
//     },
//   },
//   {
//     id: "custom-soap",
//     category: "Custom Soap",
//     classification: "Hygiene",
//     categoryImage: {
//       categoryImageSmall: "/assets/images/products/Soap.png",
//       categoryImageLarge: "/assets/images/products/Soap.png",
//     },
//   },
// ];

// type CreateFormulaCategoryPageProps = {
//   categoryData: ICategory[];
//   children?: ReactNode;
// };

const CreateFormulaCategoryPage = ({ categories, ingredients }) => {
  // const categoryQuery = useQuery({
  //   queryKey: ["category"],
  //   queryFn: FethcCategories,
  // });

  console.log(ingredients);
  console.log(categories);
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
