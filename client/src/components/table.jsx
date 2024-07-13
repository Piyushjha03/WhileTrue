import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TranscriptDialog } from "./transcriptDialog";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { UploadVideo } from "./uploadVideo";

export function TableDemo(props) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };

  return (
    <Table>
      <TableCaption>All content from this Course.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Title</TableHead>
          <TableHead>Video Link</TableHead>
          <TableHead>Transcript</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.courseInfo &&
          props.courseInfo.chapters.map((info, i) => (
            <TableRow key={info._id}>
              <TableCell className="font-medium">{info.title}</TableCell>
              <TableCell>
                {info.videoStatus === "N/A" ||
                info.videoStatus === "cancelled" ? (
                  <UploadVideo chapterID={info._id} />
                ) : info.videoStatus === "queued" ? (
                  <Button variant="secondary" disabled>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Uploading...
                  </Button>
                ) : (
                  <Link to={`/watch/${info.courseID}/${i}`}>
                    <Button variant="secondary">Watch Video</Button>
                  </Link>
                )}
              </TableCell>
              <TableCell>
                <TranscriptDialog transcript={info.transcript} _id={info._id} />
              </TableCell>
              <TableCell>
                {new Date(info.createdAt).toLocaleDateString("en-In", options)}
              </TableCell>
              <TableCell className="text-right">{info.videoStatus}</TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">
            {props.courseInfo.chapters.length}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
