import React from 'react';
import { useFetchUsers } from '../hooks/useFetchUsers';
import UserPill from './userPill';

const UserList: React.FC = () => {

    const { users, loading, error, refetch } = useFetchUsers();

    return (
        <div>
            <h2>Users List</h2>
            <button onClick={refetch}>Reload</button>
            {loading && <p>Loading users...</p>}
            {error && <p>Error: {error}</p>}

            {!loading && !error && (
                <ul>
                    {users.map((user) => (
                        <UserPill key={user._id} user={user} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserList;