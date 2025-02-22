import { useState, useEffect } from "react";
import { resolveErrorMessage } from "../utils/errorsUtils";
import { User } from "common-types";

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
            const response = await fetch('/users');  // With the proxy it's gonna be http://localhost:5000/users
            if (!response.ok) {
                throw new Error(await resolveErrorMessage(response));
            }

            const data = await response.json();
            setUsers(data);
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