<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

export const app = initializeApp({
  apiKey: "AIzaSyAx-jIvw9lqykjroKMWzRTEOlZ41Xk6-bY",
  authDomain: "vortexxxxxxxxx-5159f.firebaseapp.com",
  databaseURL: "https://vortexxxxxxxxx-5159f-default-rtdb.firebaseio.com",
  projectId: "vortexxxxxxxxx-5159f",
  storageBucket: "vortexxxxxxxxx-5159f.firebasestorage.app"
});

export const db = getDatabase(app);
export const storage = getStorage(app);
</script>
