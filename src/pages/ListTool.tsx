import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { categories } from "@/lib/mockData";
import { Upload, ImagePlus, FileText } from "lucide-react";

const ListTool = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [usageGuide, setUsageGuide] = useState("");
  const [manualFile, setManualFile] = useState<File | null>(null);

  const subcategories = categories.find(c => c.name === selectedCategory)?.subcategories || [];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container mx-auto flex-1 px-4 py-8 max-w-2xl">
        <h1 className="text-2xl font-bold mb-2">List a Tool</h1>
        <p className="text-muted-foreground text-sm mb-8">Share your tools with neighbors and earn money.</p>

        <form className="space-y-6" onSubmit={e => e.preventDefault()}>
          <div className="space-y-2">
            <label className="text-sm font-medium">Tool Name</label>
            <Input placeholder="e.g. Bosch Impact Drill" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea placeholder="Describe the tool, condition, and what's included..." rows={4} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Price per Day (₹)</label>
              <Input type="number" placeholder="150" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Security Deposit (₹)</label>
              <Input type="number" placeholder="500" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select category</option>
                {categories.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Subcategory</label>
              <select className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" disabled={!selectedCategory}>
                <option value="">Select subcategory</option>
                {subcategories.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <Input placeholder="e.g. Koramangala, Bangalore" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Upload Images</label>
            <div className="grid grid-cols-3 gap-3">
              {[0, 1, 2].map(i => (
                <label key={i} className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/50 transition-colors hover:border-primary/30 hover:bg-primary/5">
                  <ImagePlus className="h-6 w-6 text-muted-foreground" />
                  <span className="mt-1 text-xs text-muted-foreground">Add photo</span>
                  <input type="file" accept="image/*" className="hidden" />
                </label>
              ))}
            </div>
          </div>

          {/* Usage Guide Section */}
          <div className="space-y-3 rounded-xl border bg-card p-5">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <label className="text-sm font-semibold">Usage Guide / Instruction Manual</label>
            </div>
            <p className="text-xs text-muted-foreground">Help borrowers use your tool safely. Add step-by-step instructions or upload a manual (PDF).</p>
            
            <Textarea
              placeholder={"e.g.\n1. Insert the correct drill bit\n2. Set the torque to medium\n3. Hold firmly with both hands\n4. Start at slow speed\n5. Wear safety goggles"}
              rows={6}
              value={usageGuide}
              onChange={e => setUsageGuide(e.target.value)}
            />

            <div className="flex items-center gap-3">
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border bg-background px-4 py-2 text-sm hover:bg-muted transition-colors">
                <Upload className="h-4 w-4 text-muted-foreground" />
                <span>{manualFile ? manualFile.name : "Upload PDF Manual"}</span>
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={e => setManualFile(e.target.files?.[0] || null)}
                />
              </label>
              {manualFile && (
                <button
                  type="button"
                  onClick={() => setManualFile(null)}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          <Button size="lg" className="w-full">
            <Upload className="h-4 w-4 mr-2" /> List Tool
          </Button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ListTool;
