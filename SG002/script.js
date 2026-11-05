const PESAN = {
    judul: 'Untuk Cintaku, Larasati 🥰',
    subtitle: 'Setiap detik bersamamu adalah melodi terindah.',
    paragraf: [
        'Sejak hari kita bertemu, duniaku jadi lebih cerah dan warna-warni.',
        'Terima kasih sudah menjadi bagian dari cerita indah ini. Aku mencintaimu selamanya!'
    ],
    tandaTangan: '- Rahmat'
};

const WHATSAPP = {
    nomor: '6283853324945',
    pembuka: 'Halo sayang ❤️',
    pengirim: 'Larasati',
    notifKosong: 'Isi pesannya dulu ya 🥺',
    notifBerhasil: 'Membuka WhatsApp... 💕'
};

const KECEPATAN_KETIK = 40;

(() => {
    const $ = (id) => document.getElementById(id);
    const envelope = $('envelope');
    const instruction = $('instruction');
    let terbuka = false;

    function bukaAmplop() {
        if (terbuka) return;
        terbuka = true;

        const audio = $('background-music');
        if (audio) audio.play().catch(() => {});

        envelope.classList.add('open');
        instruction.textContent = 'Sebentar ya, sayang... 💌';

        setTimeout(() => {
            $('layarAmplop').classList.add('pergi');
            document.body.classList.remove('terkunci');
            $('halamanPesan').hidden = false;

            mulaiKetikPesan();

            setTimeout(() => {
                $('layarAmplop').style.display = 'none';
            }, 700);
        }, 2000);
    }

    if (envelope) {
        envelope.addEventListener('click', bukaAmplop);
    }

    /* Ketik Teks */
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

    let lewati = false;
    const tunggu = (ms) => new Promise((r) => setTimeout(r, lewati ? 0 : ms));

    async function ketik(huruf) {
        for (const s of huruf) {
            s.classList.add('tampak');
            if (lewati) continue;
            await tunggu(/[,.]/.test(s.textContent) ? KECEPATAN_KETIK * 5 : KECEPATAN_KETIK);
        }
    }

    $('kotakPesan').addEventListener('pointerdown', () => { lewati = true; });

    async function mulaiKetikPesan() {
        const wadah = $('isiPesan');
        const blok = PESAN.paragraf.map((teks) => {
            const p = document.createElement('p');
            wadah.appendChild(p);
            return siapkanHuruf(p, teks);
        });
        const hurufTtd = siapkanHuruf($('tandaTangan'), PESAN.tandaTangan);

        await tunggu(300);
        for (const huruf of blok) {
            await ketik(huruf);
            await tunggu(400);
        }
        await ketik(hurufTtd);

        $('hintLewati').classList.add('hilang');
        $('kotakPesan').style.cursor = 'default';
        
        // Munculkan tombol Hadiah Manis setelah selesai ngetik
        $('btnHadiah').hidden = false;
    }

    /* Kontrol Overlay / Pop-up Hadiah */
    const overlayHadiah = $('overlayHadiah');
    
    $('btnHadiah').addEventListener('click', () => {
        overlayHadiah.hidden = false;
    });

    $('btnTutupOverlay').addEventListener('click', () => {
        overlayHadiah.hidden = true;
    });

    /* Kirim ke WA */
    const kolom = $('pesanBalasan');
    const notif = $('notif');

    $('kirimBtn').addEventListener('click', () => {
        const isi = kolom.value.trim();

        if (!isi) {
            notif.textContent = WHATSAPP.notifKosong;
            notif.classList.remove('ok');
            return;
        }

        const teks = `${WHATSAPP.pembuka}\n\n${isi}\n\n- ${WHATSAPP.pengirim}`;
        const url = `https://wa.me/${WHATSAPP.nomor}?text=${encodeURIComponent(teks)}`;

        notif.textContent = WHATSAPP.notifBerhasil;
        notif.classList.add('ok');

        setTimeout(() => {
            window.open(url, '_blank');
        }, 500);
    });

    /* Musik */
    const audio = $('background-music');
    const musikToggle = $('musikToggle');

    musikToggle.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().catch(() => {});
            musikToggle.textContent = '🎵';
        } else {
            audio.pause();
            musikToggle.textContent = '🔇';
        }
    });
})();
