"use client";
import LoaderButton from "@/components/buttons/LoaderButton";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";

export enum Roles {
  BIKER = "bikers",
  Sender = "senders",
}

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: Roles.Sender,
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    e: React.FormEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log(process.env.SERVER_URL);
  const handleSubmit = async (e: React.FormEvent) => {
    setErrors([]);
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.SERVER_URL}/auth/${formData.role}/login`,
        { email: formData.email, password: formData.password }
      );
      console.log(response);
    } catch (err) {
      setErrors([(err as AxiosError).response?.data as string]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 bg-blue-600 h-screen">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            action="#"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                onChange={handleInputChange}
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required={true}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                onChange={handleInputChange}
                type="password"
                name="password"
                id="password"
                minLength={8}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required={true}
              />
            </div>

            <ul className="grid w-full gap-6 md:grid-cols-2">
              <li>
                <input
                  type="radio"
                  id={Roles.Sender}
                  name="role"
                  value={Roles.Sender}
                  className="hidden peer"
                  checked={formData.role === Roles.Sender}
                  required={true}
                  onChange={handleInputChange}
                />
                <label
                  htmlFor={Roles.Sender}
                  className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <div className="block">
                    <div className="w-full text-lg font-semibold">Sender</div>
                    <div className="w-full">You are a sender</div>
                  </div>
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id={Roles.BIKER}
                  name="role"
                  value={Roles.BIKER}
                  className="hidden peer"
                  required={true}
                  onChange={handleInputChange}
                  checked={formData.role === Roles.BIKER}
                />
                <label
                  htmlFor={Roles.BIKER}
                  className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <div className="block">
                    <div className="w-full text-lg font-semibold">Biker</div>
                    <div className="w-full">You are a sender</div>
                  </div>
                </label>
              </li>
            </ul>
            <ul>
              {errors.map((error) => (
                <li
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                  key={error}
                >
                  <span className="font-medium">{error}</span>
                </li>
              ))}
            </ul>
            {isLoading ? (
              <LoaderButton />
            ) : (
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
            )}
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
