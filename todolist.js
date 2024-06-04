//getting dom elemetns
let taskbar=document.querySelector(".taskbar")
//button to submit task entered 
let taskbtn=document.querySelector(".taskbtn")
//To clear all list items and localsotrage
let clearbtn=document.querySelector(".clearbtn")
// buttons to show completed, remainging,total tasks
let total_tasks=document.querySelector(".btn1")//total tasks
let completed_tasks=document.querySelector(".btn2")//completed tasks
let remaining_tasks=document.querySelector(".btn3") //remaining tasks

//box in which our list will be displayed
let tasksbox=document.querySelector(".tasksbox")
//li for creating list tag
let ourtasks=document.querySelector(".ourtasks")
//input checkbox
let checkbox_item=document.querySelector(".checkbox_item")
let updatebtn=document.querySelector(".updatebtn")
let tasks=JSON.parse(localStorage.getItem('tasks'))||[]
if(!Array.isArray(tasks)){
    tasks=[]
}
//To get value from input field entered by user on click 
taskbtn.addEventListener('click',(e)=>{
e.preventDefault()
const formattedvalue=taskbar.value.trim();
const value=formattedvalue.charAt(0).toUpperCase()+formattedvalue.slice(1)
taskbar.focus()
taskbar.value=''
if(value==''){
    alert('tasks cannot be empty')
    return
}
const createtasks={
id:new Date().getTime(),
name:value,
iscompleted:false
}
tasks.push(createtasks)
localStorage.setItem('tasks',JSON.stringify(tasks));
showtasks(createtasks)
count_tasks(tasks)
})
//to crerate  data from localstorage
const showtasks=(taskid)=>{
const create_li_element=document.createElement('li')
create_li_element.setAttribute('id',taskid.id)
const markup=` 
<div class="taskitem flex"> 
<li class="ourtasks"><input type="checkbox" class="checkbox_item" value="${taskid}" 
id="${taskid.id}">${taskid.name}</li>

<ion-icon name="close-outline" 
class="cuttask"></ion-icon>
<button type="text" class="updatebtn">update Task</button>
</div>`
create_li_element.innerHTML=markup
tasksbox.appendChild(create_li_element)
}
//if data is present then we will show that 
if(localStorage.getItem('tasks')){
    tasks.map((item)=>
    showtasks(item))
}
// capture id to remove
tasksbox.addEventListener('click', (e) => {
    // from here i have captures all id of list tags given in creating objects...
    if (e.target.classList.contains('cuttask')) {
        const taskid=e.target.closest('li').id
        // based on id we will remove tasks..from taskbar
        removetask(taskid)
    }
});
// function to remove also from localstorage..
const removetask = (taskid) => {
    // Remove from the array
    tasks = tasks.filter((item) => item.id != parseInt(taskid));
    // Update localstorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
    // Remove from the page
    document.getElementById(taskid).remove();
    count_tasks(tasks)
    completedtasks(tasks)
};
tasksbox.addEventListener('click', (e) => {
    if (e.target.classList.contains('updatebtn')) {
        const taskid = e.target.closest('li').id;
        updatetask(taskid);
    }
});
//to update .. this is also updating data in our local storage 
const updatetask = (taskid) => {
    const taskdata = tasks.find((item) => item.id === parseInt(taskid));
    if (taskdata) {    
            const taskname = taskdata.name;
            taskbar.value = taskname;
            removetask(taskid)
            taskbar.focus()
        console.log(taskname);
    }
};
// to find completed tasks

tasksbox.addEventListener('click',(e)=>{
    if(e.target.classList.contains('checkbox_item')){
        const checkboxid = e.target
        completedtasks(checkboxid);
       
    }
})
function completedtasks(checkboxid){
if(checkboxid.checked){
    alert('Task completed..')
   tasks.forEach((item)=>{
    if(item.id===parseInt(checkboxid.id)){
        item.iscompleted=true;
    }
   })
   localStorage.setItem('tasks',JSON.stringify(tasks))
}
else{
    localStorage.setItem('tasks',JSON.stringify(tasks))
}
}
// to count tasks and update them on buttons
function count_tasks(task){
let totallenght=task.length;
total_tasks.textContent=totallenght


let donetasks=tasks.filter((item)=>item.iscompleted).length
completed_tasks.textContent=donetasks

let lefttask=totallenght-donetasks
remaining_tasks.textContent=lefttask
}

//to clear all list & localstroages
function clearit(){
    localStorage.clear()
    tasks=[]
    tasksbox.textContent=" "
    completed_tasks.textContent="0"
    total_tasks.textContent="0"
    remaining_tasks.textContent="0"
}

