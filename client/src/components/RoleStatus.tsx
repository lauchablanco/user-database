import { useAuth } from "../context/AuthContext";

export function RoleStatus() {
  const { role } = useAuth();

  return (
    <span style={{ fontSize: "0.85rem", opacity: 0.75 }}>
      Logged in as <strong>{role}</strong>
    </span>
  );
}