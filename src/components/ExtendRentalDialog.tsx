import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Rental } from "@/lib/mockData";

interface ExtendRentalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rental: Rental;
  onExtend: (newEndDate: string) => void;
}

export function ExtendRentalDialog({
  open,
  onOpenChange,
  rental,
  onExtend,
}: ExtendRentalDialogProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const currentEndDate = new Date(rental.endDate);
  const minDate = new Date(currentEndDate);
  minDate.setDate(minDate.getDate() + 1);

  const handleExtend = () => {
    if (selectedDate) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      onExtend(formattedDate);
      setSelectedDate(undefined);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Extend Rental Period</DialogTitle>
          <DialogDescription>
            Select the new end date for your rental of {rental.tool.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-muted p-3 rounded-md text-sm">
            <p className="text-muted-foreground mb-2">Current rental period:</p>
            <p className="font-semibold">
              {rental.startDate} to {rental.endDate}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Select new end date:</p>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  disabled={!selectedDate}
                >
                  {selectedDate
                    ? format(selectedDate, "MMM dd, yyyy")
                    : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < minDate}
                />
              </PopoverContent>
            </Popover>
          </div>

          {selectedDate && (
            <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-md text-sm">
              <p className="text-muted-foreground mb-1">Extension period:</p>
              <p className="font-semibold text-blue-700 dark:text-blue-300">
                {Math.ceil(
                  (selectedDate.getTime() - currentEndDate.getTime()) /
                    (1000 * 60 * 60 * 24)
                )}{" "}
                additional days
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleExtend} disabled={!selectedDate}>
            Extend Rental
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
