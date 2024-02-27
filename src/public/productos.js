const socket = io();

async function obtenerUserId() {
  try {
      const response = await fetch('http://localhost:3000/userid', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
          credentials: 'include',
      });

      if (response.ok) {
          const data = await response.json();
          return data.userId;
      } else {
          const errorData = await response.json();
          console.error('Error en la respuesta del servidor:', errorData);
          return null;
      }
  } catch (error) {
      console.error('Error en la solicitud para obtener el userId:', error);
      return null;
  }
}


function AddProductToCart(_id) {
  obtenerUserId().then(userId => {
    if (!userId) {
      console.error('No se pudo obtener el userId.');
      return;
    }

    console.log('Emitiendo evento al servidor con userId y _id:', { userId, _id });

    // Emitir evento al servidor con el id del producto y el userId
    socket.emit('AddProduct_toCart', { userId, _id });
  });
}


