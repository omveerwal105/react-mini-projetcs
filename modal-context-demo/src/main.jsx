import App from './App';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ModalProvider } from './context/ModalContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ModalProvider>
    <App />
    </ModalProvider>
  </StrictMode>,
)
