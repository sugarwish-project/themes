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

// Elemen Utama HTML
const mainElement = document.createElement("div");
mainElement.classList.add("main");
mainElement.innerHTML = `
  <div class="container">
    <div class="preload">
      <p>Loading...</p>
    </div>
    <div class="fireworks"></div>
    <div class="bg"></div>
    <div class="content open">
      <div class="open-text">
        <h1>Happy New Year</h1>
        <div class="year">
          <div>2</div>
          <div>0</div>
          <div>2</div>
          <div>6</div>
        </div>
        <p>New dreams, new memories, same happiness.</p>
      </div>
    </div>
    <div class="btn-container">
      <div class="btn-blur">
        <button class="btn btn-start show">Klik Disini</button>
        <button class="btn btn-next">Lanjut</button>
        <button class="btn btn-message">Kirim Pesan</button>
      </div>
    </div>
  </div>
`;
document.body.appendChild(mainElement);

// Setup Musik
const musikAudio = new Audio("https://dekatutorial.github.io/musik/Nadhif%20Basalamah%20-%20bergema%20sampai%20selamanya%20-%20Official%20Lyric%20Video.mp3");
musikAudio.autoplay = true;
musikAudio.loop = true;

// Selektor Elemen
const preloadContainer = document.querySelector(".preload");
const openContainer = document.querySelector(".open");
const container = document.querySelector(".container");
const btnContainer = document.querySelector(".btn-container");
const btnStart = document.querySelector(".btn-start");
const btnNext = document.querySelector(".btn-next");
const btnMessage = document.querySelector(".btn-message");
const mainContainer = document.querySelector(".main");

// Fungsi Penyesuaian Ukuran Layar
function updateScreenSize() {
  const clientWidth = document.body.clientWidth;
  const clientHeight = document.body.clientHeight;

  if (clientWidth > (clientHeight / 16) * 9 && clientWidth > 450) {
    const offset = (clientWidth - (clientHeight / 16) * 9) / 2;
    mainContainer.style.left = offset + "px";
    mainContainer.style.right = offset + "px";
    document.body.style.setProperty("--mi", offset + "px");
  } else {
    document.body.style.removeProperty("--mi");
    mainContainer.style.left = "0";
    mainContainer.style.right = "0";
  }
}

updateScreenSize();
window.onresize = updateScreenSize;

// Pembuatan Konten Dinamis dengan Kolase Sprite
let mainContents = [];

function createMainContent() {
  konten.forEach(item => {
    const contentDiv = document.createElement("div");
    contentDiv.classList.add("content", "main-content");

    // Logika Kolase Sprite (3 Kolom, 2 Baris)
    const col = item.indexFoto % 3; 
    const row = Math.floor(item.indexFoto / 3); 

    const posX = col * 50; 
    const posY = row * 100;

    let innerHTMLContent = "";
    
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

function nextContent(index) {
  if (index === konten.length - 1) {
    btnContainer.classList.remove("show");
    setTimeout(() => {
      btnNext.classList.remove("show");
      btnMessage.classList.add("show");
      btnContainer.classList.add("show");
    }, 1000);
  }

  if (index < konten.length) {
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

function startContent() {
  musikAudio.play();
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

btnNext.addEventListener("click", () => {
  if (isClick) {
    isClick = 0;
    nextContent(nextIndex);
    nextIndex++;
    setTimeout(() => {
      isClick = 1;
    }, 1000);
  }
});

btnMessage.addEventListener("click", kirimPesan);

// Konfigurasi SweetAlert
const swalo = Swal.mixin({
  allowOutsideClick: false,
  reverseButtons: true
});

async function kirimPesan() {
  const { value: pesanText } = await swalo.fire({
    title: "Tulis pesan",
    input: "textarea",
    confirmButtonText: "Kirim"
  });

  if (pesanText) {
    swalo.fire({
      title: "Mengirim pesan",
      didOpen: () => {
        swalo.showLoading();
      }
    });
    setTimeout(async () => {
      await swalo.fire({
        icon: "success",
        title: "Pesan berhasil dikirim!"
      });
    }, 1000);
  } else {
    await swalo.fire({
      title: "Jangan dikosongin ya :)"
    });
    kirimPesan();
  }
}

function sendToDb(pesan, callback) {
  const formData = new FormData();
  formData.append("pesan", pesan);
  
  fetch("func.php?act=add", {
    method: "POST",
    body: formData
  })
    .then(res => res.json())
    .then(async response => {
      if (response.Status === 200) {
        callback();
      }
    });
}

// Inisialisasi Window Load
window.onload = () => {
  preloadContainer.classList.add("hide");
  setTimeout(() => {
    preloadContainer.remove();
    openContainer.classList.add("show");
    showFireworks();
  }, 1000);
  setTimeout(() => {
    btnContainer.classList.add("show");
    showFireworks();
  }, 3000);
};

createMainContent();

// Inisialisasi Kembang Api (Fireworks)
const fireworksContainer = document.querySelector(".fireworks");
const fireworksConfig = {
  autoresize: true,
  opacity: 0.5,
  acceleration: 1,
  friction: 0.88,
  gravity: 1,
  particles: 60,
  traceLength: 3,
  traceSpeed: 6,
  explosion: 5,
  intensity: 15,
  flickering: 50,
  lineStyle: "round",
  hue: { min: 30, max: 60 },
  delay: { min: 100, max: 100 },
  rocketsPoint: { min: 5, max: 35 },
  lineWidth: {
    explosion: { min: 1, max: 2 },
    trace: { min: 0.1, max: 1 }
  },
  brightness: { min: 50, max: 80 },
  decay: { min: 0.015, max: 0.03 },
  mouse: { click: false, move: false, max: 1 }
};

const fireworks = new Fireworks["default"](fireworksContainer, fireworksConfig);

const fireworks2Config = {
  ...fireworksConfig,
  rocketsPoint: { min: 65, max: 95 }
};
const fireworks2 = new Fireworks["default"](fireworksContainer, fireworks2Config);

function showFireworks() {
  setTimeout(() => {
    fireworks.start();
  }, 500);
  fireworks2.start();
}