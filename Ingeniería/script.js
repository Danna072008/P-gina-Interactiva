document.addEventListener('DOMContentLoaded', () => {
  loadUserFromStorage();
  document.getElementById('welcome').classList.remove('hidden');
});

function startApp() {
  document.getElementById('welcome').classList.add('hidden');
  document.getElementById('mainMenu').classList.remove('hidden');
}

function openSection(id) {
  document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
  const target = document.getElementById(id);
  if (target) target.classList.remove('hidden');
  document.getElementById('sideMenu').classList.add('hidden');
}

function goBack() {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  document.getElementById('sideMenu').classList.add('hidden');
  document.getElementById('mainMenu').classList.remove('hidden');
}

function returnHome() {
  document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
  document.getElementById('welcome').classList.remove('hidden');
  document.getElementById('sideMenu').classList.add('hidden');
}

function toggleMenu() {
  const menu = document.getElementById('sideMenu');
  menu.classList.toggle('hidden');
  menu.setAttribute('aria-hidden', menu.classList.contains('hidden') ? 'true' : 'false');
}

// ----- Tema -----
function changeTheme(theme) {
  document.body.classList.toggle('dark-theme', theme === 'dark');
}

function changeFontSize(size) {
  document.documentElement.style.fontSize = size + "px";
}

// ----- Registro -----
function registerUser(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirmPassword").value;
  const country = document.getElementById("country").value;

  if (!name || !email || !password || !confirm || !country) {
    alert("Por favor completa todos los campos.");
    return;
  }

  if (password !== confirm) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  const user = { name, email, country, createdAt: new Date().toISOString() };
  localStorage.setItem('sennia_user', JSON.stringify(user));

  alert("✅ ¡Registro exitoso, " + name + "!\nTu cuenta ha sido creada con éxito");
  loadUserFromStorage();
  goBack();
}

function loadUserFromStorage() {
  const raw = localStorage.getItem('sennia_user');
  const userNameEl = document.getElementById('userName');
  const logoutBtn = document.getElementById('logoutBtn');

  if (raw) {
    const user = JSON.parse(raw);
    userNameEl.textContent = user.name;
    userNameEl.classList.remove('hidden');
    logoutBtn.classList.remove('hidden');
  } else {
    userNameEl.textContent = '';
    userNameEl.classList.add('hidden');
    logoutBtn.classList.add('hidden');
  }
}

function logout() {
  localStorage.removeItem('sennia_user');
  loadUserFromStorage();
  returnHome();
}


