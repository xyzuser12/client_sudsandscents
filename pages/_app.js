import { createGlobalStyle } from "styled-components";
import { CartContextProvider } from "@/components/CartContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import Layout from "../templates/Layout";
const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
  body{
    background-color: #eee;
    padding:0;
    margin:0;
    font-family: 'Poppins', sans-serif;
  }
`;

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: "#DE89A1",
    },
    secondary: {
      main: "#3b82f6",
    },
  },
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      {/* <GlobalStyles />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider> */}
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <CartContextProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </CartContextProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}
