import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { UserIcon } from "@heroicons/react/16/solid";

import { useLoginMutation } from "../services/modules/users";
import { addUserName } from "../store/users";

import Loader from "../components/Loader";

import { AUTH_TOKEN } from "../config";
import { getUserTokenLocal } from "../helpers";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const [userInput, setUserInput] = useState("");

  const [login, { isLoading, error, isSuccess, data, isError, reset }] =
    useLoginMutation();

  useEffect(() => {
    const token = getUserTokenLocal()
    if (token) {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    if (isError) {
      toast.error(error.data);
    }
    if (isSuccess && data) {
      localStorage.setItem(
        AUTH_TOKEN,
        JSON.stringify({ token: data.token, username: userInput })
      );
      dispatch(addUserName(userInput));
      navigate('/')
    }
  }, [isError, isSuccess, data]);

  useEffect(() => {
    if (otp.length > 3) {
      handleLogin();
    }
  }, [otp]);

  const handleLogin = () => {
    if (error) {
      reset();
    }
    if (userInput.length > 3) {
      login({
        username: userInput,
        otp,
      });
    }
  };

  return (
    <div className="bg-gray-50 font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <div className="p-8 rounded-2xl relative bg-white shadow">
            {isLoading ? (
              <div className="absolute top-0 bg-[#33333352] rounded-2xl z-50 right-0 left-0 bottom-0">
                <Loader />
              </div>
            ) : null}
            <h2 className="text-gray-800 text-center text-2xl font-bold">
              Sign in
            </h2>
            <form className="mt-8 space-y-4">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  User name
                </label>
                <div className="relative flex items-center">
                  <input
                    name="username"
                    type="text"
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter user name"
                    onChange={(e) => setUserInput(e.target.value)}
                    autoFocus
                  />
                  <UserIcon className="size-6 text-gray-400 absolute right-4" />
                </div>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Password
                </label>
                <div className="flex  justify-around">
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={4}
                    separator={<span style={{ width: "8px" }}></span>}
                    isInputNum={true}
                    inputStyle={{
                      border: "1px solid lightgray",
                      borderRadius: "8px",
                      width: "54px",
                      height: "54px",
                      fontSize: "12px",
                      color: "#000",
                      fontWeight: "400",
                      caretColor: "blue",
                    }}
                    containerStyle={{
                      display: "flex",
                      justifyContent: "space-around",
                      width: "100%",
                    }}
                    focusStyle={{
                      border: "1px solid #CFD3DB",
                      outline: "none",
                    }}
                  />
                </div>
              </div>
              <div className="!mt-8">
                <button
                  type="button"
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  onClick={handleLogin}
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
