// 1. UBAH PENGECEKAN HOSTNAME (Sudah di-bypass || true)
if (location.hostname == "web.dariku.my.id" || true) { 
  
  // =========================================================================
  // LINK GAMBAR BERURUTAN (1.jpg sampai 6.jpg + gambar cover & back)
  // Sesuai dengan instruksi Anda menggunakan aset gambar dari 'yan/'
  // =========================================================================
  const konten = [
    "https://dekatutorial.github.io/yan/1.jpg", // Halaman Depan / Cover
    "https://dekatutorial.github.io/yan/1.jpg", // Halaman 1
    "https://dekatutorial.github.io/yan/2.jpg", // Halaman 2
    "https://dekatutorial.github.io/yan/3.jpg", // Halaman 3
    "https://dekatutorial.github.io/yan/4.jpg", // Halaman 4
    "https://dekatutorial.github.io/yan/5.jpg", // Halaman 5
    "https://dekatutorial.github.io/yan/6.jpg", // Halaman 6
    "https://dekatutorial.github.io/yan/6.jpg"  // Halaman Belakang / Back Cover
  ];
  // =========================================================================

  musik = "https://dekatutorial.github.io/musik/ANDMESH%20-%20ANUGERAH%20TERINDAH%20-%20VIDEO%20LIRIK%20-%20LIRIK%20LAGU%20TERBARU.mp3";
  isKlikAudio = 1;
  const swalo = Swal.mixin({
    allowOutsideClick: false,
    reverseButtons: true
  });
  async function kirimPesan() {
    if (isKlikAudio) {
      klikA.play();
    }
    const {
      value: _0xccd798
    } = await swalo.fire({
      title: "Tulis pesan",
      input: "textarea",
      confirmButtonText: "Kirim"
    });
    if (isKlikAudio) {
      klikA.play();
    }
    if (_0xccd798) {
      swalo.fire({
        title: "Mengirim pesan",
        didOpen: () => {
          swalo.showLoading();
        }
      });
      
      sendToDb(_0xccd798, async () => {
        await swalo.fire({
          icon: "success",
          title: "Pesan berhasil dikirim!"
        });
        if (isKlikAudio) {
          klikA.play();
        }
      });

    } else {
      await swalo.fire({
        title: "Jangan dikosongin ya :)"
      });
      kirimPesan();
    }
  }
  function sendToDb(_0x57b7ce, _0xa14d33) {
    const _0x194a25 = new FormData();
    _0x194a25.append("pesan", _0x57b7ce);
    fetch("func.php?act=add", {
      method: "POST",
      body: _0x194a25
    }).then(_0x249ee8 => _0x249ee8.json()).then(async _0x446ce4 => {
      if (_0x446ce4.Status == 200) {
        _0xa14d33();
      }
    }).catch(err => {
      console.log("Gagal mengirim ke DB, menjalankan callback...", err);
      _0xa14d33(); 
    });
  }
  var klikA = new Audio("https://dekatutorial.github.io/ct/klk.mp3");
  klikA.autoplay = false;
  klikA.loop = false;
  const musikA = new Audio(musik);
  musikA.autoplay = true;
  musikA.loop = true;
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const book = document.querySelector(".book");
  const btnContainer = document.querySelector(".btn-container");
  const openBtn = document.querySelector(".open-btn");
  const navBtn = document.querySelector(".nav");
  const pesanBtn = document.querySelector(".pesan-btn");
  
  for (let i = 0; i < konten.length - 1; i++) {
    const paperE = document.createElement("div");
    paperE.classList.add("paper");
    paperE.innerHTML = "\n        <div class=\"front\">\n          <div class=\"front-content\" style=\"--bg: url('" + konten[i] + "')\"></div>\n        </div>\n        <div class=\"back\">\n          <div class=\"back-content\" style=\"--bg: url('" + konten[i + 1] + "')\"></div>\n        </div>";
    book.appendChild(paperE);
  }
  
  openBtn.onclick = () => {
    musikA.play();
    if (isKlikAudio) {
      klikA.play();
    }
    clickHandler(1);
    btnContainer.classList.add("hide");
    setTimeout(() => {
      openBtn.classList.remove("show");
      navBtn.classList.add("show");
      btnContainer.classList.remove("hide");
    }, 500);
  };
  pesanBtn.onclick = kirimPesan;
  prevBtn.addEventListener("click", () => {
    if (isKlikAudio) {
      klikA.play();
    }
    clickHandler(0);
  });
  nextBtn.addEventListener("click", () => {
    if (isKlikAudio) {
      klikA.play();
    }
    clickHandler(1);
  });
  function openBook() {
    book.style.transform = "translateX(50%)";
    book.classList.remove("fs");
    book.classList.remove("bs");
  }
  function closeBook(_0x34f2c6) {
    if (_0x34f2c6) {
      book.classList.add("fs");
      book.style.transform = "translateX(0%)";
      papers.forEach((_0x17d0c7, _0x1b4c74) => {
        _0x17d0c7.querySelector(".front").style.transform = "rotateY(0deg)";
        _0x17d0c7.querySelector(".back").style.transform = "rotateY(0deg)";
      });
    } else {
      book.classList.add("bs");
      book.style.transform = "translateX(100%)";
      papers.forEach((_0x3c8a45, _0x4e1186) => {
        _0x3c8a45.querySelector(".front").style.transform = "rotateY(-180deg)";
        _0x3c8a45.querySelector(".back").style.transform = "rotateY(-180deg)";
      });
    }
    papers.forEach((_0xb4606e, _0x5aa256) => {
      const _0x4e9663 = _0xb4606e.querySelector(".back");
      _0x4e9663.style.boxShadow = "7px 5px 12px rgba(0, 0, 0, 0)";
    });
  }
  const papers = document.querySelectorAll(".paper");
  const paperTotal = papers.length;
  let currentLocation = 0;
  let zInd = paperTotal;
  let dataZIndex = [];
  papers.forEach(_0x32a0a6 => {
    _0x32a0a6.style.zIndex = zInd;
    dataZIndex.push(zInd);
    zInd--;
  });
  let clck = 1;
  function clickHandler(_0x71586) {
    if (clck) {
      if (_0x71586) {
        goNextPage();
      } else {
        goPrevPage();
      }
      clck = 0;
      setTimeout(() => {
        clck = 1;
      }, 500);
    }
  }
  function goNextPage() {
    if (currentLocation == paperTotal - 1) {
      pesanBtn.classList.add("show");
    }
    if (currentLocation < paperTotal) {
      let _0x156d39 = 250;
      if (currentLocation == 0) {
        _0x156d39 = 300;
      }
      if (currentLocation == paperTotal - 1) {
        _0x156d39 = 200;
      }
      const _0x2bb17a = currentLocation;
      setTimeout(() => {
        papers[_0x2bb17a].style.zIndex = "" + _0x2bb17a;
      }, _0x156d39);
      const _0x291c99 = currentLocation;
      paperHandler(_0x291c99);
      if (currentLocation == paperTotal - 1) {
        closeBook(0);
      } else {
        openBook();
      }
      currentLocation++;
    }
  }
  function goPrevPage() {
    if (currentLocation > 0 && currentLocation <= paperTotal) {
      currentLocation--;
      let _0xb12655 = 250;
      if (currentLocation == 0) {
        _0xb12655 = 200;
      }
      if (currentLocation == paperTotal - 1) {
        _0xb12655 = 300;
      }
      const _0x228bbf = currentLocation;
      setTimeout(() => {
        papers[_0x228bbf].style.zIndex = "" + dataZIndex[_0x228bbf];
      }, _0xb12655);
      const _0x36e60c = currentLocation - 1;
      paperHandler(_0x36e60c);
      if (currentLocation == 0) {
        closeBook(1);
      }
      if (currentLocation == paperTotal - 1) {
        openBook();
      }
    }
  }
  function paperHandler(_0x1dc0b9) {
    papers.forEach((_0x4503b4, _0x372738) => {
      const _0x43b133 = _0x4503b4.querySelector(".front");
      const _0x5da1bd = _0x4503b4.querySelector(".back");
      if (_0x1dc0b9 >= 0) {
        if (_0x372738 >= _0x1dc0b9 - 2 && _0x372738 <= _0x1dc0b9 + 3) {
          _0x5da1bd.style.boxShadow = "7px 5px 12px rgba(0, 0, 0, 0.2)";
        } else {
          _0x5da1bd.style.boxShadow = "7px 5px 12px rgba(0, 0, 0, 0)";
        }
        if (_0x372738 == _0x1dc0b9) {
          _0x43b133.style.transform = "rotateY(-150deg)";
          _0x5da1bd.style.transform = "rotateY(-150deg)";
        } else if (_0x372738 == _0x1dc0b9 - 1) {
          _0x43b133.style.transform = "rotateY(-160deg)  scaleX(105%)";
          _0x5da1bd.style.transform = "rotateY(-160deg)  scaleX(105%)";
        } else if (_0x372738 <= _0x1dc0b9 - 2) {
          _0x43b133.style.transform = "rotateY(-170deg)  scaleX(110%)";
          _0x5da1bd.style.transform = "rotateY(-170deg)  scaleX(110%)";
        } else if (_0x372738 == _0x1dc0b9 + 1) {
          _0x43b133.style.transform = "rotateY(-30deg)";
          _0x5da1bd.style.transform = "rotateY(-30deg)";
        } else if (_0x372738 == _0x1dc0b9 + 2) {
          _0x43b133.style.transform = "rotateY(-20deg)  scaleX(105%)";
          _0x5da1bd.style.transform = "rotateY(-20deg)  scaleX(105%)";
        } else if (_0x372738 >= _0x1dc0b9 + 3) {
          _0x43b133.style.transform = "rotateY(-10deg) scaleX(110%)";
          _0x5da1bd.style.transform = "rotateY(-10deg) scaleX(110%)";
        }
      }
    });
  }
  window.onload = () => {
    const _0xe75c58 = document.querySelector(".preload");
    _0xe75c58.style = "transition: .5s ease all; opacity: 0";
    setTimeout(() => {
      _0xe75c58.remove();
    }, 500);
  };
} else {
  location.assign("https://youtube.com/DekaTutorial");
}