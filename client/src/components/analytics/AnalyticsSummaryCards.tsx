import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
} from "lucide-react";

interface Props {
  revenue: number;
  sales: number;
  customers: number;
  products: number;
}

const AnalyticsSummaryCards = ({
  revenue,
  sales,
  customers,
  products,
}: Props) => {
  const cards = [
    {
      title: "Revenue",
      value: `BDT ${revenue.toLocaleString()}`,
      icon: DollarSign,
      color:
        "text-green-600",
      bg:
        "bg-green-100",
    },

    {
      title: "Sales",
      value: sales,
      icon: ShoppingCart,
      color:
        "text-blue-600",
      bg:
        "bg-blue-100",
    },

    {
      title: "Customers",
      value: customers,
      icon: Users,
      color:
        "text-orange-600",
      bg:
        "bg-orange-100",
    },

    {
      title: "Products",
      value: products,
      icon: Package,
      color:
        "text-indigo-600",
      bg:
        "bg-indigo-100",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map(
        (card) => {
          const Icon =
            card.icon;

          return (
            <div
              key={
                card.title
              }
              className="bg-white rounded-3xl p-6 shadow-md"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-slate-500">
                    {
                      card.title
                    }
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {
                      card.value
                    }
                  </h2>
                </div>

                <div
                  className={`${card.bg} p-4 rounded-2xl`}
                >
                  <Icon
                    className={`w-8 h-8 ${card.color}`}
                  />
                </div>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default AnalyticsSummaryCards;