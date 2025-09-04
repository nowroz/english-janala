console.log("'script.js' is connected");

const url = "https://openapi.programming-hero.com/api";

const loadLessons = () => {
  const endpoint = url + "/levels/all";
  fetch(endpoint)
    .then((response) => response.json())
    .then((result) => displayLesson(result.data));
};

const loadLevelWords = (levelNumber) => {
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
                ${wordObject.word}
              </h3>
              <h4 
                class="font-poppins text-sm md:text-base xl:text-lg 2xl:text-xl font-medium text-black mb-6"
              >
                Meaning /Pronounciation
              </h4>
              <h3
                class="font-hind-siliguri text-xl sm:text-lg md:text-2xl lg:text-xl xl:text-3xl 2xl:text-[2rem] font-semibold text-[#18181B] mb-14"
              >
                ${wordObject.meaning} / ${wordObject.pronunciation}
              </h3>
              <div class="flex justify-between">
                <button 
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
  });
};

const displayLesson = (lessons) => {
  const lvlButtonContainer = document.getElementById("lvl-btn-container");
  lvlButtonContainer.innerHTML = "";

  for (const lesson of lessons) {
    const newButton = document.createElement("button");
    newButton.className =
      "font-poppins text-sm font-semibold text-[#422AD5] border border-[#422AD5] rounded px-3 py-2 hover:text-white hover:bg-[#422AD5] cursor-pointer active:bg-[#422AD5] active:scale-95 active:text-white";
    newButton.innerHTML = `
            <span><i class="fa-solid fa-book-open"></i></span>
            Lesson-${lesson.level_no}
`;

    newButton.addEventListener("click", () => {
      loadLevelWords(lesson.level_no);
    });

    lvlButtonContainer.appendChild(newButton);
  }
};

loadLessons();
