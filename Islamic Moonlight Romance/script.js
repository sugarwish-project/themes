// Data Konten Ucapan (Menggunakan 1 Gambar Sprite Berisi 6 Foto dengan Layout 3 Kolom x 2 Baris)
const spriteImageUrl = '/asset/themes/img/Starlit Garden/Islamic Moonlight Romance.webp';

const kontenList = [
  {
    indexFoto: 0,
    ucapan: "Selamat ulang tahun, sayangku. Hari ini tentang kamu, tentang bertambahnya satu tahun perjalanan hidup kamu, dan tentang semua hal yang sudah berhasil kamu lewati sampai sejauh ini."
  },
  {
    indexFoto: 1,
    ucapan: "Semoga di usia yang baru ini, hidup kamu dipenuhi lebih banyak hal baik. Semoga apa yang kamu perjuangkan perlahan menemukan jalannya, dan semoga kamu selalu punya alasan untuk tersenyum meskipun nggak setiap hari berjalan sesuai yang kamu mau."
  },
  {
    indexFoto: 2,
    ucapan: "Kalau suatu saat semuanya terasa berat, jangan lupa kalau kamu nggak sendirian. Ada aku yang selalu berharap kamu baik-baik saja, selalu mendukung langkah kamu, dan selalu mau melihat kamu tumbuh menjadi versi terbaik dari diri kamu sendiri."
  },
  {
    indexFoto: 3,
    ucapan: "Terima kasih sudah hadir di hidup aku, sayang. Terima kasih untuk setiap cerita, tawa, dan momen kecil yang mungkin sederhana, tapi berarti banget buat aku. Kehadiran kamu punya tempat sendiri yang nggak bisa digantikan begitu saja."
  },
  {
    indexFoto: 4,
    ucapan: "Sekali lagi, selamat ulang tahun, sayang. Semoga perjalanan kamu setelah ini jauh lebih indah, penuh bahagia, dan dipertemukan dengan banyak hal yang kamu doakan. Dan kalau boleh, aku mau tetap ada di samping kamu, menemani sebanyak mungkin cerita yang masih akan kita lewati bersama."
  },
  {
    indexFoto: 5,
    ucapan: "Terima kasih sudah menjadi bagian terindah dalam hidupku. Semoga kebahagiaan dan keberkahan selalu menyertai langkah kita."
  }
];

// 1. Inisialisasi Audio
const musikAudio = new Audio('/musik/Guli%20Mata%20(Lyrical)%20-%20Saad%20Lamjarred%20Shreya%20Ghoshal%20Jennifer%20Winget%20Anshul%20Garg.mp3');
musikAudio.autoplay = false;
musikAudio.preload = 'none';
musikAudio.loop = true;

// Atur lagu mulai di detik ke-28 saat metadata siap
musikAudio.addEventListener('loadedmetadata', () => {
  musikAudio.currentTime = 29;
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

const klikSfx = new Audio('/musik/sfx/klik.mp3');
klikSfx.preload = 'auto';

function playClickSound() {
  klikSfx.currentTime = 0;
  klikSfx.play().catch(() => {});
}

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

// Selektor Elemen DOM
const preloadContainer = document.querySelector('.preload');
const openContainer = document.querySelector(".open");
const container = document.querySelector(".container");
const btnContainer = document.querySelector(".btn-container");
const btnStart = document.querySelector(".btn-start");
const btnNext = document.querySelector(".btn-next");
const endButtons = document.querySelector(".end-buttons");
const btnReplay = document.querySelector(".btn-replay");
const btnMessage = document.querySelector(".btn-message");
const mainContainer = document.querySelector('.main');

// Mengatur Ukuran Layar Responsif
function updateScreenSize() {
  const screenWidth = document.body.clientWidth;
  const screenHeight = document.body.clientHeight;

  if (screenWidth > (screenHeight / 16) * 9 && screenWidth > 450) {
    const marginSize = (screenWidth - (screenHeight / 16) * 9) / 2;
    mainContainer.style.left = marginSize + 'px';
    mainContainer.style.right = marginSize + 'px';
  } else {
    mainContainer.style.left = '0';
    mainContainer.style.right = '0';
  }
}

updateScreenSize();
window.addEventListener('resize', updateScreenSize);

// Pembuatan Konten Dinamis dengan Wadah Glossy
let mainContents = [];
function createMainContent() {
  document.querySelectorAll(".main-content").forEach(el => el.remove());

  kontenList.forEach(item => {
    const contentDiv = document.createElement("div");
    contentDiv.classList.add("content", "main-content");

    const col = item.indexFoto % 3;
    const row = Math.floor(item.indexFoto / 3);
    const posX = col * 50;
    const posY = row * 100;

    let innerHTMLContent = `
      <div class="sprite-foto" style="background-image: url('${spriteImageUrl}'); background-position: ${posX}% ${posY}%;"></div>
    `;
    
    if (item.ucapan) {
      innerHTMLContent += `
        <div class="text-wrapper glossy-card">
          <p class="text">${item.ucapan}</p>
        </div>
      `;
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
      endButtons.classList.add("show");
      btnContainer.classList.add("show");
    }, 400);
  }

  if (index < kontenList.length) {
    if (index > 0) {
      mainContents[index - 1].classList.add("hide");
      const prevIndex = index - 1;
      setTimeout(() => {
        if (mainContents[prevIndex]) {
          mainContents[prevIndex].classList.remove("show", "hide");
        }
      }, 800);
    }
    setTimeout(() => {
      mainContents[index].classList.add("show");
    }, 250);
  }
}

let nextIndex = 1;
let isClick = 1;

// Memulai Halaman Utama
function startContent() {
  playClickSound();
  musikAudio.play().catch(() => {});
  openContainer.classList.add("hide");
  setTimeout(() => {
    openContainer.classList.remove("show", "hide");
  }, 800);

  nextIndex = 1;
  nextContent(0);

  btnContainer.classList.remove("show");
  setTimeout(() => {
    btnStart.classList.remove("show");
    endButtons.classList.remove("show");
    btnNext.classList.add("show");
    btnContainer.classList.add("show");
  }, 800);
}

// Fungsi Baca Ulang dari Awal
function replayContent() {
  if (!isClick) return;
  playClickSound();
  isClick = 0;

  const lastContent = mainContents[kontenList.length - 1];
  if (lastContent) {
    lastContent.classList.add("hide");
  }

  btnContainer.classList.remove("show");

  setTimeout(() => {
    createMainContent();
    nextIndex = 1;

    openContainer.classList.add("show");

    endButtons.classList.remove("show");
    btnNext.classList.remove("show");
    btnStart.classList.add("show");
    btnContainer.classList.add("show");
    isClick = 1;
  }, 800);
}

btnStart.addEventListener("click", startContent);

btnNext.addEventListener('click', () => {
  if (isClick && nextIndex < kontenList.length) {
    playClickSound();
    isClick = 0;
    nextContent(nextIndex);
    nextIndex++;
    setTimeout(() => {
      isClick = 1;
    }, 900);
  }
});

btnReplay.addEventListener("click", replayContent);
btnMessage.addEventListener("click", kirimPesan);

// =========================================
// EFEK BINTANG, BINTANG JATUH & KUNANG-KUNANG
// =========================================
const starsContainer = document.querySelector(".stars-container");
const firefliesContainer = document.querySelector(".fireflies-container");

function createStar() {
  const star = document.createElement("img");
  const starSize = Math.random() * 9 + 4;
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
  for (let i = 0; i < 55; i++) {
    createStar();
  }
}

function createFireflies() {
  firefliesContainer.innerHTML = '';
  for (let i = 0; i < 22; i++) {
    const firefly = document.createElement("span");
    const size = Math.random() * 4 + 3;
    const duration = Math.random() * 7 + 8;
    const delay = Math.random() * 10;
    const driftX = (Math.random() - 0.5) * 80;

    firefly.className = "firefly";
    firefly.style.width = size + 'px';
    firefly.style.height = size + 'px';
    firefly.style.left = Math.random() * 94 + 3 + '%';
    firefly.style.setProperty('--duration', duration + 's');
    firefly.style.setProperty('--delay', '-' + delay + 's');
    firefly.style.setProperty('--drift-x', driftX + 'px');

    firefliesContainer.appendChild(firefly);
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

function scheduleShootingStars() {
  const interval = Math.random() * 3500 + 2500;
  setTimeout(() => {
    createShootingStar();
    scheduleShootingStars();
  }, interval);
}

// Jalankan Semua Efek Visual
generateStars();
createFireflies();
scheduleShootingStars();

// Inisialisasi Saat Halaman Dimuat
window.onload = () => {
  preloadContainer.classList.add("hide");
  setTimeout(() => {
    preloadContainer.remove();
    openContainer.classList.add("show");
  }, 800);
  setTimeout(() => {
    btnContainer.classList.add("show");
  }, 1800);
};

createMainContent();