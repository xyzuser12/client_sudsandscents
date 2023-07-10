// import CreateFormula from "../../components/createFormula/CreateFormula";
import { Fragment, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import CreateFormula from "../../components/createFormula/CreateFormula";
const ingredientsArr = [
  {
    category: "64466196be70cd3d8b62bd4b",
    composition: "2nd Scents",
    createdAt: "2023-04-24T10:12:21.072Z",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tristique ultrices quam a pellentesque. Proin semper metus non lectus convallis, eget sagittis libero mollis. Suspendisse sed lorem nisl.",
    image:
      "https://res.cloudinary.com/dkppw65bv/image/upload/v1682331136/jojoba_bpyuui.png",
    price: 30,
    quantity: 20,
    title: "Jojoba",
  },
  {
    category: "6446553cbe70cd3d8b62bd0f",
    composition: "Carrier Oils",
    createdAt: "2023-04-24T11:06:45.705Z",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tristique ultrices quam a pellentesque. Proin semper metus non lectus convallis, eget sagittis libero mollis. Suspendisse sed lorem nisl.",
    image:
      "https://res.cloudinary.com/dkppw65bv/image/upload/v1682334401/Frankincense_sgpmuj.png",
    price: 42,
    quantity: 11,
    title: "Sweet Almond",
  },
  {
    category: "6446553cbe70cd3d8b62bd0f",
    composition: "Carrier Oils",
    createdAt: "2023-04-24T11:07:54.134Z",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tristique ultrices quam a pellentesque. Proin semper metus non lectus convallis, eget sagittis libero mollis. Suspendisse sed lorem nisl.",
    image:
      "https://res.cloudinary.com/dkppw65bv/image/upload/v1682334470/coconut_zafspz.png",
    price: 29,
    quantity: 34,
    title: "Coconut",
  },
  {
    category: "6446553cbe70cd3d8b62bd0f",
    composition: "Carrier Oils",
    createdAt: "2023-04-24T11:09:20.670Z",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tristique ultrices quam a pellentesque. Proin semper metus non lectus convallis, eget sagittis libero mollis. Suspendisse sed lorem nisl.",
    image:
      "https://res.cloudinary.com/dkppw65bv/image/upload/v1682334556/grapeseed_yissgc.png",
    price: 65,
    quantity: 4,
    title: "Grapeseed",
  },
];
const categId = "644653bbbe70cd3d8b62bd0c";

const parentCateg = {
  image:
    "https://res.cloudinary.com/dkppw65bv/image/upload/v1681367352/Perfume_xe5qhi.png",
  name: "Custom Perfume",
  _id: "644653bbbe70cd3d8b62bd0c",
};

const transformsubcateg = [
  { category: "Oil-based", categoryId: "6446553cbe70cd3d8b62bd0f" },
  { category: "Floral", categoryId: "64465be6be70cd3d8b62bd3b" },
];

const subcategData = [
  {
    composition: ["Carrier Oils", "Essential Oils", "Fixatives"],
    id: "6446553cbe70cd3d8b62bd0f",
    name: "Oil-based",
    parent: "Custom Perfume",
    parentId: "644653bbbe70cd3d8b62bd0c",
  },
  {
    composition: [
      "Essential Oils",
      "Citrus Oils",
      "Woods and Musks",
      "Spices",
      "Synthetic ingredients",
    ],
    id: "64465be6be70cd3d8b62bd3b",
    name: "Floral",
    parent: "Custom Perfume",
    parentId: "644653bbbe70cd3d8b62bd0c",
  },
];

const ingreDataArr = [
  {
    category: "Oil-based",
    categoryId: "6446553cbe70cd3d8b62bd0f",
    composition: "Carrier Oils",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tristique ultrices quam a pellentesque. Proin semper metus non lectus convallis, eget sagittis libero mollis. Suspendisse sed lorem nisl.",
    id: "644662c5be70cd3d8b62bd73",
    image:
      "https://res.cloudinary.com/dkppw65bv/image/upload/v1682334401/Frankincense_sgpmuj.png",
    price: 42,
    quantity: 11,
    title: "Sweet Almond",
  },
  {
    category: "Oil-based",
    categoryId: "6446553cbe70cd3d8b62bd0f",
    composition: "Carrier Oils",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tristique ultrices quam a pellentesque. Proin semper metus non lectus convallis, eget sagittis libero mollis. Suspendisse sed lorem nisl.",
    id: "6446630abe70cd3d8b62bd7f",
    image:
      "https://res.cloudinary.com/dkppw65bv/image/upload/v1682334470/coconut_zafspz.png",
    price: 29,
    quantity: 34,
    title: "Coconut",
  },
  {
    category: "Floral",
    categoryId: "64465be6be70cd3d8b62bd3b",
    composition: "Essential Oils",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    id: "645354f2ef19e3b71076cecb",
    image:
      "https://res.cloudinary.com/dkppw65bv/image/upload/v1683182831/cedarwood_zuynog.webp",
    price: 123,
    quantity: 234,
    title: "Rose",
  },
  {
    category: "Floral",
    categoryId: "64465be6be70cd3d8b62bd3b",
    composition: "Essential Oils",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    id: "64535584ef19e3b71076ced7",
    image:
      "https://res.cloudinary.com/dkppw65bv/image/upload/v1683182976/jasmine_qfdcu6.jpg",
    price: 41,
    quantity: 654,
    title: "Jasmine",
  },
];
// console.log(transformData(ingreDataArr));

const eme = [
  {
    categoryId: "6446553cbe70cd3d8b62bd0f",
    category: "Oil-based",
    ingredients_row: [
      {
        composition: "Carrier Oils",
        options: [
          {
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tristique ultrices quam a pellentesque. Proin semper metus non lectus convallis, eget sagittis libero mollis. Suspendisse sed lorem nisl.",
            id: "644662c5be70cd3d8b62bd73",
            image:
              "https://res.cloudinary.com/dkppw65bv/image/upload/v1682334401/Frankincense_sgpmuj.png",
            price: 42,
            quantity: 11,
            title: "Sweet Almond",
          },
          {
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tristique ultrices quam a pellentesque. Proin semper metus non lectus convallis, eget sagittis libero mollis. Suspendisse sed lorem nisl.",
            id: "6446630abe70cd3d8b62bd7f",
            image:
              "https://res.cloudinary.com/dkppw65bv/image/upload/v1682334470/coconut_zafspz.png",
            price: 29,
            quantity: 34,
            title: "Coconut",
          },
        ],
      },
      {
        composition: "Essential Oils",
        options: [
          {
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tristique ultrices quam a pellentesque. Proin semper metus non lectus convallis, eget sagittis libero mollis. Suspendisse sed lorem nisl.",
            id: "64466a11be70cd3d8b62bdbe",
            image:
              "https://res.cloudinary.com/dkppw65bv/image/upload/v1682336269/lavender_d5xnd5.png",
            price: 56,
            quantity: 23,
            title: "Lavender",
          },
          {
            description:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            id: "64536084ef19e3b71076cf4d",
            image:
              "https://res.cloudinary.com/dkppw65bv/image/upload/v1683185792/musk_bf5yqt.webp",
            price: 12,
            quantity: 12,
            title: "Musk",
          },
        ],
      },
    ],
  },
  {
    categoryId: "64465be6be70cd3d8b62bd3b",
    category: "Floral",
    ingredients_row: [
      {
        composition: "Essential Oils",
        options: [
          {
            description:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            id: "645354f2ef19e3b71076cecb",
            image:
              "https://res.cloudinary.com/dkppw65bv/image/upload/v1683182831/cedarwood_zuynog.webp",
            price: 123,
            quantity: 234,
            title: "Rose",
          },
          {
            description:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            id: "64535584ef19e3b71076ced7",
            image:
              "https://res.cloudinary.com/dkppw65bv/image/upload/v1683182976/jasmine_qfdcu6.jpg",
            price: 41,
            quantity: 654,
            title: "Jasmine",
          },
        ],
      },
      {
        composition: "Citrus Oils",
        options: [
          {
            description:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            id: "6453561def19e3b71076ceef",
            image:
              "https://res.cloudinary.com/dkppw65bv/image/upload/v1683183129/vanilla_j3an9z.jpg",
            price: 23,
            quantity: 987,
            title: "Bergamot",
          },
          {
            description:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            id: "64535667ef19e3b71076cf0c",
            image:
              "https://res.cloudinary.com/dkppw65bv/image/upload/v1683183204/orange_gaxp5a.webp",
            price: 23,
            quantity: 56,
            title: "Lemon",
          },
        ],
      },
    ],
  },
];

const CreateFormulaPage = () => {
  const [categoryData, setCategoryData] = useState();
  const [category, setCategory] = useState();
  const [subCateg, setSubCateg] = useState([]);

  const [optionsSubCateg, setOptionsSubCateg] = useState([]);

  const [ingredients, setIngredients] = useState([]);
  const [ingredientsBySubcateg, setIngredientsBySubcateg] = useState([]);
  const [transformedCategoryData, setTransformedCategoryData] = useState({});
  const [transformedIngreDataBySubcateg, setTransformedIngreDataBySubcateg] =
    useState([]);
  const [ingre, setIngre] = useState([]);

  const router = useRouter();
  const param = router.query;
  console.log(param);

  // const transformCategoryDataMemoized = useCallback(
  //   (categData, transformSubcateg) => {
  //     return transformCategoryData(categData, transformSubcateg);
  //   },
  //   []
  // );

  // useEffect(() => {
  //   axios.get("/api/categories").then((result) => {
  //     const categories = result.data;
  //     const subCategories = getSubCategories(categories);
  //     setSubCateg(subCategories);
  //     const categoryData = getCategoryData(param.categoryId, categories);
  //     setCategoryData(categoryData);
  //     const uniqueSubcategory = getUniqueSubcategoriesMemoized(
  //       param.categoryId,
  //       subCategories
  //     );
  //     setOptionsSubCateg(uniqueSubcategory);
  //   });
  // }, [param.categoryId, getUniqueSubcategoriesMemoized]);
  useEffect(() => {
    async function getProducts() {
      const ingredients = await axios
        .get("/api/products2?categoryId=" + param.categoryId)
        .then((res) => res.data);

      setIngredients(ingredients);
    }
    getProducts();
  }, []);
  useEffect(() => {
    async function getCategories() {
      const categories = await axios
        .get("/api/categories2?categoryId=" + param.categoryId)
        .then((res) => res.data);
      setCategory(categories);
    }
    getCategories();
  }, []);
  console.log("=================================");
  console.log(category);
  console.log(ingredients);

  // useEffect(() => {
  //   axios.get("/api/products").then((result) => {
  //     const ingredients = result.data;
  //     setIngredients(ingredients);
  //     const ingreBySubCateg = getIngredientsBySubcategory(
  //       ingredients,
  //       optionsSubCateg
  //     );
  //     setIngredientsBySubcateg(ingreBySubCateg);
  //   });
  // }, [optionsSubCateg]);

  // useEffect(() => {
  //   const transformSubcateg = transformData(ingredientsBySubcateg);
  //   setTransformedIngreDataBySubcateg(transformSubcateg);
  // }, [ingredientsBySubcateg]);

  // useEffect(() => {
  //   const transformCategory = transformCategoryDataMemoized(
  //     categoryData,
  //     transformedIngreDataBySubcateg
  //   );
  //   setTransformedCategoryData(transformCategory);
  // }, [
  //   transformedIngreDataBySubcateg,
  //   transformCategoryDataMemoized,
  //   categoryData,
  // ]);

  // const getCategoryData = (categoryId, categories) => {
  //   const categData = categories.find((cat) => {
  //     // console.log(cat);
  //     // console.log(categoryId);
  //     return categoryId === cat._id;
  //   });
  //   return categData;
  // };

  // function getSubCategories(categ) {
  //   // console.log(categ);
  //   const subCategories = [];
  //   if (categ) {
  //     categ.forEach((category) => {
  //       if (category.parent) {
  //         const parentCategory = category.parent.name;
  //         const parentCategoryId = category.parent._id;
  //         const parentCategoryProperties = category.properties;

  //         subCategories.push({
  //           id: category._id,
  //           name: category.name,
  //           parent: parentCategory,
  //           parentId: parentCategoryId,
  //           composition: parentCategoryProperties,
  //         });
  //       }
  //     });
  //   }

  //   return subCategories;
  // }
  // function getUniqueSubcategories(categoryId, subcategories) {
  //   // console.log(categoryId);
  //   // console.log(subcategories);
  //   const subcategoriesWithParentId = subcategories.map((subcat) => {
  //     return {
  //       id: subcat.id,
  //       name: subcat.name,
  //       parent: subcat.parent,
  //       parentId: subcat.parentId,
  //       composition: subcat.composition,
  //     };
  //   });

  //   const subcategoriesForCategory = subcategoriesWithParentId.filter(
  //     (subcat) => {
  //       return subcat.parentId == categoryId;
  //     }
  //   );

  //   return subcategoriesForCategory;
  // }
  // function getIngredientsBySubcategory(ingredientsArr, subcategData) {
  //   return ingredientsArr
  //     .filter((ingredient) => {
  //       const subcateg = subcategData.find(
  //         (subcateg) => subcateg.id === ingredient.category
  //       );
  //       // console.log(subcateg);
  //       return subcateg;
  //     })
  //     .map((ingredient) => {
  //       const subcateg = subcategData.find(
  //         (subcateg) => subcateg.id === ingredient.category
  //       );
  //       return {
  //         id: ingredient._id,
  //         categoryId: subcateg.id,
  //         category: subcateg.name,
  //         composition: ingredient.composition,
  //         description: ingredient.description,
  //         image: ingredient.image,
  //         price: ingredient.price,
  //         quantity: ingredient.quantity,
  //         title: ingredient.title,
  //       };
  //     });
  // }
  // function transformData(ingreDataArr) {
  //   // console.log(ingreDataArr);
  //   const uniqueCategories = Array.from(
  //     new Set(ingreDataArr.map((item) => item.categoryId))
  //   ).map((categoryId) => {
  //     const categoryItems = ingreDataArr.filter(
  //       (item) => item.categoryId === categoryId
  //     );
  //     const uniqueCompositions = Array.from(
  //       new Set(categoryItems.map((item) => item.composition))
  //     ).map((composition) => {
  //       const compositionItems = categoryItems.filter(
  //         (item) => item.composition === composition
  //       );
  //       const options = compositionItems.map(
  //         ({ description, id, image, price, quantity, title }) => ({
  //           description,
  //           id,
  //           image,
  //           price,
  //           quantity,
  //           title,
  //         })
  //       );
  //       return { composition, options };
  //     });
  //     const { category } = categoryItems[0];
  //     return { categoryId, category, ingredients_row: uniqueCompositions };
  //   });
  //   return uniqueCategories;
  // }

  // function transformCategoryData(parentCateg, transformsubcateg) {
  //   const subcategories = transformsubcateg.map((subcateg) => {
  //     return {
  //       category: subcateg.category,
  //       categoryId: subcateg.categoryId,
  //     };
  //   });

  //   const transformedData = {
  //     image: parentCateg?.image,
  //     name: parentCateg?.name,
  //     id: parentCateg?._id,
  //     subcategories: subcategories,
  //   };

  //   return transformedData;
  // }
  return (
    <Fragment>
      {category && ingredients && (
        <CreateFormula categoryData={category} ingredientData={ingredients} />
      )}
    </Fragment>
  );
};

export default CreateFormulaPage;
