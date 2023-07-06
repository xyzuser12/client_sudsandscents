import Header from "@/components/Header";
import Featured from "@/components/Featured";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import { mongooseConnect } from "@/lib/mongoose";
import NewProducts from "@/components/NewProducts";
import { useSession } from "next-auth/react";
import CategorySection from "../components/home/landing/CategorySection";
import HeroContent from "../components/home/landing/HeroContent";
import OurStory from "../components/home/landing/OurStory";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HomePage({ categories, newProducts }) {
  // console.log(categories);
  const { data: session } = useSession();

  // useEffect(() => {
  //   async function getUser() {
  //     await axios.get("/api/users2").then((res) => {
  //       console.log(res.data);
  //     });
  //   }
  //   getUser();
  // }, []);
  // const [temp, setTemp] = useState([{}]);

  // useEffect(() => {
  //   fetch("http://localhost:5000/members")
  //     .then((res) => {
  //       // console.log(res);
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log(`⭕ ${JSON.stringify(data)}`);
  //       setTemp(data);
  //     });
  // }, []);
  console.log(session);
  return (
    // <div>
    //    <Header />
    //   <Featured product={categories} />
    //    <NewProducts products={newProducts} />
    // </div>

    <main>
      <HeroContent />
      <CategorySection categories={categories} />
      <OurStory />
    </main>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const category = await Category.find();

  return {
    props: {
      categories: JSON.parse(JSON.stringify(category)),
    },
  };
}
