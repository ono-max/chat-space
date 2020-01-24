$(function() {
  var reloadMessages = function() {
    last_message_id = $('.wrapper__chat-main__message-list__user-one:last').data("message-id");
    console.log(last_message_id);
    $.ajax({
      url: "api/messages",
      type: "get",
      datatype: "json",
      data: {id: last_message_id},
    })
    .done(function(messages) {
      // console.log(messages)
      if (messages.length !== 0) {
        var insertHTML = "";
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $(".wrapper__chat-main__message-list").append(insertHTML);
        $(".wrapper__chat-main__message-list").animate({ scrollTop: $(".wrapper__chat-main__message-list")[0].scrollHeight});
        $("form")[0].reset();
        $(".wrapper__chat-main__message-for__send-btn").prop("disabled", false)
      }
    })
    .fail(function() {
      console.log("error");
    });
  }
  var buildHTML = function(message){
    // console.log(message)
    if ( message.content && message.image ) {
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
          <img src=${message.image} >
        </div>`
      return html;
    } else if (message.content) {
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
    } else if (message.image) {
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
          <img src=${message.image} >
        </div>`
    };
      return html;
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
      console.log(data)
      var html = buildHTML(data);
      $(".wrapper__chat-main__message-list").append(html);
      $('form')[0].reset();
      $(".wrapper__chat-main__message-list").animate({ scrollTop: $(".wrapper__chat-main__message-list")[0].scrollHeight});
      $(".wrapper__chat-main__message-for__send-btn").prop("disabled", false)
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました")
    })
  });
  if (document.location.href.match(/\/groups\/\d+\/messages/)){
    setInterval(reloadMessages, 7000);
  }
});
