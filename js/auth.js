document.addEventListener('DOMContentLoaded', () => {
  // Elementos del DOM
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const showRegister = document.getElementById('show-register');
  const showLogin = document.getElementById('show-login');
  const authMessage = document.getElementById('auth-message');
  
  // Mostrar formulario de registro
  showRegister.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
    authMessage.classList.add('hidden');
  });
  
  // Mostrar formulario de login
  showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
    authMessage.classList.add('hidden');
  });
  
  // Iniciar sesión
  document.getElementById('login-btn').addEventListener('click', () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        // Redirección manejada en el observer de estado
      })
      .catch(error => {
        showMessage(error.message, 'error');
      });
  });
  
  // Registrar usuario
  document.getElementById('register-btn').addEventListener('click', () => {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirm = document.getElementById('register-confirm').value;
    
    if (password !== confirm) {
      showMessage('Las contraseñas no coinciden', 'error');
      return;
    }
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        showMessage('Cuenta creada con éxito. Redirigiendo...', 'success');
        setTimeout(() => {
          window.location.href = 'todo.html';
        }, 1500);
      })
      .catch(error => {
        showMessage(error.message, 'error');
      });
  });
  
  // Observador de estado de autenticación
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      window.location.href = 'todo.html';
    }
  });
  
  // Mostrar mensajes
  function showMessage(message, type) {
    authMessage.textContent = message;
    authMessage.className = type;
    authMessage.classList.remove('hidden');
  }
});