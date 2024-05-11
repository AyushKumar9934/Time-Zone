
let message=document.getElementById("message");
let currlat,currlong

 function getLocation() {
      return new Promise((resolve,reject)=>{
        if(navigator.geolocation)
            navigator.geolocation.getCurrentPosition(resolve,reject)
        else reject("This browser is not support the geolocation app")
      })
    
  
}

function showPosition(position) {
  console.log(position.coords.latitude, position.coords.longitude)
  message.innerHTML=`Enter Your Address`;
  currlat=position.coords.latitude;
   currlong=position.coords.longitude;
  
}
function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        message.innerHTML = "User denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        message.innerHTML = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        message.innerHTML = "The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
        message.innerHTML = "An unknown error occurred."
        break;
    }
  }
  


 async function promise2(){
    console.log("currlat",currlat,"currlong",currlong)
 const res= await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${currlat}&lon=${currlong}&format=json&apiKey=44b93a23f5074a319f51321e0800628e`)
 console.log("res",res);
 const data=await res.json();

    console.log("data inside the promise 2 is ",data);
  if (data["results"].length) {
    let timezoneObj=data["results"][0].timezone;
    // <p id="cname">Name of Time Zone:</p>
    // <p id="clat">Lat:</p><span><p id="clong">Long:</p></span>
    // <p id="cstd">Offset STD:</p>
    // <p id="csecond">Offset STD Second</p>
    // <p id="cdst">Offset DST:</p>
    // <p id="cdsecond">Offset DST Seconds:</p>
    // <p id="ccountry">Country:</p>
    // <p id="cpin">PostCode:</p>
    // <p id="ccity">City:</p>
    document.getElementById("cname").innerHTML+=` `+timezoneObj.name;
    document.getElementById("clat").innerHTML+=` `+data["results"][0].lat;
    document.getElementById("clong").innerHTML+=` `+data["results"][0].lon;
    document.getElementById("cstd").innerHTML+=` `+timezoneObj.offset_STD;

    document.getElementById('csecond').innerHTML+=` `+timezoneObj.offset_STD_seconds;
    document.getElementById("cdst").innerHTML+=` `+timezoneObj.offset_DST;
    document.getElementById("cdsecond").innerHTML+=` `+timezoneObj.offset_DST_seconds;
    document.getElementById("ccountry").innerHTML+=` `+data["results"][0].country;
    document.getElementById("cpin").innerHTML+=` `+data["results"][0].postcode;
    document.getElementById("ccity").innerHTML+=` `+data["results"][0].city;
      //write current location details
  } else {
    console.log("No location found");
    //updatae massage error
  }
  
 }
 











  async function handlePromise(){
    try{
       const position= await getLocation();
       showPosition(position);
        await promise2();

    }catch(e){
         console.log("error is ",e);
    }
  }
  handlePromise();


  
 async function promise3(){
    let address=document.getElementById("text").value;

   // const address = 'Carrer del Pintor Navarro Llorens, 7, 46008 València, Valencia, Spain';
    if(address==""){
        document.getElementById("message").style.display="block";
        document.getElementById("message").innerHTML=`<p>text should not be blank</p>`
        return;
    }
    document.getElementById("message").style.display="none";
    document.getElementById("result").style.display="block"
    document.getElementById("inside-part2").style.display="block"
 let res1=await  fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=44b93a23f5074a319f51321e0800628e`)
    let data1=await res1.json();
   console.log("data inside the promise3 i.e form address input is ",data1)

   if(data1["features"].length>0){
    let timezoneObj=data1["features"][0].properties.timezone;






    document.getElementById("rname").innerHTML=`Name of Time Zone: `+" "+timezoneObj.name;
    document.getElementById("rlat").innerHTML=` Lat:`+" "+data1["features"][0].properties.lat;
    document.getElementById("rlong").innerHTML=` Long:`+" "+data1["features"][0].properties.lon;
    document.getElementById("rstd").innerHTML=`Offset STD:`+" "+timezoneObj.offset_STD;

    document.getElementById('rsecond').innerHTML=`Offset STD Second  `+" "+timezoneObj.offset_STD_seconds;
    document.getElementById("rdst").innerHTML=`Offset DST: `+" "+timezoneObj.offset_DST;
    document.getElementById("rdsecond").innerHTML=` Offset DST Seconds:`+" "+timezoneObj.offset_DST_seconds;
    document.getElementById("rcountry").innerHTML=`Country `+" "+data1["features"][0].properties.country;
    document.getElementById("rpin").innerHTML=`Country: `+" "+data1["features"][0].properties.postcode;
    document.getElementById("rcity").innerHTML=`City: `+" "+data1["features"][0].properties.city;

   }
   else{
    document.getElementById("message").style.display="block";
    document.getElementById("result").style.display="none"
    document.getElementById("inside-part2").style.display="none"
    document.getElementById("message").innerHTML=`<p>Address Not Found!</p>`
   }


   
  }
  
 
 
    

async function handlePromise2(){
    try{
        await promise3();

    }catch(e){
        console.log("error is ",e);
    }
}



  






  document.getElementById("submit").addEventListener('click',handlePromise2);