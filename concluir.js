import { db } from "./firebase.js";
import { ref, get, update }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const id = new URLSearchParams(location.search).get("id");
const r = ref(db,"links/"+id);
const s = await get(r);

if(!s.exists()){
  alert("Link inválido");
  location.href="index.html";
}

const d = s.val();
document.getElementById("title").innerText = d.title;
document.getElementById("icon").src =
 d.photoUrl || "https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg";

window.baixar = async ()=>{
  await update(r,{clicks:(d.clicks||0)+1});
  location.href = d.fileUrl;
};
