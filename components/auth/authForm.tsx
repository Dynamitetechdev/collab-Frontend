import React, { useEffect, useState } from "react";
// import { useApiRequest } from "../useFetch";
import { useRouter } from "next/router";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
// import useStore from "@/store/useStore";
import Image from "next/image";
import Link from "next/link";
// import Loader from "../UI/utilities/loader";
interface AuthFormProps {
  name: string;
  description: string;
  signUp?: boolean;
  method: string;
  routeTo: string;
  endPoint: string;
}
const AuthForm: React.FC<AuthFormProps> = ({
  name,
  description,
  signUp,
  method,
  routeTo,
  endPoint,
}) => {
  const [passwordVisible, setPasswordVisible] = useState<Boolean>(false);
  //   const { apiMessage, userAccess } = useStore();
  const router = useRouter();
  //   const [loading, handleApiRequest] = useApiRequest();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = async (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  console.log(formData);
  type ApiData = {
    message: string;
    FACode: string;
  };

  //   const handleRegister = async (e: React.FormEvent): Promise<ApiData | any> => {
  //     e.preventDefault();
  //     try {
  //       const response = await handleApiRequest(method, endPoint, formData);
  //       localStorage.setItem("user", JSON.stringify(response.data));
  //       console.log(response);
  //       if (response.status === 201 || 200) {
  //         router.push(`/${routeTo}`);
  //       }
  //       console.log("Regsiter Payload", response);
  //       return response;
  //     } catch (error: any) {
  //       console.log("ui error:", error?.response?.data.message);
  //       return;
  //     }
  //   };

  //   useEffect(() => {
  //     if (userAccess) {
  //       router.push("/dashboard");
  //     }
  //   }, []);
  return (
    <div className="">
      <div className="auth_form_wrapper w-full relative">
        <div className="auth_form text-center mx-auto form_wrapper md:w-4/12 px-7 py-10 bg-white">
          <h1 className="title text-5xl md:text-6xl font-bold my-4">{name}</h1>
          <div className="alternative_Auth my-6">
            <div
              onClick={() => null}
              className="google border-[#000000] border my-2 hover:border-indigo-300 relative rounded-md py-3 cursor-pointer"
            >
              <Image
                src={"/assets/authImages/Google.png"}
                width={24}
                height={24}
                alt=""
                className="absolute mx-3"
              />
              <h3 className="text-center font-semibold">
                Continue with Google
              </h3>
            </div>
            <div
              onClick={() => null}
              className="google border-[#000000] border my-2 hover:border-indigo-300 relative rounded-md py-3 cursor-pointer"
            >
              <Image
                src={"/assets/authImages/Facebook.png"}
                width={24}
                height={24}
                alt=""
                className="absolute mx-3"
              />
              <h3 className="text-center font-semibold">
                Continue with Facebook
              </h3>
            </div>
          </div>

          <div className="my-8 flex items-center gap-4 before:h-px before:flex-1 before:bg-gray-300  before:content-[''] after:h-px after:flex-1 after:bg-gray-300  after:content-['']">
            or
          </div>

          <form
            action=""
            method="post"
            //   onSubmit={handleRegister}
            className="flex flex-col mx-auto"
          >
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={onChange}
              className="mb-5 py-3 px-4 border rounded-md"
              required
            />
            <div className="relative mb-7">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                name="password"
                onChange={onChange}
                value={formData.password}
                className="mb-2 py-3 px-4 w-full border rounded-md"
                required
              />
              <div
                className="password_visible absolute cursor-pointer"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <EyeSlashIcon /> : <EyeIcon />}
              </div>
              {/* <p className="text-left text-red-600">{apiMessage}</p> */}
            </div>

            <button className="text-white bg-blue-700 py-3 px-7">{name}</button>
            {/* <button className="text-white bg-blue-700 py-3 px-7">
            {name} {loading ? <Loader /> : null}
          </button> */}
          </form>
          {signUp ? (
            <>
              <p className="my-10">
                By clicking on Register, you agree to Collab&apos;s terms of use
                and privacy policy.
              </p>

              <p className="font-semibold mb-10">
                Already have an account?{" "}
                <Link href="/login" className="ml-1 text-blue-600">
                  Login
                </Link>{" "}
              </p>

              {/* <div className="passwordRequirement">
              <div className="flex my-3">
                <Image
                  src={"/assets/authImages/GrayCheckmark.png"}
                  width={25}
                  height={16}
                  alt=""
                />
                <p className="mx-3 font-semibold">Minimum of 8 characters</p>
              </div>
              <div className="flex my-3">
                <Image
                  src={"/assets/authImages/GrayCheckmark.png"}
                  width={21}
                  height={21}
                  alt=""
                />
                <p className="mx-3 font-semibold">One UPPERCASE character</p>
              </div>
              <div className="flex my-3">
                <Image
                  src={"/assets/authImages/GrayCheckmark.png"}
                  width={21}
                  height={21}
                  alt=""
                />
                <p className="mx-3 font-semibold">
                  One special character (e.g: !@#$%^&*?)
                </p>
              </div>
            </div> */}
            </>
          ) : (
            <>
              <p className="font-semibold mt-5 mb-6">
                <Link href="/#" className="text-blue-600">
                  Forgot Password?
                </Link>{" "}
              </p>
              <p className="font-semibold">
                Don’t have an account yet?
                <Link href="/register" className="ml-1 text-blue-600">
                  Sign up
                </Link>{" "}
              </p>
            </>
          )}
        </div>
      </div>
      <div className="login-img max-[600px]:hidden">
        <Image src={"/assets/auth-bg.png"} width={600} height={600} alt="" />
      </div>
    </div>
  );
};

export default AuthForm;
