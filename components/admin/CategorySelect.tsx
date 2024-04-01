import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type CategoryFormProps = {
  disabled: boolean;
  onValueChange: (...event: any[]) => void;
  defaultValue: string;
  options: { id: string; name: string }[];
};

export const CategorySelection = ({
  disabled,
  onValueChange,
  defaultValue,
  options,
}: CategoryFormProps) => {
  return (
    <Select
      disabled={disabled}
      onValueChange={onValueChange}
      defaultValue={defaultValue}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select Category" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectGroup key={option.id}>
            <SelectItem value={option.id}>{option.name}</SelectItem>
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
};
