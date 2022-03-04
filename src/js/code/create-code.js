let ejs = require('ejs');
let s = `
      <% for (let i = 1; i < 3; i++) { %>
      <% for (let j = 1; j < 3; j++) { %>
        <h2><%= user.name %></h2>
      <% } %>
      <% } %>

`;
let t = ejs.render(s, {user:{
  name: '1'
}});
console.log(t);
