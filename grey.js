$(document).ready(function () {
  $(".timbtn").click(function () {
    $(this).closest('.팀원명').next('.팀원상세정보').toggle();
  });
});
