let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "hi-GB"; // Set the language
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak(`Good Morning Sir`);
    } else if (hours >= 12 && hours < 17) { // Fix the range
        speak(`Good Afternoon Sir`);
    } else {
        speak(`Good Evening Sir`);
    }
}

//Uncomment to wish on load
window.addEventListener("load", () => {
   wishMe()
});

// Speech recognition setup
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});

function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";

    if (message.includes("hello") || message.includes("hey")) {
        speak(`Hello Sir, what can I help you with?`);
    } else if (message.includes("who are you")) {
        speak(`I am a virtual assistant, created by TopperGirl.`);
    } else if (message.includes("open youtube")) {
        speak(`Opening YouTube..`);
        window.open(`https://www.youtube.com`, "_blank");
    } else if (message.includes("open google")) {
        speak(`Opening Google..`);
        window.open(`https://www.google.com`, "_blank");
    } else if (message.includes("open linkedin")) {
        speak(`Opening LinkedIn..`);
        window.open(`https://www.linkedin.com`, "_blank");
    } else if (message.includes("open calculator")) {
        speak(`Opening calculator..`);
        window.open("calculator://"); // May not work in all browsers
    } else if (message.includes("time")) {
        let now = new Date();
        let options = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true, // Change to false for 24-hour format
        };
        let time = now.toLocaleTimeString('hi-IN', options); // Set to Hindi locale
        speak(`The current time is ${time}`);
    }else if (message.includes("date")) {
        let date = new Date().toLocaleDateString(); // Simplified date formatting
        speak(date);
    } else {
        let finalText = "This is what I found on the internet regarding " + message.replace("shifra", "").replace("shipra", "").trim();
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message.replace("shifra", "").replace("shipra", "").trim()}`, "_blank");
    }
}
