import FormulaCategory from "../../components/formulaCategory/FormulaCategory";
import { useEffect, useState } from "react";

import axios from "axios";

const CreateFormulaCategoryPage = () => {
  const [categs, setCategs] = useState([]);
  useEffect(() => {
    async function getCategories() {
      const categories = await axios
        .get("/api/categories2")
        .then((res) => res.data);
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

