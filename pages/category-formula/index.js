import FormulaCategory from "../../components/formulaCategory/FormulaCategory";
import { ReactNode, useEffect, useState } from "react";

import { Category } from "../../models/Category";
import { Product } from "../../models/Product";
import { mongooseConnect } from "../../lib/mongoose";
import axios from "axios";

const CreateFormulaCategoryPage = () => {
  const [categs, setCategs] = useState([]);
  useEffect(() => {
    async function getCategories() {
      const categories = await axios
        .get("/api/categories2")
        .then((res) => res.data);
      console.log("====================================");
      console.log(categories);
      setCategs(categories);
    }
    getCategories();
  }, []);

  return (
    <div>
      {categs && (
        <FormulaCategory
          categories={categs}
        />
      )}
    </div>
  );
};

export default CreateFormulaCategoryPage;

