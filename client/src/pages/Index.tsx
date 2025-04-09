import React from "react";
import { Shield, Lock, Key, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

function Index(): React.JSX.Element {
  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <nav className="flex flex-row items-center justify-between py-4 px-2 sm:py-6 sm:px-8">
          <div className="flex flex-row gap-2 items-center">
            <Shield className="text-blue-500 text-xl"></Shield>
            <p className="text-xl font-semibold">CipherVault</p>
          </div>
          <div className="flex flex-row items-center gap-4">
            <Link to="/login">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link to="/signup">
              <Button
                variant="secondary"
                className="bg-blue-500 text-white dark:bg-blue-900 not-dark:hover:text-black not-dark:hover:border-blue-500 border-1"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </nav>
      </header>
      <main className="flex-grow flex flex-col justify-center">
        <section id="hero" className="text-center flex flex-col gap-8 mt-12">
          <div>
            <p className="text-5xl font-bold">
              Your Data, <span className="text-blue-500">Your Keys</span>, Your
              Control
            </p>
          </div>
          <div className="mx-auto">
            <p className="text-2xl text-gray-500 max-w-3xl">
              Zero-knowledge encrypted vault for your most sensitive
              information. Not even we can access your data.
            </p>
          </div>
          {/* CTA Btns */}
          <div className="flex gap-4 justify-center flex-col sm:flex-row">
            <Link to="/signup">
              <Button
                variant="secondary"
                className="bg-blue-500 text-white text-lg p-6 not-dark:hover:text-black not-dark:hover:border-blue-500 border-1 dark:bg-blue-900"
              >
                Create Your Vault
              </Button>
            </Link>
            <Link
              to="https://en.wikipedia.org/wiki/Zero-knowledge_proof"
              target="_blank"
            >
              <Button variant="outline" className="text-lg p-6">
                Learn More
              </Button>
            </Link>
          </div>
        </section>
        <section id="feature" className="flex justify-evenly mt-12 flex-wrap gap-8 mb-8">
          {/* card-1 */}
          <Card className="w-[80%] flex flex-col justify-center items-center text-center sm:w-[240px]">
            <Lock className="h-8 w-8 text-blue-500 mb-2" />
            <CardTitle>Zero-Knowledge</CardTitle>
            <CardDescription>Your encryption keys never leave your device</CardDescription>
            <CardContent>We can't see your data, even if we wanted to. Your keys are generated and stored only on your device.</CardContent>
          </Card>
          {/* card-2 */}
          <Card className="w-[80%] flex flex-col justify-center items-center text-center sm:w-[240px]">
            <Key className="h-8 w-8 text-blue-500 mb-2" />
            <CardTitle>Master Password</CardTitle>
            <CardDescription>One secure password unlocks everything</CardDescription>
            <CardContent>Access all your secured information with a single master password that only you know.</CardContent>
          </Card>
          {/* card-3 */}
          <Card className="w-[80%] flex flex-col justify-center items-center text-center sm:w-[240px]">
            <ShieldCheck className="h-8 w-8 text-blue-500 mb-2" />
            <CardTitle>Multi-Factor Authentication</CardTitle>
            <CardDescription>Two layers of identity verification</CardDescription>
            <CardContent>Secure your account with your favorite Authenticator app for an extra layer of protection.
            </CardContent>
          </Card>
          {/* Card-4 */}
          <Card className="w-[80%] flex flex-col justify-center items-center text-center sm:w-[240px]">
            <Shield className="h-8 w-8 text-blue-500 mb-2" />
            <CardTitle>Client-Side Encryption</CardTitle>
            <CardDescription>End-to-end encryption for maximum security</CardDescription>
            <CardContent>All encryption and decryption happens
            locally on your device, not on our servers.</CardContent>
          </Card>
        </section>
      </main>
      <footer className="flex flex-col text-center justify-between py-6 px-8 border-t-gray-700 border-t sm:flex-row">
        <div>
          <p>&copy; 2025 <span className="text-blue-500 font-semibold">CipherVault</span>. All rights reserved.</p>
        </div>
        <div className="flex justify-center gap-2">
          {/* <CodeXml className="text-blue-500"></CodeXml> */}
          <p>Crafted by <Link to='https://nileshdeshpande.me'><span className="text-blue-500 font-semibold">Nilesh Deshpande</span></Link></p>
        </div>
      </footer>
    </div>
  );
}

export default Index;
