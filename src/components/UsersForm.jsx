import React from 'react';
import { useForm } from 'react-hook-form';

const UsersForm = ({ selectedUser, handleSaveUser, handleCancelEdit }) => {
  const { register, handleSubmit, setValue, reset } = useForm();

  const onSubmit = async (data) => {
    const newUser = {
      id: selectedUser ? selectedUser.id : Date.now(),
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      birthday: data.birthday,
    };

    await handleSaveUser(newUser);
    reset();

    if (selectedUser) {
      handleCancelEdit();
    }
  };

  React.useEffect(() => {
    if (selectedUser) {
      setValue('firstName', selectedUser.first_name);
      setValue('lastName', selectedUser.last_name);
      setValue('email', selectedUser.email);
      setValue('birthday', selectedUser.birthday);
    } else {
      reset();
    }
  }, [selectedUser, setValue, reset]);

  return (
    <div className="bg-gray-200 p-8">
      <h2 className="text-3xl font-bold mb-4">Formulario para Nuevos Usuarios</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <input
          type="text"
          placeholder="Nombre"
          className="border border-gray-500 p-2 mb-2"
          {...register('firstName', { required: true })}
        />
        <input
          type="text"
          placeholder="Apellido"
          className="border border-gray-500 p-2 mb-2"
          {...register('lastName', { required: true })}
        />
        <input
          type="text"
          placeholder="Correo electrónico"
          className="border border-gray-500 p-2 mb-2"
          {...register('email', { required: true })}
        />
        <input
          type="text"
          placeholder="Fecha de nacimiento"
          className="border border-gray-500 p-2 mb-2"
          {...register('birthday', { required: true })}
        />
        <div className="flex justify-end">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Guardar
          </button>
          {selectedUser !== null && (
            <button
              type="button"
              className="bg-red-500 text-white p-2 ml-2 rounded"
              onClick={handleCancelEdit}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UsersForm;
