// Handle forms
let searchValue = "";
imageFile.addEventListener('change', handleImage, false);

function handleImage (event) {
  let reader = new FileReader();
  reader.onload = function (event) {
    let img = new Image();
    
    img.onload = function () {
      imageCanvas.width = img.width;
      imageCanvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    }
    
    img.src = event.target.result;
  }
  reader.readAsDataURL(e.target.files[0]);
}

function handleData () {
  let dataUri = imageCanvas.toDataURL();

  Tesseract.recognize(
    dataUri,'eng',
  { logger: m => console.log(m) }
).then(({ data: { text } }) => {
    searchValue = text;
  });
}