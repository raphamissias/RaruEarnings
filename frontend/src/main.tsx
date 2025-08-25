import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import OrdersProvider from './contexts/orders.tsx'
import DateProvider from './contexts/date.tsx'
import TransactionsProvider from './contexts/transactions.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DateProvider>
      <OrdersProvider>
        <TransactionsProvider>
          <App />
        </TransactionsProvider>
      </OrdersProvider>
    </DateProvider>
  </StrictMode>,
)