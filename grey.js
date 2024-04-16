
$(document).ready(function () {
  // $("#savebtn").click(function () {
    $(".btn").click(function (e) {
      console.log(e.target)
    $('#팀원상세정보').toggle();
    
  });
});

function maketextcard() {
  let name = $('#name').val();
  let text = $('#text').val();

  if (($('#name').val().length === 0) || ($('#text').val().length === 0)) {
    alert('닉네임 또는 방명록을 작성해주세요.');
  } else {
    let temp_html = `      
    <div class="card border-dark mb-3" style="max-width: 1000rem;">
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">${text}</p>
        <button type="button" class="btn btn-outline-dark">삭제</button><button type="button"
        class="btn btn-outline-dark">수정</button>
      </div>
    </div>`
    $("#cardbox").append(temp_html);
  }
}

function deletebtn() {
  $("#cardbox").empty();
}



