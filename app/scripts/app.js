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
  $('.foldable__content').hide()
    $('.foldable__control').click(function(){
      $(this).toggleClass("folded").toggleClass("unfolded").next().slideToggle();
      if($(this).hasClass('folded')) {
        $('.foldable__link').html('Свернуть раскрывающийся контент');
      }
      else {
        $('.foldable__link').html('Показать раскрывающийся контент');
      }
  });
  // /спойлер-блок на странице

});

// сноски в тексте
$(function(){
 main.footnote.init();
});
var main = {};

main.footnote = {
 init: function(){
  var t = this,
   footnote = $('.footnote'),
   is_footnotes,
   part = 0,
   markers = [],
   contents = [];

  footnote.each(function(){
   var marker = $(this), footnotes = marker.closest('.footnotes').addClass('footnotes_inited');
   if(footnotes.length){
    if(!is_footnotes){
     contents[part] = {};
     is_footnotes = true;
    }
    contents[part][marker.text()] = $('<div class="footnote_hint" style="position: absolute; z-index: 9999;"></div>').
     append(
      marker.
      parent().
      nextUntil('*:has(.footnote)').
      andSelf().
      clone()
     ).
     hide().
     appendTo('body').
     click(function(){return false;});
   }else{
    if(is_footnotes){
     part++;
     is_footnotes = false;
    }
    markers.push({element: marker, part: part});
   }
  });

  $(document).click(function(){
   if(t.opened){
    t.opened.close();
   }
  });

  for(var i = markers.length - 1, marker; i >= 0 ; i--){
   var marker = markers[i], id = marker.element.text();
   if(contents[marker.part] && contents[marker.part][id]){
    t.items.push(new t.item(marker.element, contents[marker.part][id]));
   }
  }
 },

 items: [],

 item: function(control, content){
  var t = this;
  t.control = control.css('cursor', 'pointer').addClass('footnote_inited');
  t.content = content;
  control.click(function(){
   if(t.opened){
    t.close();
   }else{
    t.open();
   }
   return false;
  });
 }
};

main.footnote.item.prototype = {
 open: function(){
  if(main.footnote.opened){
   main.footnote.opened.close();
  }
  this.opened = true;
  var offset = this.control.offset(), body_width = $('body').width();
  if(offset.left < body_width / 2){
   this.content.css({top: offset.top + this.control.outerHeight(), left: offset.left + this.control.outerWidth(), right: 'auto'});
  }else{
   this.content.css({top: offset.top + this.control.outerHeight(), right: body_width - offset.left, left: 'auto'});
  }
  this.content.show();
  main.footnote.opened = this;
 },

 close: function(){
  this.opened = false;
  this.content.hide();
  main.footnote.opened = null;
 }
};
// /сноски в тексте
