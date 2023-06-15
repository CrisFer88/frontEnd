
import { useLocation } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import { useEffect } from 'react';

function App() {

  const location = useLocation();

  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("lastPath", location.pathname);
    });

    return () => {
      window.removeEventListener("beforeunload", () => {
        localStorage.setItem("lastPath", location.pathname);
      });
    };
  }, [location]);

  return (
   < div className='container__app'>
        
      <AppRouter />
   </ div >
  );
}

export default App;
