import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import OrdersProvider from './contexts/orders.tsx'
import DateProvider from './contexts/date.tsx'
import TransactionsProvider from './contexts/transactions.tsx'
import { CustomersProvider } from './contexts/customers.tsx'
import './index.css'
import App from './App.tsx'
import { TasksProvider } from './contexts/tasks.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DateProvider>
      <CustomersProvider>
        <TasksProvider>
          <OrdersProvider>
            <TransactionsProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </TransactionsProvider>
          </OrdersProvider>
        </TasksProvider>
      </CustomersProvider>
    </DateProvider>
  </StrictMode>
)