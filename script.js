//video wala kaam 
let video=document.querySelector("video");
let recordBtncont=document.querySelector(".record-btn-cont");
let recordBtn=document.querySelector(".record-btn");
let captureBtncont=document.querySelector(".capture-btn-cont");
let captureBtn=document.querySelector(".capture-btn");
let recordFlag=false;
let recorder;
let chunks=[];//media data in 
chunks
let transparentColor="transparent";
let constraints={
    video:true,
    audio:true
}
navigator.mediaDevices.getUserMedia(constraints).then((stream)=>{
video.srcObject=stream;
recorder=new MediaRecorder(stream);
recorder.addEventListener("start",(e)=>{
    chunks=[];
})
recorder.addEventListener("dataavailable",(e)=>{
    chunks.push(e.data);

})
recorder.addEventListener("stop",(e)=>{
    //conversion of media chunks data to video
    let blog=new Blob(chunks,
        {type:"video/mp4"});
    if(db){
        let videoId=shortid();
        let videodbtransaction=db.transaction("video","readwrite");
       let videostore= videodbtransaction.objectStore("video");
       let videoentry={
        id:`vid-${videoId}`,blobData:blog
       }
       videostore.add(videoentry);

    }
    let videourl=URL.createObjectURL(blog);
    // let a=document.createElement("a");
    // a.href=videourl;
    // a.download="stream.mp4";
    // a.click();
})
})
recordBtncont.addEventListener("click",(e)=>{
    if(!recorder)return;
    recordFlag=!recordFlag;
    if(recordFlag){
        recorder.start();
        recordBtn.classList.add("scale-record")
        startTimer();
    }
    else{
        recorder.stop();
        recordBtn.classList.remove("scale-record");
        stopTimer();

    }
    

    })
    captureBtncont.addEventListener("click",(e)=>{
        captureBtn.classList.add("scale-capture");

        let canvas=document.createElement("canvas");
        canvas.width=video.videoWidth;
        canvas.height=video.videoHeight;
        let tool=canvas.getContext("2d");
        tool.drawImage(video,0,0,canvas.width,canvas.height);
        //fitering 
        tool.fillstyle=transparentColor;
        tool.fillRect(0,0,canvas.width,canvas.height);

        let imageUrl=canvas.toDataURL();
        if(db){
            let imageId=shortid();
            let imagedbtransaction=db.transaction("image","readwrite");
           let imagestore= imagedbtransaction.objectStore("image");
           let imageentry={
            id:`img-${imageId}`,url:imageUrl
           }
           imagestore.add(imageentry);
    
        }
        // let a=document.createElement("a");
        // a.href=imageUrl;
        // a.download="image.jpg";
        // a.click();
        setTimeout(()=>{
            captureBtn.classList.remove("scale-capture");

        },500)
       
})
let timerId;
let  counter=0;//represents total seconds
let timer=document.querySelector(".timer");
function startTimer(){
    timer.style.display="block";
    function displayTimer(){
        let totalsecond=counter;
        let hours= Number.parseInt(totalsecond/3600);
        totalsecond=totalsecond % 3600;//with remaining values;

        let minutes=Number.parseInt(totalsecond/60);
        totalsecond=totalsecond % 60;

        let seconds=totalsecond;
        hours=(hours<10)?`0${hours}`:hours;
        minutes=(minutes<10)?`0${minutes}`:minutes;
        seconds=(seconds<10)?`0${seconds}`:seconds;

        timer.innerText=`${hours}:${minutes}:${seconds}` ;
        counter++;

    }
    timerId=setInterval(displayTimer,1000);
}
function stopTimer(){
    timer.style.display="none";
  clearInterval(timerId); 
  timer.innerText="00:00:00";
}
//filtering logic

let filterlayer=document.querySelector(".filter-layer");

let allfilters=document.querySelectorAll(".filter");
allfilters.forEach((filterElem)=>{
filterElem.addEventListener("click",(e)=>{
    //get
    transparentColor=getComputedStyle(filterElem).getPropertyValue("background-color");
    filterlayer.style.backgroundColor=transparentColor;
})
})


