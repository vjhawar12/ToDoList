import express from 'express'; 
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'; 

const app = express(); 
const port = 3000; 

app.use(express.static("public")); 
app.use(cookieParser()); 
app.use(bodyParser.urlencoded({ extended: true })); 

function getDate() {
	const today = new Date(); 
	const months = [
		"", "January", "February", 
		"March", "April", "May", "June", 
		"July", "August", "September", "October",
		"November", "December"
	]; 

	const day = today.getDate(); 
	const month = months[today.getMonth()];
	const year = today.getFullYear();

	return month + " " + day + ", " + year; 
}

class Task {
	constructor (content) {
		this.content = content; 
		this.completed = false; 
	}
}

var homeTasks = []; 
var workTasks = []; 


app.get("/", (req, res) => {
	res.render("index.ejs", {"date" : getDate(), "tasks" : homeTasks}); 
}); 

app.get("/work", (req, res) => {
	res.render("work.ejs", {"date" : getDate(), "tasks" : workTasks}); 
}); 

app.post("/", (req, res) => {
	if (req.body["new-task"] != undefined) {
		homeTasks.push(new Task(req.body["new-task"])); 
	} else if (req.body["completed"] != undefined) {
		const data = JSON.parse(req.body["completed"]); 
		var index = Object.keys(data)[0]; 
		homeTasks[index].completed = !homeTasks[index].completed; 
	}
	res.render("index.ejs", {"date" : getDate(), "tasks" : homeTasks});
}); 

app.post("/work", (req, res) => {
	if (req.body["new-task"] != undefined) {
		workTasks.push(new Task(req.body["new-task"])); 
	} else if (req.body["completed"] != undefined) {
		const data = JSON.parse(req.body["completed"]); 
		var index = Object.keys(data)[0]; 
		workTasks[index].completed = !workTasks[index].completed; 
	}
	res.render("work.ejs", {"date" : getDate(), "tasks" : workTasks}); 
}); 

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`); 
}); 

