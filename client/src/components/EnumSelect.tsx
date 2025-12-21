import Select from "react-select";
import { generateEnumOptions } from "../utils/enum";

type EnumSelectProps<T extends string> = {
  enumObj: Record<string, T>;
  value: T;
  onChange: (value: T) => void;
  isDisabled?: boolean;
};

export function EnumSelect<T extends string>({
  enumObj,
  value,
  onChange,
  isDisabled
}: EnumSelectProps<T>) {

  const options = generateEnumOptions(enumObj);
  const selected = options.find((o) => o.value === value);

  return (
    <Select
      options={options}
      value={selected}
      isDisabled={isDisabled}
      onChange={(opt) => opt && onChange(opt.value as T)}
    />
  );
}
