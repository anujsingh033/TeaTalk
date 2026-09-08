import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import AuthContext from './context/AuthContext.jsx';
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux"
import { store } from './redux/store.js';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <AuthContext>
        <App />
      </AuthContext>
    </Provider>
    <ToastContainer />
  </BrowserRouter>

)
