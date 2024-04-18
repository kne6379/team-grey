import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

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

$(document).on("click", "#aeditbtn", function () {
  const dataid = $(this).data("id");
  let text_pw_editId = $(this).data("pw");
  let text_pw_editans = prompt("비밀번호를 입력해주세요.");
  if (text_pw_editId == text_pw_editans) {
    let cardBody = $(this).closest(".card-body");
    let name = cardBody.find(".card-title").text().trim();
    let text = cardBody.find(".card-text").text().trim();
    $("#names").val(name);
    $("#change").val(text);
    $("#modal").show();

    $("#editbtn").click(async function () {
      let newName = $("#names").val();
      let newText = $("#change").val();
      try {
        await updateDoc(doc(db, "TeamProject", dataid), {
          name: newName,
          text: newText,
        });
        alert("게시물이 성공적으로 수정되었습니다.");
        window.location.reload();
      } catch (error) {
        console.error("Error updating document: ", error);
        alert("게시물 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    });
  } else {
    alert("비밀번호를 확인해주세요.");
  }
});

$(".close").click(function () {
  $("#modal").hide();
});

$("#maketextcard").click(async function () {
  let name = $("#name").val();
  let text = $("#text").val();

  if ($("#name").val().length === 0 || $("#text").val().length === 0) {
    alert("닉네임 또는 방명록을 작성해주세요.");
  } else {
    let text_pw = prompt("비밀번호를 입력해주세요.");
    if (text_pw.length === 0) {
      alert("비밀번호를 입력해주세요.");
    } else {
      let doc = {
        name: name,
        text: text,
        text_pw: text_pw,
        timestamp: serverTimestamp(),
      };
      await addDoc(collection(db, "TeamProject"), doc);
      window.location.reload();
    }
  }
});

let docs = await getDocs(
  query(collection(db, "TeamProject"), orderBy("timestamp", "desc"))
);
docs.forEach((doc) => {
  console.log(doc.id);
  let row = doc.data();
  console.log(row);
  let name_row = row["name"];
  let text_row = row["text"];
  let text_pw_ans = row["text_pw"];
  let postId = doc.id;

  let temp_html = `
    <div class="card border-white mb-3" style="max-width: 1000rem;">
      <div class="card-body">
        <h5 class="card-title">${name_row}</h5>
        <p class="card-text">${text_row}</p>
        <button type="button" class="btn btn-outline-dark delposting" data-id="${postId}" data-pw="${text_pw_ans}">삭제</button>
        <button type="button" id="aeditbtn" class="btn btn-outline-dark"  data-id="${postId}" data-pw="${text_pw_ans}">수정</button>
      </div>
    </div>`;
  $("#cardbox").append(temp_html);
});

$(document).on("click", ".delposting", async function () {
  const postId = $(this).data("id");
  const text_pw_postId = $(this).data("pw");
  const ok = window.confirm("삭제하시겠습니까?");
  if (ok) {
    let text_pw_ans = prompt("비밀번호를 입력해주세요.");
    if (text_pw_ans == text_pw_postId) {
      try {
        await deleteDoc(doc(db, "TeamProject", postId));
        $(this).closest(".card").remove();
        alert("게시물이 성공적으로 삭제되었습니다.");
      } catch (error) {
        console.error("게시물 삭제 중 오류 발생:", error);
        alert("게시물 삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } else {
      alert("비밀번호를 확인해주세요.");
    }
  }
});

$("#img1").click(async function () {
  toggleTeam("#team1");
});

$("#img2").click(async function () {
  toggleTeam("#team2");
});

$("#img3").click(async function () {
  toggleTeam("#team3");
});

$("#img4").click(async function () {
  toggleTeam("#team4");
});

$("#img5").click(async function () {
  toggleTeam("#team5");
});

function toggleTeam(teamId) {
  // 클릭된 팀을 제외한 모든 팀의 토글 닫기
  $("[id^=team]").not(teamId).hide();

  // 클릭된 팀의 토글 열기
  $(teamId).toggle();

  // 스크롤
  document.querySelector(teamId).scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
}

$(document).ready(function () {
  $(".btn-container").click(function () {
    var $container = $(this).closest(".팀원명").next(".팀원상세정보");
    $(".팀원상세정보").not($container).hide();

    $container.toggle();
  });
});

$(window).scroll(function () {
  let upButton = document.querySelector(".up");
  if (window.scrollY > 200) {
    upButton.style.opacity = "1";
  } else {
    upButton.style.opacity = "0";
  }
});
