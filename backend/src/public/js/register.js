const form = document.getElementById('registerForm');
const errorMsg = document.getElementById('errorMsg');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorMsg.style.display = 'none';

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        const res = await fetch('http://localhost:9001/backend/src/public/pages/register.html', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        if (res.ok) {
            alert('Registro exitoso. ¡Bienvenido!');
            window.location.href = '/login';
        } else {
            errorMsg.innerText = result.message;
            errorMsg.style.display = 'block';
        }
    } catch (err) {
        errorMsg.innerText = "Error al conectar con el servidor.";
        errorMsg.style.display = 'block';
    }
});
