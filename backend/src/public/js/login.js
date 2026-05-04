const form = document.getElementById('loginForm');
const errorMsg = document.getElementById('errorMsg');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (errorMsg) errorMsg.style.display = 'none';

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        // Ajustado al puerto 9001 de tu nuevo server.ts
        const res = await fetch('http://localhost:9001/backend/src/public/pages/login.html', {
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

async function verificarCredenciales(data) {
    try {
        const res = await fetch('http://localhost:9001/backend/src/public/pages/login.html', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (!res.ok) {
            // Manejo específico: Usuario no existe vs Contraseña mal
            throw new Error(result.message || "Credenciales inválidas");
        }

        return result; // Contiene token, role, username
    } catch (err) {
        throw err;
    }
}

// ⚠️Este código es solo para pruebas locales sin backend, no usar en producción⚠️
// async function VerificatorLogin(data) {
//     if (data.username === "admin" && data.password === "admin") {
//         return {
//             token: "token-sesion-lupauto-2026", // Token temporal
//             role: "mecanico",
//             username: "admin"
//         };
//     } else {
//         throw new Error("Credenciales inválidas");
//     }
    
//     if(data.username === "vendedor" && data.password === "vendedor") {
//         return {
//             token: "token-sesion-lupauto-2026", // Token temporal
//             role: "vendedor",
//             username: "vendedor"
//         };
//     } else {
//         throw new Error("Credenciales inválidas");
//     }

//     if(data.username === "usuario" && data.password === "usuario") {
//         return {
//             token: "token-sesion-lupauto-2026", // Token temporal
//             role: "usuario",
//             username: "usuario"
//         };
//     } else {
//         throw new Error("Credenciales inválidas");
//     }

//     if(data.username === "mecanico" && data.password === "mecanico") {
//         return {
//             token: "token-sesion-lupauto-2026", // Token temporal
//             role: "mecanico",
//             username: "mecanico"
//         };
//     } else {
//         throw new Error("Credenciales inválidas");
//     }
// }
