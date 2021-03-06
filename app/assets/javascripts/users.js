$(function(){
  function findUser(user){
      let html = `
                <div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>
                `;
    $("#user-search-result").append(html)
    }
  function notFindUser() {
    let html = `
                <div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">ユーザーが見つかりません</p>
                </div>
                `;
    $("#user-search-result").append(html)
    };
  function add(name, id) {
    var html = `
            <div class="chat-group-user">
              <input name="group[user_ids][]" type="hidden" value="${id}">
              <p class="chat-group-user__name">${name}</p>
              <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</div>
            </div>
            `
    $("#chat-group-users").append(html)
  }
  $("#user-search-field").on("keyup", function() {
    let input = $("#user-search-field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      dataType: "json",
      data: { keyword: input },
    })
      .done(function(users) {
        $("#user-search-result").empty();

        if (users.length !== 0){
          users.forEach(function(user){
            findUser(user);
          })
        } else if (input.length == 0){
          return false
        } else {
          notFindUser();
        }
      })
      .fail(function() {
        alert("ユーザー検索に失敗しました")
      });
  });
  $(document).on("click", ".chat-group-user__btn--add", function(){
    let id = $(this).attr("data-user-id")
    let name = $(this).attr("data-user-name")
    $(this).parent().remove();
    add(name, id)
  })
  $(document).on("click", ".js-remove-btn", function(){
    $(this).parent().remove();
  })
});
