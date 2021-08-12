/**
 * Font manage starts
 */
$(document).ready(function () {
  $(".increaseFont,.decreaseFont,.normalFont").click(function () {
    var type = $(this).val();
    var curFontSize = $("body").css("font-size");
    if (type == "A+") {
      if (parseInt(curFontSize) == 32) curFontSize = 31;
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
