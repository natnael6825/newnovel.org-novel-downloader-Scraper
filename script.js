


         
   
document.querySelector(".button-63").addEventListener("click", namechecker );


document.querySelector(".button-75").addEventListener("click", download );
document.getElementById("download").disabled = true;

let data="";
let content={};

 
var name1;
var name;
var value1;
var chapter;
var lastchapter;
var server;
var filestart;

var start;
var end;
var novelname;
var total, first;





/////////////////////////////////////////////////////////////////

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

/////////////////////////////

function escapeRegExp(string){
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
//////////////////////////////


function replaceAll(str, term, replacement) {
    return str.replace(new RegExp(escapeRegExp(term), 'g'), replacement);
}

///////////////////////////////////////////////////////////////////////////////







 function novel(){




    var select = document.getElementById('server');
    server = select.options[select.selectedIndex].value;





    name1=novelname;

    let clean=replaceAll(name1,":"," ");
    let clean1=replaceAll(clean,"-"," ");
    let clean2=replaceAll(clean1,"!"," ");
    let clean3=replaceAll(clean2,", "," ");
    let clean4=replaceAll(clean3,",","");
    let clean5=replaceAll(clean4,"’","");


    name=clean5;

    

    chapter=document.getElementById("chapter").value;
  lastchapter=document.getElementById("lastchapter").value;


if( chapter==""||name==""|| lastchapter==""){

alert("Enter Required Data");



}else{






    document.querySelector(".button-63").disabled=true;


    document.getElementById("download").disabled = true;
  

  document.getElementById("download").innerHTML = "Loading...";





    chapter=parseInt(chapter);

  first=chapter;

    total=lastchapter-chapter;

    lastchapter=parseInt(lastchapter);
    
    
    
    
    
    if(lastchapter==0){

      lastchapter=1;
      
      }


if(lastchapter<0){

lastchapter=lastchapter*(-1)

}


if(chapter<0){

chapter=chapter*(-1)

}



if(chapter==0){

chapter=1;

}




    if(lastchapter<chapter){

      lastchapter=chapter;



    }

    
    



start=chapter;
end=lastchapter;
 


  

 value1=replaceAll(name," ","+");
  




 noveldata(start);










}




}






//////////////////////////////////////////////////////////////////////////////////













 function noveldata(chapters){



console.log(chapters)

    var urls= "http://localhost:3000/"+server+"?name="+value1+"&chapter="+chapters;
     

         
    
    
    
    start=start+1;
    
    
   
    
    
    
    
    
    let xhr = new XMLHttpRequest();
    xhr.open("GET",urls);
    
    
    
    xhr.send();
    
    
    
     xhr.onload = () => content=JSON.stringify(xhr.responseText);


     xhr.onloadend=()=> repeator()
    
    
   
    
   
    
    
    
    
    }
    
    /////////////////////////////////////////////////////////////////////















    function namechecker(chapters){
        
        alert("Checking Name...")
        

document.getElementById("scrape").disabled = true;

      var select = document.getElementById('server');
      server = select.options[select.selectedIndex].value;
  



      name1=document.getElementById("name").value;

      let clean=replaceAll(name1,":"," ");
      let clean1=replaceAll(clean,"-"," ");
      let clean2=replaceAll(clean1,"!"," ");
      let clean3=replaceAll(clean2,", "," ");
      let clean4=replaceAll(clean3,",","");
      let clean5=replaceAll(clean4,"’","");

      let value1=replaceAll(clean5," ","+");
    

     var urls= "http://localhost:3000/"+"namecheck?name="+value1+"&server="+server;
      
      
      
      
      
     
      
      
      
      
      
      let xhr = new XMLHttpRequest();
      xhr.open("GET",urls);
      
      
      
      xhr.send();
      
      
      
       xhr.onload = () => novelname=xhr.responseText;
  
  
       xhr.onloadend=()=> starter();
      
      
     
      
    
      
      
      
      
      }
      
      
      
      
////////////////////////////////////////////////////

function starter(){


// if(novelname==""){

// novelname="martial master";

// }

let result="Is this the novel  you want to download  :-   "+ novelname;

  let confirmAction = confirm(result);


  if (confirmAction) {
    novel();
  } else {
alert("If this is not the novel your looking for check the spleeling of the name or change the server");
document.getElementById("scrape").disabled = false;
    
  }

}










    
    
    
    
    
    
    /////////////////////////////////////////////////////////////
    



    function repeator(){


       
    
        data=data.concat(content);


      
content=""





        document.getElementById("finish").value=((start-first)/(total+1))*100;
    
    
       
    
    
    
    if((start)<=end){
    
    noveldata(start);
    
    
    
    
    
    
    
    }else{
    
    enabledownload();
    
    }
    
    
    
    }
    


//////////////////////////////////////////////////////////////


function enabledownload(){

    
    

   






   document.getElementById("download").disabled = false;
   document.getElementById("download").innerHTML = "Download";


 


}




//////////////////////////////////////////////////////////////////////////////////



function downloadURI(uri, name) {
let link = document.createElement("a");
link.download = name;
link.href = uri;
link.click();
}


/////////////////////////////////////////////////////////////////


function downloader(data2, type, name) {
let blob = new Blob([data2], {type});
let url = window.URL.createObjectURL(blob);
downloadURI(url, name);
window.URL.revokeObjectURL(url);
}











//////////////////////////////////////////////////////////







function download(){

 


  // let clean=JSON.stringify(data);



  let clean2=data.replaceAll(/\\n/g,"\n");


  let data2 =clean2;
  
  
  
  
  
  let type = "text/plain;charset=utf-8", filename = novelname+" "+chapter+"-"+lastchapter+".txt";
  
  
  
  
   downloader(data2, type, filename);
  
  
  
  
  content="";
  data="";
  
   
  
  }
  
  


















