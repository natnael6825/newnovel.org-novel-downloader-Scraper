const https=require('node:https')
const express = require('express')
const fs = require('fs');
const { json } = require('express')
const cors = require("cors");
const { resourceUsage } = require('node:process');
const axios = require('axios');
const cheerio = require('cheerio');



const app = express();
  
  
const port = process.env.PORT || 3000;



app.use(cors({

orgin:'*',
methods:['GET'],


}))


let content={};
let title={};


function escapeRegExp(string){
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
//////////////////////////////


function replaceAll(str, term, replacement) {
  return str.replace(new RegExp(escapeRegExp(term), 'g'), replacement);
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}




///////////////////////////222222222222222222222222222222222///////////////////////////////////////////////////////


async function test2(value,chap){


  var link=value;
  
  
  
  const request = https.request({
    hostname: 'novgo.co',
    port: 443,
    path: link,
    method: 'GET'
  },
  
    async result => {
    let html = ''
   
    result.on('data', dataBuffer => {
      const partialHTML = dataBuffer.toString()
      html += partialHTML
    })
   
  
  
  result.on('end',  async ()=>  {


try{



     title = [...html.matchAll(/<h1>(.*?)<\/h1>/)].map(match => match[1]);

    

}catch(err){



title=["Chapter "+chap]                                                                          



}



if(title=[]){

  title=["chapter "+chap];

}





try{



     content = [...html.matchAll(/<p>(.*?)<\/p>/gm)].map(match => match[1]);
  
 
    }catch(err){


      content="Sorry chapter missing here"
      
      
      }




// let len=(Object.keys(content).length)
  




  
    
// content = content.filter((month,idx) => idx < len-10)


  
  
  
  })
  
  
  
  
  
  })
  
  
  
  request.on('error', error => {
    console.error(error)
  })
   
  request.end()
  
   
  await sleep(4000)
  
  
  if(title!=""||title!={}){
  
  
  
  content=title.concat(content);
  
  }
  
  











  let data=JSON.stringify(content);






  let clean2=replaceAll(data,"[","");
  let clean3=replaceAll(clean2,"{","");
  let clean4=replaceAll(clean3,"]","");
  let clean5=replaceAll(clean4,"}","");
  let clean6=replaceAll(clean5,'"title"',"                            ");
  let clean7=replaceAll(clean6,'"chapter"',"                          ");
  let clean8=clean7.replace(/\\n\\n/g," ");
  let clean9=clean8.replace(/:"/g,"");
  let clean10=replaceAll(clean9,"© 2021 NOVGO. All rights reserved","");
  let clean11=replaceAll(clean10,'...',"");
  let clean12=replaceAll(clean11,'\n\n',' ');
  let clean13=replaceAll(clean12,'© 2021 NOVGO. All rights reserved',"");
  let clean14=clean13.replace(/\\/g,"");
  let clean16=clean14.replaceAll(/<\/strong>|<strong>|<\/i>|<i>|<\/em>|<em>|<i class=|hr">/g,"");
  let clean17=clean16.replaceAll('","',"\n\n");
  
  
  let clean18=clean17.replaceAll('_',"    ");
  let clean19=clean18.replaceAll('&#8217',"\'");
  let clean20=clean19.replaceAll('&#8220',"\“");
  let clean21=clean20.replaceAll('&#8221',"\”");
  let clean22=clean21.replaceAll(';,',"\n\n");
  let clean23=clean22.replaceAll(';',"");
  let clean24=clean23.replaceAll("&#8230","...");
  let clean25=clean24.replaceAll("© 2021 NOVGO. All rights reserved","");
  let clean26=clean25.replaceAll("\"","\n");
  let clean27=clean26.replaceAll("&#8216","\‘")
  
  
  
  
  
  
  
  
  









  
  
  return clean27;
  
  }


  ///////////////////////////3333333333333333333333333/////////////////////////////////////////






/////////////////////////4444444444444444444444444444444444/////////////////////////////////////////







async function test4(value){


  var link=value;
  
  let name;
  
  
  const request = https.request({
    hostname: 'novgo.co',
    port: 443,
    path: link,
    method: 'GET'
  },
  
    async result => {
    let html = ''
   
    result.on('data', dataBuffer => {
      const partialHTML = dataBuffer.toString()
      html += partialHTML
    })
   
    
  
  result.on('end',  async ()=>  {


try{



  name = [...html.matchAll(/<h3 class="h4"><a href="https:\/\/novgo.co\/novel\/(.*?)<\/a>/gm)].map(match => match[1]);
  

    

}catch(err){


name="no name";


}

   


var index=name.toString().indexOf("/")

var sil=name.toString().substring(0,index)

name=sil.replaceAll("-"," ");




  
  })
  
    })
  
  request.on('error', error => {
    console.error(error)
  })
   
  request.end()
  

  await sleep(6000)
  
  
    
  
  
  return name;
  
  }













/////////////////////////////////////////////////////////////////////





  
app.get('/', function(request, response) {
  
  
  
  let data =[{"name":"Technoroid: Overmind","link":"https://gogocdn.net/cover/technoroid-overmind-1672332790.png"}]

response.send(data);




});









//////////////////////////////////////////////////////////////////////////



app.get("/server2", async function(request, response) {

  
  var name=request.query.name;
  var chapter=request.query.chapter;
 
  
  
  

  
  
  
  var value1=name.replaceAll(" ","-");
  var value2="/vipnovel/".concat(value1);
  var value3=value2.concat("/chapter-"+chapter.toString()+"/");
  
 
      
  
  
  
  
  
  
   await  response.send(await test(value3,chapter));
  
  });
  
  
  
  
  
  ///////////////////////////////////////////////////////////////////
  
  
  
  
  app.get('/server1', async function(request, response) {
  
    
      var name=request.query.name;
      var chapter=request.query.chapter;
      
      
      
      
      
      
      
      var value1=name.replaceAll(" ","-");
      var value2="/novel/".concat(value1);
      var value3=value2.concat("/chapter-"+chapter+"/");
      
      ;
      
      
      
      
      
      
      await  response.send(await test2(value3,chapter));
      
      });
      
  

//////////////////////////////////////////////////////////////////





  
  
app.get('/namecheck', async function(request, response) {
  
    
  var name=request.query.name;
  var server=request.query.server;

  
  var value1=name.replaceAll(" ","+");
  var value2="/?s=".concat(value1);
  var value3=value2.concat("&post_type=wp-manga");
  
  
  
  
  
  
  
  if(server=="server2"){

    await  response.send(await test3(value3));

  }else{

    await  response.send(await test4(value3));

  }
  
  
 
  
  
  
  

  
  });
  

////////////////////////////////////////////////////




app.get('/anime', async function(request, response) {



   
  response.send(await scrapeAnime());



});




////////////////////////////////////////////


app.listen(port, function() {
  console.log('Server listening on http://localhost:'+ port );
});
