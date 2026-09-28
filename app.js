const socket = io();
const login = document.getElementById("login");
const chat = document.getElementById("chat");
const nameInput = document.getElementById("name");
const join = document.getElementById("join");
const leave = document.getElementById("leave");
const form = document.getElementById("form");
const messageInput = document.getElementById("message");
const messages = document.getElementById("messages");
const usersList = document.getElementById("users");
const count = document.getElementById("count");

function addSystem(text) {
  const el = document.createElement("div");
  el.className = "system";
  el.textContent = text;
  messages.appendChild(el);
  messages.scrollTop = messages.scrollHeight;
}

function addMessage(data) {
  const el = document.createElement("div");
  el.className = "message";
  const name = document.createElement("b");
  name.textContent = data.name;
  const text = document.createElement("div");
  text.textContent = data.text;
  const time = document.createElement("small");
  time.textContent = data.time;
  el.append(name, text, time);
  messages.appendChild(el);
  messages.scrollTop = messages.scrollHeight;
}

join.onclick = () => {
  const name = nameInput.value.trim();
  if (!name) return nameInput.focus();
  socket.emit("join", name);
  login.classList.add("hidden");
  chat.classList.remove("hidden");
  messageInput.focus();
};

nameInput.addEventListener("keydown", e => {
  if (e.key === "Enter") join.click();
});

form.onsubmit = e => {
  e.preventDefault();
  const text = messageInput.value.trim();
  if (!text) return;
  socket.emit("message", text);
  messageInput.value = "";
  messageInput.focus();
};

leave.onclick = () => location.reload();

socket.on("system", addSystem);
socket.on("message", addMessage);

socket.on("users", users => {
  usersList.innerHTML = "";
  count.textContent = users.length;
  users.forEach(name => {
    const li = document.createElement("li");
    li.textContent = name;
    usersList.appendChild(li);
  });
});
