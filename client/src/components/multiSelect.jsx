"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "./ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

const INSTRUCTORS = [
  {
    value: "raghavendra",
    label: "Raghavendra",
  },
  {
    value: "sudhir",
    label: "Sudhir",
  },
  {
    value: "meenakshi",
    label: "Meenakshi",
  },
  {
    value: "vikram",
    label: "Vikram",
  },
  {
    value: "swati",
    label: "Swati",
  },
  {
    value: "parth",
    label: "Parth",
  },
  {
    value: "deepak",
    label: "Deepak",
  },
  {
    value: "priti",
    label: "Priti",
  },
];

export function FancyMultiSelect(props) {
  const inputRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    props.handleChange({
      target: {
        name: "instructors",
        value: selected.map((s) => s.value),
      },
    });
  }, [selected]);

  const handleUnselect = React.useCallback((framework) => {
    setSelected((prev) => prev.filter((s) => s.value !== framework.value));
  }, []);

  const handleKeyDown = React.useCallback((e) => {
    const input = inputRef.current;
    if (input) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (input.value === "") {
          setSelected((prev) => {
            const newSelected = [...prev];
            newSelected.pop();
            return newSelected;
          });
        }
      }
      // This is not a default behaviour of the <input /> field
      if (e.key === "Escape") {
        input.blur();
      }
    }
  }, []);

  const selectables = INSTRUCTORS.filter(
    (framework) => !selected.includes(framework)
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected.map((framework) => {
            return (
              <Badge key={framework.value} variant="secondary">
                {framework.label}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(framework);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(framework)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Select INSTRUCTORS..."
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        <CommandList>
          {open && selectables.length > 0 ? (
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((framework) => {
                  return (
                    <CommandItem
                      className={`cursor-pointer`}
                      data-disabled={false}
                      key={framework.value}
                      onMouseDown={(e) => {
                        console.log("====================================");
                        console.log(e);
                        console.log("====================================");
                        e.preventDefault(); // Prevent default behavior
                        e.stopPropagation(); // Stop event propagation
                      }}
                      onSelect={() => {
                        setInputValue("");
                        setSelected((prev) => [...prev, framework]);
                        setOpen(false); // Close dropdown after selection
                      }}
                    >
                      {framework.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
}
