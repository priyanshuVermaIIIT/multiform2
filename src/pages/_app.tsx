import { Provider } from 'react-redux';
import { store } from '../redux/store';  
import '../styles/globals.css';
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />

function MyApp({ Component, pageProps }: any) {
  return (
    <Provider store={store}>  {/* Wrap the app with Redux Provider */}
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;