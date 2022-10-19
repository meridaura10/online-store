import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import { store } from './store';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import './styles/reset.scss'
// import { writeDatabase } from './firebase';






// writeDatabase({
//   name: 'Компютер ARTLINE Gaming X47 (X47v45)',
//   img: 'https://content.rozetka.com.ua/goods/images/big/282627154.jpg',
//   price : '37 999₴',
//   category: {
//     LaptopsAndComputers: true,
//     all: true
//   }
// })






const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
