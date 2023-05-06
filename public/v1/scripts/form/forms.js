// Handle forms
imageFile.addEventListener('change', handleImage, false);

function handleImage (e) {
  let reader = new FileReader();
  reader.onload = function (event) {
    let img = new Image();
    
    img.onload = function () {
      imageCanvas.style.width = this.naturalWidth;
      imageCanvas.style.height = this.naturalHeight;
      ctx.drawImage(img, 0, 0);

      setTimeout(function () {
        handleData();
      }, 2000);
    }
    
    img.src = event.target.result;
  }
  reader.readAsDataURL(e.target.files[0]);

  // let tgt = evt.target || window.event.srcElement,
  // files = tgt.files;
    
  // FileReader support
  // if (FileReader && files && files.length) {
  //   let fr = new FileReader();
  //   fr.onload = function () {
  //     imagePlacer.src = fr.result;
  //   }
    
  //   fr.readAsDataURL(files[0]);
  //   handleData();
  // }
  
  picButton.style.display = "none";
  placeHolder.style.display = "block";
}

function toDataURL (src, callback) {
  let image = new Image();
  
  image.crossOrigin = 'Anonymous';
  image.onload = function () {
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
    
    canvas.height = this.naturalHeight;
    canvas.width = this.naturalWidth;
    context.drawImage(this, 0, 0);
    
    let dataURL = canvas.toDataURL('image/jpeg');
    callback(dataURL);
  };
  image.src = src;
}

function handleData () {
  let dataUri = imageCanvas.toDataURL();
  
  Tesseract.recognize(
    dataUri,'eng',
    { logger: m => console.log(m) }
  ).then(({ data: { text } }) => {
    searchValue = text;
    
    answerButton.style.display = "block";
    placeHolder.style.display = "none";
  });
}