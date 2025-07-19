import DashboardPage from "./components/DashboardPage"
import StockAdminPage from "./components/StockManagementPage"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import SurplusPredictionPage from "./components/SurplusPredictionPage"

const router = createBrowserRouter([
  {
    path: '/',
    element: <><DashboardPage/></>
  },
  {
    path: '/manage-stock',
    element: <><StockAdminPage/></>
  },
  {
    path: '/approve',
    element: <><SurplusPredictionPage/></>
  }
])
function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
