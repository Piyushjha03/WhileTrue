import { Link } from "react-router-dom";
import { Checkbox } from "./ui/checkbox";
import { useCallback, useEffect, useState } from "react";
import { postIsWatched, updateIsWatched } from "@/api";

import debounce from "lodash/debounce";

const CourseTitle = (props) => {
  const [hasWatched, setHasWatched] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setHasWatched(props.isWatched?.includes(props.courseInfo[props.i]._id));
  }, [props]);

  const debouncedUpdate = useCallback(
    debounce((watchedStatus) => {
      if (watchedStatus) {
        updateIsWatched({
          clerkID: props.user.id,
          courseID: props.courseID,
          watched: props.courseInfo[props.i]._id,
        });
      } else {
        postIsWatched({
          clerkID: props.user.id,
          courseID: props.courseID,
          watched: props.courseInfo[props.i]._id,
        });
      }
      setIsProcessing(false);
    }, 500), // Adjust the debounce delay as needed
    [props?.user, props?.courseID, props?.courseInfo, props.i]
  );

  const handleWatched = () => {
    if (isProcessing) return;

    setIsProcessing(true);
    setHasWatched((prev) => {
      const newWatchedStatus = !prev;
      debouncedUpdate(newWatchedStatus);
      return newWatchedStatus;
    });
  };
  return (
    <div className="bg-muted/80 rounded-sm p-2 my-4 w-full flex justify-between items-center ">
      <span className="block max-w-48 whitespace-nowrap overflow-hidden overflow-ellipsis">
        <Link to={`${props.url}/${props.i}`}> {props.course.title}</Link>
      </span>
      <div
        className="checkbox"
        onClick={() => {
          handleWatched();
        }}
      >
        <Checkbox checked={hasWatched} />
      </div>
    </div>
  );
};

export default CourseTitle;
