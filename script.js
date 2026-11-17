(function () {
    var toggle = document.getElementById('toggle'),
        nav = document.getElementById('nav'),
        overlay = document.getElementById('overlay'),
        closeBtn = document.getElementById('close'),
        links = nav.querySelectorAll('a'),
        sections = document.querySelectorAll('main section');

    function setOpen(open) {
        nav.classList.toggle('open', open);
        toggle.classList.toggle('open', open);
        overlay.classList.toggle('show', open);
        toggle.setAttribute('aria-expanded', open);
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        document.body.style.overflow = open ? 'hidden' : '';
    }

    toggle.addEventListener('click', function () { setOpen(!nav.classList.contains('open')) });
    closeBtn.addEventListener('click', function () { setOpen(false) });
    overlay.addEventListener('click', function () { setOpen(false) });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false) });
    window.addEventListener('resize', function () { if (window.innerWidth > 760) setOpen(false) });

    function setActive(id) {
        links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + id) });
    }

    links.forEach(function (a) {
        a.addEventListener('click', function (e) {
            e.preventDefault();
            var id = a.getAttribute('href').slice(1);
            setActive(id);
            setOpen(false);
            var target = document.getElementById(id);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // keep active link in sync while scrolling
    function onScroll() {
        var y = window.scrollY + 120, current = sections[0].id;
        sections.forEach(function (s) { if (s.offsetTop <= y) current = s.id });
        setActive(current);
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    document.getElementById('cta').addEventListener('click', function () {
        setOpen(false);
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('theme').addEventListener('click', function () {
        var r = document.documentElement,
            dark = r.getAttribute('data-theme') === 'dark' || (!r.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches);
        r.setAttribute('data-theme', dark ? 'light' : 'dark');
    });
})();