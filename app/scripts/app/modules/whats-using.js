doc.body.addEventListener('mousedown', function() {
  doc.documentElement.classList.add('using-mouse');
});
doc.body.addEventListener('keydown', function() {
  doc.documentElement.classList.remove('using-mouse');
});
