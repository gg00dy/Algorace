var colors = require('colors');
const readline = require('readline');
const config = require('./configs.json')
const Task = require('./Task.js')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
global.tasks = []
global.startTasks = function() {
				for (let i = 0; i < config.Tasks.length; i++) {
          global.tasks.push(new Task(config.Tasks[i]));
					global.tasks[i].start();
				}
}


var table =[]
for (let t = 0; t < config.Tasks.length; t++) {
  table.push(config.Tasks[t]);
}
console.log("Welcome to the ultimate Algorithm race!!")
console.table(table)
rl.question('Start all tasks?', function(ansr) {
  if (ansr){
    if (ansr.includes("y")){
      global.startTasks()
    }
  }
}) 

