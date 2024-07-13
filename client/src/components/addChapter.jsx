import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { FancyMultiSelect } from "./multiSelect";
import { useState } from "react";
import { addChapter, addCourse } from "@/api";
import { toast, ToastContainer } from "react-toastify";

export function AddChapter(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    courseID: props.courseID,
    videoLink: "",
    transcript: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (import.meta.env.VITE_ENV !== "development") {
      toast.error("This feature is only for admin");
      return;
    }
    setIsLoading(true);
    async function fetchData() {
      const data = await addChapter(formData);
    }
    fetchData();
    setFormData({
      title: "",
      courseID: props.courseID,
      videoLink: "",
      transcript: "",
    });
    // reset the form
    document.getElementById("form").reset();
    setIsLoading(false);

    toast.success("Chapter Added Successfully");
  };

  return (
    <Card className=" w-[350px] sm:min-w-[350px]">
      <ToastContainer />
      <CardHeader>
        <CardTitle>Create New Chapter</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="form" onChange={handleChange}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Name of the Chapter"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="coverImage">Course Id</Label>
              <Input
                disabled
                id="courseID"
                name="courseID"
                placeholder={`${props.courseID}`}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSubmit} disabled={isLoading}>
          Create
        </Button>
      </CardFooter>
    </Card>
  );
}
