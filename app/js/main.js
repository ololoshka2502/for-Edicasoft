$(function () {
  $(document).ready(function () {
    $(".input-phone").mask("+38 (999) 99-99-999", { autoclear: false });


    $('.form').submit(function (event) {
      event.preventDefault();
      $.ajax({
        type: "POST",
        url: "mailer/send.php",
        data: $(this).serialize()
      }).done(function () {
        $(this).find("input").val("");
        alert('Thanks for your order!')
        $("form").trigger("reset");
      });
      return false;
    });

  });
});