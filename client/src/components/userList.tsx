import React, { useState } from 'react';
import { useFetchUsers } from '../hooks/useFetchUsers';
import UserPill from './UserPill';
import UserModal from './UserModal';
import { User } from 'common-types';

const UserList: React.FC = () => {

    const { fetchedUsers, loading, error, refetch } = useFetchUsers();
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [nameFilter, setNameFilter] = useState<string>('');

    const handleFilterNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameFilter(e.target.value);
    }

    const handleUserClick = (user: User) => {
        setSelectedUser(user);
    };

    const filteredUsers = fetchedUsers.filter(user => user.fullName.toLowerCase().includes(nameFilter.toLowerCase()));

    return (
        <div className="user-list-container">
            <h2>Users List</h2>
            <div className="user-list-header">
                <button onClick={refetch}>Reload</button>
            </div>
            <div className="user-list-filter">
                <input placeholder='Filter by Name' value={nameFilter} onChange={(e) => handleFilterNameChange(e)}></input>
            </div>
            {loading && <p>Loading users...</p>}
            {error && <p>Error: {error}</p>}

            {!loading && !error && filteredUsers && (
                <ul>
                    {filteredUsers.map((user: User) => (
                        <UserPill key={user._id} user={user} onClick={() => handleUserClick(user)} />
                    ))}
                </ul>
            )}
            {selectedUser && <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />}
        </div>
    );
};

export default UserList;