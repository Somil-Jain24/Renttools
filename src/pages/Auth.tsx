import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react";
import { useUser } from "@/context/UserContext";

type AuthTab = "login" | "signup";
type UserType = "buyer" | "seller";

const Register = () => {
  const navigate = useNavigate();
  const { signup, login } = useUser();

  const [tab, setTab] = useState<AuthTab>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [userType, setUserType] = useState<UserType>("buyer");

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/browse");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(name, email, phone, password, userType === "seller");
      navigate("/browse");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">{tab === "login" ? "Welcome back" : "Create your account"}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {tab === "login" ? "Log in to your RentKart account" : "Join RentKart and start renting tools"}
            </p>
          </div>

          {/* Login / Signup Toggle */}
          <div className="flex rounded-xl bg-muted p-1 gap-1">
            <button
              onClick={() => setTab("login")}
              className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-colors ${tab === "login" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}
            >
              Login
            </button>
            <button
              onClick={() => setTab("signup")}
              className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-colors ${tab === "signup" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}
            >
              Sign Up
            </button>
          </div>

          {tab === "login" ? (
            <>
              {/* Email / Phone toggle for login */}
              <div className="flex rounded-lg bg-secondary p-1 gap-1">
                <button
                  onClick={() => setLoginMethod("email")}
                  className={`flex-1 rounded-md py-1.5 text-xs font-medium transition-colors ${loginMethod === "email" ? "bg-card shadow-sm" : "text-muted-foreground"}`}
                >
                  Email
                </button>
                <button
                  onClick={() => setLoginMethod("phone")}
                  className={`flex-1 rounded-md py-1.5 text-xs font-medium transition-colors ${loginMethod === "phone" ? "bg-card shadow-sm" : "text-muted-foreground"}`}
                >
                  Phone + OTP
                </button>
              </div>

              <form className="space-y-4" onSubmit={handleLogin}>
                {loginMethod === "email" ? (
                  <>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        className="pl-10"
                        placeholder="Email address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        className="pl-10 pr-10"
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-muted-foreground">
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-10"
                      placeholder="Phone number"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                )}
                <Button className="w-full" size="lg">{loginMethod === "email" ? "Log In" : "Send OTP"}</Button>
              </form>
            </>
          ) : (
            <form className="space-y-4" onSubmit={handleSignup}>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-10"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-10"
                  placeholder="Email address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-10"
                  placeholder="Phone number"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-10 pr-10"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-muted-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Account Type</label>
                <div className="flex rounded-lg bg-secondary p-1 gap-1">
                  <button
                    type="button"
                    onClick={() => setUserType("buyer")}
                    className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${userType === "buyer" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}
                  >
                    Buyer
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType("seller")}
                    className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${userType === "seller" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}
                  >
                    Seller
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  {userType === "seller" ? "You can list and rent tools with other users." : "You can rent tools from other users."}
                </p>
              </div>

              <Button className="w-full" size="lg" type="submit">Create Account</Button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;

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
