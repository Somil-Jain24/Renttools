import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [method, setMethod] = useState<"email" | "phone">("email");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-sm text-muted-foreground mt-1">Log in to your RentKart account</p>
          </div>

          <div className="flex rounded-xl bg-muted p-1 gap-1">
            <button onClick={() => setMethod("email")} className={`flex-1 rounded-lg py-2 text-sm font-medium ${method === "email" ? "bg-card shadow-sm" : "text-muted-foreground"}`}>Email</button>
            <button onClick={() => setMethod("phone")} className={`flex-1 rounded-lg py-2 text-sm font-medium ${method === "phone" ? "bg-card shadow-sm" : "text-muted-foreground"}`}>Phone + OTP</button>
          </div>

          <form className="space-y-4" onSubmit={e => e.preventDefault()}>
            {method === "email" ? (
              <>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-10" placeholder="Email address" type="email" />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-10 pr-10" placeholder="Password" type={showPassword ? "text" : "password"} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-muted-foreground">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </>
            ) : (
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input className="pl-10" placeholder="Phone number" type="tel" />
              </div>
            )}
            <Button className="w-full" size="lg">{method === "email" ? "Log In" : "Send OTP"}</Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account? <Link to="/signup" className="text-primary font-medium hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Create your account</h1>
            <p className="text-sm text-muted-foreground mt-1">Join RentKart and start renting tools</p>
          </div>

          <form className="space-y-4" onSubmit={e => e.preventDefault()}>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input className="pl-10" placeholder="Full name" />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input className="pl-10" placeholder="Email address" type="email" />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input className="pl-10" placeholder="Phone number" type="tel" />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input className="pl-10 pr-10" placeholder="Password" type={showPassword ? "text" : "password"} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-muted-foreground">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <Button className="w-full" size="lg">Create Account</Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Log in</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export function OtpVerification() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm space-y-6 text-center">
          <h1 className="text-2xl font-bold">Verify OTP</h1>
          <p className="text-sm text-muted-foreground">Enter the 6-digit code sent to your phone</p>
          <div className="flex justify-center gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <input key={i} maxLength={1} className="h-12 w-12 rounded-xl border bg-card text-center text-lg font-semibold outline-none focus:ring-2 focus:ring-ring" />
            ))}
          </div>
          <Button className="w-full" size="lg">Verify</Button>
          <p className="text-sm text-muted-foreground">Didn't receive the code? <button className="text-primary font-medium">Resend</button></p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
