import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import OrdersProvider from './contexts/orders.tsx'
import DateProvider from './contexts/date.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DateProvider>
      <OrdersProvider>
        <App />
      </OrdersProvider>
    </DateProvider>
  </StrictMode>,
)