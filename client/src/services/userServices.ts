import { UserForm } from "../types/permissions";

const API_URL = import.meta.env.VITE_HOGWARTS_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

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

  async createUser(user: UserForm) {
    const res = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY
      },
      body: JSON.stringify(user)
    });
    if (!res.ok) throw new Error("Failed to create user");
    return res.json();
  },

  async updateUser(user: UserForm) {
    const res = await fetch(`${API_URL}/users/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY
      },
      body: JSON.stringify(user)
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
