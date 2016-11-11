'use strict';

$(document).ready(function() {

  // подсвечиваем ссылки с одинаковым адресом
  $(document).on('mouseover mouseout', "a", function(e) {
    var href = $(this).attr('href');
      if (!href || href == '#') {
        return;
      }
    $("a")
      .filter('[href="' + $(this).attr('href') + '"]')
      .toggleClass("hover", e.type == 'mouseover');
  });
  // /подсвечиваем ссылки с одинаковым адресом

  // спойлер-блок на странице
  $('._foldable__content').hide();
  $('._foldable__control').click(function(){
    $(this).toggleClass("folded").toggleClass("unfolded").next().slideToggle();
    var close = $('._foldable__link').attr("data-text-close");
    var  open = $('._foldable__link').attr("data-text-open");
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
