var konten;
var musik;
var nomorWhatsapp;
var sfxKlik = new Audio("/musik/sfx/klik.mp3");
sfxKlik.autoplay = false;
sfxKlik.loop = false;
var statusKetik = true;

function playAudioKetik() {
  var sfxKetik = new Audio("/musik/sfx/tpy.mp3");
  sfxKetik.autoplay = false;
  sfxKetik.loop = false;
  if (statusKetik) {
    sfxKetik.play();
    statusKetik = false;
    setTimeout(() => {
      statusKetik = true;
    }, 100);
  }
}

function SugarWish(dataKonten, sumberMusik, nomorWa, teksSatu, teksDua, urlFoto) {
    var htmlKonten = "";
    var elemenWadahUtama = document.createElement("div");
    
    htmlKonten = "<div class=\"pldr\"> <p></p> <p></p> <p></p> </div> <div class=\"new-container\" style=\"background-image: url('http://dekatutorial.github.io/v/kvn/asset/bg.webp')\"> <div class=\"top\"> <img src=\"https://dekatutorial.github.io/v/kvn/asset/flwr.webp\" class=\"f1\" /> <img src=\"https://dekatutorial.github.io/v/kvn/asset/flwr2.webp\" class=\"f2\" /> </div> <div class=\"bottom\"> <img src=\"https://dekatutorial.github.io/v/kvn/asset/flwr.webp\" class=\"f1\" /> <img src=\"https://dekatutorial.github.io/v/kvn/asset/flwr2.webp\" class=\"f2\" /> </div> <div class=\"new-content\"> <div class=\"title\"> <h3>" + teksSatu + "</h3> <h2>" + teksDua + "</h2> <!-- <p>1 month</p> --> </div> <div class=\"foto\"> <!-- <div class=\"circle-love\"> <div class=\"circle-love-content\"> <img src=\"https://dekatutorial.github.io/v/kvn/asset/circle.webp\" class=\"circle\" /> <img src=\"https://dekatutorial.github.io/v/kvn/asset/love.webp\" class=\"love\" /> </div> </div> --> <img src=\"" + urlFoto + "\" class=\"img-foto\" /> <img src=\"https://dekatutorial.github.io/v/kvn/asset/tape.svg\" class=\"tape tape1\" /> <img src=\"https://dekatutorial.github.io/v/kvn/asset/tape.svg\" class=\"tape tape2\" /> <img src=\"https://dekatutorial.github.io/v/kvn/asset/flwr3.webp\" class=\"flwr-foto\" /> </div> <button class=\"btn-start\">Click Me</button> </div> </div> <div class=\"pu-ctnr scs\" style=\"display: none\"> <div class=\"pu\"> <div class=\"t\"> <div><div></div></div> </div> <div class=\"c\"> <p>Pesan berhasil dikirim</p> <div class=\"scs-i\"> <div class=\"d d1\"></div> <div class=\"d d2\"></div> <div class=\"mlt\"></div> </div> <div class=\"btn\"><button>OK</button></div> </div> </div> </div> <div class=\"pu-ctnr fl\" style=\"display: none\"> <div class=\"pu\"> <div class=\"t\"> <div><div></div></div> </div> <div class=\"c\"> <p>Pesan gagal dikirim</p> <div class=\"scs-i\"> <div class=\"d d1\"></div> <div class=\"d d2\"></div> <div class=\"mlt\"></div> </div> <div class=\"btn\"><button>OK</button></div> </div> </div> </div> <div class=\"pu-ctnr pgs\" style=\"display: none\"> <div class=\"pu\"> <div class=\"t\"> <div><div></div></div> </div> <div class=\"c\"> <p>Mengirim pesan</p> <div class=\"pgsl\"></div> </div> </div> </div> <div class=\"pu-ctnr towa\" style=\"display: none\"> <div class=\"pu\"> <div class=\"t\"> <div><div></div></div> </div> <div class=\"c\"> <p>Kirim pesannya ke wa aku ya</p> <div class=\"btn\"><button>Kirim</button></div> </div> </div> </div> <div class=\"pu-ctnr jksg\" style=\"display: none\"> <div class=\"pu\"> <div class=\"t\"> <div><div></div></div> </div> <div class=\"c\"> <p>Jangan dikosongin dong</p> <div class=\"btn\"><button>OK</button></div> </div> </div> </div> <div class=\"pu-ctnr ta\" style=\"display: none\"> <div class=\"pu\"> <div class=\"t\"> <div><div></div></div> </div> <div class=\"c\"> <p>Ketik pesan disini</p> <textarea autocomplete=\"off\"></textarea> <div class=\"btn\"><button>Kirim</button></div> </div> </div> </div>";
    
    elemenWadahUtama.innerHTML = htmlKonten;
    document.querySelector("body").appendChild(elemenWadahUtama);

    if (sumberMusik != "") {
      var objekAudioBg = new Audio(sumberMusik);
      objekAudioBg.autoplay = true;
      objekAudioBg.loop = true;
    }

    dataKonten.forEach(item => {
      if (typeof item.ucapan === "undefined") {
        item.ucapan = "";
      } else {
        ({});
      }
      if (typeof item.gambar === "undefined") {
        item.gambar = "";
      } else {
        ({});
      }
    });

    var indeksPopupAktif = 0;
    var penghitungTombol = 0;
    var indeksPengikut = 0;

    for (var i = 0; i < dataKonten.length; i++) {
      var elemenPopup = document.createElement("div");
      elemenPopup.classList.add("pu-ctnr");
      elemenPopup.classList.add("pu-ctn");
      elemenPopup.setAttribute("style", "display:none");
      elemenPopup.innerHTML = "<div class=\"pu\"><div class=\"t\"><div><div></div></div></div><div class=\"c\">" + (dataKonten[i].gambar != "" ? "<img src=\"" + dataKonten[i].gambar + "\" height=\"140\" />" : "") + (dataKonten[i].ucapan != "" ? "<p>" + dataKonten[i].ucapan + "</p>" : "") + "<div class=\"btn\"><button onclick=\"\">OK</button><!-- <button>BANGET</button> --></div></div></div>";
      document.body.appendChild(elemenPopup);

      var tombolPopup = document.querySelectorAll(".pu-ctn")[penghitungTombol++].querySelectorAll("button")[0];
      if (i != dataKonten.length - 1) {
        tombolPopup.addEventListener("click", () => {
          tampilkanPopupBerikutnya(indeksPopupAktif, indeksPopupAktif + 1);
          indeksPopupAktif++;
        });
      } else {
        tombolPopup.addEventListener("click", () => {
          tutupPopupAkhir(indeksPopupAktif);
          tampilkanElemen(".ta");
          document.querySelector(".ta").querySelector("button").addEventListener("click", prosesKirimPesan);
          indeksPopupAktif = 0;
        });
      }
    }

    function bukaPopupPertama() {
      var daftarPopup = document.querySelectorAll(".pu-ctn");
      daftarPopup[0].style.display = "flex";
    }

    function tampilkanPopupBerikutnya(indeksSekarang, indeksTujuan) {
      sfxKlik.play();
      var daftarPopup = document.querySelectorAll(".pu-ctn");
      daftarPopup[indeksSekarang].style.display = "none";
      daftarPopup[indeksTujuan].style.display = "flex";
    }

    function tutupPopupAkhir(indeksTerakhir) {
      var daftarPopup = document.querySelectorAll(".pu-ctn");
      daftarPopup[dataKonten.length - 1].style.display = "none";
    }

    function tampilkanElemen(selektorTarget) {
      sfxKlik.play();
      var elemenTarget = document.querySelector(selektorTarget);
      elemenTarget.style.display = "flex";
      if (selektorTarget == ".ta") {
        elemenTarget.querySelector("textarea").focus();
      }
    }

    function sembunyikanElemen(selektorTarget) {
      var elemenTarget = document.querySelector(selektorTarget);
      elemenTarget.style.display = "none";
    }

    function prosesKirimPesan() {
      var nilaiTextarea = document.querySelector(".ta").querySelector("textarea").value;
      if (nilaiTextarea != "") {
        sembunyikanElemen(".ta");
        if (true) {
          tampilkanElemen(".towa");
          document.querySelector(".towa").querySelector("button").addEventListener("click", () => {
            sfxKlik.play();
            sembunyikanElemen(".towa");
            if (nomorWa.startsWith("62")) {
              location.assign("https://wa.me/" + nomorWa + "?text=" + nilaiTextarea);
            } else {
              location.assign("https://wa.me/?text=" + nilaiTextarea);
            }
          });
        } else {
          tampilkanElemen(".pgs");
          var dataForm = new FormData();
          dataForm.append("p", nilaiTextarea);
          fetch("", {
            method: "POST",
            body: dataForm
          }).then(respon => respon.json()).then(async hasilJson => {
            if (hasilJson.s == 200) {
              tampilkanPesanSukses();
            }
          });
        }
      } else {
        tampilkanPesanKosong();
      }
    }

    const kontenBaru = document.querySelector(".new-content");
    const containerBaru = document.querySelector(".new-container");

    document.querySelector(".btn-start").addEventListener("click", () => {
      sfxKlik.play();
      objekAudioBg.play();
      kontenBaru.classList.add("hide");
      setTimeout(bukaPopupPertama, 500);
    });

    document.querySelector("textarea").addEventListener("keypress", playAudioKetik);

    function tampilkanPesanKosong() {
      sembunyikanElemen(".ta");
      tampilkanElemen(".jksg");
      document.querySelector(".jksg").querySelector("button").addEventListener("click", () => {
        sembunyikanElemen(".jksg");
        tampilkanElemen(".ta");
      });
    }

    function tampilkanPesanSukses() {
      document.querySelector(".scs").querySelector("button").addEventListener("click", () => {
        sfxKlik.play();
        sembunyikanElemen(".scs");
      });
      tampilkanElemen(".scs");
      document.querySelector(".ta").querySelector("textarea").value = "";
      sembunyikanElemen(".pgs");
    }

    var elemenLoader = document.querySelector(".pldr");
    var statusSelesaiMuat = false;

    function hapusLoader() {
      elemenLoader.classList.add("rmv");
      setTimeout(() => {
        elemenLoader.remove();
      }, 500);
    }

    setTimeout(() => {
      if (!statusSelesaiMuat) {
        hapusLoader();
      }
    }, 15000);

    window.addEventListener("load", () => {
      hapusLoader();
      statusSelesaiMuat = true;
      containerBaru.classList.add("show");
    });
}

text1 = "Happy";
text2 = "Special Day";
foto = "/asset/themes/img/Floral%20Whispers%20Foto.jpg";
konten = [{
  gambar: "/asset/themes/animasi/pentol/Stiker 16.gif",
  ucapan: "Hallo Sayang👋🏻"
}, {
  gambar: "/asset/themes/animasi/pentol/Stiker 18.gif",
  ucapan: "Coba tebak deh siapa yang hari ini ulang tahun?"
}, {
  gambar: "/asset/themes/animasi/pentol/Stiker 2.gif",
  ucapan: "Yeahh betul kamu"
}, {
  gambar: "/asset/themes/animasi/pentol/Stiker 47.gif",
  ucapan: "Mau custom website ucapan online?"
}, {
  gambar: "/asset/themes/animasi/pentol/Stiker 15.gif",
  ucapan: "Order aja di Deka Tutorial"
}, {
  gambar: "/asset/themes/animasi/pentol/Stiker 36.gif",
  ucapan: "Bebas custom ucapan, foto sama musik"
}, {
  gambar: "/asset/themes/animasi/pentol/Stiker 42.gif",
  ucapan: "Kalo punya konsep sendiri bisa dibikinin juga"
}];
musik = "/musik/HAPPY%20BIRTHDAY%20INSTRUMENTAL%20(Piano%20%26%20Sax%20-%20Happy%20Birthday%20to%20You%20by%20happysongchannel).mp3";
nomorWhatsapp = "nomorWhatsapp";

SugarWish(konten, musik, nomorWhatsapp, text1, text2, foto);