function DekaTutorial(linkMusik, linkBackground, teksUcapan, nomorWa) {
  var _0x3ccf69 = document.querySelector(".bg");
  var _0x14ed47 = document.querySelector(".pesan");
  
  // Buat objek audio terlebih dahulu, tapi jangan di-play dulu
  var audio = null;
  if (linkMusik != "NAMA FILE MUSIK" && linkMusik != "") {
    audio = new Audio(linkMusik);
    audio.loop = true;
  }
  
  // Fungsi saat surat diklik
  function bukaSurat() {
    // --- MUSIK DIPUTAR DI SINI (SETELAH USER KLIK SURAT) ---
    if (audio) {
      audio.play().catch(function(error) {
        console.log("Autoplay dicegah oleh browser, tetapi akan dicoba lagi.");
      });
    }

    document.querySelector(".card").style = "transition: 0.5s all ease;transform: scale(0);opacity: 0;";
    setTimeout(mulaiKetikTeks, 1000);
    setTimeout(function () {
      document.querySelector(".content2").style.display = "flex";
    }, 400);
  }
  
  var indeksKarakter = 0;
  var kecepatanKetik = 100; 
  _0x14ed47.value = "";
  
  function mulaiKetikTeks() {
    if (indeksKarakter < teksUcapan.length) {
      if (teksUcapan.charAt(indeksKarakter) === "#") {
        _0x14ed47.value += "\n"; 
      } else {
        _0x14ed47.value += teksUcapan.charAt(indeksKarakter);
      }
      indeksKarakter++;
      setTimeout(mulaiKetikTeks, kecepatanKetik);
    } else {
      document.querySelector(".wa").classList.add("show");
    }
  }
  
  var alertKonfirmasi = Swal.mixin({
    allowOutsideClick: false,
    confirmButtonText: "OK"
  });
  
  async function kirimKeWhatsapp() {
    var { value: pesanInput } = await alertKonfirmasi.fire({
      title: "Tulis pesan",
      input: "textarea",
      confirmButtonText: "Kirim"
    });
    
    if (pesanInput) {
      await alertKonfirmasi.fire("Kirim pesannya ke wa aku ya");
      location.assign("https://wa.me/" + nomorWa + "?text=" + encodeURIComponent(pesanInput));
    } else {
      await alertKonfirmasi.fire({
        title: "Jangan dikosongin dong"
      });
      kirimKeWhatsapp(); 
    }
  }
  
  if(document.querySelector(".surat")) {
    document.querySelector(".surat").addEventListener("click", bukaSurat);
  }
  if(document.querySelector(".wa button")) {
    document.querySelector(".wa").querySelector("button").addEventListener("click", kirimKeWhatsapp);
  }
}

// ==========================================
// PENGATURAN KONTEN
// ==========================================
var musik = "https://dekatutorial.github.io/Sezairi%20-%20It's%20You.mp3";
var background = "bg.webp";
var ucapanSurat = "Dear Kamu,##Ini adalah contoh web ucapan online.";
var nomorWhatsapp = "628xxxxxxxxxx"; 

DekaTutorial(musik, background, ucapanSurat, nomorWhatsapp);