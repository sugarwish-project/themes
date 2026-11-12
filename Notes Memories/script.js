/* =========================================
   AREA KONFIGURASI (Silakan Edit Bagian Ini)
   ========================================= */

// 1. Daftar Konten Kartu (Gambar Stiker & Ucapan)
const konten = [
  {
    gambar: "https://dekatutorial.github.io/v/stkr/Stiker%2049.gif",
    ucapan: "Hallo sayang"
  },
  {
    gambar: "https://dekatutorial.github.io/v/stkr/Stiker%2048.gif",
    ucapan: "Selamat ulang tahun ya"
  },
  {
    gambar: "https://dekatutorial.github.io/v/stkr/Stiker%2016.gif",
    ucapan: "Yuk tunggu apalagi??"
  },
  {
    gambar: "https://dekatutorial.github.io/v/stkr/Stiker%2036.gif",
    ucapan: "Buruan order di Deka Tutorial"
  },
  {
    gambar: "https://dekatutorial.github.io/v/stkr/Stiker%202.gif",
    ucapan: "Bisa custom ucapan dan musik sesuai keinginan"
  }
];

// 2. Link Musik Latar (Format MP3)
const musik = "https://dekatutorial.github.io/musik/Virgoun%20-%20Surat%20Cinta%20Untuk%20Starla%20-%20Official%20Lyric%20Video.mp3";

// 3. Nomor WhatsApp Tujuan (Awali dengan kode negara, contoh: 6281234567890)
const nomorWhatsapp = "628xxxxx";


/* =========================================
   LOGIKA SISTEM (Jangan diubah kecuali paham)
   ========================================= */
function jalankanPesanInteraktif(dataKonten, urlMusik, noWa) {
  const strukturHtml = '<div class="pldr"><p></p><p></p><p></p></div><div class="ppr"><div class="t"></div><div class="b"></div></div>';
  const containerBaru = document.createElement("div");
  containerBaru.innerHTML = strukturHtml;
  document.body.insertBefore(containerBaru, document.body.firstChild);
 
  let audioBg = null;
  if (urlMusik !== "") {
    audioBg = new Audio(urlMusik);
    audioBg.loop = true;
    audioBg.autoplay = false;
  }

  for (let i = 0; i < Math.floor(window.innerWidth / 35); i++) {
    const divTop = document.createElement("div");
    document.querySelector(".t").appendChild(divTop);
  }

  const sisaTinggi = window.innerHeight % 40;
  const tinggiEfektif = window.innerHeight - sisaTinggi;
  let multiplier = 2;
  if (sisaTinggi < 20) {
    multiplier += 1;
  }
  const posisiLove = sisaTinggi + 26 + (multiplier - 2) * 40;

  for (let i = 0; i < tinggiEfektif / 40 - multiplier; i++) {
    const divBottom = document.createElement("div");
    document.querySelector(".b").appendChild(divBottom);
  }

  document.querySelector(".lv").children[1].style = "bottom:" + posisiLove + "px";
  
  const dataTerbalik = [...dataKonten].reverse();
  const wadahKartu = document.createElement("div");
  wadahKartu.classList.add("crds");

  dataTerbalik.forEach(item => {
    if (!item.gambar) item.gambar = "";
    if (!item.ucapan) item.ucapan = "";

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("crd-ctnr");
    
    const card = document.createElement("div");
    card.classList.add("crd");

    if (item.gambar !== "") {
      const imgDiv = document.createElement("div");
      const img = document.createElement("img");
      img.setAttribute("src", item.gambar);
      imgDiv.appendChild(img);
      card.appendChild(imgDiv);
    }

    if (item.ucapan !== "") {
      const p = document.createElement("p");
      p.textContent = item.ucapan;
      card.appendChild(p);
    }

    cardContainer.appendChild(card);
    wadahKartu.appendChild(cardContainer);
  });

  const ctn = document.querySelector(".ctn");
  ctn.appendChild(wadahKartu);

  const semuaCardContainer = document.querySelectorAll(".crd-ctnr");
  const semuaCard = document.querySelectorAll(".crd");
  const btnNext = document.querySelector(".next");
  const btnSend = document.querySelector(".send");
  const btnRestart = document.querySelector(".restart");
  
  let indexCard = semuaCard.length - 1;
  let bolehKlik = true;
  const tombolLove = document.querySelector(".lv");

  tombolLove.children[0].addEventListener("click", () => {
    if (urlMusik !== "") {
      audioBg.play();
    }
    tombolLove.classList.add("lv-out");
    setTimeout(() => {
      tombolLove.remove();
      ctn.style = "display: block";
    }, 700);
  });

  btnNext.style = "bottom:" + posisiLove + "px";
  btnSend.style.bottom = posisiLove + "px";
  btnRestart.style.bottom = posisiLove + "px";

  btnNext.addEventListener("click", () => {
    if (bolehKlik) {
      bolehKlik = false;
      semuaCard[indexCard].classList.add("out");
      setTimeout(() => {
        semuaCardContainer[indexCard].style = "display: none";
        if (indexCard !== 0) {
          semuaCardContainer[indexCard - 1].style = "display: flex";
          indexCard--;
        }
      }, 700);

      // Jika mencapai kartu terakhir (index 0)
      if (indexCard === 1) {
        btnNext.classList.add("btn-out");
        setTimeout(() => {
          btnNext.style = "display: none";
          btnSend.style = "display: inline-block";
        }, 500);
      }

      setTimeout(() => {
        bolehKlik = true;
      }, 1400);
    }
  });

  btnSend.addEventListener("click", async () => {
    await kirimPesanWhatsApp();
    // Setelah pesan dikirim, sembunyikan tombol kirim pesan dan tampilkan tombol ulangi baca
    btnSend.classList.add("btn-out");
    setTimeout(() => {
      btnSend.style = "display: none";
      btnRestart.style = "display: inline-block";
    }, 500);
  });

  // Fungsi untuk mengulangi baca dari awal
  btnRestart.addEventListener("click", () => {
    location.reload();
  });

  const loader = document.querySelector(".pldr");
  let loaderDihapus = false;

  function hapusLoader() {
    loader.classList.add("rmv");
    setTimeout(() => {
      loader.remove();
    }, 500);
  }

  setTimeout(() => {
    if (!loaderDihapus) {
      hapusLoader();
    }
  }, 15000);

  const swalCustom = Swal.mixin({
    allowOutsideClick: false,
    confirmButtonText: "OK"
  });

  async function kirimPesanWhatsApp() {
    const { value: pesanUser } = await swalCustom.fire({
      title: "Tulis pesan disini ^_^",
      input: "textarea",
      confirmButtonText: "Kirim"
    });

    if (pesanUser) {
      if (noWa.length > 8) {
        await swalCustom.fire("Kirim pesan ke WhatsApp ya");
        if (noWa.startsWith("62")) {
          window.open("https://wa.me/" + noWa + "?text=" + encodeURIComponent(pesanUser), "_blank");
        } else {
          window.open("https://wa.me/?text=" + encodeURIComponent(pesanUser), "_blank");
        }
      } else {
        swalCustom.fire({
          title: "Mengirim pesan",
          didOpen: () => {
            swalCustom.showLoading();
          }
        });
      }
    } else {
      await swalCustom.fire({
        confirmButtonText: "Iya deh",
        title: "Jangan dikosongin dong :)"
      });
      await kirimPesanWhatsApp();
    }
  }

  window.addEventListener("load", () => {
    hapusLoader();
    loaderDihapus = true;
  });
}

// Menjalankan fungsi utama dengan data di atas
jalankanPesanInteraktif(konten, musik, nomorWhatsapp);