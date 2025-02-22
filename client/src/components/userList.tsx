import React, { useState } from 'react';
import { useFetchUsers } from '../hooks/useFetchUsers';
import UserPill from './UserPill';
import UserModal from './UserModal';
import { User } from 'common-types';

const UserList: React.FC = () => {

    const { users, loading, error, refetch } = useFetchUsers();
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const handleUserClick = (user:User) => {
      setSelectedUser(user);
    };
    
    return (
        <div>
            <h2>Users List</h2>
            <button onClick={refetch}>Reload</button>
            {loading && <p>Loading users...</p>}
            {error && <p>Error: {error}</p>}

            {!loading && !error && (
                <ul>
                    {users.map((user) => (
                        <UserPill key={user._id} user={user} onClick={() => handleUserClick(user)}/>
                    ))}
                </ul>
            )}
            {selectedUser && <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />}
        </div>
    );
};

export default UserList;