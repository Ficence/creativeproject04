<template>
  <div id="app">
    <div class="header">
      <router-link to="/">Home</router-link>
      <router-link to="/event">Event</router-link>
    </div>
    <div class="content">
      <router-view />
    </div>
    <div class="footer">
      <p style="text-align:center">Github Repository: <a href="https://github.com/Ficence/creativeproject04">Creative Project 04 (Events Manager)</a></p>
    </div>
  </div>
</template>

<style>
html {
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
}

/* Header */
.header {
  display: flex;
  padding: 10px 0px 10px 50px;
  background-color: #FCDEFF;
  color: #1C454F;
}

.content {
  padding: 20px 50px;
  min-height: 500px;
}

/* Footer */
.footer {
  height: 35px;
  padding: 20px 0px 0px 50px;
  background: #23459e;
  font-size: 12px;
  color: #aaa;
}

.footer a {
  color: #ccc;
}

h1 {
  font-size: 20px;
}

h2 {
  font-size: 14px;
}

.header > a{
  color: black;
  text-decoration: none;
  margin: 0 5px 0 5px;
  padding: 0 10px 0 10px;
}

.header > a:hover{
  background-color: black;
  border-radius: 1pc;
  color: #eee;
}
</style>
