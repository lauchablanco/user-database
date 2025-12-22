import './styles/App.css'
import UserList from './components/UserList'
import { useAuth } from './context/AuthContext'
import { useFetchUsers } from './hooks/useFetchUsers';
import { useEffect, useMemo, useState } from 'react';
import { User } from 'common-types';
import { applyFiltersAndSort, createFormData, sortOptions } from './utils/user';
import { hasCapacity } from './utils/permission';
import { filterEnums, generateEnumOptions } from './utils/enum';
import { userServices } from './services/userServices';
import { FilterOption } from './types/filterOption';
import UserFilter from './components/Filter';
import Sorter from './components/Sorter';
import FAB from './components/FAB';
import UserModal from './components/UserModal';
import { ConfirmModal } from './components/ConfirmModal';
import "./styles/UserList.css"
import { UserForm } from './types/permissions';
import Header from './components/Header';


function App() {
  const { fetchedUsers, loading, error, refetch } = useFetchUsers();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[] | null>(fetchedUsers);
  const [nameFilter, setNameFilter] = useState<string>('');
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [confirmModal, setConfirmModal] = useState<{
    mode: "warning" | "error";
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);
  const { role } = useAuth();

  const canCreate = hasCapacity(role, "CREATE_USER");
  const canDelete = hasCapacity(role, "DELETE_USER");

  const filtersEntries = Object.entries(filterEnums);
  const filtersKeys = Object.keys(filterEnums);

  const [filtersState, setFiltersState] = useState<Record<string, string[]>>(
    filtersKeys.reduce((acc, key) => ({ ...acc, [key]: [] }), {})
  );

  const filteredUsers = useMemo(() => {
    const filtUsers = applyFiltersAndSort(users, nameFilter, filtersState, selectedSort);
    return filtUsers;
  }, [nameFilter, filtersState, users, selectedSort]);

  const handleFilterNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameFilter = e.target.value;
    setNameFilter(nameFilter);
  }

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleDeleteUser = async (userId: string) => {
    try {

      const response = await userServices.deleteUser(userId, role);
      const updatedUsers = users?.filter(u => u._id != response.user._id);
      setUsers(updatedUsers!);
      setShowConfirmModal(false);

    } catch (err: any) {
      setConfirmModal({
        mode: "error",
        title: "Delete failed",
        message: err.message,
        onConfirm: () => { setConfirmModal(null); setShowConfirmModal(false); }
      });
    }

  };

  const handleSubmitUser = async (formData: UserForm, file: File | null) => {
    try {
      setServerError(null);

      const data = createFormData(formData, file);

      const user = formData._id
        ? await userServices.updateUser(formData._id, data, role)
        : await userServices.createUser(data, role);

      handleOnSuccess(user);

    } catch (err: any) {
      //Network error
      if (err instanceof TypeError) {
        setServerError("Server is unreachable. Please try again later.");
        return;
      }

      //API error
      if (err?.message) {
        setServerError(err.message);
        return;
      }

      //others
      setServerError("Something went wrong. Please try again.");
    }
  };

  const handleOnDelete = (user: User) => {
    setConfirmModal({
      mode: "warning",
      title: "Delete user",
      message: "Are you sure you want to delete this user?",
      onConfirm: () => handleDeleteUser(user._id),
    });
    setShowConfirmModal(true);
    setUserToDelete(userToDelete);
  }

  const handleOnSuccess = (user: User) => {
    const updatedUsers = selectedUser
      ? users!.map(u => u._id === user._id ? { ...user } : u)
      : [...users!, { ...user }];

    setUsers(updatedUsers);
    setShowUserModal(false);
  };

  const handleFilterChange = (filterName: string, val: FilterOption[]) => {
    setFiltersState(prev => ({
      ...prev,
      [filterName]: val.map(v => v.value) // Asegura siempre un array
    }));
  };

  useEffect(() => { setUsers(fetchedUsers) }, [fetchedUsers]);

  return (
    <>
      <Header />

      <main className="app-content">
        <div className='bg-school'>
          <div className="user-list-container">
            <div className="page-title">
              <h2 className="title">Users List</h2>
              <img
                src="/hogwarts.png"
                alt="Hogwarts"
                className="title-logo"
              />
            </div>
            <div className="user-list-filter">
              <div className="filters-container">
                <input
                  placeholder="Filter by Name"
                  value={nameFilter}
                  onChange={handleFilterNameChange}
                />

                {filtersEntries.map(([name, enumType]) => (
                  <UserFilter
                    key={name}
                    filterName={name}
                    options={generateEnumOptions(enumType)}
                    onSelectedOptionChange={(values) =>
                      handleFilterChange(name, values)
                    }
                  />
                ))}

                <Sorter
                  selectedSort={selectedSort}
                  setSelectedSort={setSelectedSort}
                />

                <button onClick={refetch}>Refresh Data</button>
              </div>
            </div>

            {loading && <p>Loading users...</p>}

            {error && (
              <div>
                <p>Error: {error}</p>
                <button onClick={refetch}>Reload</button>
              </div>
            )}

            {!loading && !error && users && (
              <UserList
                users={filteredUsers!}
                canDelete={canDelete}
                onClick={handleUserClick}
                onDelete={handleOnDelete}
              />
            )}

            <FAB
              onClick={() => {
                setSelectedUser(null);
                setShowUserModal(true);
              }}
              disabled={!canCreate}
            />

            {showUserModal && (
              <UserModal
                serverError={serverError}
                readOnly={!canCreate}
                user={selectedUser}
                onClose={() => {
                  setSelectedUser(null);
                  setShowUserModal(false);
                }}
                onSubmit={handleSubmitUser}
              />
            )}

            {showConfirmModal && confirmModal && (
              <ConfirmModal
                mode={confirmModal.mode}
                title={confirmModal.title}
                message={confirmModal.message}
                onConfirm={confirmModal.onConfirm}
                onClose={() => setConfirmModal(null)}
              />
            )}
          </div>
        </div>
      </main>
    </>

  )
}

export default App
