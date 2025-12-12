import React from 'react';
import UserPill from './UserPill';
import { User } from 'common-types';

interface UserListProps {
  filteredUsers: User[];
  canDelete: boolean;
  onClick: (user:User) => void;
  onDelete: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ filteredUsers, canDelete, onClick, onDelete }) => {
    return (
        <div>
            <ul>
                {filteredUsers.map((user: User) => (
                    <UserPill key={user._id} user={user} canDelete={canDelete} onClick={() => onClick(user)} onDelete={onDelete} />
                ))}
            </ul>
        </div>
    );
};

export default UserList;