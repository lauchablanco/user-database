import React from "react";
import "../styles/UserPill.css";
import { User } from "common-types";

interface UserPillProps {
  user: User;
  disabled: boolean;
  onClick: () => void;
  onDelete: (user: User) => void;
}

const UserPill: React.FC<UserPillProps> = ({ user, disabled, onClick, onDelete }) => {
  const profilePicture = user.profilePicture || `../../public/default-profile-${user.gender.toLowerCase()}.jpg`; // Imagen local en public/images
  return (
    <div className={`user-pill ${user.house.toLowerCase()}`} onClick={onClick}>
      {/* Profile Picture */}
      <img src={profilePicture} alt={user.fullName + ' profile picture.'} className="profile-pic" />

      {/* User Info */}
      <div className="user-info">
        <p className="user-name">{user.fullName}</p>
        <p className="user-role">{user.role}</p>
        <p className="user-email">{user.email}</p>
      </div>

      {/* Hogwarts House*/}
      <img src={`../../public/${user.house}.png`} alt={user.house} className="user-house" />
      <button disabled={disabled} className={`delete-icon ${disabled ? "fab-disabled" : ""}`} onClick={(e) => { e.stopPropagation(); onDelete(user); }}>🗑️</button>
    </div>
  );
};

export default UserPill;