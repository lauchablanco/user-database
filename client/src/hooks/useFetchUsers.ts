import { useState, useEffect } from "react";
import { User } from "common-types";
import { mapUserFromApi, userServices } from "../services/userServices";

type UseFetchUsersResult = {
    fetchedUsers: User[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
};

export const useFetchUsers = () : UseFetchUsersResult => {
    const [fetchedUsers, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () : Promise<void>  => {
        setLoading(true);
        try {
            //TODO: use userServices
            const data = await userServices.getUsers();
            const users = data.map(mapUserFromApi);
            setUsers(users);
            setError(null);

        } catch (error) {
            console.error("Error fetching users:", error);
            setError(error instanceof Error ? error.message : "Unknown error");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return { fetchedUsers, loading, error, refetch: fetchUsers };
}