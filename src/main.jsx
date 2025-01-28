import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ContextProvider from './context/Context.jsx'
import CourseProvider from './context/CourseProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <CourseProvider>
        <App />
      </CourseProvider>
    </ContextProvider>
  </StrictMode>
)
