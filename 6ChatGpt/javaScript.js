let innerUploadImage = document.querySelector(`.inner-upolad-img`);
let src = document.querySelector(`#img`);
let button = document.querySelector(`button`);
let result = document.querySelector(`#result`);
let output = document.querySelector(`.output`);
let loading = document.querySelector(`#loading`);
let input = innerUploadImage.querySelector(`input`);

// Use the Gapini API URL
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyB1jWsmmh9E4EF63uQn8JaK2yeW319sw0Q`; // Use your own API key here

let fileDetails = {
  mime_type: "null",
  data: "null",
};

async function generateResponse() {
  const requestOptions = {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "contents": [
        {
          "parts": [
            { "text": "Solve the mathematical problem with detailed steps." },
            {
              "inline_data": {
                "mime_type": fileDetails.mime_type,
                "data": fileDetails.data
              }
            }
          ]
        }
      ]
    })
  };

  try {
    console.log("Sending request with options:", requestOptions); // Log request options for debugging
    let response = await fetch(API_URL, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let data = await response.json();
    console.log("API response data:", data); // Log API response data for debugging

    if (data.candidates && data.candidates.length > 0) {
      let apiResponse = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, `$1`).trim();
      output.style.display = `block`;
      result.innerHTML = apiResponse;
    } else {
      result.innerHTML = "No response from API.";
    }

  } catch (error) {
    console.error("Error fetching API:", error);
    result.innerHTML = `Error: ${error.message}`;
    output.style.display = `block`;
  }finally{

  }
}

input.addEventListener(`change`, (e) => {
  const file = input.files[0];
  if (!file) return;

  let reader = new FileReader();
  reader.onload = (e) => {
    let base64data = e.target.result.split(`,`)[1];
    fileDetails.mime_type = file.type;
    fileDetails.data = base64data;

    // Log file details for debugging
    console.log("File MIME Type:", fileDetails.mime_type);
    console.log("File Base64 Data:", fileDetails.data);

    innerUploadImage.querySelector(`span`).style.display = `none`;
    innerUploadImage.querySelector(`#icon`).style.display = `none`;
    src.style.display = `block`;
    src.src = `data:${fileDetails.mime_type};base64,${fileDetails.data}`;
    output.style.display=`none`
  };

  reader.readAsDataURL(file);
});

button.addEventListener(`click`, generateResponse);

innerUploadImage.addEventListener(`click`, () => {
  input.click();
});
