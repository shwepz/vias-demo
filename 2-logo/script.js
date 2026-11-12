(function () {
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  }
  burger.addEventListener('click', function () { setMenu(!nav.classList.contains('is-open')); });
  nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  function select(tab) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on);
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    tab.focus();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { select(t); });
    t.addEventListener('keydown', function (e) {
      var n = null;
      if (e.key === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
      if (n) { e.preventDefault(); select(n); }
    });
  });

  var fab = document.querySelector('.fab');
  var booking = document.getElementById('booking');
  if (fab && booking && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (en) {
      fab.classList.toggle('is-hidden', en[0].isIntersecting);
    }).observe(booking);
  }

  document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();
    var msg = document.getElementById('form-msg');
    var name = document.getElementById('f-name').value.trim();
    var phone = document.getElementById('f-phone').value.trim();
    if (!name || phone.replace(/\D/g, '').length < 10) {
      msg.textContent = 'Укажите имя и телефон полностью.';
      return;
    }
    if (!document.getElementById('f-agree').checked) {
      msg.textContent = 'Нужно согласие на обработку персональных данных.';
      return;
    }
    msg.textContent = 'Демо: заявка не отправляется, форма пока не подключена.';
  });
})();
