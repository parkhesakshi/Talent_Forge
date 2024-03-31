import { useState } from 'react';
import { UiInputText } from 'libs/design-system';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  loginFormInitialValues,
  LoginNameValues,
  validateLoginSchema,
} from 'libs/resources/models/form/authentication/login.form';

const LoginComponent = () => {
  const [isLoading, setIsLoading] = useState(false);

  const loginFormik = useFormik({
    initialValues: loginFormInitialValues,
    validationSchema: validateLoginSchema,
    onSubmit: (values) => {
      handleLoginSubmit(values);
    },
  });

  const handleLoginSubmit = (values) => {
    setIsLoading(true);
    console.log(values);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={loginFormik.handleSubmit}>
          <UiInputText
            id="login_email"
            label={'Email'}
            name={LoginNameValues.LOGIN_EMAIL}
            isRequired={true}
            type="email"
            onChange={loginFormik.handleChange}
            error={loginFormik.errors.login_email || ''}
          />
          <div>
            <UiInputText
              id="login_password"
              label={'Passwrod'}
              name={LoginNameValues.LOGIN_PASSWORD}
              isRequired={true}
              type="password"
              onChange={loginFormik.handleChange}
              error={loginFormik.errors.login_password || ''}
            />
            <div className="text-sm">
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Sign in
          </button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <Link
            to={'/authentication/registration'}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;