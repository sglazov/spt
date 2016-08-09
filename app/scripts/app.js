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

  // спойлер-блок на странице
  $('.foldable--content').hide()
    $('.foldable').click(function(){
      $(this).toggleClass("folded").toggleClass("unfolded").next().slideToggle();
      if($(this).hasClass('folded')) {
        $('.foldable-link').html('Свернуть программу семинара');
      }
      else {
        $('.foldable-link').html('Показать программу семинара');
      }
  });

});
