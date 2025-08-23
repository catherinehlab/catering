import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  console.log('MyApp 컴포넌트가 렌더링되었습니다');
  return <Component {...pageProps} />;
}

export default MyApp;
