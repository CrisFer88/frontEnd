import { BrowserRouter } from "react-router-dom";
import AppRouter from './router/AppRouter';

function App() {
  return (
   < div className='container__app'>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
   </ div >
  );
}

export default App;
