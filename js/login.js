function showUserOnly(email){
    let user = "";
    let i = 0;
    while ((email != null) && (i < email.length) && (email[i] != "@")) {
      user = user + email[i];
      i++;
    }
    return user;
  }

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    const loginForm = document.getElementById('signin');
    
    loginForm.onsubmit = function(e) {
        e.preventDefault();
        const email = document.getElementById('inputEmail').value;
        localStorage.setItem('Email :', email);
        if (localStorage.getItem('Usuario solo: ') === null ) {
            let arrayUser = showUserOnly(localStorage.getItem('Email :'));
            localStorage.setItem('Usuario solo: ', arrayUser);
        }
        if (email != null) {
            window.location.href = 'index.html';
        }

    };
});