$(function() {
  function buildHTML(message){
    if ( message.image.url ) {
      var html = 
       `<div class = "wrapper__chat-main__message-list__user-one" data-message-id=${message.id}>
          <div class = "wrapper__chat-main__message-list__user-one__above">
            <div class = "wrapper__chat-main__message-list__user-one__above__user-name">
              ${message.user_name}
            </div>
            <div class = "wrapper__chat-main__message-list__user-one__above__user-date">
              ${message.created_at}
            </div>
          </div>
          <div class = "wrapper__chat-main__message-list__user-one__text-one">
            <p class = "wrapper__chat-main__message-list__user-one__text-one__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image.url} >
        </div>`
      return html;
    } else {
      var html =
        `<div class = "wrapper__chat-main__message-list__user-one" data-message-id=${message.id}>
          <div class = "wrapper__chat-main__message-list__user-one__above">
            <div class = "wrapper__chat-main__message-list__user-one__above__user-name">
              ${message.user_name}
            </div>
            <div class = "wrapper__chat-main__message-list__user-one__above__user-date">
              ${message.created_at}
            </div>
          </div>
          <div class = "wrapper__chat-main__message-list__user-one__text-one">
            <p class = "wrapper__chat-main__message-list__user-one__text-one__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }
$(".wrapper__chat-main__message-for").on("submit", function(e) {
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
    .done(function(data){
      var html = buildHTML(data);
      $(".wrapper__chat-main__message-list").append(html);
      $('form')[0].reset();
      $(".wrapper__chat-main__message-list").animate({ scrollTop: $(".wrapper__chat-main__message-list")[0].scrollHeight});
      $(".wrapper__chat-main__message-for__send-btn").prop("disabled", false)
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました")
      $(".wrapper__chat-main__message-for__send-btn").prop("disabled", false)
    })
  });
});
