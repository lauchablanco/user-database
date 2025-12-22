import { useAuth } from "../context/AuthContext";
import { Role } from "common-types";
import { EnumSelect } from "./EnumSelect";
import { generateEnumOptions } from "../utils/enum";

export function RoleSelector() {
  const { role, setRole } = useAuth();
  const options = generateEnumOptions(Role);
  const selectedOption = options.find((opt) => opt.value === role);
  const handleChange = (role: Role) => {
    setRole(role);
  };

  return (
   <EnumSelect enumObj={Role} onChange={handleChange} value={selectedOption!.value as Role}/>
  );
}

export default RoleSelector;