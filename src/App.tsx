import './App.css';
import AppRouter from './components/AppRouter';
import LayoutContainer from './components/layouts/LayoutContainer';

function App() {
  return (
    <LayoutContainer>
      <AppRouter />
    </LayoutContainer>
  );
}

export default App;
