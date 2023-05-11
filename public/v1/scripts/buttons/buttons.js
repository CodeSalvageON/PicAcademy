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

    fetch ("/findrequest", {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        url : answerArray[0]
      })
    })
    .then(response => response.text())
    .then(data => {
      alert(data);
    })
    .catch(error => {
      throw error;
    })
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