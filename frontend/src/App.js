import './App.css';
import Products from './products/products';
import WebFont from 'webfontloader';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Poppins", "Tiro Tamil"]
      }
    });
  }, []);
  return (
    <div className="App">
      <Products />
    </div>
  );
}

export default App;
