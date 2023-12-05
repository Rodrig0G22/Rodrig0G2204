// Registro.js
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { firebaseApp } from '../firebase';

function Registro() {
  const [usuario, setUsuario] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [registroError, setRegistroError] = useState(null);

  const handleRegistro = async () => {
    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp);

    try {
      await createUserWithEmailAndPassword(auth, correo, contrasena);

      const usuariosCollection = collection(db, 'Usuarios');
      const nuevoUsuario = {
        usuario,
        nombre,
        correo,
        contrasena,
        apellido,
      };

      const docRef = await addDoc(usuariosCollection, nuevoUsuario);
      console.log('Usuario agregado con ID: ', docRef.id);

      setRegistroExitoso(true);
      setRegistroError(null);

      setUsuario('');
      setNombre('');
      setApellido('');
      setCorreo('');
      setContrasena('');
    } catch (error) {
      console.error('Error al registrar usuario: ', error);

      setRegistroError('Error al registrar usuario. Por favor, inténtalo de nuevo.');
      setRegistroExitoso(false);
    }
  }

  return (
    <div className='vista_registro container'>
      <div className="registro-form">
        <h1>Regístrate</h1>
        {registroExitoso && <div className="registro-exitoso">¡Registro exitoso!</div>}
        {registroError && <div className="registro-error">{registroError}</div>}
        <form>
          <input type="text" placeholder="Nombre de usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} className="form-input" />
          <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className="form-input" />
          <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} className="form-input" />
          <input type="email" placeholder="Correo electrónico" value={correo} onChange={(e) => setCorreo(e.target.value)} className="form-input" />
          <input type="password" placeholder="Contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} className="form-input" />
          <button type="button" onClick={handleRegistro} className="submit-button">Registrarse</button>
        </form>
      </div>
    </div>
  );
}

export default Registro;
