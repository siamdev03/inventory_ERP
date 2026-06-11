import {
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

interface Props {
  totalRevenue: number;
  totalPurchases: number;
  totalSales: number;
  totalCustomers: number;
  inventoryValue: number;
}

const ReportSummaryCards = ({
  totalRevenue,
  totalPurchases,
  totalSales,
  totalCustomers,
  inventoryValue,
}: Props) => {
  const cards = [
    {
      title: "Revenue",
      value: `৳${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      bg: "bg-green-100",
      text: "text-green-600",
      growth: "+12.5%",
    },

    {
      title: "Purchases",
      value: `৳${totalPurchases.toLocaleString()}`,
      icon: ShoppingCart,
      bg: "bg-blue-100",
      text: "text-blue-600",
      growth: "+8.2%",
    },

    {
      title: "Sales Orders",
      value: totalSales.toLocaleString(),
      icon: TrendingUp,
      bg: "bg-indigo-100",
      text: "text-indigo-600",
      growth: "+15.8%",
    },

    {
      title: "Customers",
      value: totalCustomers.toLocaleString(),
      icon: Users,
      bg: "bg-orange-100",
      text: "text-orange-600",
      growth: "+5.1%",
    },

    {
      title: "Inventory Value",
      value: `৳${inventoryValue.toLocaleString()}`,
      icon: Package,
      bg: "bg-purple-100",
      text: "text-purple-600",
      growth: "+10.4%",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
      {cards.map(
        (card) => {
          const Icon =
            card.icon;

          return (
            <div
              key={
                card.title
              }
              className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-slate-100"
            >
              {/* Top */}

              <div className="flex items-center justify-between">
                <div
                  className={`${card.bg} p-4 rounded-2xl`}
                >
                  <Icon
                    className={`w-7 h-7 ${card.text}`}
                  />
                </div>

                <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                  <ArrowUpRight size={16} />

                  {
                    card.growth
                  }
                </div>
              </div>

              {/* Content */}

              <div className="mt-5">
                <p className="text-slate-500 text-sm">
                  {
                    card.title
                  }
                </p>

                <h2 className="text-3xl font-bold mt-2 text-slate-900 break-words">
                  {
                    card.value
                  }
                </h2>
              </div>

              {/* Footer */}

              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-400">
                  Compared to last
                  period
                </p>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default ReportSummaryCards;