import React, { useEffect, useState } from 'react';
import { useFetchUsers } from '../hooks/useFetchUsers';
import UserPill from './UserPill';
import UserModal from './UserModal';
import { User, House, Gender } from 'common-types';
import UserFilter from './Filter';
import { FilterOption } from '../types/filterOption';
import { genderOptions, houseOptions } from '../utils/enumUtils';

const UserList: React.FC = () => {

    const { fetchedUsers, loading, error, refetch } = useFetchUsers();
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [filteredUsers, setFilteredUsers] = useState<User[] | null>(fetchedUsers);
    const [nameFilter, setNameFilter] = useState<string>('');
    const [houseFilter, setHouseFilter] = useState<House[]>([]);
    const [genderFilter, setGenderFilter] = useState<Gender[]>([]);

    const handleFilterNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const nameFilter = e.target.value;
        setNameFilter(nameFilter);
    }

    const handleUserClick = (user: User) => {
        setSelectedUser(user);
    };

    const handleSelectedHouseChange = (selectedHouses: FilterOption[]) => {
        const selectedHousesFilter = selectedHouses.map(sh => sh.label as House);
        setHouseFilter(selectedHousesFilter);
    }

    const handleSelectedGenderChange = (selectedGenders: FilterOption[]) => {
        const selectedGenderFilter = selectedGenders.map(sg => sg.label as Gender);
        setGenderFilter(selectedGenderFilter);
    }

    useEffect(() => { setFilteredUsers(fetchedUsers) }, []);


    useEffect(() => {
        let result = fetchedUsers;
        // name filter
        if (nameFilter) {
            result = result.filter((user) =>
                user.fullName.toLowerCase().includes(nameFilter.toLowerCase())
            );
        }

        // house filter
        if (houseFilter.length > 0) {
            result = result.filter((user) => houseFilter.includes(user.house));
        }

        if (genderFilter.length > 0) {
            result = result.filter((user) => genderFilter.includes(user.gender));
        }

        setFilteredUsers(result);
    }, [nameFilter, houseFilter, genderFilter, fetchedUsers]);  // on filters change

    return (
        <div className="user-list-container">
            <h2>Users List</h2>
            <div className="user-list-header">
                <button onClick={refetch}>Reload</button>
            </div>
            <div className="user-list-filter">
                <input placeholder='Filter by Name' value={nameFilter} onChange={(e) => handleFilterNameChange(e)}></input>
                <UserFilter filterName='House' options={houseOptions} onSelectedOptionChange={handleSelectedHouseChange}></UserFilter>
                <UserFilter filterName='Gender' options={genderOptions} onSelectedOptionChange={handleSelectedGenderChange}></UserFilter>
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