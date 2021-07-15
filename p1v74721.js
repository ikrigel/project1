var nullHour=false;
function addNote(note, date, hour,b3) {
  
  let n = true;
  let d = true;
  //date.value = "2021-06-30";
  if (note.value === ""|| note.value.length<4) {
    alert(`Please add more text to note - more than 3 Letters `);
    note.style.backgroundColor = "red";
    n = false;
  } else {
    n = true;
    note.style.backgroundColor = "white";
  }
  if (date.value === "") {
    //let d = false;
    alert(`Please add date to note`);
    date.style.backgroundColor = "red";
    d = false;
  } else {
    d = true;
    date.style.backgroundColor = "white";
  }
  if (hour.value === "") {
    alert(`No hour due date`);
    hour.style.backgroundColor = "red";
  } else {
    hour.style.backgroundColor = "white";
  }
  if (n === true && d === true) {
    //alert(`Adding new note...`);
    //saveDraft(note, date, hour);
    if(hour.value === ""){
       nullHour=true;
      let d = new Date();
      let h = d.getHours();
      if(h<10){h='0'+h;}
      let currentHour=`${d.getHours()}:${d.getMinutes()}`;
     
      hour.value=currentHour;
      storeTaskInLocalStorage2(note, date, hour,b3);
  }else if(hour.value !== ""){storeTaskInLocalStorage2(note, date, hour);}
  } else {
    alert(`Please fix new note issues`);
  }
}

function storeTaskInLocalStorage2(note, date, hour) {
  let missionBoard = [];
  let index=getMissionsNumber();
  let classId= generateId();
  let newNoteId=classId;//The ID of the new note for animation creation
  let testObject = {
    newTask: note.value,
    taskDueDate: date.value,
    hourDueDate: hour.value,
    markForDelete: false,
    markForEdit: false,
    noteId:classId
  };
  
  // Parse the serialized data back into an aray of objects
  missionBoard = JSON.parse(localStorage.getItem("testObject")) || [];
  // Push the new data (whether it be an object or anything else) onto the array
  missionBoard.push(testObject);
  // Alert the array value
  //alert(arr); // Should print something like [Object array] on activation
  // Re-serialize the array back into a string and store it in localStorage
  localStorage.setItem("testObject", JSON.stringify(missionBoard));
  // Put the object into storage

  // Retrieve the object from storage
  let retrievedObject = localStorage.getItem("testObject");

  console.log("retrievedObject: ", JSON.parse(retrievedObject));
  let x = "";
  
  for (let item of missionBoard) {
    // document.getElementById("div2").innerHTML = JSON.stringify(item, null, 4);
    let task = item.newTask;
    let date = item.taskDueDate;
    let hour = item.hourDueDate;
    //let iDofClass=item.noteId;
    let classId= item.noteId;//generateId();
    let buttonDeleteId=classId;
    let buttonEditId=classId;

   // x += `<div class="notes">${task}\n${date}\n${hour}</div>&nbsp`;
   //x += `<div class="notes" style="background-image: url('notebg.png');"><div class="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3">${task}\n${date}\n${hour}</div></div>`;
   if(classId===newNoteId){
   x += ` <div class="notesNew" class="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3"  id="div2">
   <div  id="${classId}" >
   <div  class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6" class="editDeleteNote1" ><p><a href="#" class="btn  btn-lg" id="${buttonEditId}" ${`onclick=editSelectedNote(document.getElementById("${buttonEditId}"))`}><span class="glyphicon glyphicon glyphicon-edit"><br/>Edit</span></a></p></div>
   <div ><p><a href="#" class="btn  btn-lg" id="${buttonDeleteId}" ${`onclick=deleteSelectedNote(document.getElementById("${buttonDeleteId}"))`}>
   <span class="glyphicon glyphicon-remove-sign"><br/>Delete</span></a></p></div>
   <div class="noteText" class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"  >${task}</div>
   <div class="footer" class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"  >${date}\n<br/>${hour}</p></div></div></div>`; 
   }else{
    x += ` <div class="notes" class="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3"  id="div2">
    <div  id="${classId}" >
    <div  class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6" class="editDeleteNote1" ><p><a href="#" class="btn  btn-lg" id="${buttonEditId}" ${`onclick=editSelectedNote(document.getElementById("${buttonEditId}"))`}><span class="glyphicon glyphicon glyphicon-edit"><br/>Edit</span></a></p></div>
    <div ><p><a href="#" class="btn  btn-lg" id="${buttonDeleteId}" ${`onclick=deleteSelectedNote(document.getElementById("${buttonDeleteId}"))`}>
    <span class="glyphicon glyphicon-remove-sign"><br/>Delete</span></a></p></div>
    <div class="noteText" class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"  >${task}</div>
    <div class="footer" class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"  >${date}\n<br/>${hour}</p></div></div></div>`; 

   }
   index++;
  }
  //);//saveDraft(document.getElementById(`n1`),document.getElementById(`d1`),document.getElementById(`h1`)));
 // b3.click(saveDraft(document.getElementById(`n1`),document.getElementById(`d1`),document.getElementById(`h1`)));
 //saveDraft(task,date,hour) ;
 document.getElementById("div2").innerHTML = x;
 //showNotesAfterChange();
}
function getMissionsNumber(){
  let missionBoard = [];
  missionBoard = JSON.parse(localStorage.getItem("testObject")) || [];
  return missionBoard.length;
}

function load() {
  let missionBoard = [];
  setTimeout(() => {
   
  missionBoard = JSON.parse(localStorage.getItem("testObject")) || [];
  /**
  let testObject = {
    newTask: note.value,
    taskDueDate: date.value,
    hourDueDate: hour.value,
    markForDelete: "false",
    markForEdit: "false",
    noteId:classId
  };
 */
  // Parse the serialized data back into an aray of objects

  // Push the new data (whether it be an object or anything else) onto the array
  //arr.push(testObject);
  // Alert the array value
  //alert(arr); // Should be something like [Object array]
  // Re-serialize the array back into a string and store it in localStorage
  //localStorage.setItem("testObject", JSON.stringify(arr));
  // Put the object into storage
  //localStorage.setItem("testObject", JSON.stringify(testObject));

  // Retrieve the object from storage
  let retrievedObject = localStorage.getItem("testObject");

  console.log("retrievedObject: ", JSON.parse(retrievedObject));
  let x="";
  index = 1;
  if(retrievedObject!==null){
  for (let item of missionBoard) {
    //document.getElementById("div2").innerHTML = JSON.stringify(item, null, 4);
    let task = item.newTask;
    let date = item.taskDueDate;
    let hour = item.hourDueDate;
    let classId= item.noteId;//generateId();
    let buttonDeleteId=classId;
    let buttonEditId=classId;
    let newNoteId=classId;
    
   
     x += ` <div class="notes" class="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3"  id="div2">
     <div  id="${classId}" >
     <div  class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6" class="editDeleteNote1" ><p><a href="#" class="btn  btn-lg" id="${buttonEditId}" ${`onclick=editSelectedNote(document.getElementById("${buttonEditId}"))`}><span class="glyphicon glyphicon glyphicon-edit"><br/>Edit</span></a></p></div>
     <div ><p><a href="#" class="btn  btn-lg" id="${buttonDeleteId}" ${`onclick=deleteSelectedNote(document.getElementById("${buttonDeleteId}"))`}>
     <span class="glyphicon glyphicon-remove-sign"><br/>Delete</span></a></p></div>
     <div class="noteText" class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"  >${task}</div>
     <div class="footer" class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"  >${date}\n<br/>${hour}</p></div></div></div>`; 
 
   // }
  
   //////////////////////////////////////////////////////////////////////



    index++;
  }
}
n1.value= localStorage.getItem("note");
d1.value=localStorage.getItem("date");
h1.value=localStorage.getItem("hour");
  document.getElementById("div2").innerHTML = x;
  
  printNote(x);
}, 100);
}
function SaveDataToLocalStorage(note, date, hour) {
  let markForDelete = false;
  let markForEdit = false;
  let a = [];
  // Parse the serialized data back into an aray of objects
  a = JSON.parse(localStorage.getItem("session")) || [];
  // Push the new data (whether it be an object or anything else) onto the array
  a.push(data);
  // Alert the array value
  alert(a); // Should be something like [Object array]
  // Re-serialize the array back into a string and store it in localStorage
  localStorage.setItem("session", JSON.stringify(a));
}

function clearNote(note, date, hour) {
  note.value = "";
  note.style.backgroundColor = "white";
  date.value = "";
  date.style.backgroundColor = "white";
  hour.value = "";
  hour.style.backgroundColor = "white";
  localStorage.note="";
  localStorage.date="";
  localStorage.hour="";
  
  
}
// function buildXforPrint(task,date,hour){
//   x += `<div class="notes" style="background-image: url('notebg.png');">
//     <div class="row"><div class="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3">${task}\n
//     <div id="footer">${date}\n${hour}
//     </div></div></div></div>`;
//   return x;
// }
function printNote(x){
 
  document.getElementById("div2").innerHTML = x;
}
function deleteAllNotes(){
  let retrievedObject = localStorage.getItem("testObject");
  if (retrievedObject!==null){
    localStorage.removeItem("testObject");
    showNotesAfterChange();
  }
}
function generateId(){
  const date = new Date();
    const classIdGenerator = date.getTime();
    const timeStemp = date.toISOString();
    return classIdGenerator;
}
function deleteSelectedNote(id){

  //alert(`deleting the note?`);
 // alert(`myObject is ${typeof id}`);
  console.table(id, ['newTask', 'taskDueDate','hourDueDate','markForDelete','markForEdit','noteId']);
  
  
  let missionBoard = [];
  let newMissionBoard=[];

  missionBoard = JSON.parse(localStorage.getItem("testObject")) || [];

  //get the array from local storage
  //Build new array without curren item
  //delete old array from local storage
  //save new array in local storage
  //load new array to mission board

 
  
 let deletedNoteId=id.id;

  // Parse the serialized data back into an aray of objects
  //missionBoard = JSON.parse(localStorage.getItem("testObject")) || [];
  // Push the new data (whether it be an object or anything else) onto the array
  for(let value of missionBoard){
    let idValueToTest=`${value.noteId}`;
  if(idValueToTest!==deletedNoteId){
    newMissionBoard.push(value);
  }
  }
  //missionBoard.push(testObject);
  // Alert the array value
  //alert(arr); // Should print something like [Object array] on activation
  // Re-serialize the array back into a string and store it in localStorage
  localStorage.setItem("testObject", JSON.stringify(newMissionBoard));
  // Put the object into storage

  // Retrieve the object from storage
  let retrievedObject = localStorage.getItem("testObject");

  console.log("retrievedObject: ", JSON.parse(retrievedObject));
 

load();
//let noteNumber=noteId.value;
//alert(`note ID? ${noteNumber}`);
 /**
  let testObject = {
    newTask: note.value,
    taskDueDate: date.value,
    hourDueDate: hour.value,
    markForDelete: "false",
    markForEdit: "false",
    noteId:classId
  };
 */
}
function editSelectedNote(id){
 // alert(`editing the note?`);

  
 let missionBoard = [];
 let newMissionBoard=[];

 missionBoard = JSON.parse(localStorage.getItem("testObject")) || [];

 //get the array from local storage
 //Build new array with curren item new values
 //delete old array from local storage
 //save new array in local storage
 //load new array to mission board
 
let editNoteId=id.id;

//  let testObject = {
//    newTask: note.value,
//    taskDueDate: date.value,
//    hourDueDate: hour.value,
//    markForDelete: false,
//    markForEdit: false,
//    noteId:classId
//  };

 // Parse the serialized data back into an aray of objects
 //missionBoard = JSON.parse(localStorage.getItem("testObject")) || [];
 // Push the new data (whether it be an object or anything else) onto the array
 for(let value of missionBoard){
   let idValueToTest=`${value.noteId}`;
 if(idValueToTest!==editNoteId){
   newMissionBoard.push(value);
 }else{
   newTaskVal=prompt(`Please edit note `,`${value.newTask}`,);
   if(newTaskVal===null){newTaskVal=value.newTask;}
   taskDueDateVal=prompt(`Please enter note date `,`${value.taskDueDate}`);
   if(taskDueDateVal===null){taskDueDateVal=value.taskDueDate;}
   taskDueHourVal=prompt(`Please enter note hour`,`${value.hourDueDate}`);
   if(taskDueHourVal===null){taskDueHourVal=value.hourDueDate;}
  noteIdVal=value.noteId;
  let testObject = {
    newTask: newTaskVal,
    taskDueDate: taskDueDateVal,
    hourDueDate: taskDueHourVal,
    markForDelete: false,
    markForEdit: false,
    noteId:noteIdVal
  };
  newMissionBoard.push(testObject);
  }
 }
 
 // Alert the array value
 //alert(arr); // Should print something like [Object array] on activation
 // Re-serialize the array back into a string and store it in localStorage
 localStorage.setItem("testObject", JSON.stringify(newMissionBoard));
 // Put the object into storage

 // Retrieve the object from storage
 let retrievedObject = localStorage.getItem("testObject");

 console.log("retrievedObject: ", JSON.parse(retrievedObject));
 

 showNotesAfterChange();
}
 function datePick() {
  ( "#datepicker" ).datepicker();
} 
function saveDraft(note, date, hour) {
  localStorage.note=note.value;
  document.getElementById(note.id).innerHTML=`${localStorage.note}`;
  note.style.backgroundColor = "white";
  localStorage.date=date.value;
  date.value=`${localStorage.date}`;
  date.style.backgroundColor = "white";
  if (nullHour===true){localStorage.hour="";nullHour=false;}
  else if (date.value!==""){localStorage.hour=hour.value;nullHour=false;}
  hour.value= `${localStorage.hour}`;
  hour.style.backgroundColor = "white";
}

function showNotesAfterChange() {
  let missionBoard = [];
  setTimeout(() => {
   
  missionBoard = JSON.parse(localStorage.getItem("testObject")) || [];
 
  let retrievedObject = localStorage.getItem("testObject");

  console.log("retrievedObject: ", JSON.parse(retrievedObject));
  let x="";
  index = 1;
  if(retrievedObject!==null){
  for (let item of missionBoard) {
  
    let task = item.newTask;
    let date = item.taskDueDate;
    let hour = item.hourDueDate;
    let classId= item.noteId;//generateId();
    let buttonDeleteId=classId;
    let buttonEditId=classId;
    let newNoteId=classId;
    
       x += ` <div class="notes" class="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3"  id="div2">
     <div  id="${classId}" >
     <div  class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6" class="editDeleteNote1" ><p><a href="#" class="btn  btn-lg" id="${buttonEditId}" ${`onclick=editSelectedNote(document.getElementById("${buttonEditId}"))`}><span class="glyphicon glyphicon glyphicon-edit"><br/>Edit</span></a></p></div>
     <div ><p><a href="#" class="btn  btn-lg" id="${buttonDeleteId}" ${`onclick=deleteSelectedNote(document.getElementById("${buttonDeleteId}"))`}>
     <span class="glyphicon glyphicon-remove-sign"><br/>Delete</span></a></p></div>
     <div class="noteText" class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"  >${task}</div>
     <div class="footer" class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6"  >${date}\n<br/>${hour}</p></div></div></div>`; 
 

    index++;
  }
}
n1.value= localStorage.getItem("note");
d1.value=localStorage.getItem("date");
h1.value=localStorage.getItem("hour");
  document.getElementById("div2").innerHTML = x;
  
  printNote(x);
}, 100);
}