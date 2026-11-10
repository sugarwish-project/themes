
  var audio = new Audio("https://dekatutorial.github.io/Gellen%20Martadinata%20-%20Selamat%20Ulang%20Tahun.mp3");
  audio.loop = true;
  audio.autoplay = true;
  function mulai() {
    window.scroll(0, 0);
    audio.play();
    document.querySelector(".open").style = "opacity: 0;";
    document.querySelector(".body").style = "overflow-y: scroll;";
    setTimeout(function () {
      document.querySelector(".open").style.display = "none";
    }, 1000);
  }
  var swalo = Swal.mixin({
    allowOutsideClick: false,
    confirmButtonText: "OK"
  });
  async function kirimPesan() {
    var {
      value: _0x4c5403
    } = await swalo.fire({
      title: "Tulis pesan",
      input: "textarea",
      confirmButtonText: "Kirim"
    });
    if (_0x4c5403) {
      await swalo.fire("Kirim pesannya ke wa aku ya");
      location.assign("https://wa.me/?text=" + _0x4c5403);
    } else {
      await swalo.fire({
        confirmButtonText: "Ok",
        title: "Jangan dikosongin dong"
      });
      kirimPesan();
    }
  }
  const lovePesan = document.querySelector(".material-icons-sharp");
  lovePesan.onclick = kirimPesan;
  const mulaiBtn = document.querySelector(".mulaiO");
  mulaiBtn.onclick = mulai;
