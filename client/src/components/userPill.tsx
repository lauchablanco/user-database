import React from "react";
import "../styles/userPill.css"; // Importamos los estilos
import { User } from "common-types";

const UserPill: React.FC<{ user: User }> = ({ user }) => {
    const defaultProfilePic = "../../public/default-profile-man.jpg"; // Imagen local en public/images
  return (
    <div className={`user-pill ${user.house.toLowerCase()}`}>
      {/* Foto de perfil */}
      <img src={defaultProfilePic} alt={user.fullName + ' profile picture.'} className="profile-pic" />

      {/* Info de usuario */}
      <div className="user-info">
        <p className="user-name">{user.fullName}</p>
        <p className="user-email">{user.email}</p>
      </div>

      {/* Casa de Hogwarts */}
      <span className="user-house">{user.house}</span>
    </div>
  );
};

export default UserPill;