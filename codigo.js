let listToDo = [];
  function addTodo() {
    const toDoInput = document.getElementById("todoInput").value
    if (toDoInput !== "") {
      const time = new Date().getTime();
      const toDo = {
        tarea: toDoInput,
        horaCreado: time,
        completa: null
      };
      listToDo.push(toDo);
      updateTodoList();
      toDoInput.value = "";
    }
  }
  
  function updateTodoList() {
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = "";
      listToDo.forEach((toDo, index) => {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) {
            toDo.completa = new Date().getTime();
          } else {
            toDo.completa = null;
          }
          updateTodoList();
        });
      
      const label = document.createElement("label");
      label.textContent = toDo.tarea + " (creado el " + new Date(toDo.horaCreado).toLocaleString() + ")";
      if (toDo.completa) {
        label.style.textDecoration = "line-through";
        label.textContent += " - completado el " + new Date(toDo.completa).toLocaleString();
        checkbox.checked = true;
      }
      li.appendChild(checkbox);
      li.appendChild(label);

      const eliminarbtn = document.createElement('button')
      eliminarbtn.classList.add('eliminar-btn')
      eliminarbtn.addEventListener('click', () => {
        eliminarTarea(index)
      })
      li.appendChild(eliminarbtn)
      todoList.appendChild(li);
    });
  }
  function eliminarTarea(index){
    listToDo.splice(index, 1)
    updateTodoList()
  }
  function showFastestTask() {
    const completedTasks = listToDo.filter(toDo => toDo.completa !== null);
    if (completedTasks.length > 0) {
      const fastestTask = completedTasks.reduce((prev, current) => {
        return prev.completa - prev.horaCreado < current.completa - current.horaCreado ? prev : current;
      });
      const seconds = Math.round((fastestTask.completa - fastestTask.horaCreado) / 1000);
      alert("La tarea más rápida fue '" + fastestTask.tarea + "', completada en " + seconds + " segundos.");
    } else {
      alert("No hay tareas completadas aún.");
    }
  }
  
