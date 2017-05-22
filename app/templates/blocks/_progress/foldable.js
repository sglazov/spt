$(document).ready(function() {

  // спойлер-блок на странице
  $('._foldable__content').hide();
  $('._foldable__control').click(function(){
    $(this).toggleClass("folded").toggleClass("unfolded").next().slideToggle();
    let close = $('._foldable__link').attr("data-text-close");
    let  open = $('._foldable__link').attr("data-text-open");
    if($(this).hasClass('folded')) {
      if (close) {
        $('._foldable__link').html(close);
      } else {
        $('._foldable__link').html('Свернуть раскрывающийся контент');
      }
    }
    else {
      if (open) {
        $('._foldable__link').html(open);
      } else {
        $('._foldable__link').html('Показать раскрывающийся контент');
      }
    }
  });
  // /спойлер-блок на странице

});
