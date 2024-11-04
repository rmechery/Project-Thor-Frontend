// pages/_app.js
import "../styles/main.scss"; // Adjust the path if needed to point to your SCSS file

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}