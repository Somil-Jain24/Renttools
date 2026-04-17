import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Tool } from "@/lib/mockData";
import { Calendar, DollarSign, MessageSquare } from "lucide-react";

interface RentalRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tool: Tool | null;
  onSubmit?: (request: {
    toolId: string;
    startDate: string;
    endDate: string;
    proposedPrice: number;
    message: string;
  }) => void;
}

export function RentalRequestModal({
  open,
  onOpenChange,
  tool,
  onSubmit,
}: RentalRequestModalProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [proposedPrice, setProposedPrice] = useState(tool?.pricePerDay.toString() || "");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tool || !startDate || !endDate) return;

    onSubmit?.({
      toolId: tool.id,
      startDate,
      endDate,
      proposedPrice: Number(proposedPrice),
      message,
    });

    // Reset form
    setStartDate("");
    setEndDate("");
    setProposedPrice(tool?.pricePerDay.toString() || "");
    setMessage("");
    onOpenChange(false);
  };

  if (!tool) return null;

  const days = startDate && endDate ? Math.ceil(
    (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)
  ) : 0;

  const totalPrice = days * Number(proposedPrice);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request Rental</DialogTitle>
          <DialogDescription>
            Send a rental request for <strong>{tool.name}</strong>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-lg border border-border/60 bg-card/50 p-3">
            <div className="text-sm">
              <p className="text-muted-foreground">Tool Owner</p>
              <p className="font-semibold text-foreground">{tool.owner.name}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-primary" />
                Start Date
              </label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="rounded-lg"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-primary" />
                End Date
              </label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                className="rounded-lg"
              />
            </div>
          </div>

          {days > 0 && (
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
              <p className="text-xs text-muted-foreground mb-2">Duration: {days} day{days > 1 ? 's' : ''}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">₹{tool.pricePerDay}/day</span>
                <span className="text-lg font-bold text-primary">₹{totalPrice}</span>
              </div>
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-primary" />
              Proposed Price
            </label>
            <Input
              type="number"
              value={proposedPrice}
              onChange={(e) => setProposedPrice(e.target.value)}
              min="0"
              step="10"
              required
              className="rounded-lg"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              Message (optional)
            </label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell the owner why you'd like to rent this tool..."
              className="rounded-lg resize-none"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1 rounded-lg"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 rounded-lg bg-primary hover:bg-primary/90"
              disabled={!startDate || !endDate}
            >
              Send Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
