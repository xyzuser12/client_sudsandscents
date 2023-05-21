import Header from "@/components/Header";
import Featured from "@/components/Featured";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import { mongooseConnect } from "@/components/lib/mongoose";
import NewProducts from "@/components/NewProducts";
import { useSession } from "next-auth/react";
import CategorySection from "../components/home/landing/CategorySection";
import HeroContent from "../components/home/landing/HeroContent";
import OurStory from "../components/home/landing/OurStory";
import { useQuery } from "@tanstack/react-query";

export default function HomePage({ categories, newProducts }) {
  console.log(categories);
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
