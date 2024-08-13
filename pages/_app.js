import GlobalStyle from "../styles";
import Layout from "@/components/Layout/Layout";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <GlobalStyle />
      <Component {...pageProps} />
    </Layout>
  );
}
