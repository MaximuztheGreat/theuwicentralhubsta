import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getFirestore, collection, getDoc, getDocs,addDoc} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import firebaseConfig from "./firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function writedata(name, category, picture, link, description)
{
    const reference = collection(db,'tilesdata');
    let dat = {
        name: name,
        category: category,
        picture: picture,
        link: link,
        description: description
        }
    addDoc(reference,dat);
}

export {writedata};