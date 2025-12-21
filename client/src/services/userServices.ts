import { Role } from "common-types";
import { mapUserFromApi } from "../utils/user";

const API_URL = import.meta.env.VITE_HOGWARTS_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const userServices = {
  async getUsers() {
    const res = await fetch(`${API_URL}/users`);
    if (!res.ok) {
      const { message, errors } = await res.json();
      throw { message, errors, status: res.status };
    }
    const data = await res.json();
    return data.map(mapUserFromApi);
  },

  async getUser(id: string) {
    const res = await fetch(`${API_URL}/users/${id}`);
    if (!res.ok) {
      const { message, errors } = await res.json();
      throw { message, errors, status: res.status };
    }
    return res.json();
  },

  async createUser(formData: FormData, role: Role) {
    const res = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "x-api-key": API_KEY,
        "x-user-role": role
      },
      body: formData
    });
    if (!res.ok) {
      const { message, errors } = await res.json();
      throw { message, errors, status: res.status };
    }
    const data = await res.json()
    return mapUserFromApi(data.user);
  },

  async updateUser(id: string, formData: FormData, role: Role) {
    const res = await fetch(`${API_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "x-api-key": API_KEY,
        "x-user-role": role
      },
      body: formData
    });
    if (!res.ok) {
      const { message, errors } = await res.json();
      throw { message, errors, status: res.status };
    }
    const data = await res.json()
    return mapUserFromApi(data.user);
  },

  async deleteUser(id: string, role: Role) {
    const res = await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        "x-api-key": API_KEY,
        "x-user-role": role
      }
    });
    if (!res.ok) {
      const { message, errors } = await res.json();
      throw { message, errors, status: res.status };
    }
    return res.json();
  }
};