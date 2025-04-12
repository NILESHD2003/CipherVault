import React from "react";
import { Lock } from "lucide-react";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
// @ts-ignore
import { groth16 } from "snarkjs";
// @ts-ignore
import * as circomlib from "circomlibjs";

function Login(): React.JSX.Element {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const encodeStringToBigInt = (str: string): bigint => {
    const bytes = Array.from(new TextEncoder().encode(str));
    const hex = bytes.map((b) => b.toString(16).padStart(2, "0")).join("");
    return BigInt("0x" + hex);
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:3000/auth/login/getHash/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.error(error);
    });
    
    let resData;
    if (res) {
      resData = await res.json();
      console.log(resData);
    } else {
      console.error("Failed to fetch response from the server.");
    }

    // build Poseidon hasher
    const poseidon = await circomlib.buildPoseidon();

    // hash the incoming user password
    const encodedPassword = encodeStringToBigInt(password);
    const passwordHash = poseidon.F.toString(
      poseidon([BigInt(encodedPassword)])
    );

    // Prepare input for ZK circuit
    const input = {
      passwordHash: passwordHash,
      expectedHash: resData.data,
    };

    // Generate proof using circuit
    const { proof, publicSignals } = await groth16.fullProve(
      input,
      "/auth.wasm",
      "/circuit_final.zkey"
    );

    const data = {
      proof,
      publicSignals
    }

    const proofRes = await fetch('http://localhost:3000/auth/login/verify', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    }).catch((error) => {
      console.error(error);
    });

    console.log({
      proof,
      publicSignals,
    });
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="w-[80%] flex flex-col justify-center items-center gap-4 md:w-[420px]">
        <div className="flex flex-col justify-center items-center">
          <Lock className="text-blue-500" size={32}></Lock>
          <p className="font-bold text-xl">Welcome Back</p>
          <p className="text-gray-500 text-xs">
            Log in to access your secure vault
          </p>
        </div>
        <form className="w-[100%] flex flex-col gap-4">
          <div>
            <label>Email</label>
            <Input type="email" placeholder="you@example.com" required value={email} onChange={(e)=>setEmail(e.target.value)}></Input>
          </div>
          <div>
            <label>Master Password</label>
            <Input type="password" placeholder="Your master password" required value={password} onChange={(e)=>setPassword(e.target.value)}></Input>
            <div className="flex justify-between pt-4">
              <div className="flex gap-2">
                <Checkbox id="remember"></Checkbox>
                <label>Remember me</label>
              </div>
              <div className="text-blue-500">
                <p>Forgot Password?</p>
              </div>
            </div>
          </div>
          <Button className="bg-blue-500" onClick={(e)=>{handleLogin(e)}}>Log In</Button>
        </form>
        <div>
          <p>
            Don't have an account?{" "}
            <span className="text-blue-500">
              <Link to="/signup">Sign up</Link>
            </span>
          </p>
        </div>
        <div className="text-gray-500 text-sm flex">
          <Lock size={16}></Lock>
          <p>Secured with zero-knowledge encryption</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
