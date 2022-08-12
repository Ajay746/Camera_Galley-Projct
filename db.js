
//open a database
//create objectstore 
//make transaction 
let db;
let openRequest=indexedDB.open("myDatabase");
openRequest.addEventListener("success",(e)=>{
    console.log("success");
    db=openRequest.result;//to access the database

})
openRequest.addEventListener("error",(e)=>{
    
})
openRequest.addEventListener("upgradeneeded",(e)=>{
    db=openRequest.result;
    db.createObjectStore("video",{keyPath:"id"});
    db.createObjectStore("image",{keyPath:"id"});
    
})
