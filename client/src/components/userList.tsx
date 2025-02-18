import React from 'react';
import { useFetchUsers } from '../hooks/useFetchUsers';
import UserPill from './userPill';

const UserList: React.FC = () => {
    
    const { users, loading, error, refetch } = useFetchUsers();

    if (loading) return <p>Loading users...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Users List</h2>
            <button onClick={refetch}>Reload</button>
            <ul>
                {users.map((user) => (
                    <UserPill user={user} />
                ))}
            </ul>
        </div>
    );
};

export default UserList;