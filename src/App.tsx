import { Provider } from 'react-redux';
// import '@/styles/App.scss';
import AppRouter from './components/AppRouter';
import LayoutContainer from './components/layouts/LayoutContainer';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <LayoutContainer>
        <AppRouter />
      </LayoutContainer>
    </Provider>
  );
}

export default App;
