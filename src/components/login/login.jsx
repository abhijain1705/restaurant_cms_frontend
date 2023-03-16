import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import InputComponent from "../common/components/input";
import { useLoginMutation } from "../../redux/api";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
    const [user, setuser] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setuser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const [loginuser, response] = useLoginMutation();
    const dispatch = useDispatch();
    const [isPermission, setisPermission] = useState(false);
    const navigate = useNavigate();

    function handlingResponse(response, successMsg) {
        console.log(response);
        if (response.isLoading) {
            toast.loading("loading please wait");
        } else if (response.isError) {
            if ("data" in response.error) {
                let msg = response.error.data;
                toast.dismiss();
                toast.error(msg.error);
            }
        } else if (response.isSuccess) {
            toast.dismiss();
            toast.success(successMsg);
            setuser({
                restaurantName: "",
                address: "",
                city: "",
                state: "",
                country: "",
                name: "",
                email: "",
                password: "",
            });
            dispatch(logIn({
                email: response.data.email,
                name: response.data.name,
                uniqueId: response.data.uniqueId,
                restaurantName: response.data.restaurantName,
                _id: response.data._id,
                profilePic: ''
            }));
            setTimeout(() => {
                navigate("/");
            }, 2000);
        }
    }

    const login = (e) => {
        e.preventDefault();
        let emailRegex = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})$/;
        if (
            user.email === "" ||
            user.password === ""
        ) {
            toast.warning("all fields are required.");
            return;
        } else if (!isPermission) {
            toast.warning("you should accept permissions");
            return;
        } else if (user.password.length < 6) {
            toast.warning("write password of atleast 6 letter");
            return;
        } else if (!emailRegex.test(user.email)) {
            toast.warning("email has to be valid");
            return;
        }

        loginuser({
            email: user.email,
            password: user.password,
        });
    };

    useEffect(() => {
        handlingResponse(response, "successfully created account");
    }, [response]);

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <ToastContainer />
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a
                    href="#"
                    className="mt-2 flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                >
                    <img
                        className="w-8 h-8 mr-2"
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                        alt="logo"
                    />
                    Restaurant CMS
                </a>
                <div
                    id="signup"
                    className="overflow-auto w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
                >
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create account
                        </h1>
                        <form
                            onSubmit={response.isLoading ? null : login}
                            className="space-y-4 md:space-y-6" action="#">
                            <InputComponent
                                name={"email"}
                                label={"Your email"}
                                value={user.email}
                                setValue={handleChange}
                            />
                            <InputComponent
                                name={"password"}
                                label={"Enter password"}
                                value={user.password}
                                setValue={handleChange}
                            />
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="terms"
                                        aria-describedby="terms"
                                        type="checkbox"
                                        value={isPermission ? "on" : "off"}
                                        onChange={(e) => {
                                            setisPermission(!isPermission);
                                        }}
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        required=""
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label
                                        for="terms"
                                        className="font-light text-gray-500 dark:text-gray-300"
                                    >
                                        I accept the{" "}
                                        <a
                                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                            href="#"
                                        >
                                            Terms and Conditions
                                        </a>
                                    </label>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className={` ${response.isLoading ? 'opacity-60' : 'opacity-100'} w-full text-white  bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                            >
                                Create an account
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account?{" "}
                                <a
                                    href="/login"
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Login here
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginComponent;