const body = document.body;

function loadBack (backSrc) {
  let newImg = new Image();

  newImg.onload = function () {
    body.style.backgroundImage = "url('" + newImg.src + "')";
  }
  newImg.src = backSrc;
}

// Initialize

waitForElement("body", 3000).then(function () {
  loadBack("/styling/images/bg/officepark.jpg");
}).catch(() => {
  console.log("Error: did not load!");
});