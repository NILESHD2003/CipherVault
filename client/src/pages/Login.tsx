import React from "react";
import { Lock } from "lucide-react";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Login(): React.JSX.Element {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
    <div className="w-[80%] flex flex-col justify-center items-center gap-4 md:w-[420px]">
      <div className="flex flex-col justify-center items-center">
        <Lock className="text-blue-500" size={32}></Lock>
        <p className="font-bold text-xl">Welcome Back</p>
        <p className="text-gray-500 text-xs">Log in to access your secure vault</p>
      </div>
      <form className="w-[100%] flex flex-col gap-4">
        <div>
          <label>Email</label>
          <Input type="email" placeholder="you@example.com"></Input>
        </div>
        <div>
          <label>Master Password</label>
          <Input
            type="password"
            placeholder="Your master password"
          ></Input>
          <div className="flex justify-between pt-4">
            <div className="flex gap-2">
            <Checkbox id="remember"></Checkbox>
            <p>Remember me</p>
            </div>
            <div className="text-blue-500">
              <p>Forgot Password?</p>
            </div>
          </div>
        </div>
        <Button className="bg-blue-500">Log In</Button>
      </form>
      <div>
        <p>Don't have an account? <span className="text-blue-500"><Link to='/signup'>Sign up</Link></span></p>
      </div>
      <div className="text-gray-500 text-sm flex">
        <Lock size={16}></Lock>
        <p>Secured with zero-knowledge encryption</p>
      </div>
    </div></div>
  );
}

export default Login;
