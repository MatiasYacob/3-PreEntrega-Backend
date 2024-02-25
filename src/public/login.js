const form = document.getElementById('loginForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        const data = new FormData(form);
        const obj = {};
        data.forEach((value, key) => obj[key] = value);

        const response = await fetch('/api/extend/users/login', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            const json = await response.json();
            console.log(json);

            // Guardar el token y el ID del usuario en el almacenamiento local
            localStorage.setItem('authToken', json.access_token);
            localStorage.setItem('USER_ID', json.id);

            // Redirigir a la página de usuarios
            window.location.replace('/users');
        } else if (response.status === 401) {
            console.log(response);
            // Manejar el caso de credenciales incorrectas
            // Mostrar mensaje de error al usuario
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        // Manejar otros errores (por ejemplo, problemas de red)
        // Mostrar mensaje de error al usuario
    }
});
