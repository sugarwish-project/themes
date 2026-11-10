/* =========================================================
   PENGATURAN - ubah teks dan nomor di sini saja
   ========================================================= */
const PESAN = {
    judul: 'Untuk Cintaku, Larasati 🥰',
    subtitle: 'Setiap detik bersamamu adalah melodi terindah dalam hidupku.',
    paragraf: [
        'Sejak hari kita bertemu, dunia-ku menjadi lebih cerah dan penuh warna. Kamu adalah inspirasi, sahabat terbaik, dan cinta sejati-ku.',
        'Terima kasih sudah menjadi bagian dari cerita indah ini. Aku mencintaimu, hari ini, esok, dan selamanya.'
    ],
    tandaTangan: '- Leonardo'
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
   KODE KONTROL
   ========================================================= */
(() => {
    const $ = (id) => document.getElementById(id);
    const kurangGerak = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const HATI = ['❤️', '💖', '💕', '🌸', '✨'];
    const acak = (min, max) => Math.random() * (max - min) + min;
    const pilih = (daftar) => daftar[Math.floor(Math.random() * daftar.length)];

    /* ---------- Logic Amplop Layar 1 ---------- */
    const envelope = $('envelope');
    const instruction = $('instruction');
    let terbuka = false;

    /* Fungsi untuk meminta tampilan Layar Penuh (Full Screen) */
    function mintaLayarPenuh() {
        const doc = document.documentElement;
        if (doc.requestFullscreen) {
            doc.requestFullscreen().catch(() => {});
        } else if (doc.webkitRequestFullscreen) { /* Safari / Chrome lama */
            doc.webkitRequestFullscreen().catch(() => {});
        } else if (doc.msRequestFullscreen) { /* IE / Edge lama */
            doc.msRequestFullscreen().catch(() => {});
        }
    }

    function bukaAmplop() {
        if (terbuka) return;
        terbuka = true;

        // Otomatis aktifkan mode Layar Penuh saat amplop diklik
        mintaLayarPenuh();

        const audio = $('background-music');
        if (audio) {
            audio.play().catch(() => {});
        }

        envelope.classList.add('open');
        envelope.removeAttribute('tabindex');
        instruction.textContent = 'Sebentar ya, sayang... 💌';

        const kotak = envelope.getBoundingClientRect();
        if (!kurangGerak) {
            semburHati(kotak.left + kotak.width / 2, kotak.top + kotak.height / 2, 14);
            setTimeout(() => semburHati(kotak.left + kotak.width / 2, kotak.top, 10), 700);
        }

        // Animasi transisi layar amplop ke pesan
        setTimeout(() => {
            $('layarAmplop').classList.add('pergi');
            document.body.classList.remove('terkunci');
            $('halamanPesan').hidden = false;

            // Mulai efek ketik pesan setelah amplop menghilang
            mulaiKetikPesan();

            setTimeout(() => {
                $('layarAmplop').style.display = 'none';
            }, 700);
        }, 2200);
    }

    if (envelope) {
        envelope.addEventListener('click', bukaAmplop);
        envelope.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                bukaAmplop();
            }
        });
    }

    /* ---------- Efek Hati Melayang ---------- */
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
        setInterval(hatiNaik, 1100);
    }

    document.addEventListener('pointerdown', (e) => {
        if (e.target.closest('textarea, .overlay-hadiah, .envelope')) return;
        semburHati(e.clientX, e.clientY);
    });

    /* ---------- Isi Teks Layar Pesan ---------- */
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

    function tampilkanTombolHadiah() {
        const containerBtn = $('containerBtnHadiah');
        containerBtn.hidden = false;
        requestAnimationFrame(() => requestAnimationFrame(() => {
            containerBtn.classList.add('muncul');
        }));
    }

    async function mulaiKetikPesan() {
        const wadah = $('isiPesan');
        const blok = PESAN.paragraf.map((teks) => {
            const p = document.createElement('p');
            wadah.appendChild(p);
            return siapkanHuruf(p, teks);
        });
        const hurufTtd = siapkanHuruf($('tandaTangan'), PESAN.tandaTangan);

        await tunggu(400);
        for (const huruf of blok) {
            await ketik(huruf);
            await tunggu(500);
        }
        await ketik(hurufTtd);

        $('hintLewati').classList.add('hilang');
        $('kotakPesan').style.cursor = 'default';
        await tunggu(600);
        tampilkanTombolHadiah();
    }

    /* ---------- Logika Tombol & Overlay Hadiah Manis ---------- */
    const btnHadiahManis = $('btnHadiahManis');
    const overlayHadiah = $('overlayHadiah');
    const tutupOverlay = $('tutupOverlay');

    btnHadiahManis.addEventListener('click', () => {
        overlayHadiah.hidden = false;
        const r = btnHadiahManis.getBoundingClientRect();
        semburHati(r.left + r.width / 2, r.top + r.height / 2, 10);
    });

    tutupOverlay.addEventListener('click', () => {
        overlayHadiah.hidden = true;
    });

    overlayHadiah.addEventListener('click', (e) => {
        if (e.target === overlayHadiah) {
            overlayHadiah.hidden = true;
        }
    });

    /* ---------- Kirim Ke WhatsApp (Dari Overlay) ---------- */
    const kolomOverlay = $('pesanBalasanOverlay');
    const notifOverlay = $('notifOverlay');

    function tampilNotifOverlay(teks, ok = false) {
        notifOverlay.textContent = teks;
        notifOverlay.classList.toggle('ok', ok);
    }

    kolomOverlay.addEventListener('input', () => tampilNotifOverlay(''));

    $('kirimBtnOverlay').addEventListener('click', () => {
        const isi = kolomOverlay.value.trim();

        if (!isi) {
            tampilNotifOverlay(WHATSAPP.notifKosong);
            kolomOverlay.focus();
            return;
        }

        const teks = `${WHATSAPP.pembuka}\n\n${isi}\n\n- ${WHATSAPP.pengirim}`;
        const url = `https://wa.me/${WHATSAPP.nomor}?text=${encodeURIComponent(teks)}`;

        tampilNotifOverlay(WHATSAPP.notifBerhasil, true);
        const r = $('kirimBtnOverlay').getBoundingClientRect();
        semburHati(r.left + r.width / 2, r.top, 14);

        const jendela = window.open(url, '_blank');
        if (jendela) {
            jendela.opener = null;
        } else {
            window.location.href = url;
        }
    });

    /* ---------- Pemutar Musik ---------- */
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

    perbaruiMusik();

    /* ---------- Lightbox Foto Besar Overlay ---------- */
    const lightboxOverlay = $('lightboxOverlay');
    const fotoBesar = $('fotoBesar');

    const tutupLightbox = () => {
        if (lightboxOverlay) lightboxOverlay.hidden = true;
    };

    if (lightboxOverlay) {
        lightboxOverlay.addEventListener('click', tutupLightbox);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') tutupLightbox();
        });
    }

    document.querySelectorAll('.gallery-overlay img').forEach((img) => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            if (fotoBesar && lightboxOverlay) {
                fotoBesar.src = img.src;
                fotoBesar.alt = img.alt;
                lightboxOverlay.hidden = false;
            }
        });
    });
})();
