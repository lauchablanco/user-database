import { Gender, House, Pet, Role, User } from 'common-types';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import "../styles/userModal.css";
import { UserForm } from '../types/permissions';
import { EnumSelect } from './EnumSelect';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormErrors } from '../types/errors';
import { validateUserForm } from '../utils/errors';

interface UserModalProps {
  user: User | null;
  readOnly?: boolean;
  onClose: () => void;
  onSubmit: (formData: UserForm, file: File | null) => Promise<void>;
  serverError: string | null;
}


const UserModal: React.FC<UserModalProps> = ({ user, onClose, onSubmit, serverError, readOnly = false }) => {
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
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors | null>({});

  const IMAGES_URL = `${import.meta.env.VITE_HOGWARTS_IMAGES_URL}`;

  const getDefaultProfilePicture = (gender: Gender) => {
    return `${IMAGES_URL}/default-profile-${gender.toLocaleLowerCase()}.jpg`
  }

  const profileImageSrc = useMemo(() => {
    if (selectedFile) {
      return URL.createObjectURL(selectedFile);
    }

    if (formData.profilePicture) {
      return `${IMAGES_URL}/${formData.profilePicture}`;
    }

    return getDefaultProfilePicture(formData.gender!);
  }, [selectedFile, formData.profilePicture, formData.gender]);

  // this function will might replace the other 4
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
    setErrors(null)
    const validationErrors = validateUserForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setErrors(validationErrors);
    await onSubmit(formData, selectedFile);
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

  //Auto scroll to server error message
  const serverErrorRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (serverError && serverErrorRef.current) {
      serverErrorRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, [serverError]);

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
          src={profileImageSrc}
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
          <div className="input-wrapper">
            <input
              type="text"
              value={formData.fullName}
              onChange={handleChange("fullName")}
              readOnly={readOnly}
              className={errors?.fullName ? "input-error" : ""}
            />
            {errors?.fullName && <span className="error-text">{errors.fullName}</span>}
          </div>
        </div>

        {/* Birthday */}
        <div className="form-row">
          <label>Birth Date</label>
          <div className="input-wrapper">
            <DatePicker selected={formData.birthDate ? new Date(formData.birthDate) : null}
              onChange={(date) =>
                setFormData({ ...formData, birthDate: date! })
              }
              readOnly={readOnly}
            />
            {errors?.birthDate && <span className="error-text">{errors.birthDate}</span>}
          </div>
        </div>

        {/* Email */}
        <div className="form-row">
          <label>Email</label>
          <div className="input-wrapper">
            <input
              type="email"
              value={formData.role === Role.GHOST ? "It's a Ghost!" : formData.email}
              onChange={handleChange("email")}
              readOnly={readOnly || formData.role === Role.GHOST}
              className={errors?.email ? "input-error" : ""}
            />
            {errors?.email && <span className="error-text">{errors.email}</span>}
          </div>
        </div>

        {/* House */}
        <div className="form-row">
          <label>House</label>
          <EnumSelect enumObj={House} value={formData.house} onChange={handleHouseChange} isDisabled={readOnly} />
        </div>

        {/* Role */}
        <div className="form-row">
          <label>Role</label>
          <EnumSelect enumObj={Role} value={formData.role} onChange={handleRoleChange} isDisabled={readOnly} />
        </div>

        {/* Pet */}
        <div className="form-row">
          <label>Pet</label>
          <EnumSelect enumObj={Pet} value={formData.pet} onChange={handlePetChange} isDisabled={readOnly} />
        </div>

        {/* Gender */}
        <div className="form-row">
          <label>Gender</label>
          <EnumSelect enumObj={Gender} value={formData.gender} onChange={handleGenderChange} isDisabled={readOnly} />
        </div>

        {/* Save button */}
        <button disabled={readOnly} className="save-button" onClick={handleOnClick}>
          {user ? "Save Changes" : "Create User"}
        </button>

        {serverError && (
          <div ref={serverErrorRef} className="server-error">
            {serverError}
          </div>
        )}

      </div>
    </div>
  );
};

export default UserModal;
