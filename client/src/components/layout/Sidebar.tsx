import {
  LayoutDashboard,
  Package,
  FolderTree,
  Warehouse,
  Truck,
  ShoppingCart,
  Users,
  BarChart3,
  FileText,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    path: "/products",
    icon: Package,
  },
  {
    title: "Categories",
    path: "/categories",
    icon: FolderTree,
  },
  {
    title: "Warehouses",
    path: "/warehouses",
    icon: Warehouse,
  },
  {
    title: "Suppliers",
    path: "/suppliers",
    icon: Truck,
  },
  {
    title: "Purchases",
    path: "/purchases",
    icon: ShoppingCart,
  },
  {
    title: "Sales",
    path: "/sales",
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    path: "/customers",
    icon: Users,
  },
  {
    title: "Reports",
    path: "/reports",
    icon: FileText,
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
];

const Sidebar = () => {
  return (
    <aside className="w-72 min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white border-r border-slate-800">
      {/* Logo */}
      <div className="h-24 flex items-center px-8 border-b border-slate-800">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Inventory ERP
          </h1>

          <p className="text-slate-400 text-sm mt-1">
            Enterprise Suite
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-5">
        <p className="text-xs uppercase tracking-widest text-slate-500 mb-4 px-3">
          Main Menu
        </p>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `
                  flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }
                `
                }
              >
                <Icon size={22} />

                <span className="font-medium">
                  {item.title}
                </span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;