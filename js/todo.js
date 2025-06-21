document.addEventListener('DOMContentLoaded', () => {
  // Referencias a Firestore
  const db = firebase.firestore();
  let todosRef;
  
  // Elementos del DOM
  const todoList = document.getElementById('todo-list');
  const newTodoInput = document.getElementById('new-todo');
  const addTodoBtn = document.getElementById('add-todo');
  const logoutBtn = document.getElementById('logout-btn');
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  // Estado de la aplicación
  let currentFilter = 'all';
  
  // Verificar autenticación
  firebase.auth().onAuthStateChanged(user => {
    if (!user) {
      window.location.href = 'index.html';
    } else {
      // Configurar referencia a la colección de tareas del usuario
      todosRef = db.collection('todos').doc(user.uid).collection('tasks');
      loadTodos();
    }
  });
  
  // Cerrar sesión
  logoutBtn.addEventListener('click', () => {
    firebase.auth().signOut()
      .then(() => {
        window.location.href = 'index.html';
      });
  });
  
  // Añadir nueva tarea
  addTodoBtn.addEventListener('click', addTodo);
  newTodoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
  });
  
  // Filtros
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      loadTodos();
    });
  });
  
  // Función para añadir tarea
  function addTodo() {
    const text = newTodoInput.value.trim();
    if (text === '') return;
    
    todosRef.add({
      text: text,
      completed: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      newTodoInput.value = '';
    })
    .catch(error => {
      console.error('Error adding todo: ', error);
    });
  }
  
  // Función para cargar tareas
  function loadTodos() {
    let query = todosRef.orderBy('createdAt');
    
    if (currentFilter === 'active') {
      query = query.where('completed', '==', false);
    } else if (currentFilter === 'completed') {
      query = query.where('completed', '==', true);
    }
    
    query.onSnapshot(snapshot => {
      todoList.innerHTML = '';
      snapshot.forEach(doc => {
        renderTodo(doc.id, doc.data());
      });
    });
  }
  
  // Función para renderizar una tarea
  function renderTodo(id, todo) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => {
      todosRef.doc(id).update({
        completed: checkbox.checked
      });
    });
    
    const span = document.createElement('span');
    span.className = 'todo-text';
    if (todo.completed) span.classList.add('completed');
    span.textContent = todo.text;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-todo';
    deleteBtn.innerHTML = '&times;';
    deleteBtn.addEventListener('click', () => {
      todosRef.doc(id).delete();
    });
    
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  }
});