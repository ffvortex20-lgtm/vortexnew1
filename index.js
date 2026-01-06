import { db, storage } from "./firebase.js";
import { ref, push, set, onValue, remove, update }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { ref as sRef, uploadBytes, getDownloadURL }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const titleI = document.getElementById("title");
const fileI  = document.getElementById("file");
const photoI = document.getElementById("photo");
const lista  = document.getElementById("lista");

window.gerar = async () => {
  const file = fileI.files[0];
  if(!file) return alert("Selecione o arquivo");

  const fRef = sRef(storage,"files/"+Date.now()+"_"+file.name);
  await uploadBytes(fRef,file);
  const fileUrl = await getDownloadURL(fRef);

  let photoUrl = "";
  if(photoI.files[0]){
    const pRef = sRef(storage,"photos/"+Date.now()+"_"+photoI.files[0].name);
    await uploadBytes(pRef,photoI.files[0]);
    photoUrl = await getDownloadURL(pRef);
  }

  const lRef = push(ref(db,"links"));
  await set(lRef,{
    title: titleI.value || "Download",
    fileUrl,
    photoUrl,
    clicks: 0,
    createdAt: Date.now()
  });

  titleI.value=""; fileI.value=""; photoI.value="";
};

onValue(ref(db,"links"), snap=>{
  lista.innerHTML="";
  snap.forEach(c=>{
    const d=c.val();
    lista.innerHTML+=`
      <div class="link">
        <b>${d.title}</b><br>
        <small>Cliques: ${d.clicks}</small><br>
        <a href="concluir.html?id=${c.key}" target="_blank">Abrir</a><br>
        <button onclick="editar('${c.key}')">Editar</button>
        <button onclick="remover('${c.key}')">Remover</button>
      </div>
    `;
  });
});

window.remover = id => remove(ref(db,"links/"+id));
window.editar = id => {
  const t = prompt("Novo título:");
  if(t) update(ref(db,"links/"+id),{title:t});
};
