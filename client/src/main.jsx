import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import "@fontsource/inter"; 
import "@fontsource/inter/400.css"; 
import "@fontsource/inter/400-italic.css";
import UserState from './context/UserContext/UserState.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductState from './context/ProductContext/ProductState.jsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>

    <UserState>
    <ProductState>
    <App />
    </ProductState>
    </UserState>
    <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  </StrictMode>,
)
