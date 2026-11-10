// =========================================================================
  // LINK GAMBAR BERURUTAN (1.jpg sampai 6.jpg + gambar cover & back)
  // =========================================================================
  const konten = [
    "https://giftycreative.com/asset/401/p0.webp", // Halaman Depan / Cover
    "https://giftycreative.com/asset/401/p1.webp", // Halaman 1
    "https://giftycreative.com/asset/401/p2.webp", // Halaman 2
    "https://giftycreative.com/asset/401/p3.webp", // Halaman 3
    "https://giftycreative.com/asset/401/p4.webp", // Halaman 4
    "https://giftycreative.com/asset/401/p5.webp", // Halaman 5
    "https://giftycreative.com/asset/401/p6.webp", // Halaman 6
    "https://giftycreative.com/asset/401/p7.webp"  // Halaman Belakang / Back Cover
  ];
  // =========================================================================

  musik = "/musik/ANDMESH - ANUGERAH TERINDAH - VIDEO LIRIK - LIRIK LAGU TERBARU - Reff.mp3";
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
      value: pesanInput
    } = await swalo.fire({
      title: "Tulis pesan",
      input: "textarea",
      confirmButtonText: "Kirim"
    });
    if (isKlikAudio) {
      klikA.play();
    }
    if (pesanInput) {
      swalo.fire({
        title: "Mengirim pesan",
        didOpen: () => {
          swalo.showLoading();
        }
      });
      
      sendToDb(pesanInput, async () => {
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
  function sendToDb(pesanText, callback) {
    const formData = new FormData();
    formData.append("pesan", pesanText);
    fetch("func.php?act=add", {
      method: "POST",
      body: formData
    }).then(res => res.json()).then(async responseData => {
      if (responseData.Status == 200) {
        callback();
      }
    }).catch(err => {
      console.log("Gagal mengirim ke DB, menjalankan callback...", err);
      callback(); 
    });
  }
  var klikA = new Audio("/musik/sfx/klik.mp3");
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
  function closeBook(isFirstPage) {
    if (isFirstPage) {
      book.classList.add("fs");
      book.style.transform = "translateX(0%)";
      papers.forEach((paperItem) => {
        paperItem.querySelector(".front").style.transform = "rotateY(0deg)";
        paperItem.querySelector(".back").style.transform = "rotateY(0deg)";
      });
    } else {
      book.classList.add("bs");
      book.style.transform = "translateX(100%)";
      papers.forEach((paperItem) => {
        paperItem.querySelector(".front").style.transform = "rotateY(-180deg)";
        paperItem.querySelector(".back").style.transform = "rotateY(-180deg)";
      });
    }
    papers.forEach((paperItem) => {
      const backSide = paperItem.querySelector(".back");
      backSide.style.boxShadow = "7px 5px 12px rgba(0, 0, 0, 0)";
    });
  }
  const papers = document.querySelectorAll(".paper");
  const paperTotal = papers.length;
  let currentLocation = 0;
  let zInd = paperTotal;
  let dataZIndex = [];
  papers.forEach(paperItem => {
    paperItem.style.zIndex = zInd;
    dataZIndex.push(zInd);
    zInd--;
  });
  let clck = 1;
  function clickHandler(isNext) {
    if (clck) {
      if (isNext) {
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
      let timeoutDelay = 250;
      if (currentLocation == 0) {
        timeoutDelay = 300;
      }
      if (currentLocation == paperTotal - 1) {
        timeoutDelay = 200;
      }
      const currentIndex = currentLocation;
      setTimeout(() => {
        papers[currentIndex].style.zIndex = "" + currentIndex;
      }, timeoutDelay);
      paperHandler(currentIndex);
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
      let timeoutDelay = 250;
      if (currentLocation == 0) {
        timeoutDelay = 200;
      }
      if (currentLocation == paperTotal - 1) {
        timeoutDelay = 300;
      }
      const currentIndex = currentLocation;
      setTimeout(() => {
        papers[currentIndex].style.zIndex = "" + dataZIndex[currentIndex];
      }, timeoutDelay);
      const prevIndex = currentLocation - 1;
      paperHandler(prevIndex);
      if (currentLocation == 0) {
        closeBook(1);
      }
      if (currentLocation == paperTotal - 1) {
        openBook();
      }
    }
  }
  function paperHandler(targetIndex) {
    papers.forEach((paperItem, paperIndex) => {
      const frontSide = paperItem.querySelector(".front");
      const backSide = paperItem.querySelector(".back");
      if (targetIndex >= 0) {
        if (paperIndex >= targetIndex - 2 && paperIndex <= targetIndex + 3) {
          backSide.style.boxShadow = "7px 5px 12px rgba(0, 0, 0, 0.2)";
        } else {
          backSide.style.boxShadow = "7px 5px 12px rgba(0, 0, 0, 0)";
        }
        if (paperIndex == targetIndex) {
          frontSide.style.transform = "rotateY(-150deg)";
          backSide.style.transform = "rotateY(-150deg)";
        } else if (paperIndex == targetIndex - 1) {
          frontSide.style.transform = "rotateY(-160deg)  scaleX(105%)";
          backSide.style.transform = "rotateY(-160deg)  scaleX(105%)";
        } else if (paperIndex <= targetIndex - 2) {
          frontSide.style.transform = "rotateY(-170deg)  scaleX(110%)";
          backSide.style.transform = "rotateY(-170deg)  scaleX(110%)";
        } else if (paperIndex == targetIndex + 1) {
          frontSide.style.transform = "rotateY(-30deg)";
          backSide.style.transform = "rotateY(-30deg)";
        } else if (paperIndex == targetIndex + 2) {
          frontSide.style.transform = "rotateY(-20deg)  scaleX(105%)";
          backSide.style.transform = "rotateY(-20deg)  scaleX(105%)";
        } else if (paperIndex >= targetIndex + 3) {
          frontSide.style.transform = "rotateY(-10deg) scaleX(110%)";
          backSide.style.transform = "rotateY(-10deg) scaleX(110%)";
        }
      }
    });
  }
  window.onload = () => {
    const preloadEl = document.querySelector(".preload");
    preloadEl.style = "transition: .5s ease all; opacity: 0";
    setTimeout(() => {
      preloadEl.remove();
    }, 500);
  };
