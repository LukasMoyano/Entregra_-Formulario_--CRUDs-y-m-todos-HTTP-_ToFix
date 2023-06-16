import React from 'react';

const UsersList = ({ users, setSelectedUser }) => {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4">Lista de usuarios</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Nombre</th>
            <th className="text-left">Apellido</th>
            <th className="text-left">Correo electrónico</th>
            <th className="text-left">Fecha de nacimiento</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            // Generar filas de la tabla para cada usuario
            <tr key={user.id}>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.birthday}</td>
              <td className="text-right">
                <button
                  className="bg-blue-500 text-white p-2 rounded"
                  onClick={() => setSelectedUser(user)} // Al hacer clic en el botón "Editar", se llama a la función setSelectedUser con el usuario correspondiente
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
