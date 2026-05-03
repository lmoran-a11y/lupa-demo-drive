const form = document.getElementById('loginForm');
const errorMsg = document.getElementById('errorMsg');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (errorMsg) errorMsg.style.display = 'none';

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        // Ajustado al puerto 3000 de tu nuevo server.ts
        const res = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (res.ok) {
            // Guardamos la sesión en el navegador
            localStorage.setItem('token', result.token);
            localStorage.setItem('userRole', result.role);
            localStorage.setItem('userName', result.username || 'Usuario');

            const realRole = result.role;
            
            // IMPORTANTE: URL de tu frontend de React (Vite)
            const frontendURL = 'http://localhost:5173'; 

            switch (realRole) {
                case 'mecanico':
                case 'vendedor':
                case 'usuario':
                    alert(`Acceso ${realRole.charAt(0).toUpperCase() + realRole.slice(1)} autorizado.`);
                    // Redirigimos a la raíz del frontend donde vive tu router.tsx
                    window.location.href = frontendURL; 
                    break;
                default:
                    window.location.href = './register.html';
            }
        } else {
            if (errorMsg) {
                errorMsg.innerText = result.message || "Credenciales incorrectas";
                errorMsg.style.display = 'block';
            }
        }
    } catch (err) {
        if (errorMsg) {
            errorMsg.innerText = "Error: El servidor de Lupauto no responde.";
            errorMsg.style.display = 'block';
        }
    }
});