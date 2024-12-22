import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { RootLayout } from './root-layout.tsx'
import { store } from './store/store.ts'
import './assets/styles/main.scss'
import { AppThemeProvider } from './providers/theme_context_provider.tsx'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppThemeProvider>
    <Provider store={store}>
      <Router>
        <RootLayout />
      </Router>
    </Provider>
  </AppThemeProvider>
)
