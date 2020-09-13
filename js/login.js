//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    const loginForm = document.getElementById('signin');
    
    loginForm.onsubmit = function(e) {
        e.preventDefault();
        const email = document.getElementById('inputEmail').value;
        localStorage.setItem('Email :', email);

        if (email != null) {
            window.location.href = 'index.html';
        }

    };
});