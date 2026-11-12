// URL Sprite Sheet Kolase Foto
const spriteImageUrl = '/asset/themes/img/Spring%20Daisy%20Romance/romantisfoto.webp';

const konten = [
  {
    indexFoto: 0, // Kolom 0, Baris 0 (Kiri Atas)
    ucapan: "Hallo sayang, gimana kabarnya hari ini? Semoga kamu selalu sehat dan hatimu baik-baik saja ya. Di momen pergantian tahun ini, aku ingin menyapamu pelan-pelan dan mengirimkan doa terbaikku, semoga semua hal baik selalu mendekat kepadamu."
  },
  {
    indexFoto: 1, // Kolom 1, Baris 0 (Tengah Atas)
    ucapan: "Satu tahun terakhir penuh dengan cerita, tentang tawa, rindu, lelah, dan banyak hal yang kita lalui bersama. Tidak semuanya mudah, tapi kehadiranmu membuat semuanya terasa lebih ringan dan bermakna. Terima kasih sudah bertahan dan tetap ada, bahkan di hari-hari yang tidak sempurna."
  },
  {
    indexFoto: 2, // Kolom 2, Baris 0 (Kanan Atas)
    ucapan: "Kamu adalah tempatku bercerita tanpa takut dihakimi, tempatku pulang saat dunia terasa terlalu ramai. Bersamamu, aku belajar tentang sabar, tentang mengerti, dan tentang menerima. Hal-hal kecil bersamamu justru jadi bagian yang paling aku syukuri."
  },
  {
    indexFoto: 3, // Kolom 0, Baris 1 (Kiri Bawah)
    ucapan: "Di langkah menuju tahun yang baru, aku berharap kita tetap saling menggenggam dan saling percaya. Semoga setiap impianmu dimudahkan jalannya, setiap lelahmu digantikan dengan kebahagiaan, dan setiap doamu menemukan jalannya untuk terkabul."
  },
  {
    indexFoto: 4, // Kolom 1, Baris 1 (Tengah Bawah)
    ucapan: "Selamat Tahun Baru, sayang. Terima kasih sudah menjadi bagian terindah di perjalanan hidupku. Apa pun yang menanti di depan nanti, semoga kita masih berjalan berdampingan, pelan-pelan, saling menguatkan, dan tetap bersama"
  }
];

// Pembuatan Konten Dinamis dengan Kolase Sprite
function createMainContent() {
  konten.forEach(item => {
    const contentDiv = document.createElement("div");
    contentDiv.classList.add("content", "main-content");

    // Logika Kolase Sprite (3 Kolom, 2 Baris)
    const col = item.indexFoto % 3; // Kolom 0, 1, atau 2
    const row = Math.floor(item.indexFoto / 3); // Baris 0 atau 1

    const posX = col * 50; 
    const posY = row * 100;

    let innerHTMLContent = "";
    
    // Jika indexFoto ada, buat elemen sprite-foto
    if (item.indexFoto !== undefined && item.indexFoto !== null) {
      innerHTMLContent += `<div class="sprite-foto" style="background-image: url('${spriteImageUrl}'); background-position: ${posX}% ${posY}%;"></div>`;
    }

    if (item.ucapan) {
      innerHTMLContent += `<p class="text">${item.ucapan}</p>`;
    }

    contentDiv.innerHTML = innerHTMLContent;
    container.appendChild(contentDiv);
  });
  mainContents = document.querySelectorAll(".main-content");
}