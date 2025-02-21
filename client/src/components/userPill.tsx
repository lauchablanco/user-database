import React from "react";
import "../styles/userPill.css"; // Importamos los estilos
import { User } from "common-types";

const UserPill: React.FC<{ user: User }> = ({ user }) => {
    const profilePicture = user.profilePicture ? user.profilePicture : "../../public/default-profile-man.jpg"; // Imagen local en public/images
  return (
    <div className={`user-pill ${user.house.toLowerCase()}`}>
      {/* Foto de perfil */}
      <img src={profilePicture} alt={user.fullName + ' profile picture.'} className="profile-pic" />

      {/* Info de usuario */}
      <div className="user-info">
        <p className="user-name">{user.fullName}</p>
        <p className="user-email">{user.email}</p>
      </div>

      {/* Casa de Hogwarts */}
      <img src={`../../public/${user.house}.png`} alt={user.house} className="user-house" />
    </div>
  );
};

export default UserPill;