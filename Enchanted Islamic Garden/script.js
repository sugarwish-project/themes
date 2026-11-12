// Data Konten Kisah Cinta Menyambut Tahun 2027
const spriteImageUrl = '/asset/themes/img/Enchanted%20Islamic%20Garden/Enchanted%20Islamic%20Garden.webp';

const kontenList = [
  {
    indexFoto: 0,
    ucapan: "Selamat Tahun Baru 2027, sayang. Kalau kita menoleh ke belakang, rasanya masih sulit dipercaya kita sudah berjalan sejauh ini. Dari dua orang asing yang saling canggung, hingga menjadi dua hati yang saling menggenggam di bawah langit malam yang sama."
  },
  {
    indexFoto: 1,
    ucapan: "Perjalanan kita tidak selalu dipenuhi tawa dan langit yang cerah. Ada malam-malam panjang di mana air mata jatuh dalam diam, saat ego saling beradu, dan kesalahpahaman membuat dada terasa begitu sesak."
  },
  {
    indexFoto: 2,
    ucapan: "Jujur, kita pernah berada di titik paling rapuh—saat jarak terasa begitu dingin, komunikasi terasa melelahkan, dan kata 'menyerah' sempat terlintas di ujung pikiran. Hampir saja kita melepaskan genggaman yang sudah susah payah kita jaga."
  },
  {
    indexFoto: 3,
    ucapan: "Tapi di saat hampir menyerah itu, kita sadar satu hal: kehilanganmu jauh lebih menyakitkan daripada memperjuangkanmu. Kita memilih menundukkan ego, saling memeluk luka masing-masing, dan belajar mencintai dengan lebih dewasa."
  },
  {
    indexFoto: 4,
    ucapan: "Terima kasih karena sudah memilih bertahan saat keadaan tidak mudah. Terima kasih sudah tetap tinggal ketika aku belum sempurna, dan selalu menjadi cahaya lentera paling hangat di setiap gelapnya hariku."
  },
  {
    indexFoto: 5,
    ucapan: "Selamat datang di tahun 2027, cintaku. Apa pun badai yang akan datang di depan nanti, mari kita hadapi bersama. Tetaplah di sisiku, menua bersamaku, dan mari kita tulis babak terindah dalam hidup kita."
  }
];

// Konfigurasi SweetAlert (dengan pengaman jika CDN SweetAlert belum siap)
const swalConfig = typeof Swal !== 'undefined'
  ? Swal.mixin({
      allowOutsideClick: false,
      reverseButtons: true
    })
  : null;

// Fungsi Mengirim Pesan ke WhatsApp
async function kirimPesan() {
  playClickSound();

  const defaultPesan = "Selamat Tahun Baru 2027 sayang! Terima kasih sudah bertahan sejauh ini bersamaku. Aku mencintaimu selamanya.";

  if (!swalConfig) {
    const nomorWa = "6285147381714";
    window.open(`https://wa.me/${nomorWa}?text=${encodeURIComponent(defaultPesan)}`, '_blank');
    return;
  }

  const { value: pesanInput } = await swalConfig.fire({
    title: "Kirim Balasan Cinta",
    input: "textarea",
    inputValue: defaultPesan,
    inputAttributes: {
      style: "cursor: text;"
    },
    confirmButtonText: "Kirim ke WhatsApp",
    showCancelButton: true,
    cancelButtonText: "Batal"
  });

  if (pesanInput !== undefined && pesanInput.trim() !== "") {
    playClickSound();
    const nomorWa = "6285147381714";
    const urlWa = `https://wa.me/${nomorWa}?text=${encodeURIComponent(pesanInput)}`;

    swalConfig.fire({
      title: "Membuka WhatsApp...",
      text: "Menyampaikan pesan cintamu.",
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

// Inisialisasi Audio
const musikAudio = new Audio('/musik/Westlife%20-%20Beautiful%20in%20white%20(Lyrics).mp3');
musikAudio.autoplay = false;
musikAudio.preload = 'none';
musikAudio.loop = true;

musikAudio.addEventListener('loadedmetadata', () => {
  musikAudio.currentTime = 10;
});

function putarDenganFadeIn(durasiMs = 3000, targetVolume = 1.0) {
  musikAudio.volume = 0;
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

const tombolStart = document.querySelector('.btn-start');
if (tombolStart) {
  tombolStart.addEventListener('click', () => {
    if (musikAudio.paused) {
      putarDenganFadeIn(3000, 1.0);
    }
  });
}

const clickSound = new Audio('/musik/sfx/klik.mp3');
function playClickSound() {
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});
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

// Pembuatan Konten Dinamis
let mainContents = [];
function createMainContent() {
  kontenList.forEach(item => {
    const contentDiv = document.createElement("div");
    contentDiv.classList.add("content", "main-content");

    const col = item.indexFoto % 3;
    const row = Math.floor(item.indexFoto / 3);
    const posX = col * 50;
    const posY = row * 100;

    let innerHTMLContent = `<div class="sprite-foto" style="background-image: url('${spriteImageUrl}'); background-position: ${posX}% ${posY}%;"></div>`;
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

function restartContent() {
  playClickSound();
  btnContainer.classList.remove("show");

  setTimeout(() => {
    btnRestart.classList.remove("show");
    btnMessage.classList.remove("show");

    document.querySelectorAll(".main-content").forEach(el => el.remove());
    createMainContent();
    nextIndex = 1;

    openContainer.classList.remove("hide");
    openContainer.classList.add("show");

    btnStart.classList.add("show");
    btnContainer.classList.add("show");
  }, 1000);
}

btnRestart.addEventListener("click", restartContent);

/* =========================================
   KONFIGURASI KEMBANG API (FIREWORKS-JS)
   ========================================= */
const fireworksContainer = document.querySelector('.fireworks');

const baseFireworksConfig = {
  hue: { min: 35, max: 52 }, // Nuansa emas hangat
  delay: { min: 40, max: 80 }, // Jeda antar tembakan diperlama agar lebih santai
  speed: 1.2,                  // Kecepatan roket diperlambat (tidak terlalu cepat)
  acceleration: 1.01,          // Akselerasi halus
  friction: 0.97,
  gravity: 0.8,                // Gravitasi diperingan agar partikel melayang anggun di udara
  particles: 40,               // Jumlah partikel dikurangi agar ledakan terlihat lebih kecil & rapi
  traceLength: 2,
  traceSpeed: 5,
  explosion: 3,                // Ukuran radius ledakan dikecilkan (dari 5 menjadi 3)
  intensity: 12,               // Intensitas sedang agar terlihat elegan dari kejauhan
  flickering: 30,
  lineStyle: 'round',
  lineWidth: {
    explosion: { min: 0.8, max: 1.8 }, // Ketebalan garis partikel diperkecil
    trace: { min: 0.8, max: 1.2 }
  },
  brightness: { min: 50, max: 80 },
  decay: { min: 0.01, max: 0.02 }  // Partikel memudar perlahan layaknya di kejauhan
};

// 1. Kembang api pertama: Dari area kiri bawah, melesat ke atas
const fireworks = new Fireworks["default"](fireworksContainer, {
  ...baseFireworksConfig,
  rocketsPoint: { min: 20, max: 35 }
});

// 2. Kembang api kedua: Dari area tengah-bawah (dekat masjid), melesat ke atas
const fireworks2 = new Fireworks["default"](fireworksContainer, {
  ...baseFireworksConfig,
  rocketsPoint: { min: 60, max: 75 }
});

function showFireworks() {
  setTimeout(() => {
    fireworks.start();
  }, 400);
  fireworks2.start();
}

/* =========================================
   EFEK BINTANG JATUH & KELOPAK BUNGA EMAS
   ========================================= */
const starsContainer = document.querySelector(".stars-container");

function createShootingStar() {
  if (!starsContainer) return;
  const shootingStar = document.createElement("span");
  const starWidth = starsContainer.clientWidth || window.innerWidth;
  const starHeight = starsContainer.clientHeight || window.innerHeight * 0.7;
  const size = Math.random() * 2.5 + 1.5;
  const tailLength = Math.random() * 65 + 45;
  const tailWidth = Math.random() * 1.8 + 1;
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

function initFallingPetals() {
  if (!starsContainer) return;
  for (let i = 0; i < 16; i++) {
    const petal = document.createElement("div");
    petal.className = "petal";
    const size = Math.random() * 7 + 6;
    petal.style.width = size + 'px';
    petal.style.height = size * 0.7 + 'px';
    petal.style.left = Math.random() * 100 + '%';
    petal.style.top = '-20px';
    petal.style.animationDuration = (Math.random() * 4500 + 4500) + 'ms';
    petal.style.animationDelay = '-' + (Math.random() * 5000) + 'ms';
    starsContainer.appendChild(petal);
  }
}

// Fungsi Membuka Preloader dengan Aman
let isInitialized = false;
function initPage() {
  if (isInitialized) return;
  isInitialized = true;

  updateScreenSize();
  showFireworks();
  scheduleShootingStars();
  initFallingPetals();

  if (preloadContainer) {
    preloadContainer.classList.add("hide");
    setTimeout(() => {
      if (preloadContainer.parentNode) {
        preloadContainer.remove();
      }
      openContainer.classList.add("show");
    }, 800);
  } else {
    openContainer.classList.add("show");
  }

  setTimeout(() => {
    btnContainer.classList.add("show");
  }, 2000);
}

// Jalankan saat DOM siap maupun saat window selesai load (anti-stuck)
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(initPage, 600);
});
window.addEventListener("load", initPage);

createMainContent();