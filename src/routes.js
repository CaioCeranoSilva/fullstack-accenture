
import React from "react"
import ReactDOM from "react-dom/client"
import {
    BrowserRouter, Route, Routes, Outlet, createBrowserRouter, createRoutesFromElements, RouterProvider,
} from 'react-router-dom'
import {
    CompanyGridPage,
    CompanyNewPage,
    SupplierNewPage,
    SupplierGridPage,
    HomePage,
    LoginPage,
} from './pages'
import { Drawer } from 'components'


const DrawerLayout = () => (
    <>
        <Drawer />
        <Outlet />
    </>
)

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes*/}
                <Route path="/login" element={<LoginPage />} />

                {/* Protected Routes*/}
                <Route element={<DrawerLayout />}>
                    <Route path="*" element={<HomePage />} />
                    <Route path="/company" element={<CompanyGridPage />} />
                    <Route path="/company/new" element={<CompanyNewPage />} />
                    <Route path="/supplier" element={<SupplierGridPage />} />
                    <Route path="/supplier/new" element={<SupplierNewPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes