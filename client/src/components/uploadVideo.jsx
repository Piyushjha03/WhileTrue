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
import { updateChapter, uploadVideo } from "@/api";

import {
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from "./ui/uploadCompont";
import { Paperclip } from "lucide-react";
import { toast } from "react-toastify";

const FileSvgDraw = () => {
  return (
    <>
      <svg
        className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 16"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
        />
      </svg>
      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">Click to upload</span>
        &nbsp; or drag and drop
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        mp4 file under 100MB
      </p>
    </>
  );
};

export function UploadVideo(props) {
  const [isOpen, setIsOpen] = useState(false);

  const [files, setFiles] = useState(null);

  const dropZoneConfig = {
    accept: {
      "video/mp4": [".mp4"],
    },
    maxFiles: 1,
    maxSize: 100 * 1024 * 1024, // 100MB size limit
    multiple: false,
  };

  const handleUpdate = async () => {
    if (!files || files.length === 0) {
      toast.error("Please select a file");
      return;
    }
    if (import.meta.env.VITE_ENV !== "development") {
      toast.error("This feature is only for admin");
      return;
    }
    const formdata = new FormData();
    formdata.append("video", files[0]);
    formdata.append("chapterID", props.chapterID);
    console.log("====================================");
    formdata.forEach((value, key) => {
      console.log(`${key}:`, value);
    });
    console.log("====================================");
    await uploadVideo(formdata);
    setFiles(null);
    setIsOpen(false);

    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          Upload Video
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Video</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center gap-4 text-white">
            <Label htmlFor="name" className="text-right">
              content
            </Label>
            <FileUploader
              value={files}
              onValueChange={setFiles}
              dropzoneOptions={dropZoneConfig}
              className="relative bg-background rounded-lg p-2"
            >
              <FileInput className="outline-dashed outline-1 outline-white">
                <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full ">
                  <FileSvgDraw />
                </div>
              </FileInput>
              <FileUploaderContent>
                {files &&
                  files.length > 0 &&
                  files.map((file, i) => (
                    <FileUploaderItem key={i} index={i}>
                      <Paperclip className="h-4 w-4 stroke-current" />
                      <span>{file.name}</span>
                    </FileUploaderItem>
                  ))}
              </FileUploaderContent>
            </FileUploader>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleUpdate}>
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
