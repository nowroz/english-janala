console.log("'script.js' is connected");

const url = "https://openapi.programming-hero.com/api";

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
    newButton.className =
      "font-poppins text-sm font-semibold text-[#422AD5] border border-[#422AD5] rounded px-3 py-2 hover:text-white hover:bg-[#422AD5] cursor-pointer active:bg-[#422AD5] active:scale-95 active:text-white";
    newButton.innerHTML = `
            <span><i class="fa-solid fa-book-open"></i></span>
            Lesson-${lesson.level_no}
`;

    lvlButtonContainer.appendChild(newButton);
  }
};

loadLessons();
