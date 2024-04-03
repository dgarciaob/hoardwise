import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type BudgetFormProps = {
  disabled: boolean;
  onValueChange: (...event: any[]) => void;
  defaultValue: string;
  budgetOptions: {
    id: string;
    name: string;
    userId: string;
    amount: number;
    startDate: Date;
    endDate: Date;
  }[];
};

export const BudgetSelection = ({
  disabled,
  onValueChange,
  defaultValue,
  budgetOptions,
}: BudgetFormProps) => {
  return (
    <Select
      disabled={disabled}
      onValueChange={onValueChange}
      defaultValue={defaultValue}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select Budget" />
      </SelectTrigger>
      <SelectContent>
        {budgetOptions.map((option) => (
          <SelectGroup key={option.id}>
            <SelectItem value={option.id}>{option.name}</SelectItem>
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
};
