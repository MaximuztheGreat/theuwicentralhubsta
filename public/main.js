import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getFirestore, collection, getDoc, getDocs,addDoc} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import firebaseConfig from "./firebaseConfig.js";

function generateQRC(){
    let result = document.querySelector('#QRC');
    let linkField = document.querySelector('#link-input');
    let link = linkField.value;
    console.log(link);
    let img = '';
    img += `<img src="https://api.qrserver.com/v1/create-qr-code/?data=${link}&amp;size=800x800" alt="" title="" />`;
    //API Link format => API->Data(Link)->size(Pixels)
    //Change pixel size accordingly
    result.innerHTML = img;
}

//The following is the HTML to use the above function
//<div id="QRC"></div>

//routing functions
async function route(title, url){
    document.title = title;
    let display = document.querySelector('#display');
    if(url === null){
        display.innerHTML = '';
    }
    else{
        let responce = await fetch(url);
        display.innerHTML = await responce.text();
    }
}

function getClick(event){
    let site = event.target;
    let text = site.text;
    let url = site.href;
    route(text,url);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getdata()
{
    console.log("Testing");
    const tilesCollection = collection(db,'tilesdata'); 
    const tilesDB = await getDocs(tilesCollection); 
    const tilesList = tilesDB.docs.map(doc => doc.data()); 
    return tilesList;
}


let array = await getdata();

console.log(array);

function content(records)
{
    let result =document.querySelector('#recommended');
    let html = '';
    for(let record of records)
    console.log(records);
    {
        html+=`
        <div class="tiles" data-title= ${record.name} data-description=${record.description} onclick="openPopup(this)">
        <span class="close" onclick="closePopup()">&times;</span>
        <img src="${record.picture}">

        <div class="tilegradient"></div>

        <div class="tiletxt">
            <h3>${record.name}</h3>
        </div>

        </div>`;
    }
    
    result.innerHTML =html;
}

function contentsport(records)
{
    let result =document.querySelector('#clubs');
    let html = '';
    for(let record of records)
    {
        if(record.category == "clubs")
        {
            html+=`
            <div class="tiles" data-title= ${record.name} data-description=${record.description} onclick="openPopup(this)">
                <span class="close" onclick="closePopup()">&times;</span>
                <img src="${record.picture}">

                <div class="tilegradient"></div>

                <div class="tiletxt">
                    <h3>${record.name}</h3>
                </div>
            </div>
                `;
        }
            
    }
    result.innerHTML =html;
}


function contentfood(records)
{
    let result =document.querySelector('#vendors');
    let html = '';
    for(let record of records)
    {
        if(record.category == "vendors")
        {
            html+=`
                <div class="tiles" data-title= ${record.name} data-description=${record.description} onclick="openPopup(this)">
                <span class="close" onclick="closePopup()">&times;</span>
                <img src="${record.picture}">

                <div class="tilegradient"></div>

                <div class="tiletxt">
                    <h3>${record.name}</h3>
                </div>
            </div>
                `;
        }
            
    }
    result.innerHTML =html;
}

function contentuwi(records)
{
    let result =document.querySelector('#UWI');
    let html = '';
    for(let record of records)
    {
        if(record.category == "UWI")
        {
            html+=`
            <div class="recommendedTile" onclick="openPopup()">
            <span class="close" onclick="closePopup()">&times;</span>
            <img src="${record.picture}">

            <div class="tilegradient"></div>

            <div class="tiletxt">
                <h3>${record.name}</h3>
            </div>
        </div>
                `;
        }
            
    }
    result.innerHTML = html;
}

content(array);
contentsport(array);
contentfood(array);
contentuwi(array);