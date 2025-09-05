console.log("'script.js' is connected");

const url = "https://openapi.programming-hero.com/api";

const showLoadingBars = () => {
  const placeholderLoadingBars = document.getElementById(
    "placeholder-loading-bars",
  );

  if (!!placeholderLoadingBars === false) {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    const newPlaceholderLoadingBars = document.createElement("span");

    newPlaceholderLoadingBars.className =
      "col-span-full py-16 justify-self-center loading loading-bars loading-xl";

    wordContainer.appendChild(newPlaceholderLoadingBars);

    return;
  }

  const placeholderDefaultContent = document.getElementById(
    "placeholder-default-content",
  );

  placeholderDefaultContent.classList.add("hidden");
  placeholderLoadingBars.classList.replace("hidden", "block");
};

const loadLessons = () => {
  const endpoint = url + "/levels/all";
  fetch(endpoint)
    .then((response) => response.json())
    .then((result) => displayLesson(result.data));
};

const displayLesson = (lessons) => {
  const lvlButtonContainer = document.getElementById("lvl-btn-container");
  lvlButtonContainer.innerHTML = "";

  for (const lesson of lessons) {
    const newButton = document.createElement("button");

    newButton.id = `toggle-btn-${lesson.id}`;

    newButton.className =
      "toggle-btn font-poppins text-sm font-semibold text-[#422AD5] border border-[#422AD5] rounded px-3 py-2 hover:text-white hover:bg-[#422AD5] cursor-pointer active:bg-[#422AD5] active:scale-95 active:text-white";
    newButton.innerHTML = `
            <span><i class="fa-solid fa-book-open"></i></span>
            Lesson-${lesson.level_no}
`;

    newButton.addEventListener("click", () => {
      toggleButtons(newButton.id);
      loadLevelWords(lesson.level_no);
    });

    lvlButtonContainer.appendChild(newButton);
  }
};

const toggleButtons = (activeButtonId) => {
  const toggleButtonsCollection = document.getElementsByClassName("toggle-btn");

  for (const toggleButton of toggleButtonsCollection) {
    if (toggleButton.id === activeButtonId) {
      toggleButton.classList.replace("text-[#422AD5]", "text-white");
      toggleButton.classList.add("bg-[#422AD5]");
    } else {
      toggleButton.classList.replace("text-white", "text-[#422AD5]");
      toggleButton.classList.remove("bg-[#422AD5]");
    }
  }
};

const loadLevelWords = (levelNumber) => {
  showLoadingBars();
  const endpoint = url + `/level/${levelNumber}`;

  fetch(endpoint)
    .then((response) => response.json())
    .then((result) => displayWords(result.data));
};

const displayWords = (wordObjects) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (wordObjects.length === 0) {
    wordContainer.innerHTML = `
          <div class="col-span-full py-16 text-center">
            <img src="./assets/alert-error.png" alt="" class="w-16 sm:w-max h-auto mx-auto mb-4" />
            <h6
              class="font-hind-siliguri text-xs sm:text-sm font-normal text-[#79716B] mb-3"
            >
              এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
            </h6>
            <h3
              class="font-hind-siliguri text-2xl sm:text-4xl font-medium text-[#292524]"
            >
              নেক্সট Lesson এ যান
            </h3>
          </div>
`;

    return;
  }
  wordObjects.forEach((wordObject) => {
    const newCardDiv = document.createElement("div");
    newCardDiv.innerHTML = `
            <div class="h-full bg-white text-center p-5 sm:p-8 md:p-12 lg:p-10 xl:p-12 2xl:p-14 rounded-xl">
              <h3 
                class="font-poppins text-xl sm:text-lg md:text-2xl lg:text-xl xl:text-3xl 2xl:text-[2rem] font-bold text-black mb-6"
              >
                ${wordObject.word ? wordObject.word : "Missing Word"}
              </h3>
              <h4 
                class="font-poppins text-sm md:text-base xl:text-lg 2xl:text-xl font-medium text-black mb-6"
              >
                Meaning /Pronounciation
              </h4>
              <h3
                class="font-hind-siliguri text-xl sm:text-lg md:text-2xl lg:text-xl xl:text-3xl 2xl:text-[2rem] font-semibold text-[#18181B] mb-14"
              >
                ${wordObject.meaning ? wordObject.meaning : "অর্থ পাওয়া যায়নি"} / ${wordObject.pronunciation ? wordObject.pronunciation : "উচ্চারণ পাওয়া যায়নি"}
              </h3>
              <div class="flex justify-between">
                <button 
                  id="btn-word-info-${wordObject.id}"
                  class="lg:text-xl xl:text-2xl bg-[#1a91ff1a] p-4 rounded-lg cursor-pointer hover:bg-[#1a91ffcc] active:bg-[#1a91ffcc] active:scale-95"
                >
                  <i class="fa-solid fa-circle-info"></i>
                </button>
                <button 
                  class="lg:text-xl xl:text-2xl bg-[#1a91ff1a] p-4 rounded-lg cursor-pointer hover:bg-[#1a91ffcc] active:bg-[#1a91ffcc] active:scale-95"
                >
                  <i class="fa-solid fa-volume-high"></i>
                </button>
              </div>
            </div>
`;
    wordContainer.appendChild(newCardDiv);
    attachWordInfoListener(wordObject.id);
  });
};

const attachWordInfoListener = (wordId) => {
  const btnWordInfo = document.getElementById(`btn-word-info-${wordId}`);

  btnWordInfo.addEventListener("click", () => {
    displayWordInfo(wordId);
  });
};

const displayWordInfo = async (wordId) => {
  const wordObject = await fetchWord(wordId);

  const dialog = document.getElementById("dialog-word-info");

  const wordInfoContainer = document.getElementById("word-info-container");

  wordInfoContainer.innerHTML = "";

  wordInfoContainer.innerHTML = `
            <h2 class="font-poppins text-lg lg:text-2xl 2xl:text-3xl font-semibold text-black mb-5 2xl:mb-8">
              ${wordObject.word} (<span><i class="fa-solid fa-microphone-lines"></i></span>:
              ${wordObject.pronunciation})
            </h2>

            <h4 class="font-poppins text-sm sm:text-base lg:text-lg 2xl:text-2xl font-semibold text-black mb-1 2xl:mb-2">
              Meaning
            </h4>
            <p class="font-hind-siliguri text-sm sm:text-base lg:text-lg 2xl:text-2xl font-medium text-black mb-5 2xl:mb-8">
              ${wordObject.meaning}
            </p>

            <h4 class="font-poppins text-sm sm:text-base lg:text-lg 2xl:text-2xl font-semibold text-black mb-1 2xl:mb-2">
              Example
            </h4>
            <p class="font-poppins text-sm sm:text-base lg:text-lg 2xl:text-2xl font-normal text-black mb-5 2xl:mb-8">
              ${wordObject.sentence}
            </p>

            <h4 class="font-hind-siliguri text-sm sm:text-base lg:text-lg 2xl:text-2xl font-medium text-black mb-1 2xl:mb-2">
              সমার্থক শব্দ গুলো
            </h4>
            <div id="synonyms-container" class="font-poppins text-xs sm:text-sm lg:text-base 2xl:text-xl font-normal text-black whitespace-nowrap flex flex-wrap gap-2 sm:gap-4">
            </div>
`;

  populateSynonyms(wordObject);

  dialog.showModal();
};

const fetchWord = async (wordId) => {
  const endpoint = url + `/word/${wordId}`;

  try {
    const response = await fetch(endpoint);
    const result = await response.json();

    const wordObject = result.data;

    return wordObject;
  } catch (error) {
    console.error("Fetching word error:", error);
  }
};

const populateSynonyms = (wordObject) => {
  const synonymsContainer = document.getElementById("synonyms-container");
  synonymsContainer.innerHTML = "";

  wordObject.synonyms.forEach((synonym) => {
    const newSynonymH5 = document.createElement("h5");
    newSynonymH5.className =
      "px-3 lg:px-5 py-1 bg-[#EDF7FF] border border-[#D7E4EF] rounded-md";

    newSynonymH5.innerText = synonym;

    synonymsContainer.appendChild(newSynonymH5);
  });
};

const addCloseDialogButtonListener = () => {
  document.getElementById("btn-close-dialog").addEventListener("click", () => {
    const dialog = document.getElementById("dialog-word-info");
    dialog.close();
  });
};

loadLessons();

addCloseDialogButtonListener();
