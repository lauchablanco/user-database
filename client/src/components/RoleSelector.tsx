import Select from "react-select";
import { useAuth } from "../context/AuthContext";
import { Role } from "common-types";

export function RoleSelector() {
  const { role, setRole } = useAuth();
  const options = Object.values(Role).map((rol) => { return { value: rol, label: rol } });
  const selectedOption = options.find((opt) => opt.value === role);
  return (
    <Select
      options={options}
      value={selectedOption}
      onChange={(option) => option && setRole(option.value)}
    >
    </Select>
  );
}
