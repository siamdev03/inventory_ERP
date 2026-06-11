import {
  useForm,
  useWatch,
} from "react-hook-form";

import { toast } from "sonner";

import {
  useCreatePurchaseMutation,
} from "@/redux/api/purchaseApi";

import {
  useGetProductsQuery,
} from "@/redux/api/productApi";

import {
  useGetSuppliersQuery,
} from "@/redux/api/supplierApi";

import {
  useGetWarehousesQuery,
} from "@/redux/api/warehouseApi";

interface Props {
  onClose: () => void;
}

type FormValues = {
  supplier: string;
  product: string;
  warehouse: string;
  quantity: number;
};

const CreatePurchaseModal = ({
  onClose,
}: Props) => {
  const [createPurchase] =
    useCreatePurchaseMutation();

  const {
    register,
    handleSubmit,
    control,
  } = useForm<FormValues>();

  const {
    data: productsData,
  } =
    useGetProductsQuery(
      undefined
    );

  const {
    data: suppliersData,
  } =
    useGetSuppliersQuery(
      undefined
    );

  const {
    data: warehousesData,
  } =
    useGetWarehousesQuery(
      undefined
    );

  const products =
    productsData?.data || [];

  const suppliers =
    suppliersData?.data || [];

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
      (product: any) =>
        product._id ===
        selectedProductId
    );

  const totalAmount =
    (Number(quantity) ||
      0) *
    (selectedProduct?.purchasePrice ||
      0);

  const onSubmit =
    async (
      data: FormValues
    ) => {
      try {
        const payload = {
          supplier:
            data.supplier,

          product:
            data.product,

          warehouse:
            data.warehouse,

          quantity:
            Number(
              data.quantity
            ),

          purchasePrice:
            selectedProduct?.purchasePrice,

          totalAmount,
        };

        await createPurchase(
          payload
        ).unwrap();

        toast.success(
          "Purchase Created Successfully"
        );

        onClose();
      } catch (
        error: any
      ) {
        console.error(
          error
        );

        toast.error(
          error?.data
            ?.message ||
            "Failed to create purchase"
        );
      }
    };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl relative overflow-hidden">
        {/* Header */}

        <div className="flex items-center justify-between border-b px-8 py-6">
          <h2 className="text-4xl font-bold text-slate-900">
            Create Purchase
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-red-500 text-5xl font-light transition"
          >
            ×
          </button>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="p-8 space-y-5"
        >
          {/* Supplier */}

          <div>
            <label className="block text-sm font-semibold mb-2">
              Supplier
            </label>

            <select
              {...register(
                "supplier"
              )}
              className="w-full border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">
                Select Supplier
              </option>

              {suppliers.map(
                (
                  supplier: any
                ) => (
                  <option
                    key={
                      supplier._id
                    }
                    value={
                      supplier._id
                    }
                  >
                    {
                      supplier.name
                    }
                  </option>
                )
              )}
            </select>
          </div>

          {/* Product */}

          <div>
            <label className="block text-sm font-semibold mb-2">
              Product
            </label>

            <select
              {...register(
                "product"
              )}
              className="w-full border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none"
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

          {/* Warehouse */}

          <div>
            <label className="block text-sm font-semibold mb-2">
              Warehouse
            </label>

            <select
              {...register(
                "warehouse"
              )}
              className="w-full border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none"
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

          {/* Product Info Card */}

          {selectedProduct && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-lg mb-4">
                Product Information
              </h3>

              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <p>
                  <strong>
                    SKU:
                  </strong>{" "}
                  {
                    selectedProduct.sku
                  }
                </p>

                <p>
                  <strong>
                    Stock:
                  </strong>{" "}
                  {
                    selectedProduct.stock
                  }{" "}
                  PCS
                </p>

                <p>
                  <strong>
                    Purchase Price:
                  </strong>{" "}
                  ৳
                  {selectedProduct.purchasePrice?.toLocaleString()}
                </p>

                <p>
                  <strong>
                    Selling Price:
                  </strong>{" "}
                  ৳
                  {selectedProduct.sellingPrice?.toLocaleString()}
                </p>

                <p>
                  <strong>
                    Unit:
                  </strong>{" "}
                  {
                    selectedProduct.unit
                  }
                </p>

                <p>
                  <strong>
                    Status:
                  </strong>{" "}
                  {
                    selectedProduct.status
                  }
                </p>
              </div>
            </div>
          )}

          {/* Quantity */}

          <div>
            <label className="block text-sm font-semibold mb-2">
              Quantity
            </label>

            <input
              type="number"
              min="1"
              {...register(
                "quantity"
              )}
              placeholder="Enter Quantity"
              className="w-full border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Total Amount */}

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
            <p className="text-sm text-slate-500">
              Total Amount
            </p>

            <h3 className="text-3xl font-bold text-blue-600 mt-2">
              ৳
              {totalAmount.toLocaleString()}
            </h3>
          </div>

          {/* Submit */}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-4 rounded-2xl font-semibold text-lg"
          >
            Create Purchase
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePurchaseModal;