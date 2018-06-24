//Registro de usuario nuevo
function Registro() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var Msg = 2; //Se ocupa el 2 en Indexmessage

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function() {
            EmailConfirm()
            IndexMessage(Msg);
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(errorCode);
            console.log(errorMessage);
            Msg = errorCode;
            IndexMessage(Msg);
        });
}

function RegistroAdmin() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var Msg = 2; //Se ocupa el 2 en Indexmessage

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function() {
            EmailConfirm()
            Agregarfs()
            IndexMessage(Msg);
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(errorCode);
            console.log(errorMessage);
            Msg = errorCode;
            IndexMessage(Msg);
        });
}

//Acceso usuario existente
function Acceso() {
    var email2 = document.getElementById('email2').value;
    var password2 = document.getElementById('password2').value;
    var Msg = 1; //Se ocupa el 1 en Indexmessage

    firebase.auth().signInWithEmailAndPassword(email2, password2)
        .then(function() {
            // Sign-in successful.
            console.log('Sesión iniciada');
            console.log('valor de Msg es ' + Msg);
            IndexMessage(Msg);

        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(errorCode);
            console.log(errorMessage);
            Msg = errorCode;
            IndexMessage(Msg);
        });

}

//Cerrar sesión
function Cerrar() {
    var Msg = 0; //Se ocupa el 0 en Indexmessage
    firebase.auth().signOut()
        .then(function() {
            // Sign-out successful.
            console.log('Cerró sesión')
            console.log('valor de Msg es ' + Msg);
            IndexMessage(Msg);
        })
        .catch(function(error) {
            // An error happened.
            console.log(error)
            Msg = errorCode;
            IndexMessage(Msg);
        })
}

//Observador de estado de autenticación y obtención de datos de usuarios
function Observador() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            console.log('Hay actividad de usuario');
            var Msg = Msg;
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            if (emailVerified == false) {
                var Msg = 2;
                IndexMessage(Msg);
            }
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            // ...
            IndexMessage(); //Muestra en el index los cambios en tiempo real
        } else {
            // User is signed out.
            // ...
            console.log('No hay actividad de usuarios');
            console.log();
        }
    });

}
Observador(); //Se ejecuta observador permanentemente

//Obtener usuario con sesión activa
function UserOn() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
        } else {
            // No user is signed in.
        }
    });

}

//Obtener usuario actualmente activo
function UserNow() {
    var user = firebase.auth().currentUser;

    if (user) {
        // User is signed in.
    } else {
        // No user is signed in.
    }

}


//Obtener el perfil del usuario
function Perfil() {
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;

    if (user != null) {
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
    }

}

//Cambiar o actualizar el perfil de usuario
function PerfilUpdate() {
    var user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: "Jane Q. User",
        photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(function() {
        // Update successful.
    }).catch(function(error) {
        // An error happened.
    });

}

//Enviar correo de confirmacion y activación de nuevo usuario
function EmailConfirm() {
    var user = firebase.auth().currentUser;
    //var Msg = 3; //Se ocupa el 3 en Indexmessage

    user.sendEmailVerification().then(function() {
        // Email sent.
        console.log('Se envió correo');
        console.log('valor de Msg es ' + Msg);
    }).catch(function(error) {
        // An error happened.
        console.log(error);
        Msg = errorCode;
        IndexMessage(Msg);
    });

}

//Configurar contraseña de usuario
function PassConfig() {
    var user = firebase.auth().currentUser;
    var newPassword = getASecureRandomPassword();

    user.updatePassword(newPassword).then(function() {
        // Update successful.
    }).catch(function(error) {
        // An error happened.
    });

}

//Enviar correo de Reestablecimiento de contraseña
function PassResetEmail() {
    var auth = firebase.auth();
    var emailAddress = "user@example.com";

    auth.sendPasswordResetEmail(emailAddress).then(function() {
        // Email sent.
    }).catch(function(error) {
        // An error happened.
    });

}

//Borrar un usuario
function BorrarUser() {
    var user = firebase.auth().currentUser;

    user.delete().then(function() {
        // User deleted.
    }).catch(function(error) {
        // An error happened.
    });

}

//Volver a autenticar un usuario
function CuentaRecheck() {
    var user = firebase.auth().currentUser;
    var credential;

    // Prompt the user to re-provide their sign-in credentials

    user.reauthenticateWithCredential(credential).then(function() {
        // User re-authenticated.
    }).catch(function(error) {
        // An error happened.
    });

}

function IndexMessage(Msg) {
    //usar un switch o if para recibir un paràmetro unico de cualquier funcion con el fin de mostrar los distintos mensajes
    var Msg = Msg; //Se toma un valor de Msg desde cualquier funciòn y se crea variable local Msg con dicho valor
    var Mensaje = document.getElementById('Mensaje');

    /*
    En esta funciòn estaràn los mensajes para cada función
    0: Cerrar        Se envia mensaje  Confirma cierre de sesión
    1: Acceso        Se envia mensaje  Confirma inicio de sesiòn
    2; Registro      Se envia mensaje  Confirma registro de nuevo usuario
    3: EmailConfirm  Se envia mensaje  Correo para validar existencia de correo
    4: 
    5: 
    6: 

    */

    if (Msg == 0) {
        //Statement
        Mensaje.innerHTML = ` 
            <div class = "container-fluid mt-5">
              <div class = "alert alert-success" role = "alert">
              <h4 class = "alert-heading"> La sesión ha finalizado </h4> 
              <p> Vuelve pronto... </p> 
              <hr>
              <p class = "mb-0"> Gracias por utilizar esta plataforma </p>
              </div> 
              <button onClick="inicio()" class=" btn btn-primary my-2 my-sm-0 btn-sm">Volver al inicio</button>
            </div>
        `;
    } else if (Msg == 1) {
        Mensaje.innerHTML = ` 
            <div class="container-fluid mw-100 mh-100 mt-5">
              <div class="alert alert-success" role="alert">
              <h4 class = "alert-heading"> Bienvenid@ </h4>
              <p>Se ha iniciado la sesiòn</p>
              <hr>
              <p class="mb-0">Nos preocupamos por su privacidad.</p>
              </div>
              <button onClick="Cerrar()" class=" btn btn-danger my-2 my-sm-0 btn-sm" >Cerrar sesión</button>
              <button onClick="admins()" class=" btn btn-success my-2 my-sm-0 btn-sm">Ir al panel</button>
            </div>
        `;
    } else if (Msg == 2) {
        Mensaje.innerHTML = ` 
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
    } else if (Msg == 3) {
        Mensaje.innerHTML = ` 
            <div class="container-fluid mw-100 mh-100 mt-5">
              <div class="alert alert-success" role="alert">
              <h4 class = "alert-heading"> MSG ENVIÓ VALOR 3 EN FUNCION ACCESO </h4>
              <p>FUNCION INDEXMESSAGE</p>
              <hr>
              <p class="mb-0">Nos preocupamos por su privacidad.</p>
              </div>
              <button onClick="Cerrar()" class=" btn btn-danger my-2 my-sm-0 btn-sm" >Cerrar sesión</button>
              <button onClick="admins()" class=" btn btn-success my-2 my-sm-0 btn-sm">Ir al panel</button>
            </div>
        `;
    } else if (Msg == 4) {
        Mensaje.innerHTML = ` 
            <div class="container-fluid mw-100 mh-100 mt-5">
              <div class="alert alert-success" role="alert">
              <h4 class = "alert-heading"> MSG ENVIÓ VALOR 4 EN FUNCION ACCESO </h4>
              <p>FUNCION INDEXMESSAGE</p>
              <hr>
              <p class="mb-0">Nos preocupamos por su privacidad.</p>
              </div>
              <button onClick="Cerrar()" class=" btn btn-danger my-2 my-sm-0 btn-sm" >Cerrar sesión</button>
              <button onClick="admins()" class=" btn btn-success my-2 my-sm-0 btn-sm">Ir al panel</button>
            </div>
        `;
    } else if (Msg.includes('auth/user-not-found')) { //Errores de inicio de sesión
        Mensaje.innerHTML = ` 
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
    } else if (Msg.includes('auth/wrong-password')) { //Errores de inicio de sesión
        Mensaje.innerHTML = `
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
    } else if (Msg.includes('auth/invalid-email')) { //Errores de inicio de sesión
        Mensaje.innerHTML = `
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
    } else if (Msg.includes('auth/email-already-in-use')) { //Errores de inicio de sesión
        Mensaje.innerHTML = `
        <div class="container mt-5">
          <div class="alert alert-success" role="alert">
          <h4 class="alert-heading">El correo introducido ya está en uso</h4>
          <p>Por favor revise su correo e intente nuevamente.</p>
          <hr>
          <p class="mb-0">agregar recuperacion de contraseña.</p>
          </div>
          <button class="btn btn-success my-2 my-sm-0 btn-sm ml-2 mr-2" data-toggle="modal" data-target="#exampleModal">Registrar</button>
          <button onClick="inicio()" class=" btn btn-primary my-2 my-sm-0 btn-sm">Volver al inicio</button>
        </div>
        `;
    } else if (Msg.includes('auth/weak-password')) { //Errores de inicio de sesión
        Mensaje.innerHTML = `
        <div class="container mt-5">
          <div class="alert alert-success" role="alert">
          <h4 class="alert-heading">La contraseña es iválida </h4>
          <p>Por favor ingrese una contraseña que contega 6 caracteres o más.</p>
          <hr>
          <p class="mb-0">Nos preocupamos por su seguridad.</p>
          </div>
          <button class="btn btn-success my-2 my-sm-0 btn-sm ml-2 mr-2" data-toggle="modal" data-target="#exampleModal">Registrar</button>
          <!--<button onClick="inicio()" class=" btn btn-primary my-2 my-sm-0 btn-sm">Volver al inicio</button>-->
        </div>
        `;
    }

}

function inicio() {
    window.location.href = "index.html"
    contenido.innerHTML = ``;
}

///////////////////////////////////   FIRESTORE AREA   ///////////////////////////////////
/*
//Funcion de validacion y conexion a firestore
firebase.initializeApp({
    apiKey: 'AIzaSyDaUb9DFmDwEm_R9e40oWZg12hQAGCkQB4',
    authDomain: 'rapiasitencias.firebaseapp.com',
    projectId: 'rapiasitencias'
});
*/

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

//
function Agregarfs() { //funcion agregar a firestore
    //var db = firebase.firestore();
    //var Msg = Msg;

    var email = document.getElementById('email').value; //
    var password = document.getElementById('password').value; //
    var nombre = document.getElementById('nombre').value; //  
    var apellido = document.getElementById('apellido').value; //  
    var fnac = document.getElementById('fnac').value; // 
    var cedula = document.getElementById('cedula').value; //     
    var auto = document.getElementById('auto').value; //   
    var modelo = document.getElementById('modelo').value; //    
    var placa = document.getElementById('placa').value; //     
    var year = document.getElementById('year').value; //      

    db.collection("Users").add({
            email: email,
            password: password,
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
            console.log("Document written with ID: ", docRef.id); //Muestra referencia creada por firestore
            document.getElementById('email').value = ''; //
            document.getElementById('password').value = ''; //
            document.getElementById('nombre').value = ''; //Limpia los campos    
            document.getElementById('apellido').value = ''; //Limpia los campos       
            document.getElementById('fnac').value = ''; //Limpia los campos        
            document.getElementById('cedula').value = ''; //Limpia los campos           
            document.getElementById('auto').value = ''; //Limpia los campos          
            document.getElementById('modelo').value = ''; //Limpia los campos          
            document.getElementById('placa').value = ''; //Limpia los campos           
            document.getElementById('year').value = ''; //Limpia los campos         
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
            console.log('No se agrego a firestore');
        });
}