import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import './app/css/app.css';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
  <QueryClientProvider client={new QueryClient()}>
    <App />
  </QueryClientProvider>
);
