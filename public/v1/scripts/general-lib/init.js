// Initialize the General Library

// mobile check
if (mobileCheck() == true) {
  pageTitle.style.fontSize = "15vw";
  
  picButton.style.fontSize = "10vw";
  picButton.style.borderRadius = "20px";

  answerButton.style.fontSize = "10vw";
  answerButton.style.borderRadius = "20px";

  picButton.classList.remove("zoom");
  answerButton.classList.remove("zoom");

  versionNumber.style.fontSize = "5vw";
}

// if (isTablet == true) {
//   picButton.classList.remove("zoom");
//   alert(isTablet);
// }

// alert(mobileAndTabletCheck());
// alert(detectMob());