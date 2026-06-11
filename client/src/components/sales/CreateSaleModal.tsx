import {
  useForm,
  useWatch,
} from "react-hook-form";

import { toast } from "sonner";

import { useCreateSaleMutation } from "@/redux/api/saleApi";
import { useGetProductsQuery } from "@/redux/api/productApi";
import { useGetWarehousesQuery } from "@/redux/api/warehouseApi";

interface Props {
  onClose: () => void;
}

type FormValues = {
  product: string;
  warehouse: string;
  quantity: number;
  status:
    | "pending"
    | "completed"
    | "cancelled";
};

const CreateSaleModal = ({
  onClose,
}: Props) => {
  const [
    createSale,
    { isLoading },
  ] =
    useCreateSaleMutation();

  const {
    register,
    handleSubmit,
    reset,
    control,
  } = useForm<FormValues>({
    defaultValues: {
      status: "completed",
    },
  });

  const {
    data: productsData,
  } = useGetProductsQuery({
    page: 1,
    limit: 100,
  });

  const {
    data: warehousesData,
  } =
    useGetWarehousesQuery(
      undefined
    );

  const products =
    productsData?.data || [];

  const warehouses =
    warehousesData?.data || [];

  const selectedProductId =
    useWatch({
      control,
      name: "product",
    });

  const quantity =
    useWatch({
      control,
      name: "quantity",
    });

  const selectedProduct =
    products.find(
      (item: any) =>
        item._id ===
        selectedProductId
    );

  const totalAmount =
    (Number(quantity) || 0) *
    (selectedProduct
      ?.sellingPrice || 0);

  const onSubmit = async (
    data: FormValues
  ) => {
    try {
      const payload = {
        ...data,

        quantity: Number(
          data.quantity
        ),

        sellingPrice:
          selectedProduct?.sellingPrice,

        totalAmount,
      };

      const res =
        await createSale(
          payload
        ).unwrap();

      toast.success(
        res?.message ||
          "Sale created successfully"
      );

      reset();

      onClose();
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          "Failed to create sale"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-5 sticky top-0 bg-white z-10">
          <h2 className="text-3xl font-bold text-slate-900">
            Create Sale
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-red-500 text-4xl font-light transition"
          >
            ×
          </button>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="p-6 space-y-5"
        >
          {/* Product */}

          <div>
            <label className="block text-sm font-medium mb-2">
              Product
            </label>

            <select
              {...register(
                "product",
                {
                  required: true,
                }
              )}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">
                Select Product
              </option>

              {products.map(
                (
                  product: any
                ) => (
                  <option
                    key={
                      product._id
                    }
                    value={
                      product._id
                    }
                  >
                    {
                      product.name
                    }
                  </option>
                )
              )}
            </select>
          </div>

          {/* Product Info */}

          {selectedProduct && (
            <div className="bg-slate-50 border rounded-xl p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500">
                    SKU
                  </p>

                  <p className="font-semibold">
                    {
                      selectedProduct.sku
                    }
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Available
                    Stock
                  </p>

                  <p className="font-semibold">
                    {
                      selectedProduct.stock
                    }{" "}
                    PCS
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Selling
                    Price
                  </p>

                  <p className="font-semibold text-green-600">
                    ৳
                    {
                      selectedProduct.sellingPrice
                    }
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Unit
                  </p>

                  <p className="font-semibold">
                    {
                      selectedProduct.unit
                    }
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Warehouse */}

          <div>
            <label className="block text-sm font-medium mb-2">
              Warehouse
            </label>

            <select
              {...register(
                "warehouse",
                {
                  required: true,
                }
              )}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">
                Select Warehouse
              </option>

              {warehouses.map(
                (
                  warehouse: any
                ) => (
                  <option
                    key={
                      warehouse._id
                    }
                    value={
                      warehouse._id
                    }
                  >
                    {
                      warehouse.name
                    }
                  </option>
                )
              )}
            </select>
          </div>

          {/* Quantity */}

          <div>
            <label className="block text-sm font-medium mb-2">
              Quantity
            </label>

            <input
              type="number"
              min="1"
              {...register(
                "quantity",
                {
                  required: true,
                }
              )}
              placeholder="Enter Quantity"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Auto Price */}

          <div>
            <label className="block text-sm font-medium mb-2">
              Selling Price
            </label>

            <input
              value={
                selectedProduct?.sellingPrice ||
                ""
              }
              readOnly
              className="w-full border rounded-xl px-4 py-3 bg-slate-100"
            />
          </div>

          {/* Status */}

          <div>
            <label className="block text-sm font-medium mb-2">
              Status
            </label>

            <select
              {...register(
                "status"
              )}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pending">
                Pending
              </option>

              <option value="completed">
                Completed
              </option>

              <option value="cancelled">
                Cancelled
              </option>
            </select>
          </div>

          {/* Total Amount */}

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-slate-500">
              Total Amount
            </p>

            <h3 className="text-3xl font-bold text-blue-600">
              ৳
              {totalAmount.toLocaleString()}
            </h3>
          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={
              isLoading
            }
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
          >
            {isLoading
              ? "Creating..."
              : "Create Sale"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSaleModal;