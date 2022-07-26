let c = 1
function submitForm(event) {
  event.preventDefault()
  let form = new FormData(event.srcElement)
  let newT = form.get('newTask')

  let id = 'task' + c

  createTask(id,newT,0)
  
  document.getElementById('newTask').value = ''
}

let i
function createTask(id,newTask,i) {
  if (!newTask) {
    let p = document.getElementById('demo')
    p.innerHTML = 'Pleaze enter your task first'
    p.style.display = 'block'
    setTimeout(() => {p.style.display = 'none'},2000);
  } else {
    c += 1

    let task = document.createElement('p')
    let taskT = document.createTextNode(' ' + newTask)
    let taskI = document.createElement('input')
    taskI.setAttribute('type','checkbox')
    taskI.setAttribute('id',id)
    if (i == 0) {
      document.getElementById('myDiv').appendChild(task)
    } else {
      document.getElementById('checkedItems').appendChild(task)
    }
    task.appendChild(taskT)
    task.appendChild(taskI)
    task.insertBefore(taskI,taskT)

    let trash = document.createElement('button')
    let trashT = document.createTextNode('X')
    task.appendChild(trash)
    trash.appendChild(trashT)
    
    taskI.onclick = function() {checkDone()}

    trash.onclick = function() {removeTask()}

    function checkDone() {
      let ch = taskI.checked
      if (ch) {
        task.style.textDecoration = 'line-through'
        task.style.color = 'rgb(118, 119, 119)'
        storageData(id,newTask,1)
      } else {
        task.style.textDecoration = 'none'
        task.style.color = 'black'
        storageData(id,newTask,0)
      }
    }
    
    function storageData(id,newTask,i) {
      let val = newTask + '=' + i
      if (typeof(Storage) !== "undefined") {
        localStorage.setItem(id, val)
      } else {
        document.getElementById('demo').innerHTML = 'dont suport storage'
      }
    }

    storageData(id,newTask,i)

    if (i == '1') {
      task.style.textDecoration = 'line-through'
      task.style.color = 'rgb(118, 119, 119)'
      taskI.checked = true
    }

    function removeTask() {
      task.style.display = 'none'
      localStorage.removeItem(id)
    }
  }
}

function onLoadPage() {
  let n = localStorage.length
  if (n == 0) {c = 1}
  for (let i = 1; i < n + 1; i++) {
    let key = 'task' + i
    let value = localStorage.getItem(key)
    if (value) {
      value = value.split('=')
      createTask(key,value[0],value[1])
    } else {
      n += 1
      c += 1
    }
  }
}

function removeAll() {
  for (let i = 1; i < c; i++) {
    let key = 'task' + i
    localStorage.removeItem(key)
  }
  location.reload()
}