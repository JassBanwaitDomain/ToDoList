let tasks=[];
let imp=[];
const addTaskInput=document.getElementById('add');
const taskList=document.getElementById('list');

addTaskInput.addEventListener('click',function(){

	});


const toDoList1=document.querySelector('.myday');
const rightDisplay=document.getElementById('right-display');




function handleListClick(){
	rightDisplay.innerHTML="";
	if(tasks.length==0){
		var div=document.createElement('div');
		div.innerHTML=`
			<span><i class="fa-regular fa-calendar-check"></i></span>
			<h3>Focus on your day</h3>
			<p>Get things done with My Day, a list that refreshes every day.</p>
		`;
		
		rightDisplay.append(div);
	}	
	if(tasks.length>0){
		renderList();
	}

}
toDoList1.addEventListener('click',handleListClick);
 

function handleListClick2(){
	rightDisplay.innerHTML="";
	taskList.innerHTML="";
	if(imp.length==0){
		var div=document.createElement('div');
		div.innerHTML=`
			<span><i class="fa-solid fa-wand-magic-sparkles"></i></span>
			<p>Try starring some tasks to see them here.</p>
		`;
		
		rightDisplay.append(div);
		
	}	
	if(imp.length>0){
		renderImpList();
	}

}

const toDoList2=document.querySelector('.important');
toDoList2.addEventListener('click',handleListClick2);

function addToDom(task){
	
	const li=document.createElement('li');
	li.innerHTML=`
		<input type="checkbox" id="${task.id}"
		class="add-task" ${task.done? 'checked':''}>
		<label for="${task.id}">${task.text}</label>
		<div>
			<span><i class="fa-regular fa-trash-can" id="delete" data-id="${task.id}"></i></span>
			<span><i class="fa-${task.important?"solid":"regular"} fa-star" id="impStar" data-id="${task.id}" ${task.important? 'checked':''}></i></span>
		</div>
	`;
	taskList.append(li);
}

function renderList(){
	rightDisplay.innerHTML="";
	taskList.innerHTML="";
	for(let i=0;i<tasks.length;i++){
		addToDom(tasks[i]);
	}
}

function ImpDom(task){
	const li=document.createElement('li');
	li.innerHTML=`
		<input type="checkbox" id="${task.id}"
		class="add-task" ${task.done? 'checked':''}>
		<label for="${task.id}">${task.text}</label>
		<div>
			<span><i class="fa-solid fa-star" id="importantClass" data-id="${task.id}" ${task.important? 'true':''}></i></span>
		</div>
	`;
	taskList.append(li);
}

function deleteImpTask(taskId){
	const newtasks=imp.filter(function(task){
			return task.id!=taskId;
		})
	imp=newtasks;
	renderList();
}

function renderImpList(){
	rightDisplay.innerHTML="";
	taskList.innerHTML="";
	for(let i=0;i<imp.length;i++){
		ImpDom(imp[i]);
	}
}

function toggleTask(taskId){
	const newtasks=tasks.filter(function(task){
			return task.id==taskId;
		})
	if(newtasks.length>0){
		const currentTask=newtasks[0];
		currentTask.done=!currentTask.done;
		showNotification('task toggled successfully!');
		return;
	}
	showNotification('task can not be toggled!');
}	

function toggleStar(taskId){
	const newtasks=tasks.filter(function(task){
			return task.id==taskId;
		});
	if(imp.length==0){
		imp.unshift(newtasks[0]);
		const currentTask=newtasks[0];
			currentTask.important=!currentTask.important;
		showNotification("task added to Important list");
			return;
	}
	if(newtasks.length>0){
		var imptasks=imp.filter(function(newtasks){
				return newtasks.id==taskId;
			});			
		if(imptasks.length>0){
			showNotification('task added already!');
			return;
		}
		else{
			imp.unshift(newtasks[0]);
			const currentTask=newtasks[0];
			currentTask.important=!currentTask.important;
			showNotification('task added to Important list');
		}
	}
}
function addTask(task){
	if(task){
		tasks.unshift(task);
		renderList();
		showNotification("Task added successfully!");
		return;
	}
	showNotification("Task can not be added!");
}

function deleteTask(taskId){
	const newtasks=tasks.filter(function(task){
			return task.id!=taskId;
		})
	tasks=newtasks;
	renderList();
	showNotification("Task deleted successfully!");
	return;
}

function showNotification(text){
	alert(text);
}

function handleClick(e){
	const target=e.target;
	if(target.id=='impStar'){
		const taskId=target.dataset.id;
		toggleStar(taskId);
		target.classList.remove('fa-regular');
		target.classList.add('fa-solid');
		target.style.color="lightblue";
		
	}
	if(target.className=='add-task'){
		const taskId=target.id;
		toggleTask(taskId);
		return;
	}
	if(target.id=='delete'){
		const taskId=target.dataset.id;
		deleteTask(taskId);
		deleteImpTask(taskId);
		return;	
	}
	if(target.id=='importantClass'){
		const taskId=target.dataset.id;
		deleteImpTask(taskId);

		return;
	}
}

function handlekeyPress(e){
	if(e.key=='Enter'){
		const text=e.target.value;
		console.log(text);

		if(text==""){
			showNotification('task can not be empty!');
			return;
		}

		const task={
			text,
			id:Date.now().toString(),
			done:false,
			important:false
		}
		addTask(task);
		e.target.value="";	
	}
}

function initializeApp(){
	addTaskInput.addEventListener('keyup',handlekeyPress);
	document.addEventListener('click',handleClick);
}
initializeApp();
