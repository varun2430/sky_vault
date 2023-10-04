import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Field } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { setLogin } from "../redux/slices/auth";
import { login } from "../features/authService";

const initialValuesLogin = {
  email: "",
  password: "",
  encryption_key: "",
};

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email.").required("Email required."),
  password: yup
    .string()
    .required("Password required.")
    .min(6, "Password should have a minimum of 6 characters."),
  encryption_key: yup
    .string()
    .required("Encryption key required.")
    .length(32, "Encryption key must be exactly 32 characters."),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      const resData = await login(values);
      if (resData) {
        dispatch(
          setLogin({
            user: resData.user,
            token: resData.token,
            encryption_key: values.encryption_key,
          })
        );
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error(err.response.data.error, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      onSubmitProps.resetForm();
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen w-screen">
        <div className="w-80 md:w-96 p-6 mt-4 bg-slate-700 bg-opacity-70 rounded-md">
          <h1 className="text-2xl text-slate-100 font-semibold">Login</h1>
          <p className="mt-1 text-sm text-slate-100">
            Login to access your files
          </p>

          <Formik
            initialValues={initialValuesLogin}
            validationSchema={loginSchema}
            onSubmit={handleFormSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
              resetForm,
            }) => (
              <form onSubmit={handleSubmit}>
                <label className="block mt-3" htmlFor="email">
                  <p className=" text-slate-100">Email</p>
                  <Field
                    className=" border-2 px-2 py-1 w-full text-base text-black rounded-md focus:outline-none focus:ring-0 focus:border-blue-700 placeholder:text-gray-700 bg-gray-300"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter email..."
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    required
                  ></Field>
                </label>
                {errors.email && (
                  <p className="px-1 pt-1 text-sm text-red-500">
                    {errors.email}
                  </p>
                )}
                <label className=" block mt-2" htmlFor="password">
                  <p className="text-slate-100">Password</p>
                  <Field
                    className=" border-2 px-2 py-1 w-full text-base text-black rounded-md focus:outline-none focus:ring-0 focus:border-blue-700 placeholder:text-gray-700 bg-gray-300"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter password..."
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    required
                  ></Field>
                </label>
                {errors.password && (
                  <p className="px-1 pt-1 text-sm text-red-500">
                    {errors.password}
                  </p>
                )}
                <label className=" block mt-2" htmlFor="encryption_key">
                  <p className="text-slate-100">Encryption key</p>
                  <Field
                    className=" border-2 px-2 py-1 w-full text-base text-black rounded-md focus:outline-none focus:ring-0 focus:border-blue-700 placeholder:text-gray-700 bg-gray-300"
                    type="password"
                    id="encryption_key"
                    name="encryption_key"
                    placeholder="Enter encryption key..."
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.encryption_key}
                    required
                  ></Field>
                </label>
                {errors.encryption_key && (
                  <p className="px-1 pt-1 text-sm text-red-500">
                    {errors.encryption_key}
                  </p>
                )}
                <div className="mt-5">
                  <button
                    className="border-2 border-blue-700 bg-blue-800 text-slate-100 py-1 w-full rounded-md hover:bg-transparent font-semibold"
                    type="submit"
                  >
                    <i className="fa-solid fa-right-to-bracket"></i>
                    &nbsp;&nbsp;Login
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
        <div className="my-4">
          <p className=" text-base text-slate-100">
            Don't have an account?{" "}
            <button
              onClick={(e) => {
                navigate("/register");
              }}
              className=" text-purple-500"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
