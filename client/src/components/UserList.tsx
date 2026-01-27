import React from 'react';
import UserPill from './UserPill';
import { User } from 'common-types';

interface UserListProps {
  users: User[];
  canDelete: boolean;
  onClick: (user:User) => void;
  onDelete: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ users, canDelete, onClick, onDelete }) => {
    return (
        <div>
            <ul>
                {users.map((user: User) => (
                    <UserPill key={user._id} user={user} canDelete={canDelete} onClick={() => onClick(user)} onDelete={onDelete} />
                ))}
            </ul>
        </div>
    );
};

export default UserList;