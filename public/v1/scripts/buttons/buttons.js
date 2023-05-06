// Button actions
// Get from elements list
let searchValue = "";

function getAnAnswer () {
  answerButton.style.display = "none";
  
  fetch ("/getresult", {
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({
      quest : searchValue
    })
  })
  .then(response => response.text())
  .then(data => {
    const answerArray = JSON.parse(data);
  })
  .catch(error => {
    throw error;
  });
}

picButton.onclick = function () {
  imageFile.click();
}

answerButton.onclick = function () {
  getAnAnswer();
}