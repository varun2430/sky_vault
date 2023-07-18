import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Field } from "formik";
import * as yup from "yup";
import { setLogin } from "../redux/slices/auth";
import { login } from "../features/authService";

const initialValuesLogin = {
  email: "",
  password: "",
};

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email required"),
  password: yup.string().required("Password required"),
});

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormSubmit = async (values, onSubmitProps) => {
    const data = await login(values);

    if (data) {
      dispatch(
        setLogin({
          user: data.user,
          token: data.token,
        })
      );
      navigate("/");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen w-screen bg-blue-800">
        <div className="w-80 lg:w-96 p-6 bg-slate-200 rounded-md">
          <h1 className="text-2xl font-semibold">Login</h1>
          <p className="mt-1 text-sm">Login to access your files</p>

          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValuesLogin}
            validationSchema={loginSchema}
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
                  Email
                </label>
                <Field
                  className=" border-2 px-2 py-1 w-full text-base rounded-md focus:outline-none focus:ring-0 focus:border-blue-400"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter email..."
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  required
                ></Field>
                <label className=" block mt-1" htmlFor="password">
                  Password
                </label>
                <Field
                  className=" border-2 px-2 py-1 w-full text-base rounded-md focus:outline-none focus:ring-0 focus:border-blue-400"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter password..."
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  required
                ></Field>
                <div className="mt-5">
                  <button
                    className="border-2 border-blue-700 bg-blue-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-blue-700 font-semibold"
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
        <div className="mt-2">
          <p className=" text-base text-slate-100">
            Don't have an account{" "}
            <span className=" text-purple-500">Sign up</span>
          </p>
        </div>
      </div>
    </>
  );
}
