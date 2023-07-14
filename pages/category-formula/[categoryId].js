import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import CreateFormula from "../../components/createFormula/CreateFormula";

const CreateFormulaPage = () => {
  const [category, setCategory] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const router = useRouter();
  console.log(router.query)
  const { categoryId } = router.query;

  useEffect(() => {
    async function fetchData() {
      try {
        const [categoryResponse, ingredientsResponse] = await Promise.all([
          axios.get(`/api/categories2?categoryId=${categoryId}`),
          axios.get(`/api/products2?categoryId=${categoryId}`)
        ]);

        setCategory(categoryResponse.data);
        setIngredients(ingredientsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    if (categoryId) {
      fetchData();
    }
  }, [categoryId]);

  return (
    <Fragment>
      {category && ingredients.length > 0 && (
        <CreateFormula categoryData={category} ingredientData={ingredients} />
      )}
    </Fragment>
  );
};

export default CreateFormulaPage;
