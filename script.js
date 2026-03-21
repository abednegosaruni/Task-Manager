var input = document.getElementById("taskInput");
var list = document.getElementById("list");

var tasks = [];

// show tasks
function show(){
  list.innerHTML = "";

  tasks.forEach(function(t,i){
    list.innerHTML += "<div>" + t +
    " <button onclick='done("+i+")'>✔</button>" +
    " <button onclick='del("+i+")'>x</button></div>";
  });
}

// add task
function addTask(){
  if(input.value=="") return;

  tasks.push(input.value);
  input.value="";
  show();
}

// mark done
function done(i){
  tasks[i] = "✔ " + tasks[i];
  show();
}

// delete task
function del(i){
  tasks.splice(i,1);
  show();
}