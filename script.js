const maxCount = 10;
const accessKey = "NsWvI1lGxPqL9Rr0ROQe2HUX6EszI-MeniC1bltEw_c";
let page = 1;
let isFetching = false;
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${maxCount}&page=${page}`;

let photosArray = [];

const imageContainer = document.getElementById("image-container");

const displayPhotos = () => {
  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");

    const image = document.createElement("img");
    image.setAttribute("src", photo.urls.regular);
    image.setAttribute("alt", photo.alt_description);
    image.setAttribute("title", photo.alt_description);

    item.appendChild(image);
    imageContainer.appendChild(item);
  });
};

const fetchImage = async () => {
  try {
    if(isFetching) return;
    isFetching = true;

    const data = await fetch(apiURL);
    const newPhotos = await data.json();
    photosArray = [...photosArray, ...newPhotos];
    displayPhotos();
    page++;
    apiURL = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${maxCount}&page=${page}`;
  } catch (error) {
    console.log(error);
  } finally {
    isFetching = false;
  }
};

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 1000 && !isFetching
  ) {
    fetchImage();
  }
});

fetchImage();
