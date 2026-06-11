import { useState } from "react";

import {
  Plus,
  Users,
  UserCheck,
  Crown,
  Edit,
  Trash2,
} from "lucide-react";

import {
  useGetCustomersQuery,
} from "@/redux/api/customerApi";

import CreateCustomerModal from "@/components/customers/CreateCustomerModal";
import EditCustomerModal from "@/components/customers/EditCustomerModal";
import DeleteCustomerDialog from "@/components/customers/DeleteCustomerDialog";

const Customers = () => {
  const [
    createOpen,
    setCreateOpen,
  ] = useState(false);

  const [
    selectedCustomer,
    setSelectedCustomer,
  ] = useState(null);

  const [
    editOpen,
    setEditOpen,
  ] = useState(false);

  const [
    deleteOpen,
    setDeleteOpen,
  ] = useState(false);

  const {
    data,
    isLoading,
  } =
    useGetCustomersQuery(
      undefined
    );

  const customers =
    data?.data || [];

  if (isLoading) {
    return (
      <div>
        Loading Customers...
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">
              Customers
            </h1>

            <p className="text-slate-500">
              Manage customer database
            </p>
          </div>

          <button
            onClick={() =>
              setCreateOpen(true)
            }
            className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2"
          >
            <Plus size={18} />

            Create Customer
          </button>
        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-5">
          <div className="bg-white rounded-3xl shadow p-5">
            <Users className="text-blue-600 mb-2" />

            <p>Total Customers</p>

            <h2 className="text-3xl font-bold">
              {
                customers.length
              }
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow p-5">
            <UserCheck className="text-green-600 mb-2" />

            <p>Active</p>

            <h2 className="text-3xl font-bold">
              {
                customers.filter(
                  (
                    c: any
                  ) =>
                    c.status ===
                    "active"
                ).length
              }
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow p-5">
            <Crown className="text-amber-500 mb-2" />

            <p>VIP Customers</p>

            <h2 className="text-3xl font-bold">
              {
                customers.filter(
                  (
                    c: any
                  ) =>
                    c.customerType ===
                    "vip"
                ).length
              }
            </h2>
          </div>
        </div>

        {/* Table */}

        <div className="bg-white rounded-3xl shadow overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-100">
                <th className="p-4 text-left">
                  Name
                </th>

                <th className="p-4 text-left">
                  Phone
                </th>

                <th className="p-4 text-left">
                  Email
                </th>

                <th className="p-4 text-left">
                  Type
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {customers.map(
                (
                  customer: any
                ) => (
                  <tr
                    key={
                      customer._id
                    }
                    className="border-t"
                  >
                    <td className="p-4">
                      {
                        customer.name
                      }
                    </td>

                    <td className="p-4">
                      {
                        customer.phone
                      }
                    </td>

                    <td className="p-4">
                      {
                        customer.email
                      }
                    </td>

                    <td className="p-4 capitalize">
                      {
                        customer.customerType
                      }
                    </td>

                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                        {
                          customer.status
                        }
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedCustomer(
                              customer
                            );

                            setEditOpen(
                              true
                            );
                          }}
                          className="bg-amber-500 text-white p-2 rounded-lg"
                        >
                          <Edit size={16} />
                        </button>

                        <button
                          onClick={() => {
                            setSelectedCustomer(
                              customer
                            );

                            setDeleteOpen(
                              true
                            );
                          }}
                          className="bg-red-600 text-white p-2 rounded-lg"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {createOpen && (
        <CreateCustomerModal
          onClose={() =>
            setCreateOpen(false)
          }
        />
      )}

      {editOpen &&
        selectedCustomer && (
          <EditCustomerModal
            customer={
              selectedCustomer
            }
            onClose={() =>
              setEditOpen(false)
            }
          />
        )}

      {deleteOpen &&
        selectedCustomer && (
          <DeleteCustomerDialog
            id={
              (
                selectedCustomer as any
              )._id
            }
            onClose={() =>
              setDeleteOpen(false)
            }
          />
        )}
    </>
  );
};

export default Customers;