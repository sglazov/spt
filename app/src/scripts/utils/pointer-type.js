document.body.addEventListener('mousedown', function() {
  document.documentElement.classList.add('using-mouse');
});
document.body.addEventListener('keydown', function() {
  document.documentElement.classList.remove('using-mouse');
});
