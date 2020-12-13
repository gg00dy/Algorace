var colors = require('colors');
global.config = require('./configs.json')
var fs = require('fs');

class Task {

	constructor(taskdata, config) {
		this.List = fs.readFileSync('./data.txt', 'utf8').split('\r\n')
		this.Name = taskdata.Name
		this.Method = taskdata.Algorithm
	}
	async start() {
		
		 if (this.Method == "Selection"){
			console.log("Starting Selection Sort.".yellow);
			console.time("Selection Sort completed in:".yellow);
			selectionSort(this.List).then((result) => {
				console.timeEnd("Selection Sort completed in:".yellow);
			}).catch((error) => {
				console.log("Error", error);
			})
		}else if (this.Method == "Bubble"){
			console.log("Starting Bubble Sort.".blue);
			console.time("Bubble Sort completed in:".blue);
			bubbleSort(this.List).then((result) => {
				console.timeEnd("Bubble Sort completed in:".blue);
			}).catch((error) => {
				console.log("Error", error);
			})
		} else if (this.Method == "Insertion"){
			console.log("Starting Insertion Sort.".red);
			console.time("Insertion Sort completed in:".red);
			insertionSort(this.List).then((result) => {
				console.timeEnd("Insertion Sort completed in:".red);
			}).catch((error) => {
				console.log("Error", error);
			})
		}else if (this.Method == "Quick"){
			console.log("Starting Quick Sort.".green);
			console.time("Quick Sort completed in:".green);
			quickSort(this.List,0,this.List.length).then((result) => {
				console.timeEnd("Quick Sort completed in:".green);
			}).catch((error) => {
				console.log("Error", error);
			})
		}else if (this.Method == "Merge"){
			console.log("Starting Merge Sort.".rainbow);
			console.time("Merge Sort completed in:".rainbow);
			var data = merge_sort(this.List)
			console.timeEnd("Merge Sort completed in:".rainbow);
		}

		async function bubbleSort(arr){
			return new Promise(function(resolve, reject) {
			var len = arr.length;
			for (var i = len-1; i>=0; i--){
			  for(var j = 1; j<=i; j++){
				if(arr[j-1]>arr[j]){
					var temp = arr[j-1];
					arr[j-1] = arr[j];
					arr[j] = temp;
				 }
			  }
			}
			resolve(arr);
		 })
		}

		async function insertionSort(arr){
			return new Promise(function(resolve, reject) {
				var i, len = arr.length, el, j;
				for(i = 1; i<len; i++){
				el = arr[i];
				j = i;
				while(j>0 && arr[j-1]>el){
					arr[j] = arr[j-1];
					j--;
				}
				arr[j] = el;
				}
				resolve(arr);
		})
		}

		async function selectionSort(arr){
			return new Promise(function(resolve, reject) {
			var minIdx, temp, 
				len = arr.length;
			for(var i = 0; i < len; i++){
			minIdx = i;
			for(var  j = i+1; j<len; j++){
				if(arr[j]<arr[minIdx]){
					minIdx = j;
				}
			}
			temp = arr[i];
			arr[i] = arr[minIdx];
			arr[minIdx] = temp;
			}
			resolve(arr);
		})
		}

		async function quickSort(arr, left, right){
			return new Promise(function(resolve, reject) {
			var len = arr.length, 
			pivot,
			partitionIndex;
		   if(left <= right){
			 pivot = right;
			 partitionIndex = partition(arr, pivot, left, right);
			quickSort(arr, left, partitionIndex - 1).then((result) => {
				quickSort(result, partitionIndex + 1, right).then((result) => {
					
				}).catch((error) => {
					console.log("Error", error);
				});
			}).catch((error) => {
				console.log("Error", error);
			});
		   }
		   resolve(arr);
		})
		}

		function partition(arr, pivot, left, right){
			var pivotValue = arr[pivot],
				partitionIndex = left;
		 
			for(var i = left; i < right; i++){
			 if(arr[i] < pivotValue){
				var temp = arr[i];
				arr[i] = arr[partitionIndex];
				arr[partitionIndex] = temp;
			   partitionIndex++;
			 }
		   }
		   var temp = arr[right];
			arr[right] = arr[partitionIndex];
			arr[partitionIndex] = temp;
		   return partitionIndex;
		}

		function merge_sort(arr) {
			let length = arr.length;        
			if (length < 2) {
			  return arr
			}
		   let middle = Math.floor(length/2)
		   let left = arr.slice(0, middle)     
		   let right = arr.slice(middle)     
		   return merge(merge_sort(left), merge_sort(right))
		  }
		  
		  function merge(left, right) {
			let result = [];
			let i=0;
			let j=0;
			while(i < left.length && j < right.length) {
			  if(left[i] < right[j]) {
				result.push(left[i]) ;
				i++;       
			  } else {                       
				result.push(right[j]);
				j++;
			  }
			}
			return result.concat(left.slice(i)).concat(right.slice(j))
		  }
				 
		
	}


}

module.exports = Task;