const selectTag = document.querySelectorAll("select");
const translateBtn = document.querySelector("#transfer");
const fromText = document.querySelector("#fromText");
const toText = document.querySelector("#ToText");

selectTag.forEach((tag, id) => {
    for (const countryCode in countryLanguages) {
        let selected = "";
        if (id == 0 && countryCode == "en-GB") {
            selected = "selected";
        } else if (id == 1 && countryCode == "hi-IN") {
            selected = "selected";
        }
        let option = `<option value="${countryCode}" ${selected}>${countryLanguages[countryCode]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

translateBtn.addEventListener(("click"), () => {
    let text = fromText.value; 
    let translateFrom = selectTag[0].value; 
    let translateTo = selectTag[1].value;

    // API URL
    let apiURL = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${translateFrom}|${translateTo}`;

    // Fetch data
    fetch(apiURL)
        .then((res) => res.json())
        .then((data) => {
            toText.value = data.responseData.translatedText;
        })
});
