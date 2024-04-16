import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { collection, addDoc, } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

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
$(document).on("click", ".edit-btn", async function() {
  let newName = $('#name').val();
  let newText = $('#수정쓰').val();
  let docId = $(this).closest('.modal-content').data('docId');
  try {
    await updateDoc(doc(db, "TeamProject", docId), {
      name: newName,
      text: newText
    });
    $('#모달창').hide();
  } catch (error) {
    console.error("Error updating document: ", error);
  }
});

$(document).on("click", ".btnr", async function() {
  let cardBody = $(this).closest('.card-body');
  let name = cardBody.find('.card-title').text().trim();
  let text = cardBody.find('.card-text').text().trim();
  $('#이름쓰').val(name);
  $('#수정쓰').val(text);
  $('#모달창').show();

  $('.close').click(function() {
    $('#모달창').hide();
  });
  
  $(document).on('click', function(e) {
    if ($(e.target).hasClass('modal')) {
      $('#모달창').hide();
    }
  });
});


$("#maketextcard").click(async function () {
  let name = $("#name").val();
  let text = $("#text").val();

  let doc = {
    "name": name,
    "text": text
  };
  await addDoc(collection(db, "TeamProject"), doc);
});

let docs = await getDocs(collection(db, "TeamProject"));
docs.forEach((doc) => {
  let row = doc.data();
  console.log(row);

  let name_row = row["name"];
  let text_row = row["text"];

  let temp_html = `
    <div class="card border-dark mb-3" style="max-width: 1000rem;">
      <div class="card-body">
        <h5 class="card-title">${name_row}</h5>
        <p class="card-text">${text_row}</p>
        <button type="button" class="btn btn-outline-dark">삭제</button><button type="button"
          class="btnr btn btn-outline-dark">수정</button>
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
  $(".btntim").click(function () {
    $(this).closest('.팀원명').next('.팀원상세정보').toggle();
  });
});



  //if (($('#name').val().length === 0) || ($('#text').val().length === 0)) {
  //  alert('닉네임 또는 방명록을 작성해주세요.');
  //} else {
  //}