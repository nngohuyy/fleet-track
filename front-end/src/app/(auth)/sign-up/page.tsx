'use client'

import React from "react";
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Input, Button } from '@nextui-org/react'
import axios from 'axios'
import { useForm, Controller } from "react-hook-form";
import { HiEye, HiEyeSlash } from "react-icons/hi2";


export default function LoginPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      password: "",
      email: "",
      cccd: "",
      imgAvatar: "https://avatar.iran.liara.run/public/2",
    },
  });

  interface FormData {
    name: string;
    username: string;
    password: string;
    email: string;
    cccd: string;
    imgAvatar: string;
  }

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', data);
  
      if (response.status === 201) { // Assuming 201 Created for success
        alert("Sign up successful.");
        router.push('/sign-in');
      } else {
        alert("Sign up failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <main id="signUpScreen" className="min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-md max-w-screen-xl px-10 pt-12 pb-10 w-full flex flex-col gap-10 rounded-[2.25rem]">
        <div>
          <Image
            src="fleettrack.svg"
            alt="Vercel Logo"
            className="dark:invert"
            width={100}
            height={100}
            priority
          />
        </div>
        <div className="flex flex-row">
          <div className="w-1/2">
            <h1 className="text-5xl">Sign up</h1>
            <p className="mt-4">to continue to FleetTrack</p>
          </div>
          <div className="w-1/2 flex flex-col gap-4">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "Name is required.",
                }}
                render={({ field }) => (
                  <div>
                    <Input label="Your name" {...field} />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <Controller
                  name="username"
                  control={control}
                  rules={{
                    required: "Username is required.",
                  }}
                  render={({ field }) => (
                    <div>
                      <Input label="Username" {...field} />
                      {errors.username && (
                        <p className="text-red-500 text-sm mt-2">
                          {errors.username.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Password is required.",
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*\d).{8,16}$/,
                      message: "Password must be 8-16 characters long and contain at least one uppercase letter and one number.",   
                    }
                  }}
                  render={({ field }) => (
                    <div>
                      <Input
                        label="Password" {...field}
                        placeholder="Enter your password"
                        isInvalid={!!errors.password}
                        errorMessage={errors.password && errors.password.message}
                        endContent={
                          <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                            {isVisible ? (
                              <HiEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                              <HiEye className="text-2xl text-default-400 pointer-events-none" />
                            )}
                          </button>
                        }
                        type={isVisible ? "text" : "password"}
                      />
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-2">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required.",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address.",
                  },
                }}
                render={({ field }) => (
                  <div>
                    <Input label="Email" {...field} />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name="cccd"
                control={control}
                rules={{
                  required: "ID number is required.",
                  pattern: {
                    value: /^[0-9]{12}$/,
                    message: "Invalid ID number. Ensure it is 12 characters long.",
                  },
                }}
                render={({ field }) => (
                  <div>
                    <Input label="ID number" {...field} />
                    {errors.cccd && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.cccd.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <div className="flex flex-row ml-auto">
                <Button type="submit" radius="full" color="primary">
                  Sign up
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>

  )
}