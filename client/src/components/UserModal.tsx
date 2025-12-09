import { Gender, House, Pet, Role, User } from 'common-types';
import React, { useState } from 'react';
import "../styles/userModal.css";
import { UserForm } from '../types/permissions';
import { EnumSelect } from './EnumSelect';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface UserModalProps {
  user: User | null;      // null = create mode
  onClose: () => void;
  readOnly?: boolean;      // después lo vas a manejar con permisos
}

const UserModal: React.FC<UserModalProps> = ({ user, onClose, readOnly = false }) => {

  // Si user existe → editar. Si no → crear usuario nuevo.
  const [formData, setFormData] = useState<UserForm>(() =>
    user ?? {
      _id: "",
      fullName: "",
      email: "",
      birthDate: new Date(),
      house: House.Gryffindor,
      role: Role.STUDENT,
      pet: Pet.Cat,
      gender: Gender.Male,
      profilePicture: ""
    }
  );

  const profilePicture = formData.profilePicture ||
    `../../public/default-profile-${formData.gender?.toLowerCase()}.jpg`;


  // this function will replace the other 4
  const handleChange = (field: keyof User) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: e.target.value });
    };

  const handleHouseChange = (house: House) => {
    setFormData({ ...formData, house });
  };

  const handlePetChange = (pet: Pet) => {
    setFormData({ ...formData, pet });
  };

  const handleRoleChange = (role: Role) => {
    setFormData({ ...formData, role });
  };

  const handleGenderChange = (gender: Gender) => {
    setFormData({ ...formData, gender });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        <button className="close-button" onClick={onClose}>✖</button>

        {/* Foto */}
        <img src={profilePicture} alt="Profile" className="profile-pic" />

        {/* Nombre */}
        <p>
          <label>Full Name</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={handleChange("fullName")}
            readOnly={readOnly}
          />
        </p>

        {/* Fecha nacimiento */}
        <p>
          <label>Birth Date</label>
          <DatePicker selected={formData.birthDate ? new Date(formData.birthDate) : null}
            onChange={(date) =>
              setFormData({ ...formData, birthDate: date! })
            }
            readOnly={readOnly}
          />
        </p>

        {/* Email */}
        <p>
          <label>Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={handleChange("email")}
            readOnly={readOnly}
          />
        </p>

        {/* House */}
        <p>
          <label>House</label>
          <EnumSelect enumObj={House} value={formData.house!} onChange={handleHouseChange} isDisabled={readOnly} />
        </p>

        {/* Role */}
        <p>
          <label>Role</label>
          <EnumSelect enumObj={Role} value={formData.role!} onChange={handleRoleChange} isDisabled={readOnly} />
        </p>

        {/* Pet */}
        <p>
          <label>Pet</label>
          <EnumSelect enumObj={Pet} value={formData.pet!} onChange={handlePetChange} isDisabled={readOnly} />
        </p>

        {/* Gender */}
        <p>
          <label>Gender</label>
          <EnumSelect enumObj={Gender} value={formData.gender!} onChange={handleGenderChange} isDisabled={readOnly} />
        </p>

        {/* Save button solo si no está en readOnly */}

        <button disabled={readOnly} className="save-button">
          {user ? "Save Changes" : "Create User"}
        </button>


      </div>
    </div>
  );
};

export default UserModal;
