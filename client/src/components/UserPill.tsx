import React from "react";
import "../styles/UserPill.css";
import { User } from "common-types";

interface UserPillProps {
  user: User;
  canDelete: boolean;
  onClick: () => void;
  onDelete: (user: User) => void;
}

const UserPill: React.FC<UserPillProps> = ({ user, canDelete, onClick, onDelete }) => {
  const IMAGES_URL = import.meta.env.VITE_HOGWARTS_IMAGES_URL;
  const profilePictureUrl = user.profilePicture ? `${IMAGES_URL}/${user.profilePicture}` : `${IMAGES_URL}/default-profile-${user.gender.toLowerCase()}.jpg`;
  const housePictureUrl = `${IMAGES_URL}/${user.house}.png`;
  return (
    <div className={`user-pill ${user.house.toLowerCase()}`} onClick={onClick}>
      {/* Profile Picture */}
      <img src={profilePictureUrl} alt={user.fullName + ' profile picture.'} className="profile-pic" />

      {/* User Info */}
      <div className="user-info">
        <p className="user-name">{user.fullName}</p>
        <p className="user-role">{user.role}</p>
        <p className="user-email">{user.email}</p>
      </div>

      {/* Hogwarts House*/}
      <img src={housePictureUrl} alt={user.house} className="user-house" />
      <button disabled={!canDelete} className={`delete-icon ${canDelete ? "" : "delete-button-disabled"}`} onClick={(e) => { e.stopPropagation(); onDelete(user); }}>🗑️</button>
    </div>
  );
};

export default UserPill;