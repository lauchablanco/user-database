import { UserForm } from "../types/permissions";

const API_URL = import.meta.env.VITE_HOGWARTS_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const createFormData = (userForm: UserForm, selectedFile: File | null) => {
  const data = new FormData();

  data.append("fullName", userForm.fullName!);
  data.append("email", userForm.email!);
  data.append("house", userForm.house!);
  data.append("role", userForm.role!);
  data.append("pet", userForm.pet!);
  data.append("gender", userForm.gender!);
  
  if (userForm.birthDate) {
    data.append("birthDate", userForm.birthDate.toISOString());
  }

  if (selectedFile) {
    data.append("profilePicture", selectedFile);
  }

  return data;
}

export const userServices = {
  async getUsers() {
    const res = await fetch(`${API_URL}/users`);
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
  },

  async getUser(id: string) {
    const res = await fetch(`${API_URL}/users/${id}`);
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
  },

  async createUser(formData: FormData) {
    const res = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "x-api-key": API_KEY
      },
      body: formData
    });
    if (!res.ok) throw new Error("Failed to create user");
    return res.json();
  },

  async updateUser(id: string, formData: FormData) {
    const res = await fetch(`${API_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "x-api-key": API_KEY
      },
      body: formData
    });
    if (!res.ok) throw new Error("Failed to update user");
    return res.json();
  },

  async deleteUser(id: string) {
    const res = await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        "x-api-key": API_KEY
      }
    });
    if (!res.ok) throw new Error("Failed to delete user");
    return res.json();
  }
};