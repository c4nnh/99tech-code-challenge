import * as React from "react";
import { useMediaQuery } from "../../hooks/use-media-query";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "./drawer";
import { DialogDescription } from "./dialog";
import { cn } from "../../libs/classnames";
import { useEffect } from "react";

type Option = {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
};

type Props = {
  options: Option[];
  value?: Option["value"];
  placeholder?: React.ReactNode;
  title?: string;
  className?: HTMLButtonElement["className"];
  onChange?: (option: Option) => void;
};

export function ComboBox({
  options,
  placeholder = "Select an option",
  value,
  title = "Select an option",
  className,
  onChange,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const { isLarge } = useMediaQuery();
  const [selectedOption, setSelectedOption] = React.useState<
    Option | undefined
  >(options.find((option) => option.value.toString() === value?.toString()));

  useEffect(() => {
    setSelectedOption(
      options.find((option) => option.value.toString() === value?.toString()),
    );
  }, [value, options]);

  function onSelect(option: Option) {
    setSelectedOption(option);
    onChange?.(option);
    setOpen(false);
  }

  if (isLarge) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn("text-border border-border !font-normal", className)}
            aria-label={title}
            title={title}
          >
            <SelectedOption
              selectedOption={selectedOption}
              placeholder={placeholder}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[--radix-popover-trigger-width] p-0"
          align="start"
        >
          <OptionList
            options={options}
            selectedOption={selectedOption}
            setSelectedOption={onSelect}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className={cn("text-border border-border !font-normal", className)}
          aria-label={title}
          title={title}
        >
          <SelectedOption
            selectedOption={selectedOption}
            placeholder={placeholder}
          />
        </Button>
      </DrawerTrigger>
      <DrawerTitle className="hidden">Select an option</DrawerTitle>
      <DrawerContent>
        <DialogDescription className="hidden">
          Search and select an option from the list
        </DialogDescription>
        <div className="mt-4 border-t">
          <OptionList
            options={options}
            selectedOption={selectedOption}
            setSelectedOption={onSelect}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function OptionList({
  options,
  selectedOption,
  setSelectedOption,
}: {
  options: Option[];
  selectedOption?: Option;
  setSelectedOption: (option: Option) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {options.map((option) => (
            <CommandItem
              key={option.value}
              value={option.value.toString()}
              onSelect={() => setSelectedOption(option)}
              className={cn(
                "flex flex-row items-center justify-between gap-2",
                option.value === selectedOption?.value
                  ? "bg-blue-500 text-white"
                  : "",
              )}
            >
              {option.label} {option.icon}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

function SelectedOption({
  selectedOption,
  placeholder,
}: {
  selectedOption?: Option;
  placeholder?: React.ReactNode;
}) {
  if (!selectedOption) {
    return <>{placeholder || "Select option"}</>;
  }

  return (
    <>
      {selectedOption.label} {selectedOption.icon}
    </>
  );
}
