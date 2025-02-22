import { User } from 'common-types';
import React, { act } from 'react';
import "../styles/userModal.css";
import { dateFormatter } from '../utils/dateUtils';


interface UserModalProps {
  user: User,
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ user, onClose }) => {
  const profilePicture = user.profilePicture || `../../public/default-profile-${user.gender.toLowerCase()}.jpg`; // Imagen local en public/images

  const birthDate = dateFormatter(user.birthDate);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>✖</button>
        <img src={profilePicture} alt="Profile" className="profile-pic" />
        <h2>{user.fullName}</h2>
        <p><strong>Birth Date:</strong> {birthDate}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>House:</strong> {user.house}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Pet:</strong> {user.pet}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
      </div>
    </div>
  );
}

export default UserModal;