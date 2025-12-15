import { Gender, House, Pet, Role, User } from 'common-types';
import React, { useEffect, useRef, useState } from 'react';
import "../styles/userModal.css";
import { UserForm } from '../types/permissions';
import { EnumSelect } from './EnumSelect';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { userServices } from '../services/userServices';

interface UserModalProps {
  user: User | null;      // null = create mode
  onClose: () => void;
  onSuccess: (user: User) => void;
  readOnly?: boolean;
}

const UserModal: React.FC<UserModalProps> = ({ user, onClose, onSuccess, readOnly = false }) => {

  // if existing user → edit. If not → create.
  const [formData, setFormData] = useState<UserForm>(() =>
    user ?? {
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

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(
    formData.profilePicture ?? ""
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

  const handleOnClick = async () => {
    if (formData?._id) {
      const response = await userServices.updateUser(formData);
      onSuccess(response.user);
    } else {
      const response = await userServices.createUser(formData!);
      onSuccess(response.user)
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  }

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        <button className="close-button" onClick={onClose}>✖</button>

        {/* Profile Picture: Invisible file input to change the image */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <img
          src={
            previewUrl ||
            profilePicture
          }
          alt="Profile"
          className={`profile-pic ${!readOnly ? "clickable" : ""}`}
          onClick={() => {
            if (!readOnly) {
              fileInputRef.current?.click();
            }
          }}
        />

        {/* Name */}
        <div className="form-row">
          <label>Name</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={handleChange("fullName")}
            readOnly={readOnly}
          />
        </div>

        {/* Birthday */}
        <div className="form-row">
          <label>Birth Date</label>
          <DatePicker selected={formData.birthDate ? new Date(formData.birthDate) : null}
            onChange={(date) =>
              setFormData({ ...formData, birthDate: date! })
            }
            readOnly={readOnly}
          />
        </div>

        {/* Email */}
        <div className="form-row">
          <label>Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={handleChange("email")}
            readOnly={readOnly}
          />
        </div>

        {/* House */}
        <div className="form-row">
          <label>House</label>
          <EnumSelect enumObj={House} value={formData.house!} onChange={handleHouseChange} isDisabled={readOnly} />
        </div>

        {/* Role */}
        <div className="form-row">
          <label>Role</label>
          <EnumSelect enumObj={Role} value={formData.role!} onChange={handleRoleChange} isDisabled={readOnly} />
        </div>

        {/* Pet */}
        <div className="form-row">
          <label>Pet</label>
          <EnumSelect enumObj={Pet} value={formData.pet!} onChange={handlePetChange} isDisabled={readOnly} />
        </div>

        {/* Gender */}
        <div className="form-row">
          <label>Gender</label>
          <EnumSelect enumObj={Gender} value={formData.gender!} onChange={handleGenderChange} isDisabled={readOnly} />
        </div>

        {/* Save button */}
        <button disabled={readOnly} className="save-button" onClick={handleOnClick}>
          {user ? "Save Changes" : "Create User"}
        </button>


      </div>
    </div>
  );
};

export default UserModal;
