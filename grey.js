import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChu9ajcdL5wPzGqHxPDuzAjE7hE8cvcdQ",
  authDomain: "sparta-c0920.firebaseapp.com",
  projectId: "sparta-c0920",
  storageBucket: "sparta-c0920.appspot.com",
  messagingSenderId: "766494779854",
  appId: "1:766494779854:web:7e816932a38e61e9f7239f",
  measurementId: "G-TW0FFM0PBW",
};

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

$("#maketextcard").click(async function () {
  let name = $("#name").val();
  let text = $("#text").val();

  let doc = {
    "name": name,
    "text": text
  };
  await addDoc(collection(db, "TeamProject"), doc);
  window.location.reload();
});

let docs = await getDocs(collection(db, "TeamProject"));

docs.forEach((doc) => {
  let row = doc.data();
  console.log(row);
  let name_row = row["name"];
  let text_row = row["text"];
  let postId = doc.id;

  let temp_html = `
    <div class="card border-dark mb-3" style="max-width: 1000rem;">
      <div class="card-body">
        <h5 class="card-title">${name_row}</h5>
        <p class="card-text">${text_row}</p>
        <button type="button" class="btn btn-outline-dark delposting" data-id="${postId}">삭제</button>
        <button type="button" class="btn btn-outline-dark">수정</button>
      </div>
    </div>`
    $("#cardbox").append(temp_html);

});

$(document).on("click", ".delposting", async function () {
  const postId = $(this).data("id"); 

  const ok = window.confirm("삭제하시겠습니까?");
  if (ok) {
    try {
      await deleteDoc(doc(db, "TeamProject", postId)); 
      $(this).closest(".card").remove(); 
      alert("게시물이 성공적으로 삭제되었습니다.");
    } catch (error) {
      console.error("게시물 삭제 중 오류 발생:", error);
      alert("게시물 삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  }
});




$(document).ready(function () {
  $(".btn").click(function () {
    $(this).closest('.팀원명').next('.팀원상세정보').toggle();
  });
});