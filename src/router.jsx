import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import Add from './pages/add.jsx'
import View from './pages/view.jsx'
import ErrorPage from './pages/error.jsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />
    },
    {
        path: "/add",
        element: <Add />,
        errorElement: <ErrorPage />
    },
    {
        path: "/view",
        element: <View />,
        errorElement: <ErrorPage />
    }
])

export default router
