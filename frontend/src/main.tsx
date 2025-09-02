import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import OrdersProvider from './contexts/orders.tsx'
import DateProvider from './contexts/date.tsx'
import TransactionsProvider from './contexts/transactions.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DateProvider>
      <OrdersProvider>
        <TransactionsProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </TransactionsProvider>
      </OrdersProvider>
    </DateProvider>
  </StrictMode>
)