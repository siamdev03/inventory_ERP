import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

import { useLoginMutation } from "@/redux/api/authApi";

type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
  } = useForm<LoginFormData>();

  const [
    login,
    { isLoading },
  ] = useLoginMutation();

  const onSubmit = async (
    data: LoginFormData
  ) => {
    try {
      const result =
        await login(
          data
        ).unwrap();

      localStorage.setItem(
        "token",
        result.data.accessToken
      );

      toast.success(
        "Login Successful"
      );

      navigate(
        "/dashboard"
      );
    } catch (
      error: any
    ) {
      console.error(
        error
      );

      toast.error(
        error?.data
          ?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Branding Section */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white p-16 flex-col justify-center">
        <div className="max-w-lg">
          <h1 className="text-6xl font-extrabold mb-6 leading-tight">
            Inventory ERP
          </h1>

          <p className="text-xl text-slate-300 leading-8">
            Modern Inventory,
            Warehouse, Sales,
            Purchase & Supplier
            Management Platform
            built for growing
            businesses.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-12">
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl">
              <h3 className="text-3xl font-bold">
                100+
              </h3>

              <p className="text-slate-300">
                Products
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl">
              <h3 className="text-3xl font-bold">
                25+
              </h3>

              <p className="text-slate-300">
                Warehouses
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl">
              <h3 className="text-3xl font-bold">
                500+
              </h3>

              <p className="text-slate-300">
                Sales Orders
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl">
              <h3 className="text-3xl font-bold">
                24/7
              </h3>

              <p className="text-slate-300">
                Monitoring
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center bg-slate-100 p-6">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold text-slate-900">
              Welcome Back
            </h2>

            <p className="text-slate-500 mt-3">
              Sign in to access your
              ERP dashboard
            </p>
          </div>

          <form
            onSubmit={handleSubmit(
              onSubmit
            )}
            className="space-y-5"
          >
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Email
              </label>

              <input
                type="email"
                {...register(
                  "email",
                  {
                    required:
                      true,
                  }
                )}
                placeholder="Enter your email"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Password
              </label>

              <input
                type="password"
                {...register(
                  "password",
                  {
                    required:
                      true,
                  }
                )}
                placeholder="Enter your password"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={
                isLoading
              }
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
            >
              {isLoading
                ? "Logging in..."
                : "Login"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500">
            Inventory ERP System
            © 2026
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;