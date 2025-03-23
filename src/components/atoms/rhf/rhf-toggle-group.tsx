import { useFormContext } from "react-hook-form";
import {
  FormLabel,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/atoms/form";
import React from "react";
import { ToggleGroup } from "@/components/atoms/toggle-group";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  label: string;
  children: React.ReactNode;
  type: "single" | "multiple";
  className?: string;
};

function RHFToggleGroup({ name, label, children, type, className }: Props) {
  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState: { error }, formState }) => {
        const { onChange } = field;
        const defaultValue =
          formState?.defaultValues && formState?.defaultValues[name]
            ? (formState.defaultValues[name] as string | Array<string>)
            : type === "single"
              ? ""
              : [];

        return (
          <FormItem className="flex flex-col space-y-0 justify-start">
            <FormLabel className="mb-1 text-xs">{label}</FormLabel>
            <FormControl>
              <ToggleGroup
                type={type}
                onValueChange={(value: never) => {
                  onChange({ target: { value } });
                }}
                defaultValue={defaultValue as never}
                value={field.value as never}
                className={cn(className, "justify-start")}
              >
                {children}
              </ToggleGroup>
            </FormControl>
            {!!error ? <FormMessage>{error.message}</FormMessage> : null}
          </FormItem>
        );
      }}
    />
  );
}

export default RHFToggleGroup;
