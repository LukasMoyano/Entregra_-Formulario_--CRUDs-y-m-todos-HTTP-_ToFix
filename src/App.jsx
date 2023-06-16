import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import UsersList from './components/UsersList';
import UsersForm from './components/UsersForm';
import axios from 'axios';

const API_URL = 'https://users-crud.academlo.tech/users';

const App = () => {
  // Estado del componente
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  // Configuración del formulario usando useForm
  const { register, handleSubmit, reset } = useForm();
  const defaultValues = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    birthday: '',
    image_url: '',
  };

  // Efecto de montaje para obtener los usuarios
  useEffect(() => {
    fetchUsers();
  }, []);

  // Función asincrónica para obtener los usuarios de la API
  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.log('Error fetching users:', error);
    }
  };

  // Función asincrónica para guardar un usuario (crear o actualizar)
  const handleSaveUser = async (user) => {
    try {
      if (user.id) {
        await axios.put(`${API_URL}/${user.id}`, user);
      } else {
        await axios.post(API_URL, user);
      }
      fetchUsers(); // Actualizar la lista de usuarios después de guardar
      reset(defaultValues); // Restablecer los valores del formulario
    } catch (error) {
      console.log('Error saving user:', error);
    }
  };

  // Función para cancelar la edición de un usuario
  const handleCancelEdit = () => {
    setSelectedUser(null);
    reset(defaultValues);
  };

  // Función para editar un usuario
  const handleEditUser = (user) => {
    setSelectedUser(user);
    reset(user);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Barra de navegación */}
      <nav className="bg-gray-800 py-4">
        <ul className="flex justify-center">
          <li className="mr-4">
            <div className="bg-gray-300 p-4">
              <a
                href="/"
                className="text-gray-800 font-bold hover:text-gray-600"
                onClick={() => {
                  setSelectedUser(null);
                  reset(defaultValues);
                }}
              >
                Usuarios
              </a>
            </div>
          </li>
          <li>
            <div className="bg-gray-300 p-4">
              <a
                href="/create"
                className="text-gray-800 font-bold hover:text-gray-600"
                onClick={() => {
                  setSelectedUser(null);
                  reset(defaultValues);
                }}
              >
                + Crear Nuevo Usuario
              </a>
            </div>
          </li>
        </ul>
      </nav>

      {/* Contenido principal */}
      <div className="flex-grow bg-gray-200 flex justify-center">
        <div className="container mx-auto">
          {window.location.pathname === '/' ? (
            <UsersList users={users} setSelectedUser={handleEditUser} />
          ) : (
            <UsersForm
              selectedUser={selectedUser}
              handleSaveUser={handleSaveUser}
              handleCancelEdit={handleCancelEdit}
              register={register}
              handleSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
