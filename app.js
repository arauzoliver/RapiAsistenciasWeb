// Initialize Cloud Firestore through Firebase


function login() {

    var email2 = document.getElementById('email2').value;
    var password2 = document.getElementById('password2').value;

    firebase.auth().signInWithEmailAndPassword(email2, password2).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);

        if (errorCode.includes('auth/user-not-found')) {
            contenido.innerHTML = ` 
        <div class="container mt-5">
          <div class="alert alert-success" role="alert">
          <h4 class="alert-heading">No se ha registrado éste usuario</h4>
          <p>Por favor regístrese</p>
          <hr>
          <p class="mb-0">No pierdas más tiempo y únete para que disfrutes de nuestros servicios.</p>
          </div>
          <button class="btn btn-success my-2 my-sm-0 btn-sm ml-2 mr-2" data-toggle="modal" data-target="#exampleModal">Registrar</button>
          <button onClick="inicio()" class=" btn btn-primary my-2 my-sm-0 btn-sm">Volver al inicio</button>
        </div>
        `;
        } else if (errorCode.includes('auth/wrong-password')) {
            contenido.innerHTML = ` 
        <div class="container mt-5">
          <div class="alert alert-success" role="alert">
          <h4 class="alert-heading">La contraseña es incorrecta</h4>
          <p>Por favor revise su contraseña e intente de nuevo.</p>
          <hr>
          <p class="mb-0">agregar recuperacion de contraseña.</p>
          </div>
          <button class="btn btn-success my-2 my-sm-0 btn-sm ml-2 mr-2" data-toggle="modal" data-target="#exampleModal">Registrar</button>
          <button onClick="inicio()" class=" btn btn-primary my-2 my-sm-0 btn-sm">Volver al inicio</button>
        </div>
        `;
        } else if (errorCode.includes('auth/invalid-email')) {
            contenido.innerHTML = ` 
        <div class="container mt-5">
          <div class="alert alert-success" role="alert">
          <h4 class="alert-heading">Correo inválido</h4>
          <p>Por favor revise su correo e intente nuevamente.</p>
          <hr>
          <p class="mb-0">agregar recuperacion de contraseña.</p>
          </div>
          <button class="btn btn-success my-2 my-sm-0 btn-sm ml-2 mr-2" data-toggle="modal" data-target="#exampleModal">Registrar</button>
          <button onClick="inicio()" class=" btn btn-primary my-2 my-sm-0 btn-sm">Volver al inicio</button>
        </div>
        `;
        } else {

            console.log("else de login funcionando")
        }

        // ...
    });

}

function sesioncheck() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            console.log("Usuario activo") //consola muestra status de usuario
            mostrarcontenido(user); //se ejecuta funcion de contenido de index
            var displayName = user.displayName;
            var email = user.email;

            console.log("***Verificación de correo***")
            console.log(user.emailVerified)
            console.log("****************************")

            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;

            // ...
        } else {
            // User is signed out.
            console.log("No existe usuario activo")
                // ...
        }
    });

}
sesioncheck(); //se ejecuta permanentemente la verificación de las sesiones

function mostrarcontenido(user) { //se muestra contenido 
    var user = user; //se guarda el usuario de "sessioncheck" en user
    var contenido = document.getElementById('contenido');
    if (user.emailVerified) {
        contenido.innerHTML = ` 
        <div class="container-fluid mt-5 white-space: nowrap">
          <div class="alert alert-success" role="alert">
          <h4 class="alert-heading">Bienvenid@ ${user.email}</h4>
          <p>Agregar texto</p>
          <hr>
          <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
          </div>
          <button onClick="logout()" class=" btn btn-danger my-2 my-sm-0 btn-sm" >Cerrar sesión</button>
          <button onClick="admins()" class=" btn btn-success my-2 my-sm-0 btn-sm">Ir al panel</button>
        </div>
        `;
    }
}

function registrar() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function() {

        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            // ...
        });

}

function emailconfirm() { //se muestra contenido 
    firebase.auth().onAuthStateChanged(function(user) {
        var user = user; //se guarda el usuario de "sessioncheck" en user
        var emailVerified = user.emailVerified;
        var contenido = document.getElementById('contenido');
        if (user.emailVerified == false) {
            contenido.innerHTML = ` 
                <div class="container-fluid mw-100 mh-100 mt-5">
                  <div class="alert alert-success" role="alert">
                  <h4 class="alert-heading">Bienvenid@ </h4>
                  <p>Le hemos enviado un correo de confirmación, por favor acceda a su correo y confirme la creación de su cuenta.</p>
                  <hr>
                  <p class="mb-0">Nos preocupamos por su privacidad.</p>
                  </div>
                  <button onClick="inicio()" class=" btn btn-primary my-2 my-sm-0 btn-sm">Volver al inicio</button>
                </div>
            `;
        }
    });
}

function logout() {
    firebase.auth().signOut()
        .then(function() {
            console.log('Cerrando sesión...')
            contenido.innerHTML = ` 
            <div class = "container-fluid mt-5">
              <div class = "alert alert-success" role = "alert">
              <h4 class = "alert-heading"> Sesión finalizada </h4> 
              <p> Vuelve pronto... </p> 
              <hr>
              <p class = "mb-0"> Whenever you need to, be sure to use margin utilities to keep things nice and tidy. </p>
              </div> 
              <button onClick="inicio()" class=" btn btn-primary my-2 my-sm-0 btn-sm">Volver al inicio</button>
            </div>
        `;
        })
        .catch(function(error) {
            console.log(error)
        })

}

function verificar() {
    var user = firebase.auth().currentuser;

}

function inicio() {
    window.location.href = "index.html"
    contenido.innerHTML = ``;
}

function admins() {
    window.location.href = "admins.html"
}

function navcolor() {

}



///////////////////////////////////   FIRESTORE AREA   ///////////////////////////////////
firebase.initializeApp({
    apiKey: '### FIREBASE API KEY ###',
    authDomain: '### FIREBASE AUTH DOMAIN ###',
    projectId: '### CLOUD FIRESTORE PROJECT ID ###'
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

function agregarfs(params) {
    var db = firebase.firestore();

    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var fnac = document.getElementById('fnac').value;
    var cedula = document.getElementById('cedula').value;
    var auto = document.getElementById('auto').value;
    var modelo = document.getElementById('modelo').value;
    var placa = document.getElementById('placa').value;
    var year = document.getElementById('year').value;

    db.collection("Users").add({
            first: nombre,
            last: apellido,
            born: fnac,
            ced: cedula,
            car: auto,
            model: modelo,
            car_id: placa,
            car_year: year

        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            document.getElementById('nombre').value = '';
            document.getElementById('apellido').value = '';
            document.getElementById('fnac').value = '';
            document.getElementById('cedula').value = '';
            document.getElementById('auto').value = '';
            document.getElementById('modelo').value = '';
            document.getElementById('placa').value = '';
            document.getElementById('year').value = '';
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
}