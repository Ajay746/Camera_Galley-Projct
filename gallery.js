setTimeout(()=>{
if(db){
    //videos retieval 
    
    let videodbtransaction=db.transaction("video","readonly");
    let videostore=videodbtransaction.objectStore("video");
   let videoRequest= videostore.getAll();
   videoRequest.onsuccess=(e)=>{
    let videoResult=videoRequest.result;
    let gallerycont=document.querySelector(".gallery-cont");
    videoResult.forEach((videoobj)=>{
         let mediaElem=document.createElement("div");
         mediaElem.setAttribute("class","media-cont");
         mediaElem.setAttribute("id",videoobj.id);
         let url=URL.createObjectURL(videoobj.blobData);



         mediaElem.innerHTML=`<div class="media">
         <video autoplay loop src="${url}"></video>
     </div>
     <div class="delete  action-btn">Delete</div>
     <div class="download action-btn">Download</div>`;
     gallerycont.appendChild(mediaElem);
     let deletebtn=mediaElem.querySelector(".delete");
     deletebtn.addEventListener("click",deleteListener);
     let downloadbtn=mediaElem.querySelector(".download");
     downloadbtn.addEventListener("click",DownloadListener);

    })
   }


//image retrieval

   let imagedbtransaction=db.transaction("image","readonly");
   let imagestore=imagedbtransaction.objectStore("image");
  let imageRequest= imagestore.getAll();
  imageRequest.onsuccess=(e)=>{
   let imageResult=imageRequest.result;
   let gallerycont=document.querySelector(".gallery-cont");
   imageResult.forEach((imageobj)=>{
        let mediaElem=document.createElement("div");
        mediaElem.setAttribute("class","media-cont");
        mediaElem.setAttribute("id",imageobj.id);
        let url=imageobj.url;
        mediaElem.innerHTML=
        `<div class="media">
       <img src="" alt="ajay"/>
    </div>
    <div class="delete  action-btn">Delete</div>
    <div class="download action-btn">Download</div>`;
    gallerycont.appendChild(mediaElem);
    let deletebtn=mediaElem.querySelector(".delete");
     deletebtn.addEventListener("click",deleteListener);
     let downloadbtn=mediaElem.querySelector(".download");
     downloadbtn.addEventListener("click",DownloadListener);
   })
  }


}
},100)
function deleteListener(e){
   //DB removal
    let id=e.target.parentElement.getAttribute("id");
    let type=id.slice(0,3);
    if(type==="vid"){
      let videodbtransaction=db.transaction("video","readwrite");
    let videostore=videodbtransaction.objectStore("video");
    videostore.delete(id);

    }
    else if(type==="img"){
      let imagedbtransaction=db.transaction("image","readwrite");
   let imagestore=imagedbtransaction.objectStore("image");
   imagestore.delete(id);

    }
    //Ui removal
    e.target.parentElement.remove();

}
function DownloadListener(e){
   let id=e.target.parentElement.getAttribute("id");
   let type=id.slice(0,3);
   if(type==="vid"){
      let videodbtransaction=db.transaction("video","readwrite");
    let videostore=videodbtransaction.objectStore("video");
    let videoRequest=videostore.get(id);
    videoRequest.onsuccess =(e)=>{
      let videoResult=videoRequest.result;
      console.log(videoResult);
      let videoURL=URL.createObjectURL(videoResult.blobData);
      let a=document.createElement("a");
      a.href=videoURL;
      a.download="stream.mp4"
      a.click();

    }
   }
   else if(type==="img"){
    let imagedbtransaction=db.transaction("image","readwrite");
     let  imagestore=imagedbtransaction.objectStore("image");
    let imageRequest=imagestore.get(id);
    imageRequest.onsuccess=(e)=>{
      let imageResult=imageRequest.result;
      
      let a=document.createElement("a");
      a.href=imageResult.url;
      a.download="image.jpg";
      a.click();

   }

   }
}