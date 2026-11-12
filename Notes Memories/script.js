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
  const btnPrev = document.querySelector(".prev");
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

  // Tombol Lanjut
  btnNext.addEventListener("click", () => {
    if (bolehKlik && indexCard > 0) {
      bolehKlik = false;
      semuaCard[indexCard].classList.remove("out");
      void semuaCard[indexCard].offsetWidth;
      semuaCard[indexCard].classList.add("out");

      setTimeout(() => {
        semuaCardContainer[indexCard].style.display = "none";
        indexCard--;
        semuaCard[indexCard].classList.remove("out");
        semuaCardContainer[indexCard].style.display = "flex";

        // Jika sudah mencapai kartu terakhir (index 0)
        if (indexCard === 0) {
          btnNext.style.display = "none";
          btnPrev.style.display = "inline-block";
          btnSend.style.display = "inline-block";
          btnRestart.style.display = "none";
        }
      }, 700);

      setTimeout(() => {
        bolehKlik = true;
      }, 900);
    }
  });

  // Tombol Kembali (Langsung kembali ke kartu pertama / "Hallo sayang")
  btnPrev.addEventListener("click", () => {
    if (bolehKlik) {
      bolehKlik = false;

      // Sembunyikan semua kartu terlebih dahulu
      semuaCardContainer.forEach((container) => {
        container.style.display = "none";
      });

      // Kembalikan index ke kartu pertama (kartu "Hallo sayang")
      indexCard = semuaCard.length - 1;

      // Tampilkan kembali kartu pertama
      semuaCard[indexCard].classList.remove("out");
      semuaCardContainer[indexCard].style.display = "flex";

      // Kembalikan tombol ke mode awal (hanya tombol Lanjut)
      btnPrev.style.display = "none";
      btnSend.style.display = "none";
      btnRestart.style.display = "none";
      btnNext.classList.remove("btn-out");
      btnNext.style.display = "inline-block";

      setTimeout(() => {
        bolehKlik = true;
      }, 400);
    }
  });

  // Tombol Kirim Pesan
  btnSend.addEventListener("click", async () => {
    const statusKirim = await kirimPesanWhatsApp();
    // Jika nomor valid dan terkirim, sembunyikan tombol kirim & tampilkan tombol ulangi baca
    if (statusKirim) {
      btnSend.classList.add("btn-out");
      setTimeout(() => {
        btnSend.classList.remove("btn-out");
        btnSend.style.display = "none";
        btnPrev.style.display = "inline-block";
        btnRestart.style.display = "inline-block";
      }, 400);
    }
  });

  // Tombol Ulangi Baca
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
    const { value: pesanUser, isConfirmed } = await swalCustom.fire({
      title: "Tulis pesan disini ^_^",
      input: "textarea",
      showCancelButton: true,
      cancelButtonText: "Batal",
      confirmButtonText: "Kirim"
    });

    if (!isConfirmed) {
      return false;
    }

    if (pesanUser && pesanUser.trim() !== "") {
      // Cek validitas nomor WhatsApp (tidak boleh default "628xxxxx", tidak kosong, minimal 10 digit angka)
      const nomorBersih = noWa ? noWa.replace(/\D/g, "") : "";
      const apakahNomorValid =
        noWa &&
        !noWa.toLowerCase().includes("x") &&
        nomorBersih.length >= 10;

      if (apakahNomorValid) {
        await swalCustom.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Mengarahkan ke WhatsApp..."
        });
        window.open("https://wa.me/" + nomorBersih + "?text=" + encodeURIComponent(pesanUser), "_blank");
        return true;
      } else {
        // Notifikasi gagal karena nomor belum ditentukan/valid
        await swalCustom.fire({
          icon: "error",
          title: "Pesan Gagal Dikirim!",
          text: "Nomor WhatsApp tujuan belum ditentukan!"
        });
        return false;
      }
    } else {
      await swalCustom.fire({
        confirmButtonText: "Iya deh",
        title: "Jangan dikosongin dong :)"
      });
      return await kirimPesanWhatsApp();
    }
  }

  window.addEventListener("load", () => {
    hapusLoader();
    loaderDihapus = true;
  });
}

// Menjalankan fungsi utama dengan data di atas
jalankanPesanInteraktif(konten, musik, nomorWhatsapp);