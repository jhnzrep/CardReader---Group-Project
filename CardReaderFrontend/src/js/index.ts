console.log("sda");
import axios, {
  AxiosResponse,
  AxiosError} from "../../node_modules/axios/index";


interface Entry {
  time: string;
  id: number;
  name: string;
  rank: string;
}

interface User {
  id: number;
  name: string;
  rank: string;
}


let entryUri :string = "https://jsmbcardreader.azurewebsites.net/api/entry";
let userUri: string =  "https://jsmbcardreader.azurewebsites.net/api/user";

let outputElement: HTMLDivElement = <HTMLDivElement>document.getElementById("content");
let outputStorageElement: HTMLDivElement = <HTMLDivElement>document.getElementById("content-storage");
let addCardb: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addCardButton");
if(outputStorageElement)
{
    addCardb.addEventListener("click", addCard);
}




axios.get<Entry[]>(entryUri)
.then(function (response:AxiosResponse<Entry[]>):void{
    let tableHead : string = '<table class="table table-hover index-table" id="content">';
    let result : string = '<tbody>';
    response.data.forEach((entry : Entry) => {
        if(entry == null)
          {
        
           // result += "<li> NULL element</li>"        
           console.log("null");
           
          }
        else
          {
            tableHead ='<thead class="index-table-head"><tr><th scope="col">Card #</th><th scope="col">Name</th><th scope="col">Rank</th><th scope="col">Time</th></tr></thead>';
            result += '<tr><th scope="row">'+entry.id+'</th><td>'+ entry.name+'</td><td>'+entry.rank+'</td><td>'+entry.time+'</td></tr>' ;  
           // result += "<li> "+user.id  +"</li>" 
          // result += '<tr><th scope="row">'+entry.id+'</th><td>Mark</td><td>Staff</td><td>12.10.2019:12:06:12</td></tr>' ;      

          }
        });

        tableHead += '</table>';
        result += "</tbody>";
    outputElement.innerHTML = tableHead + result ;
  }
)
.catch(function (error:AxiosError):void{
        //divElement.innerHTML= error.message;        
})


  axios.get<User[]>(userUri)
  .then(function (response:AxiosResponse<User[]>):void{
    let tableHead : string = '<table class="table table-hover index-table" id="content-storage">';
    let result : string = '<tbody>';
      response.data.forEach((user : User) => {
          if(user == null)
            {
          
             // result += "<li> NULL element</li>"        
            }
          else
            {
              tableHead ='<thead class="index-table-head"><th scope="col">Card #</th><th scope="col">Name</th><th scope="col">Rank</th></tr></thead>';

              // result += "<li> "+user.id  +"</li>" 
            // result += ' <div class="flex-table row"><div class="flex-row first" role="cell"><span class="edit"> <button type="submit">    <i class="fas fa-edit"></i><span>edit</span></button> </span><span class="delete"><button type="submit">    <i class="fas fa-trash"></i><span>delete</span></button> </span> </div><div class="flex-row">'+ user.id + '</div><div class="flex-row">' + user.name +   '</div><div class="flex-row">'+ user.rank + '</div>';      
             result +='</th><td>'+ user.id+'</td><td>'+user.name+'</td><td>'+user.rank+'</td></tr>'

             
            }
          });


          tableHead += '</table>';
          result += "</tbody>";
     outputStorageElement.innerHTML = tableHead + result;
  }
  )
  .catch(function (error:AxiosError):void{
          //divElement.innerHTML= error.message;        
  })


  let deleteCarButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("delButton");

    if(deleteCarButton)
    {
      deleteCarButton.addEventListener('click',deleteCar);

    }


  function deleteCar(): void {
    let output: HTMLDivElement = <HTMLDivElement>document.getElementById("contentDelete");
    let inputElement: HTMLInputElement = <HTMLInputElement>document.getElementById("deleteInput");
    let model: string = inputElement.value;
    let uri: string = userUri + "/" + model;
    axios.delete<User>(uri)
        .then(function (response: AxiosResponse<User>): void {
            // element.innerHTML = generateSuccessHTMLOutput(response);
            // outputHtmlElement.innerHTML = generateHtmlTable(response.data);
            console.log(JSON.stringify(response));
            output.innerHTML = response.status + " " + response.statusText;
        })
        .catch(function (error: AxiosError): void { // error in GET or in generateSuccess?
            if (error.response) {
                // the request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index
                //output.innerHTML = error;
            } else { // something went wrong in the .then block?
                //output.innerHTML = error;
            }
        });
}


//let addFormElement: HTMLFormElement = <HTMLFormElement>document.getElementById("fake-form");

function addCard(): void {
  let addIdElement: HTMLInputElement = <HTMLInputElement>document.getElementById("addId");
  let addNameElement: HTMLInputElement = <HTMLInputElement>document.getElementById("addName");
  let addRankElement: HTMLInputElement = <HTMLInputElement>document.getElementById("addRank");
  let myId: number = Number(addIdElement.value);
  let myName: string = addNameElement.value;
  let myRank: string = addRankElement.value;
 /*
  var myId   = document.forms["myForm"]["fid"].value;
  var myName = document.forms["myForm"]["fname"].value;
  var myRank = document.forms["myForm"]["frank"].value;
*/
    axios.post<User>(userUri, { id: myId, name: myName, rank: myRank })
    .then((response: AxiosResponse) => { console.log("response " + response.status + " " + response.statusText); })
    .catch((error: AxiosError) => { console.log(error); });
    console.log("done");
 
}

function initMap() {
  var mapProp = {
      center:new google.maps.LatLng(51.508742,-0.120850),
      zoom:5,
  };
  var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
  }

let buttonelement:HTMLButtonElement = <HTMLButtonElement> document.getElementById("myInput");  

if(outputElement)
{
  buttonelement.addEventListener('keydown',myFunction);
  function myFunction() {
    var  filter, table, tr, td, i, txtValue;
    filter = buttonelement.value.toUpperCase();
    table = document.getElementById("content");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }
}

else
{
  buttonelement.addEventListener('keydown',myFunction);
  function myFunction() {
    var  filter, table, tr, td, i, txtValue;
    filter = buttonelement.value.toUpperCase();
    table = document.getElementById("content-storage");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }
}




