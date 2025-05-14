import React from 'react'
import ReactDOM from 'react-dom/client'
// import { Toaster } from 'react-hot-toast' // Remove this line
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <Toaster position="top-right" /> */}{/* Remove this line */}
    <App />
  </React.StrictMode>,
)
