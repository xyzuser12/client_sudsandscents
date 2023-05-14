import { useSession, signIn } from "next-auth/react";

import LogIn from "../../components/account/LogIn";

const LogInPage = () => {
  const session = useSession();
  console.log(session);
  return <LogIn />;
};

export default LogInPage;
