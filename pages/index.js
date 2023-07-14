import { useSession } from "next-auth/react";
import CategorySection from "../components/home/landing/CategorySection";
import HeroContent from "../components/home/landing/HeroContent";
import OurStory from "../components/home/landing/OurStory";

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
    <main>
      <HeroContent />
      <CategorySection categories={categories} />
      <OurStory />
    </main>
  );
}

