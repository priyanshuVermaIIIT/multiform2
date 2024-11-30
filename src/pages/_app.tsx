import { Provider } from 'react-redux';
import { store } from '../redux/store';  
import '../styles/globals.css';

function MyApp({ Component, pageProps }: any) {
  return (
    <Provider store={store}>  {/* Wrap the app with Redux Provider */}
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;