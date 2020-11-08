function showUserProfile(profile) {
    let arrayData = Object.keys(profile);
    let arrayValues = Object.values(profile);
    for (let i = 0; i < arrayData.length; i++) {
        if (arrayValues[i] !== ' ') {
            document.getElementById(arrayData[i]).innerHTML = arrayValues[i];
        }
        if (arrayData[i] === 'name') {
            document.getElementById("nameProfile").innerHTML = arrayValues[i];
        }
        if (arrayData[i] === 'image') {
            document.getElementById(arrayData[i]).src = arrayValues[i];
            document.getElementById(arrayData[i]).width = 120;
            document.getElementById(arrayData[i]).height = 120;
        }
    }
    document.getElementById("emailProfile").innerHTML = localStorage.getItem('Email :');
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    let profile = JSON.parse(localStorage.getItem('Profile :'));
    if (profile !== null) {
        showUserProfile(profile);
    } else {
        profile = {
            name: ' ',
            email: ' ',
            tel: ' ',
            mobile: ' ',
            country: ' ',
            adress: ' ',
            image: ' ',
        }
    }

    const imageModify = document.getElementById("imageMod");
    imageModify.onchange = function(e) {
        let imageFile = e.target.files[0];
        let file = new FileReader();
        file.onload = function() {
            profile.image = file.result;
        }
        file.readAsDataURL(imageFile);
    }

    const saveChanges = document.getElementById("saveChangeUser");
    saveChanges.addEventListener("submit", function(e) {
        e.preventDefault();
        profile.name = document.getElementById("nameMod").value;
        profile.email = document.getElementById("emailMod").value;
        profile.tel = document.getElementById("telMod").value;
        profile.mobile = document.getElementById("mobileMod").value;
        profile.country = document.getElementById("countryMod").value;
        profile.adress = document.getElementById("adressMod").value;
        localStorage.setItem('Profile :', JSON.stringify(profile));
        localStorage.setItem('Usuario solo: ', profile.name);
        localStorage.setItem('Email :', profile.email);
        location.reload();
    });
});