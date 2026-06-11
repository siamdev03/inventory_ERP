import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "@/pages/Login";

import Dashboard from "@/pages/dashboard/Dashboard";

import Products from "@/pages/dashboard/products/Products";

import Categories from "@/pages/dashboard/categories/Categories";

import Warehouses from "@/pages/dashboard/warehouses/Warehouses";

import Suppliers from "@/pages/dashboard/suppliers/Suppliers";

import Purchases from "@/pages/dashboard/purchases/Purchases";

import Sales from "@/pages/dashboard/sales/Sales";

import Customers from "@/pages/dashboard/customers/Customers";

import Reports from "@/pages/dashboard/reports/Reports";

import Analytics from "@/pages/dashboard/analytics/Analytics";

import ProtectedRoute from "./ProtectedRoute";

import DashboardLayout from "@/layouts/DashboardLayout";



const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Route */}

      <Route
        path="/login"
        element={<Login />}
      />

      {/* Protected Routes */}

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/categories"
          element={<Categories />}
        />

        <Route
          path="/warehouses"
          element={<Warehouses />}
        />

        <Route
          path="/suppliers"
          element={<Suppliers />}
        />

        <Route
          path="/purchases"
          element={<Purchases />}
        />

        <Route
          path="/sales"
          element={<Sales />}
        />

        <Route
          path="/customers"
          element={<Customers />}
        />

        <Route
          path="/reports"
          element={<Reports />}
        />
      
        <Route
          path="/analytics"
          element={<Analytics />}
        />
      </Route>

      {/* Fallback */}

      <Route
        path="*"
        element={
          <Navigate
            to="/dashboard"
            replace
          />
        }
      />
    </Routes>
  );
};

export default AppRoutes;