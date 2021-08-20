/**
 * Font manage starts
 */
$(document).ready(function () {
  $(".increaseFont,.decreaseFont,.normalFont").click(function () {
    var type = $(this).val();
    var curFontSize = $("body").css("font-size");
    if (type == "A+") {
      if (parseInt(curFontSize) == 28) curFontSize = 27;
      $("body").css("font-size", parseInt(curFontSize) + 1);
    } else if (type == "A-") {
      if (parseInt(curFontSize) == 14) curFontSize = 15;
      $("body").css("font-size", parseInt(curFontSize) - 1);
    } else {
      curFontSize = 16;
      $("body").css("font-size", parseInt(curFontSize));
    }
  });
});
/**
 * Font manage ends
 */

 $(document).ready(function() {
  $("#show_hide_regUser_password a").on('click', function(event) {
      event.preventDefault();
      if($('#show_hide_regUser_password input').attr("type") == "text"){
          $('#show_hide_regUser_password input').attr('type', 'password');
          $('#show_hide_regUser_password i').addClass( "bi bi-eye-slash" );
          $('#show_hide_regUser_password i').removeClass( "bi bi-eye" );
      }else if($('#show_hide_regUser_password input').attr("type") == "password"){
          $('#show_hide_regUser_password input').attr('type', 'text');
          $('#show_hide_regUser_password i').removeClass( "bi bi-eye-slash" );
          $('#show_hide_regUser_password i').addClass( "bi bi-eye" );
      }
  });
});

$(document).ready(function() {
  $("#show_hide_regUser_confirm_password a").on('click', function(event) {
      event.preventDefault();
      if($('#show_hide_regUser_confirm_password input').attr("type") == "text"){
          $('#show_hide_regUser_confirm_password input').attr('type', 'password');
          $('#show_hide_regUser_confirm_password i').addClass( "bi bi-eye-slash" );
          $('#show_hide_regUser_confirm_password i').removeClass( "bi bi-eye" );
      }else if($('#show_hide_regUser_confirm_password input').attr("type") == "password"){
          $('#show_hide_regUser_confirm_password input').attr('type', 'text');
          $('#show_hide_regUser_confirm_password i').removeClass( "bi bi-eye-slash" );
          $('#show_hide_regUser_confirm_password i').addClass( "bi bi-eye" );
      }
  });
});
