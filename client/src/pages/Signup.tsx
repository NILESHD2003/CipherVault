import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { UserPlus, Lock, Shield } from "lucide-react";
import { Link } from "react-router-dom";

function Signup(): React.JSX.Element {
  return (
    <div className="flex flex-col h-screen sm:flex-row">
      <section id="left" className="w-[100%] px-20 h-[100%] flex flex-col justify-center items-center gap-4 sm:w-[50%] not-sm:px-10">
        <div className="flex flex-col justify-center items-center gap-4">
          <p className="font-bold text-3xl">Secure Vault</p>
          <p className="text-gray-500">Create your zero-knowledge encrypted vault</p>
        </div>
        <form className="w-[100%] flex flex-col gap-4">
          <div>
            <label>Email</label>
            <Input type='email' placeholder="you@example.com"></Input>
          </div>
          <div>
            <label>Master Password</label>
            <Input type="password" placeholder="Create a strong master password">
            </Input>
          </div>
          <div>
            <label>Confirm Master Password</label>
            <Input type='password' placeholder="Confirm your master password"></Input>
          </div>
          <div>
            <Button className="w-[100%] bg-blue-500">
              <UserPlus></UserPlus>Create Secure Account
            </Button>
          </div>
        </form>
        <div className="flex flex-row justify-center items-center text-gray-500 gap-2">
          <Lock size={16}></Lock>
          <p className="text-xs">Zero-knowledge encryption: only you can access your data</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">
            Already have an account? <Link to='/login'>
            <span className="text-blue-500">Log in</span></Link>
          </p>
        </div>
      </section>
      <section id="right" className="w-[50%] px-20 bg-blue-50 dark:bg-gray-900 h-[100%] flex flex-col justify-center items-center text-center gap-8 not-sm:hidden">
        <div>
          <Shield size={128} className="text-blue-500 not-lg:size-16"></Shield>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-bold text-xl">Zero-Knowledge Security</p>
          <p className="text-gray-500 text-sm">
            Your data is encrypted using keys that only you control. Even we
            can't access your information.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle><p className="text-md">How it works:</p></CardTitle>
          </CardHeader>
          <CardDescription className="text-start p-4">
            1. Your master password creates an encryption key on your device<br></br>2.
            All data is encrypted before leaving your browser <br></br>3. Only you can
            decrypt your data with your password <br></br>4. We store only encrypted
            data—never your password or keys
          </CardDescription>
        </Card>
        <div>
          <p className="text-gray-500 text-xs">
            This zero-knowledge architecture ensures maximum privacy and
            security for your sensitive information.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Signup;
