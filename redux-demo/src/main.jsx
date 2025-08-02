import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './redux-dem/store/store.jsx'
import {Provider} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store = {store}>
    <App />
    </Provider>
  </StrictMode>,
)
