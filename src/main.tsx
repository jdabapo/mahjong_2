import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MantineProvider } from '@mantine/core'
import { Provider } from 'react-redux'
import store from './actions/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <Provider store={store}>
    <App />
    </Provider>
    </MantineProvider>
  </StrictMode>,
)
