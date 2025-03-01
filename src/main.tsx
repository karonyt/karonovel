import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <head>
      <title>KaroNovel</title>
    </head>
    <App />
  </StrictMode>
);
