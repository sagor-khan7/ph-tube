function getTimeString(time) {
  const years = Math.floor(time / 31536000);
  const months = Math.floor((time % 31536000) / 2592000);
  const hours = Math.floor((time % 2592000) / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  return `${years > 0 ? years + "y " : ""}${months > 0 ? months + "m " : ""}${
    hours > 0 ? hours + "h " : ""
  }${minutes > 0 ? minutes + "m " : ""}${
    seconds > 0 ? seconds + "s" : ""
  }`.trim();
}

// load categories
const loadCategories = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/phero-tube/categories"
  );
  const data = await res.json();
  displayCategories(data.categories);
};
const loadVideos = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/phero-tube/videos"
  );
  const data = await res.json();
  displayVideos(data.videos);
};

// display categories
const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories-container");
  categories.forEach((category) => {
    // create a button
    const button = document.createElement("button");
    button.classList = "btn hover:bg-red-400 ease-in duration-300";
    button.innerText = category.category;

    categoriesContainer.appendChild(button);
  });
};

const displayVideos = (videos) => {
  const videosContainer = document.getElementById("videos-container");
  videos.forEach((video) => {
    console.log(video);
    // create a video card
    const videoCard = document.createElement("div");
    videoCard.classList = "card p-4";
    videoCard.innerHTML = `
      <div class="relative">
        <img src="${video.thumbnail}" alt="${
      video.title
    }" class="rounded-md bg-center  bg-no-repeat object-cover" />
        ${
          video.others.posted_date?.length === 0
            ? ""
            : `<span class="absolute bottom-2 right-2 bg-black text-white text-xs py-1 px-2 rounded">${getTimeString(
                video.others.posted_date
              )}</span>`
        }
      </div>
      <div class="flex items-center gap-4 my-2 ">
        <div>
          <img src="${video.authors[0].profile_picture}" alt="${
      video.channelName
    }" class="w-10 h-10 rounded-full" />
        </div>
        <div>
          <h3 class="text-lg font-semibold">${video.title}</h3>
          <div class="flex items-center gap-2">
            <p class="text-sm text-gray-500">${
              video.authors[0].profile_name
            }</p>
            ${
              video.authors[0].verified
                ? `
            <img src="https://img.icons8.com/color/48/verified-badge.png" class="inline w-4 h-4" alt="verified account" />
            `
                : ""
            }
          </div>
          <p class="text-sm text-gray-500">${video.others.views} views</p>
      </div>
    `;
    videosContainer.appendChild(videoCard);
  });
};

loadCategories();

loadVideos();
