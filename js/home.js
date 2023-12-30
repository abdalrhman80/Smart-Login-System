var home = document.querySelector(".home");

var username = localStorage.getItem("username");

home.innerHTML = `<h1 class="text-info opacity-75">Welcome ${username}</h1>`;
