import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaEye as eye } from "react-icons/fa";
import { FaEyeSlash as eyeOff } from "react-icons/fa";
import { useState } from "react";

const passexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .required()
      .matches(
        passexp,
        "include at least one uppercase letter, one lowercase letter, and one number"
      ),
  })
  .required();

export default function Userloging() {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eye);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eyeOff);
      setType("text");
    } else {
      setIcon(eye);
      setType("password");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => console.log(data);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-semibold text-sky-600 mb-6">Signup</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-3/4 md:w-1/2 mx-auto shadow-2xl p-6"
      >
        <div className="flex flex-col">
          <label className="text-sky-700" htmlFor="firstname">
            First Name
          </label>
          <input
            {...register("firstName")}
            className="rounded-md p-2 bg-slate-50 outline-none shadow-md"
            placeholder="First Name"
          />
          <p className="text-red-600">{errors.firstName?.message}</p>
        </div>

        <div className="flex flex-col">
          <label className="text-sky-700" htmlFor="lastname">
            Last Name
          </label>
          <div className="flex flex-col">
            <input
              {...register("lastName")}
              className="rounded-md p-2  bg-slate-50 outline-none shadow-md"
              placeholder="Last Name"
            />
          </div>
          <p className="text-red-600">{errors.lastName?.message}</p>
        </div>

        <div className="flex flex-col">
          <label className="text-sky-700" htmlFor="email">
            Email
          </label>
          <input
            {...register("email")}
            className="rounded-md p-2 bg-slate-50 outline-none shadow-md"
            placeholder="Email"
          />
          <p className="text-red-600">{errors.email?.message}</p>
        </div>

        <div className="flex flex-col">
          <label className="text-sky-700" htmlFor="password">
            Password
          </label>
          <div className="flex flex-row justify-center items-center rounded-md p-2  shadow-md bg-slate-50 ">
            <input
              type={type}
              {...register("password")}
              className="password outline-none bg-slate-50  w-full"
              placeholder="Password"
            />
            <span onClick={handleToggle}>{icon}</span>
          </div>
          <p className="text-red-600">{errors.password?.message}</p>
        </div>
        <input
          type="submit"
          className="rounded-lg bg-sky-600 mt-4 h-8 hover:bg-sky-400 text-white transition  "
        />
      </form>
    </div>
  );
}
