import $ from "jquery";
import {v4 as uuidV4} from "uuid"

type Task= {
    id: string, 
    title: string, 
    completed: boolean, 
    createdAt: Date
}

const list= $("#list") as JQuery<HTMLUListElement>;
const form= $("#new-task-form") as JQuery<HTMLFormElement> | null
const input= $("#new-task-title") as JQuery<HTMLInputElement>;
const tasks: Task[]= loadTasks()
tasks.forEach(addListItem)

form?.on("submit", function(event){
    event.preventDefault()
    console.log("CLICK");
    if (input?.val() == "" || input?.val() == null) return
    
    const newTask: Task={
        id: uuidV4(),
        //provide defualt empty stirng if value is returned as undefined
        title: input.val() ?? "",
        completed: false,
        createdAt: new Date()
    }
    tasks.push(newTask)

    addListItem(newTask)
    input.val() == ""

});

function addListItem(task: Task): boolean{
    const item= $("<li>") as JQuery<HTMLLIElement>
    const label= $("<label>") as JQuery<HTMLLabelElement>
    const checkbox= $("<input>") as JQuery<HTMLInputElement>

    checkbox.on("change", function(){
        task.completed= checkbox.prop("checked")
        saveTasks()
    });

    checkbox.prop("type", "checkbox")
    checkbox.prop("checked", task.completed)
    
    label.append(checkbox, task.title)
    item.append(label)
    list?.append(item)

    return true
}

function saveTasks(){
    localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks(): Task[]{
    const taskJSON= localStorage.getItem("TASKS")
    //if taskJSON is null/undefined, parse string into an array
    //else, assings empty array
    return taskJSON ? JSON.parse(taskJSON) : []
}