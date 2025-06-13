export const VV = async function () {
  var streaming = false;
  var btn = document.querySelector("#btn");
  var video = document.querySelector("#video");
  var canvas = document.getElementById("canvas");
  //   console.log(canvas);
  var photo = document.querySelector("#photo");
  var file = document.querySelector("#formIMG");
  var startbutton = document.querySelector("#startbutton");
  var preview = document.querySelector("#preview");
  var width = 120;
  var height = 100;
  var stream = null;
  // console.log(navigator.mediaDevices.getUserMedia());
  // async function getMedia(constraints) {
  // let stream = null;
  // try {
  // getMedia = await navigator.mediaDevices.getUserMedia(constraints);

  // Use the stream
  //   console.log(MediaStream);
  // }

  navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msgGetUserMedia;

  // var navigator =
  //   navigator.mediaDevices.getUserMedia() ||
  //   navigator.webkitGetUserMedia ||
  //   navigator.mozGetUserMedia;
  // navigator =
  // (await navigator.mediaDevices.getUserMedia) ||
  // navigator.mediaDevices.getUserMedia() ||
  // navigator.mediaDevices.webkitGetUserMedia ||
  // navigator.mediaDevices.mozGetUserMedia ||
  // navigator.mediaDevices.msGetUserMedia;

  navigator.getUserMedia(
    {
      video: true,
      audio: false,
    },
    function (stream) {
      if (video.mozSrcObject !== undefined) {
        video.mozSrcObject = stream;
        console.log(stream);
        console.log(video.mozSrcObject);
      } else {
        // let source = document.createElement("source");
        var vendorURL =
          window.URL || window.webkitURL || window.mozURL || window.msURL;
        // video.src = vendorURL.URL;
        // vendorURL.URL &&
        video.src =
          (vendorURL.URL && vendorURL.URL.createObjectURL(stream)) || stream;
        console.log(video);
        video.srcObject = stream;
      }

      video.play();
    },
    function (error) {
      console.error("An error occurred: [CODE " + error.code + "]");
      // Display a friendly "sorry" message to the user
    },
    false
  );

  btn.addEventListener("click", (ev) => {
    console.log("play");
    if (!streaming) {
      height = video.videoHeight / (video.videoWidth / width);
      video.setAttribute("width", width);
      video.setAttribute("height", height);
      canvas.setAttribute("width", width);
      canvas.setAttribute("height", height);
    }
    streaming = true;
  });
  console.log(streaming);

  function getImage(blob, callback) {
    let fileReader = new FileReader();
    fileReader.addEventListener("load", function (evt) {
      callback(fileReader.result);
    });
    fileReader.readAsDataURL(blob);
  }

  function takepicture() {
    // element = document.createElement("canvas");
    context = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;

    context.width = width;
    context.height = height;
    context.drawImage(video, 0, 0, width, height);
    let data = canvas.toDataURL("image/webp");
    let dataBase64 = data.toString("base64");
    let base64Image = dataBase64.split(";base64,").pop();

    let binaryString = window.atob(base64Image);
    let len = binaryString.length;
    let bytes = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    let blob = new Blob([bytes], { type: "image/webp" });
    let url = URL.createObjectURL(blob);

    let img = url.split("/").pop();
    let name = "http://localhost:5000/video/" + img + ".webp";
    // let reader = new FileReader();

    // let p = reader.readAsDataURL(url);
    // console.log(p);
    // file.innerHTML = `<input type='hidden' name='url' value='${name}'>
    //                   <input type='text' name='filename' value='${img}'><button form="img">Save Image</button>`;

    // const a = document.createElement("a");
    // a.href = url;
    // a.download = file.name;
    // photo.appendChild(a);
    // a.click();
    // photo.removeChild(a);
    // URL.revokeObjectURL(url);
    // photo.innerHTML = a;
    // preview.setAttribute("src", data);
    // download.setAttribute("href", data);

    // function verVideo(video, context) {
    //   context.drawImage(video, 0, 0, context.width, context.height);
    //   canvas.toDataURL("image/webp");
    // }

    // intervalo = setInterval(() => {
    //   verVideo(video, context);
    // }, 500);

    getImage(blob, function (data) {
      preview.setAttribute("src", data);
      // console.log(blob);
      var download = document.getElementById("download");
      // canvas.setAttribute("src", blob);
      // preview.setAttribute("src", blob);
      download.setAttribute("href", data);
      // canvas.setAttribute("src", canvas);
      // file.url.setAttribute("value", name);
      // file.file.setAttribute("value", url);
      // file.filename.setAttribute("value", img);
      // file.filesname.setAttribute("value", img + ".webp");
    });
    document.getElementById("save").addEventListener("click", () => {
      fetch("http://localhost:5000/video", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({
          url: name,
          filename: img,
          filesname: data,
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error:", error));
    });
  }

  function previewFile() {
    // let file = document.querySelector("input[type=hidden]")[1].files[0];
    let file = document.querySelector("[name=filesname]").files[0];
    // console.log(file);
    let reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        preview.src = reader.result;
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }
  // previewFile();
  startbutton.addEventListener(
    "click",
    function (ev) {
      takepicture();
      ev.preventDefault();
    },
    false
  );
};

// export default videoUtil;
