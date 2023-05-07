import Footer from "../components/home/Footer/Footer";
import MainNavigation from "../components/home/MainNavigation/MainNavigation";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";

const Layout = ({ children }) => {
  const [userSessionData, setUserSessionData] = useState();
  const { pathname } = useRouter();
  const session = useSession();
  useEffect(() => {
    if (session) {
      setUserSessionData(session);
    }
  }, [session]);

  console.log(userSessionData);
  return (
    <Fragment>
      <MainNavigation
        userSession={userSessionData}
        styleMode={pathname === "/" ? "light" : "dark"}
        backgroundSColorAcc={
          pathname === "/login" || pathname === "/signup"
            ? "background-white"
            : "transparent"
        }
      />
      {children}
      <Footer />
    </Fragment>
  );
};

export default Layout;
