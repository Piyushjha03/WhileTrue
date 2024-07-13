import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { updateChapter } from "@/api";

export function TranscriptDialog(props) {
  const [transcript, setTranscript] = useState(props.transcript);
  const [isOpen, setIsOpen] = useState(false);
  const handleUpdate = async () => {
    const editedTranscript = {
      _id: props._id,
      transcript: transcript,
    };
    console.log("====================================");
    console.log("Update Transcript", editedTranscript);
    console.log("====================================");

    await updateChapter(editedTranscript);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          Edit Transcript
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Transcript</DialogTitle>
          <DialogDescription>
            Make changes to your transcripts here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center gap-4">
            <Label htmlFor="name" className="text-right">
              content
            </Label>
            <Textarea
              id="name"
              value={transcript}
              className="col-span-3"
              rows="15"
              onChange={(e) => setTranscript(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleUpdate}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
