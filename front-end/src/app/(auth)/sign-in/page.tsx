'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Input, Button } from '@nextui-org/react'
import { useForm, Controller } from "react-hook-form";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import axios from 'axios'

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const response = await axios.post('http://localhost:5000/api/users/login', {
      username,
      password,
    })

    console.log(response.data)

    if (response.data.message === 'Login successful.') {
      document.cookie = `token=${response.data.token}; path=/`
      alert("Login successful.");
      router.push('/')
    } else {
      alert("Invalid username or password.");
    }
  }

  return (
    <main className="min-h-screen flex justify-center items-center bg-blue-50">
      <div className="bg-white shadow-md max-w-screen-xl px-10 pt-12 pb-10 w-full flex flex-col gap-10 rounded-[2.25rem]">
        <div>
          <Image
            src="logo/logo-abbrvAsset 2.svg"
            alt="Vercel Logo"
            className="dark:invert"
            width={100}
            height={100}
            priority
          />
        </div>
        <div className="flex flex-row">
          <div className="w-1/2">
            <h1 className="text-5xl">Sign in</h1>
            <p className="mt-4">to continue to The Amazing Record Store</p>
          </div>
          <div className="w-1/2 flex flex-col gap-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} label="Username" />
              <Input
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              <div className="flex flex-row-reverse gap-4 ml-auto">
                <Button type="submit" radius="full" color="primary" size="lg">
                  Sign in
                </Button>
                <Link href="/sign-up">
                  <Button radius="full" variant='light' color="primary" size="lg">
                    Create account
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>

  )
}