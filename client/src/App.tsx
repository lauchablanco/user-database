import './styles/App.css'
import UserList from './components/UserList'
import { useAuth } from './context/AuthContext'
import { useFetchUsers } from './hooks/useFetchUsers';
import { useEffect, useState } from 'react';
import { User } from 'common-types';
import { sortOptions, sortStudents } from './utils/sortUtils';
import { hasCapacity } from './utils/permission';
import { filterEnums, generateEnumOptions } from './utils/enumUtils';
import { userServices } from './services/userServices';
import { FilterOption } from './types/filterOption';
import { RoleSelector } from './components/RoleSelector';
import UserFilter from './components/Filter';
import Sorter from './components/Sorter';
import FAB from './components/FAB';
import UserModal from './components/UserModal';
import { ConfirmModal } from './components/ConfirmModal';
import "./styles/UserList.css"


function App() {
  const { fetchedUsers, loading, error, refetch } = useFetchUsers();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[] | null>(fetchedUsers);
  const [nameFilter, setNameFilter] = useState<string>('');
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const { role } = useAuth();

  const canCreate = hasCapacity(role, "CREATE_USER");
  const canDelete = hasCapacity(role, "DELETE_USER");

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
    setShowUserModal(true);
  };

  const handleDeleteUser = async (user: User) => {
    const response = await userServices.deleteUser(user._id);
    const updatedUsers = filteredUsers?.filter(u => u._id != response.user._id);
    setFilteredUsers(updatedUsers!);
    setShowConfirmModal(false);
  };

  const handleOnSuccess = (user: User) => {
    let updatedUsers = filteredUsers;
    if (selectedUser) {
      updatedUsers = filteredUsers!.map(u => u._id === user._id ? user : u);
    } else {
      updatedUsers?.push(user)
    }
    setFilteredUsers(updatedUsers!);
    setShowUserModal(false);
  };

  const handleFilterChange = (filterName: string, val: FilterOption[]) => {
    setFiltersState(prev => ({
      ...prev,
      [filterName]: val.map(v => v.value) // Asegura siempre un array
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
      <div className='bg-school'>
        <div>
          <div className="user-list-container">
            <div className='header-bar'>
              <div className="header-left">
                <img src="/hogwarts.png" alt="Hogwarts" className="hogwarts-logo" />
              </div>
              <div className='header-right'>
                <h3 className='title'>Logged in as</h3>
                <RoleSelector />
              </div>
            </div>
            <h2 className='title'>Users List</h2>
            <div className="user-list-filter">
              <div className="filters-container">
                <input placeholder='Filter by Name' value={nameFilter} onChange={(e) => handleFilterNameChange(e)}></input>
                {filtersEntries.map(([name, enumType]) => (
                  <UserFilter
                    key={name}
                    filterName={name}
                    options={generateEnumOptions(enumType)}
                    onSelectedOptionChange={values => handleFilterChange(name, values)}
                  />
                ))}
                <Sorter selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
                <button onClick={refetch}>Refresh Data</button>

              </div>
            </div>
            {loading && <p>Loading users...</p>}
            {error && <div>
              <p>Error: {error}</p>
              <button onClick={refetch}>Reload</button>
            </div>
            }
            {!loading && !error && filteredUsers && (
              <UserList filteredUsers={filteredUsers} canDelete={canDelete} onClick={handleUserClick} onDelete={(userToDelete: User) => { setShowConfirmModal(true); setUserToDelete(userToDelete); }}></UserList>
            )}
            <FAB
              onClick={() => { setSelectedUser(null); setShowUserModal(true) }}
              disabled={!canCreate}
            />
            {showUserModal && <UserModal readOnly={!canCreate} user={selectedUser} onClose={() => { setSelectedUser(null); setShowUserModal(false); }} onSuccess={handleOnSuccess} />}
            {showConfirmModal && (
              <ConfirmModal
                onConfirm={() => handleDeleteUser(userToDelete!)}
                onCancel={() => setShowConfirmModal(false)}
              />
            )}

          </div>
        </div>
      </div>
  )
}

export default App
