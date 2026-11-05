/* =========================================================
   PENGATURAN - ubah teks dan nomor di sini saja
   ========================================================= */
const PESAN = {
    judul: 'Untuk Cintaku, Larasati 🥰',
    subtitle: 'Setiap detik bersamamu adalah melodi terindah dalam hidupku.',
    paragraf: [
        'Sejak hari kita bertemu, dunia saya menjadi lebih cerah dan penuh warna. Kamu adalah inspirasi, sahabat terbaik, dan cinta sejati saya.',
        'Terima kasih sudah menjadi bagian dari cerita indah ini. Aku mencintaimu, hari ini, esok, dan selamanya.'
    ],
    tandaTangan: '- Rahmat'
};

const WHATSAPP = {
    nomor: '6283853324945',          // format internasional, tanpa + atau 0 di depan
    pembuka: 'Halo sayang ❤️',
    pengirim: 'Larasati',
    notifKosong: 'Pesannya jangan dikosongin dong 🥺',
    notifBerhasil: 'Membuka WhatsApp... 💕'
};

const KECEPATAN_KETIK = 40;          // milidetik per huruf

/* =========================================================
   KODE UTAMA
   ========================================================= */
(() => {
    const $ = (id) => document.getElementById(id);
    const kurangGerak = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const HATI = ['❤️', '💖', '💕', '🌸', '✨'];
    const acak = (min, max) => Math.random() * (max - min) + min;
    const pilih = (daftar) => daftar[Math.floor(Math.random() * daftar.length)];

    let amplopTerbuka = false;

    /* ---------- Hati ---------- */
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

    function semburHati(x, y, jumlah = 6) {
        if (kurangGerak) return;
        for (let i = 0; i < jumlah; i++) {
            const el = document.createElement('span');
            el.className = 'hati-burst';
            el.textContent = pilih(HATI);
            el.style.left = x + 'px';
            el.style.top = y + 'px';
            el.style.fontSize = acak(16, 28) + 'px';
            el.style.setProperty('--dx', acak(-100, 100) + 'px');
            el.style.setProperty('--dy', acak(-130, 30) + 'px');
            el.addEventListener('animationend', () => el.remove());
            document.body.appendChild(el);
        }
    }

    if (!kurangGerak) {
        hatiNaik();
        setInterval(hatiNaik, 900);
    }

    // Ketuk di mana saja = hati kecil muncul
    document.addEventListener('pointerdown', (e) => {
        if (e.target.closest('textarea, .lightbox')) return;
        semburHati(e.clientX, e.clientY);
    });

    /* ---------- Buka Amplop & Transisi Layar ---------- */
    const envelope = $('envelope');
    const instruction = $('instruction');
    const layarAmplop = $('layarAmplop');
    const halamanPesan = $('halamanPesan');

    function bukaAmplop() {
        if (amplopTerbuka) return;
        amplopTerbuka = true;

        envelope.classList.add('open');
        envelope.removeAttribute('tabindex');
        instruction.textContent = 'Sebentar ya, sayang... 💌';

        const kotak = envelope.getBoundingClientRect();
        if (!kurangGerak) {
            semburHati(kotak.left + kotak.width / 2, kotak.top + kotak.height / 2, 14);
            setTimeout(() => semburHati(kotak.left + kotak.width / 2, kotak.top, 10), 700);
        }

        // Jalankan audio otomatis ketika amplop dibuka
        audio.play().catch(() => {});

        setTimeout(() => {
            layarAmplop.classList.add('pergi');
            document.body.classList.remove('terkunci');
            halamanPesan.hidden = false;
            mulaiKetikPesan();
        }, 2400);
    }

    envelope.addEventListener('click', bukaAmplop);
    envelope.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            bukaAmplop();
        }
    });

    /* ---------- Isi teks ---------- */
    $('judul').textContent = PESAN.judul;
    $('subtitle').textContent = PESAN.subtitle;
    $('tahun').textContent = new Date().getFullYear();

    function siapkanHuruf(el, teks) {
        el.textContent = '';
        return Array.from(teks).map((ch) => {
            const s = document.createElement('span');
            s.className = 'huruf';
            s.textContent = ch;
            el.appendChild(s);
            return s;
        });
    }

    let lewati = kurangGerak;
    const tunggu = (ms) => new Promise((r) => setTimeout(r, lewati ? 0 : ms));

    async function ketik(huruf) {
        for (const s of huruf) {
            s.classList.add('tampak');
            if (lewati) continue;
            await tunggu(/[,.]/.test(s.textContent) ? KECEPATAN_KETIK * 6 : KECEPATAN_KETIK);
        }
    }

    $('kotakPesan').addEventListener('pointerdown', () => { lewati = true; });

    /* ---------- Tombol kirim muncul halus ---------- */
    function tampilkanBalasan() {
        const box = $('replyBox');
        const tombol = $('kirimBtn');

        box.hidden = false;
        requestAnimationFrame(() => requestAnimationFrame(() => {
            box.classList.add('show');
            box.scrollIntoView({ behavior: kurangGerak ? 'auto' : 'smooth', block: 'nearest' });
        }));

        setTimeout(() => {
            tombol.classList.add('muncul');
            const r = tombol.getBoundingClientRect();
            semburHati(r.left + r.width / 2, r.top + r.height / 2, 8);
            setTimeout(() => tombol.classList.add('berdetak'), 900);
        }, kurangGerak ? 0 : 900);
    }

    async function mulaiKetikPesan() {
        const wadah = $('isiPesan');
        const blok = PESAN.paragraf.map((teks) => {
            const p = document.createElement('p');
            wadah.appendChild(p);
            return siapkanHuruf(p, teks);
        });
        const hurufTtd = siapkanHuruf($('tandaTangan'), PESAN.tandaTangan);

        await tunggu(900);
        for (const huruf of blok) {
            await ketik(huruf);
            await tunggu(500);
        }
        await ketik(hurufTtd);

        $('hintLewati').classList.add('hilang');
        $('kotakPesan').style.cursor = 'default';
        await tunggu(600);
        tampilkanBalasan();
    }

    /* ---------- Kirim ke WhatsApp ---------- */
    const kolom = $('pesanBalasan');
    const notif = $('notif');

    function tampilNotif(teks, ok = false) {
        notif.textContent = teks;
        notif.classList.toggle('ok', ok);
    }

    kolom.addEventListener('input', () => tampilNotif(''));

    $('kirimBtn').addEventListener('click', () => {
        const isi = kolom.value.trim();

        if (!isi) {
            tampilNotif(WHATSAPP.notifKosong);
            kolom.classList.remove('goyang');
            void kolom.offsetWidth;
            kolom.classList.add('goyang');
            kolom.focus();
            return;
        }

        const teks = `${WHATSAPP.pembuka}\n\n${isi}\n\n- ${WHATSAPP.pengirim}`;
        const url = `https://wa.me/${WHATSAPP.nomor}?text=${encodeURIComponent(teks)}`;

        tampilNotif(WHATSAPP.notifBerhasil, true);
        const r = $('kirimBtn').getBoundingClientRect();
        semburHati(r.left + r.width / 2, r.top, 14);

        const jendela = window.open(url, '_blank');
        if (jendela) {
            jendela.opener = null;
        } else {
            window.location.href = url;
        }
    });

    /* ---------- Musik ---------- */
    const audio = $('background-music');
    const musikToggle = $('musikToggle');

    function perbaruiMusik() {
        const main = !audio.paused;
        musikToggle.textContent = main ? '🎵' : '🔇';
        musikToggle.setAttribute('aria-label', main ? 'Jeda musik' : 'Putar musik');
    }

    audio.addEventListener('play', perbaruiMusik);
    audio.addEventListener('pause', perbaruiMusik);

    musikToggle.addEventListener('click', () => {
        if (audio.paused) audio.play().catch(() => {}); else audio.pause();
    });

    audio.play().catch(() => {
        document.addEventListener('pointerdown', (e) => {
            if (e.target.closest('#musikToggle')) return;
            audio.play().catch(() => {});
        }, { once: true });
    });
    perbaruiMusik();

    /* ---------- Foto: ketuk untuk memperbesar ---------- */
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.hidden = true;
    const fotoBesar = document.createElement('img');
    lightbox.appendChild(fotoBesar);
    document.body.appendChild(lightbox);

    const tutupFoto = () => { lightbox.hidden = true; };
    lightbox.addEventListener('click', tutupFoto);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') tutupFoto(); });

    $('galeri').querySelectorAll('img').forEach((img) => {
        img.tabIndex = 0;
        const buka = () => {
            fotoBesar.src = img.src;
            fotoBesar.alt = img.alt;
            lightbox.hidden = false;
        };
        img.addEventListener('click', buka);
        img.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); buka(); }
        });
    });
})();
