import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/context/UserContext";
import { CheckCircle, AlertCircle, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SellerRegistration = () => {
  const navigate = useNavigate();
  const { currentUser, registerAsSeller } = useUser();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: currentUser?.name || "",
    address: currentUser?.location || "",
    phone: currentUser?.phone || "",
    idType: "aadhar",
    idNumber: "",
    bankAccountNumber: "",
    bankIFSC: "",
    accountHolderName: "",
  });
  const [idFile, setIdFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Please log in to become a seller</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (currentUser.isSeller) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Card className="w-full max-w-md mx-4 border-primary/20 bg-gradient-to-br from-primary/5 to-success/5">
            <CardContent className="pt-6 text-center space-y-4">
              <CheckCircle className="h-12 w-12 text-success mx-auto" />
              <h2 className="text-xl font-semibold">Already a Seller</h2>
              <p className="text-sm text-muted-foreground">You're already registered as a seller. You can now switch to Seller Mode from your profile.</p>
              <Button onClick={() => navigate("/profile")} className="w-full">Go to Profile</Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (step === 1) {
      if (!formData.fullName || !formData.address || !formData.phone) {
        toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" });
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.idType || !formData.idNumber || !idFile) {
        toast({ title: "Error", description: "Please complete ID verification", variant: "destructive" });
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!formData.bankAccountNumber || !formData.bankIFSC || !formData.accountHolderName) {
        toast({ title: "Error", description: "Please fill in all bank details", variant: "destructive" });
        return;
      }
      
      // Submit registration
      setIsLoading(true);
      setTimeout(() => {
        registerAsSeller({
          isRegistered: true,
          verificationStatus: "pending",
          bankAccountLinked: true,
        });
        setIsLoading(false);
        toast({ title: "Success", description: "Registration submitted successfully. Your account is pending verification." });
        navigate("/profile");
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="container mx-auto flex-1 px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Become a Seller</h1>
          <p className="text-muted-foreground">Complete your seller registration to start earning</p>
        </div>

        {/* Progress Steps */}
        <div className="flex gap-4 mb-8">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex-1 flex items-center gap-2">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full font-semibold text-sm ${
                s <= step 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {s < step ? <CheckCircle className="h-4 w-4" /> : s}
              </div>
              <span className={`text-sm font-medium ${s <= step ? 'text-foreground' : 'text-muted-foreground'}`}>
                {s === 1 ? 'Personal' : s === 2 ? 'Verification' : 'Banking'}
              </span>
            </div>
          ))}
        </div>

        <Card className="border-border/60">
          <CardHeader>
            <CardTitle>
              {step === 1 ? 'Personal Information' : step === 2 ? 'ID Verification' : 'Bank Details'}
            </CardTitle>
            <CardDescription>
              {step === 1 
                ? 'Please provide your basic information' 
                : step === 2 
                ? 'Upload a copy of your government ID'
                : 'Add your bank account for payouts'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <Input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <Input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 XXXXX XXXXX"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Address</label>
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Your complete address"
                      required
                    />
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">ID Type</label>
                    <select
                      name="idType"
                      value={formData.idType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                    >
                      <option value="aadhar">Aadhar Card</option>
                      <option value="pan">PAN Card</option>
                      <option value="passport">Passport</option>
                      <option value="dl">Driving License</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">ID Number</label>
                    <Input
                      name="idNumber"
                      value={formData.idNumber}
                      onChange={handleInputChange}
                      placeholder="Your ID number"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Upload ID Proof</label>
                    <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                      <div className="flex flex-col items-center justify-center">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium text-foreground">
                          {idFile ? idFile.name : 'Click to upload or drag and drop'}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">PNG, JPG or PDF (max 5MB)</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept="image/*,.pdf"
                        required
                      />
                    </label>
                  </div>

                  <div className="rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-3 flex gap-2">
                    <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-900 dark:text-blue-100">
                      Your ID will be kept secure and used only for verification purposes.
                    </p>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Bank Account Number</label>
                    <Input
                      name="bankAccountNumber"
                      value={formData.bankAccountNumber}
                      onChange={handleInputChange}
                      placeholder="Your 16-digit account number"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Bank IFSC Code</label>
                    <Input
                      name="bankIFSC"
                      value={formData.bankIFSC}
                      onChange={handleInputChange}
                      placeholder="SBIN0001234"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Account Holder Name</label>
                    <Input
                      name="accountHolderName"
                      value={formData.accountHolderName}
                      onChange={handleInputChange}
                      placeholder="Name as it appears in your bank account"
                      required
                    />
                  </div>

                  <div className="rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 p-3 flex gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-green-900 dark:text-green-100">
                      Your payouts will be directly transferred to this account after each rental.
                    </p>
                  </div>
                </>
              )}

              <div className="flex gap-3 pt-6">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setStep(step - 1)}
                  >
                    Back
                  </Button>
                )}
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : step === 3 ? 'Complete Registration' : 'Continue'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card className="mt-8 border-border/60 bg-card/50">
          <CardHeader>
            <CardTitle className="text-base">What you get as a seller</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex gap-2">
                <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                <span>Zero listing fees</span>
              </div>
              <div className="flex gap-2">
                <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                <span>Secure payouts</span>
              </div>
              <div className="flex gap-2">
                <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                <span>Control pricing & availability</span>
              </div>
              <div className="flex gap-2">
                <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                <span>Build your trust score</span>
              </div>
              <div className="flex gap-2">
                <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                <span>Access to analytics dashboard</span>
              </div>
              <div className="flex gap-2">
                <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                <span>Verified renter base</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default SellerRegistration;
