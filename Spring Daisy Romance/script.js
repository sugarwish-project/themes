// Data Konten Ucapan (Menggunakan 1 Gambar Sprite Berisi 6 Foto dengan Layout 3 Kolom x 2 Baris)
const spriteImageUrl = '/asset/themes/img/Spring%20Daisy%20Romance/romantisfoto.webp';

const kontenList = [
  {
    indexFoto: 0, // Kolom 0, Baris 0 (Kiri Atas)
    ucapan: "Selamat ulang tahun, sayangku. Hari ini tentang kamu, tentang bertambahnya satu tahun perjalanan hidup kamu, dan tentang semua hal yang sudah berhasil kamu lewati sampai sejauh ini."
  },
  {
    indexFoto: 1, // Kolom 1, Baris 0 (Tengah Atas)
    ucapan: "Semoga di usia yang baru ini, hidup kamu dipenuhi lebih banyak hal baik. Semoga apa yang kamu perjuangkan perlahan menemukan jalannya, dan semoga kamu selalu punya alasan untuk tersenyum meskipun nggak setiap hari berjalan sesuai yang kamu mau."
  },
  {
    indexFoto: 2, // Kolom 2, Baris 0 (Kanan Atas)
    ucapan: "Kalau suatu saat semuanya terasa berat, jangan lupa kalau kamu nggak sendirian. Ada aku yang selalu berharap kamu baik-baik saja, selalu mendukung langkah kamu, dan selalu mau melihat kamu tumbuh menjadi versi terbaik dari diri kamu sendiri."
  },
  {
    indexFoto: 3, // Kolom 0, Baris 1 (Kiri Bawah)
    ucapan: "Terima kasih sudah hadir di hidup aku, sayang. Terima kasih untuk setiap cerita, tawa, dan momen kecil yang mungkin sederhana, tapi berarti banget buat aku. Kehadiran kamu punya tempat sendiri yang nggak bisa digantikan begitu saja."
  },
  {
    indexFoto: 4, // Kolom 1, Baris 1 (Tengah Bawah)
    ucapan: "Sekali lagi, selamat ulang tahun, sayang. Semoga perjalanan kamu setelah ini jauh lebih indah, penuh bahagia, dan dipertemukan dengan banyak hal yang kamu doakan. Dan kalau boleh, aku mau tetap ada di samping kamu, menemani sebanyak mungkin cerita yang masih akan kita lewati bersama."
  },
  {
    indexFoto: 5, // Kolom 2, Baris 1 (Kanan Bawah)
    ucapan: "Terima kasih sudah menjadi bagian terindah dalam hidupku. Semoga kebahagiaan selalu menyertai kita."
  }
];

// Konfigurasi SweetAlert
const swalConfig = Swal.mixin({
  allowOutsideClick: false,
  reverseButtons: true
});

// Fungsi Mengirim Pesan ke WhatsApp Admin SugarWish
async function kirimPesan() {
  playClickSound();

  // Teks otomatis yang ingin ditampilkan
  const defaultPesan = "Halo Admin SugarWish, saya tertarik dan ingin bertanya mengenai pembayaran serta pemesanan costume website ucapan ini.";

  const { value: pesanInput } = await swalConfig.fire({
    title: "Hubungi Admin",
    input: "textarea",
    inputValue: defaultPesan,
    inputAttributes: {
      readonly: true, // Membuat textarea hanya bisa dibaca (tidak bisa diketik/diubah)
      style: "cursor: default; background: rgba(15, 23, 42, 0.5) !important;"
    },
    confirmButtonText: "Kirim ke WhatsApp",
    showCancelButton: true,
    cancelButtonText: "Batal"
  });
  
  // Jika tombol "Kirim ke WhatsApp" ditekan
  if (pesanInput !== undefined) {
    playClickSound();
    
    const nomorWa = "6285147381714";
    const urlWa = `https://wa.me/${nomorWa}?text=${encodeURIComponent(pesanInput)}`;

    swalConfig.fire({
      title: "Mengarahkan ke WhatsApp...",
      text: "Mohon tunggu sebentar.",
      timer: 1000,
      showConfirmButton: false,
      didOpen: () => {
        swalConfig.showLoading();
      }
    }).then(() => {
      window.open(urlWa, '_blank');
    });
  } else {
    playClickSound();
  }
}

FUNGSI AGAR MUSIK TIDAK MUTAR DULUAN HARUS DI KLIK
// 1. Inisialisasi Audio
const musikAudio = new Audio('/musik/Westlife%20-%20Beautiful%20in%20white%20(Lyrics).mp3');
musikAudio.autoplay = false;
musikAudio.preload = 'none';
musikAudio.loop = true;

// Atur lagu mulai di detik ke-10 saat metadata siap
musikAudio.addEventListener('loadedmetadata', () => {
  musikAudio.currentTime = 10;
});

// 2. Fungsi memutar lagu dengan efek Fade-In (pelan ke keras)
function putarDenganFadeIn(durasiMs = 3000, targetVolume = 1.0) {
  musikAudio.volume = 0; // Mulai dari hening
  musikAudio.play().catch((error) => {
    console.log("Pemutaran dicegah browser:", error);
  });

  const langkah = 20;
  const kenaikan = targetVolume / (durasiMs / langkah);

  const interval = setInterval(() => {
    if (musikAudio.volume + kenaikan < targetVolume) {
      musikAudio.volume += kenaikan;
    } else {
      musikAudio.volume = targetVolume;
      clearInterval(interval);
    }
  }, langkah);
}

// 3. Hubungkan ke tombol "Klik Disini" (.btn-start)
const tombolStart = document.querySelector('.btn-start');

if (tombolStart) {
  tombolStart.addEventListener('click', () => {
    // Pastikan musik hanya diputar jika sedang berhenti
    if (musikAudio.paused) {
      // Fade-in selama 3 detik (3000 ms) menuju volume penuh (1.0)
      putarDenganFadeIn(3000, 1.0); 
    }
  });
}

const clickSound = new Audio('/musik/sfx/klik.mp3');
function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play().catch(e => console.log("SFX autoplay restriction:", e));
}

// Selektor Elemen DOM
const preloadContainer = document.querySelector('.preload');
const openContainer = document.querySelector(".open");
const container = document.querySelector(".container");
const btnContainer = document.querySelector(".btn-container");
const btnStart = document.querySelector(".btn-start");
const btnNext = document.querySelector(".btn-next");
const btnMessage = document.querySelector(".btn-message");
const btnRestart = document.querySelector(".btn-restart");
const mainContainer = document.querySelector('.main');

// Mengatur Ukuran Layar Responsif
function updateScreenSize() {
  const screenWidth = document.body.clientWidth;
  const screenHeight = document.body.clientHeight;

  if (screenWidth > (screenHeight / 16) * 9 && screenWidth > 450) {
    const marginSize = (screenWidth - (screenHeight / 16) * 9) / 2;
    mainContainer.style.left = marginSize + 'px';
    mainContainer.style.right = marginSize + 'px';
    document.body.style.setProperty("--mi", marginSize + 'px');
  } else {
    document.body.style = '';
    mainContainer.style.left = '0';
    mainContainer.style.right = '0';
  }
}

updateScreenSize();
window.onresize = updateScreenSize;

// Pembuatan Konten Dinamis dengan Sistem Sprite CSS
let mainContents = [];
function createMainContent() {
  kontenList.forEach(item => {
    const contentDiv = document.createElement("div");
    contentDiv.classList.add("content", "main-content");

    // Hitung posisi background berdasarkan indeks grid (3 kolom x 2 baris)
    const col = item.indexFoto % 3; // Kolom 0, 1, atau 2
    const row = Math.floor(item.indexFoto / 3); // Baris 0 atau 1
    
    const posX = col * 50; // Posisi X (0%, 50%, 100%)
    const posY = row * 100; // Posisi Y (0%, 100%)

    let innerHTMLContent = '';
    innerHTMLContent += `<div class="sprite-foto" style="background-image: url('${spriteImageUrl}'); background-position: ${posX}% ${posY}%;"></div>`;
    
    if (item.ucapan) {
      innerHTMLContent += `<p class="text">${item.ucapan}</p>`;
    }

    contentDiv.innerHTML = innerHTMLContent;
    container.appendChild(contentDiv);
  });
  mainContents = document.querySelectorAll(".main-content");
}

// Navigasi Konten Berikutnya
function nextContent(index) {
  if (index === kontenList.length - 1) {
    btnContainer.classList.remove("show");
    setTimeout(() => {
      btnNext.classList.remove("show");
      btnMessage.classList.add("show");
      btnRestart.classList.add("show"); 
      btnContainer.classList.add("show");
    }, 1000);
  }

  if (index < kontenList.length) {
    if (index > 0) {
      mainContents[index - 1].classList.add("hide");
      const prevIndex = index - 1;
      setTimeout(() => {
        mainContents[prevIndex].remove();
      }, 1000);
    }
    setTimeout(() => {
      mainContents[index].classList.add("show");
    }, 200);
  }
}

// Memulai Halaman Utama
function startContent() {
  playClickSound();
  musikAudio.play().catch(e => console.log(e));
  openContainer.classList.add("hide");
  nextContent(0);
  btnContainer.classList.remove("show");
  setTimeout(() => {
    btnStart.classList.remove("show");
    btnNext.classList.add("show");
    btnContainer.classList.add("show");
  }, 1000);
}

btnStart.addEventListener("click", startContent);

let nextIndex = 1;
let isClick = 1;
btnNext.addEventListener('click', () => {
  if (isClick) {
    isClick = 0;
    playClickSound();
    nextContent(nextIndex);
    nextIndex++;
    setTimeout(() => {
      isClick = 1;
    }, 1000);
  }
});

btnMessage.addEventListener("click", kirimPesan);

// Fungsi untuk Memutar Ulang dari Awal
function restartContent() {
  playClickSound();
  btnContainer.classList.remove("show");
  
  setTimeout(() => {
    btnRestart.classList.remove("show");
    btnMessage.classList.remove("show");
    
    // Hapus semua konten utama yang tersisa
    document.querySelectorAll(".main-content").forEach(el => el.remove());
    
    // Buat ulang elemen konten
    createMainContent();
    
    // Reset index slide
    nextIndex = 1;
    
    // Tampilkan kembali halaman pembuka
    openContainer.classList.remove("hide");
    openContainer.classList.add("show");
    
    // Munculkan kembali tombol awal
    btnStart.classList.add("show");
    btnContainer.classList.add("show");
  }, 1000);
}

btnRestart.addEventListener("click", restartContent);

// Konfigurasi Efek Bintang & Bintang Jatuh
const starsContainer = document.querySelector(".stars-container");
let shootingStarTimer = null;

function createStar() {
  const star = document.createElement("img");
  const starSize = Math.random() * 10 + 5;
  const duration = Math.random() * 2300 + 1200;
  const delay = Math.random() * 4000;

  star.src = '/asset/themes/animasi/star-sky.png';
  star.alt = '';
  star.className = "star";
  star.style.width = starSize + 'px';
  star.style.height = starSize + 'px';
  star.style.left = Math.random() * 96 + 2 + '%';
  star.style.top = Math.random() * 96 + 2 + '%';
  star.style.animationDuration = duration + 'ms';
  star.style.animationDelay = '-' + delay + 'ms';

  starsContainer.appendChild(star);
}

function generateStars() {
  starsContainer.innerHTML = '';
  for (let i = 0; i < 60; i++) {
    createStar();
  }
}

function createShootingStar() {
  const shootingStar = document.createElement("span");
  const starWidth = starsContainer.clientWidth;
  const starHeight = starsContainer.clientHeight;
  const size = Math.random() * 3 + 2;
  const tailLength = Math.random() * 65 + 45;
  const tailWidth = Math.random() * 2 + 1;
  const duration = Math.random() * 700 + 700;
  const moveX = Math.random() * 170 + 180;
  const moveY = Math.random() * 140 + 120;
  
  const maxX = Math.max(20, starWidth - moveX - 30);
  const startX = Math.random() * (maxX - (-tailLength)) + (-tailLength);
  const startY = Math.random() * (starHeight * 0.35 + 30) - 30;
  const angle = Math.atan2(moveY, moveX) * (180 / Math.PI);

  shootingStar.className = "shooting-star";
  shootingStar.style.setProperty("--star-size", size + 'px');
  shootingStar.style.setProperty("--tail-length", tailLength + 'px');
  shootingStar.style.setProperty("--tail-width", tailWidth + 'px');
  shootingStar.style.setProperty("--start-x", startX + 'px');
  shootingStar.style.setProperty("--start-y", startY + 'px');
  shootingStar.style.setProperty('--move-x', moveX + 'px');
  shootingStar.style.setProperty("--move-y", moveY + 'px');
  shootingStar.style.setProperty("--angle", angle + "deg");
  shootingStar.style.setProperty("--duration", duration + 'ms');

  starsContainer.appendChild(shootingStar);

  shootingStar.addEventListener("animationend", () => {
    shootingStar.remove();
  }, { once: true });
}

function createShootingStarGroup() {
  const count = Math.floor(Math.random() * 3 + 1);
  for (let i = 0; i < count; i++) {
    const delay = i === 0 ? 0 : Math.random() * 500 + 100;
    setTimeout(createShootingStar, delay);
  }
}

function scheduleShootingStars() {
  const interval = Math.random() * 3500 + 2500;
  shootingStarTimer = setTimeout(() => {
    createShootingStarGroup();
    scheduleShootingStars();
  }, interval);
}

function startStarEffect() {
  generateStars();
  scheduleShootingStars();
}

startStarEffect();

// EFEK TAMBAHAN: KELOPAK BUNGA BERJATUHAN
function createFallingPetal() {
  const petal = document.createElement("div");
  petal.className = "petal";
  
  const size = Math.random() * 8 + 8;
  const startX = Math.random() * window.innerWidth;
  const duration = Math.random() * 4000 + 4000;
  const delay = Math.random() * 5000;

  petal.style.width = size + 'px';
  petal.style.height = size * 0.7 + 'px';
  petal.style.left = startX + 'px';
  petal.style.top = '-20px';
  petal.style.animationDuration = duration + 'ms';
  petal.style.animationDelay = '-' + delay + 'ms';

  starsContainer.appendChild(petal);
}

function initFallingPetals() {
  for (let i = 0; i < 20; i++) {
    createFallingPetal();
  }
}

initFallingPetals();

// Inisialisasi Saat Halaman Dimuat
window.onload = () => {
  preloadContainer.classList.add("hide");
  setTimeout(() => {
    preloadContainer.remove();
    openContainer.classList.add("show");
  }, 1000);
  setTimeout(() => {
    btnContainer.classList.add("show");
  }, 3000);
};

createMainContent();