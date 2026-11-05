(() => {
    const HALAMAN_TUJUAN = 'pesan.html';
    const HATI = ['❤️', '💖', '💕', '🌸', '✨'];

    const envelope = document.getElementById('envelope');
    const instruction = document.getElementById('instruction');
    const kurangGerak = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let terbuka = false;

    const acak = (min, max) => Math.random() * (max - min) + min;
    const pilih = (daftar) => daftar[Math.floor(Math.random() * daftar.length)];

    // Hati yang naik pelan-pelan di latar belakang
    function hatiNaik() {
        const el = document.createElement('span');
        el.className = 'hati-naik';
        el.textContent = pilih(HATI);
        el.style.left = acak(0, 100) + 'vw';
        el.style.fontSize = acak(16, 34) + 'px';
        el.style.setProperty('--geser', acak(-60, 60) + 'px');
        el.style.setProperty('--putar', acak(-40, 40) + 'deg');
        el.style.animationDuration = acak(6, 10) + 's';
        el.addEventListener('animationend', () => el.remove());
        document.body.appendChild(el);
    }

    // Semburan hati dari satu titik
    function semburHati(x, y, jumlah = 14) {
        for (let i = 0; i < jumlah; i++) {
            const el = document.createElement('span');
            el.className = 'hati-burst';
            el.textContent = pilih(HATI);
            el.style.left = x + 'px';
            el.style.top = y + 'px';
            el.style.fontSize = acak(16, 30) + 'px';
            el.style.setProperty('--dx', acak(-130, 130) + 'px');
            el.style.setProperty('--dy', acak(-170, 40) + 'px');
            el.addEventListener('animationend', () => el.remove());
            document.body.appendChild(el);
        }
    }

    function bukaAmplop() {
        if (terbuka) return;
        terbuka = true;

        envelope.classList.add('open');
        envelope.removeAttribute('tabindex');
        instruction.textContent = 'Sebentar ya, sayang... 💌';

        const kotak = envelope.getBoundingClientRect();
        if (!kurangGerak) {
            semburHati(kotak.left + kotak.width / 2, kotak.top + kotak.height / 2);
            setTimeout(() => semburHati(kotak.left + kotak.width / 2, kotak.top, 10), 700);
        }

        // Beri waktu surat keluar, lalu pindah halaman dengan memudar
        setTimeout(() => {
            document.body.classList.add('leaving');
            setTimeout(() => { window.location.href = HALAMAN_TUJUAN; }, 700);
        }, 2400);
    }

    envelope.addEventListener('click', bukaAmplop);
    envelope.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            bukaAmplop();
        }
    });

    if (!kurangGerak) {
        hatiNaik();
        setInterval(hatiNaik, 900);
    }
})();
