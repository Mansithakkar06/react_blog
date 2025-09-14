import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authservice from "../appwrite/auth";
import { login } from "../store/authSlice";
import { Input, Button, Logo } from './index';

function Signup() {
    const navigate = useNavigate()
    const dispach = useDispatch()
    const [error, setError] = useState("")
    const { register, handleSubmit } = useForm()

    const signup = async (data) => {
        setError("")
        try {
            const userData = await authservice.createAccount(data)
            if (userData) {
                const user = await authservice.getCurrentUser();
                if (user) dispach(login(user));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }


    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width='100%' />
                    </span>
                </div>
            <h2 className='text-center text-2xl font-bold leading-tight'>Sign up to create account</h2>

            {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

            <form onSubmit={handleSubmit(signup)}>
                <div className="space-y-5">
                    <Input
                        label="Full Name: "
                        type="text"
                        placeholder="enter your Full Name"
                        {...register("name", {
                            required: true
                        })}
                    />
                    <Input
                        label="Email: "
                        type="email"
                        placeholder="Enter Your email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                            }
                        })}
                    />
                    <Input
                    label="Password: "
                    placeholder="Enter your password"
                    type="password"
                    {...register("password",{
                        required:true,
                        min:6
                    })}
                    />
                    <Button className="w-full" type="submit">Create Account</Button>
                </div>
            </form>
            <p className='mt-2 text-center text-base text-black/60'>
                Already have an account? 
                <Link to="/login" className="font-medium text-primary transition-all duration-200 hover:underline">
                    Login
                </Link>
            </p>
            </div>

        </div>
    )
}
export default Signup
