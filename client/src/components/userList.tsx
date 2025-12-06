import React, { useEffect, useState } from 'react';
import { useFetchUsers } from '../hooks/useFetchUsers';
import UserPill from './UserPill';
import UserModal from './UserModal';
import { User } from 'common-types';
import UserFilter from './Filter';
import { FilterOption } from '../types/filterOption';
import { filterEnums, generateOptions } from '../utils/enumUtils';
import "../styles/UserList.css"
import { sortOptions, sortStudents } from '../utils/sortUtils';
import Sorter from './Sorter';
import { useAuth } from '../context/AuthContext';
import { RoleSelector } from './RoleSelector';
import { permissionsRecord } from '../types/permissions';
import FAB from './FAB';

const UserList: React.FC = () => {

    const { fetchedUsers, loading, error, refetch } = useFetchUsers();
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [filteredUsers, setFilteredUsers] = useState<User[] | null>(fetchedUsers);
    const [nameFilter, setNameFilter] = useState<string>('');
    const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
    const { role } = useAuth();

    const canCreate = role && permissionsRecord[role].includes("CREATE_USER");

    const filtersEntries = Object.entries(filterEnums);
    const filtersKeys = Object.keys(filterEnums);

    const [filtersState, setFiltersState] = useState<Record<string, string[]>>(
        filtersKeys.reduce((acc, key) => ({ ...acc, [key]: [] }), {})
    );

    const handleFilterNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const nameFilter = e.target.value;
        setNameFilter(nameFilter);
    }

    const handleUserClick = (user: User) => {
        setSelectedUser(user);
    };

    const handleFilterChange = (filterName: string, val: FilterOption[]) => {
        setFiltersState(prev => ({
            ...prev,
            [filterName]: val.map(v => v.label) // Asegura siempre un array
        }));
    };

    useEffect(() => { setFilteredUsers(fetchedUsers) }, []);


    useEffect(() => {
        let result = fetchedUsers;
        // name filter
        if (nameFilter) {
            result = result.filter((user) =>
                user.fullName.toLowerCase().includes(nameFilter.toLowerCase())
            );
        }

        result = filtersKeys.reduce((filteredUsers, filterKey) => {
            const filterValues = filtersState[filterKey]; //obtengo filtros seleccionados

            if (filterValues.length === 0) return filteredUsers; // Si no hay filtros activos, no hacemos nada.

            return filteredUsers.filter((user) => {
                const userValue = user[filterKey.toLowerCase() as keyof User] as string; //obtengo los valores del usuario de esa key
                return filterValues.includes(userValue); //devuelvo si el valor del usuario está incluído en el filtro
            });
        }, result); // Inicializamos `reduce` con el array original de usuarios.

        result = sortStudents(result, selectedSort);
        setFilteredUsers(result);
    }, [nameFilter, filtersState, fetchedUsers, selectedSort]);  // on filters change

    return (
        <div className="user-list-container">
            <div>
                <h2>Users List</h2>
                <h3>Logged in as {role}</h3>
                <RoleSelector></RoleSelector>
            </div>
            <div className="user-list-filter">
                <div className="filters-container">
                    <input placeholder='Filter by Name' value={nameFilter} onChange={(e) => handleFilterNameChange(e)}></input>
                    {filtersEntries.map(([name, enumType]) => (
                        <UserFilter
                            key={name}
                            filterName={name}
                            options={generateOptions(enumType)}
                            onSelectedOptionChange={values => handleFilterChange(name, values)}
                        />
                    ))}
                    <Sorter selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
                    <button onClick={refetch}>Get Data</button>

                </div>
            </div>
            {loading && <p>Loading users...</p>}
            {error && <div>
                <p>Error: {error}</p>
                <button onClick={refetch}>Reload</button>
            </div>
            }
            {!loading && !error && filteredUsers && (
                <ul>
                    {filteredUsers.map((user: User) => (
                        <UserPill key={user._id} user={user} onClick={() => handleUserClick(user)} />
                    ))}
                </ul>
            )}
            {selectedUser && <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />}
            {canCreate && <FAB
                onClick={() => console.log("Open modal")}
                disabled={!canCreate}
            />}
        </div>
    );
};

export default UserList;