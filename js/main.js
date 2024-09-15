/* HTML Document Elements */
let settingsBtn = document.querySelector(".gear");
let settingsSec = document.querySelector(".settings-box");
let colorsLi = document.querySelectorAll(".option-box .colors-list li");
let backgroundOptionBtns = document.querySelectorAll(
  ".random-backgrounds span"
);
let bulletsOptionBtns = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let ourSkills = document.querySelector(".our-skills");
let progressBar = document.querySelectorAll(".our-skills .skill-box .progress");
let upButton = document.querySelector("#up-button");
let ourGallery = document.querySelectorAll(".gallery img");
// Nav bullets
let bullets = document.querySelectorAll(".nav-bullets .bullet");
scrollToSection(bullets);
// Navbar links
let navbarLinks = document.querySelectorAll(".header-area .links a");
scrollToSection(navbarLinks);
// Toggle Menu
let toggleBtn = document.querySelector(".header-area .toggle-menu");
let theLinks = document.querySelector(".header-area .links");

// Open and close settings box
stopPropagationFunc(settingsBtn);
stopPropagationFunc(settingsSec);

function stopPropagationFunc(ele) {
  ele.addEventListener("click", function (e) {
    e.stopPropagation();
    settingsSec.classList.toggle("open");
  });
}

// Close the settings section when clicking outside
document.addEventListener("click", function (e) {
  if (settingsSec.classList.contains("open") && e.target != settingsSec) {
    settingsSec.classList.remove("open");
  }
});

// Get main color from local storage
let mainColor = localStorage.getItem("color-option");
if (mainColor) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  colorsLi.forEach((li) => {
    li.classList.remove("active");
    if (li.dataset.color == mainColor) {
      li.classList.add("active");
    }
  });
} else {
  colorsLi[4].classList.add("active");
}

// Switch the main color
colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    handleActive(e);
    let color = e.target.dataset.color;
    localStorage.setItem("color-option", color);
    document.documentElement.style.setProperty("--main-color", color);
  });
});

// Get background option from local storage
let backgroundOption;
let backgroundIntravel;
let localBgOption = localStorage.getItem("background-option");
if (localBgOption !== null) {
  backgroundOption = booleanFrom(localBgOption);
  document
    .querySelector(`.random-backgrounds .${localBgOption}`)
    .classList.add("active");
} else {
  document.querySelector(".random-backgrounds .off").classList.add("active");
}

// Switch the background option
backgroundOptionBtns.forEach((span) => {
  span.addEventListener("click", (e) => {
    let option = e.target.dataset.randombg;
    if (booleanFrom(option) /* return true if option = 'on' or 'true' */) {
      backgroundOption = true;
      localStorage.setItem("background-option", option);
      randomImg();
    } else {
      backgroundOption = false;
      localStorage.setItem("background-option", option);
      clearInterval(backgroundIntravel);
    }
    // Handle the active in option-box
    handleActive(e);
  });
});
randomImg();

// Get bullets options from local storage
let localBltsOption = localStorage.getItem("bullets-option");
if (localBltsOption !== null) {
  document
    .querySelector(".bullets-option ." + localBltsOption)
    .classList.add("active");
  bulletsHandle(localBltsOption, bulletsContainer);
} else {
  document.querySelector(".bullets-option .off").classList.add("active");
}

// Switch background option
bulletsOptionBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleActive(e);
    let dataOption = e.target.dataset.bulletsopn;
    bulletsHandle(dataOption, bulletsContainer);
    localStorage.setItem("bullets-option", dataOption);
  });
});

// Reaset button
document.querySelector(".reset-btn").onclick = function () {
  localStorage.clear();
  window.location.reload();
};

// Scroll up button
upButton.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// Our Skills progress bar
window.onscroll = function () {
  let ourSkillsOffsetTop = ourSkills.offsetTop;
  if (window.scrollY >= ourSkillsOffsetTop) {
    progressBar.forEach((bar) => {
      // let randomProgress = Math.floor(Math.random() * 100); // random progress
      // let progressValue = randomProgress + "%";
      let progressValue = bar.dataset.progress;
      bar.children[0].style.width = progressValue; // Change the width of the child span
    });
  }
  // Show the up button
  if (
    document.body.scrollTop > 500 ||
    document.documentElement.scrollTop > 500
  ) {
    upButton.style.opacity = "1";
  } else {
    upButton.style.opacity = "0";
  }
};

// Create popup image
ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create overlay
    let popupOverlay = document.createElement("div");
    popupOverlay.className = "popup-overlay";
    document.body.append(popupOverlay);
    // Create the Image container
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    // Create the heading
    let imgHeading = document.createElement("h3");
    imgHeading.className = "image-heading";
    imgHeading.appendChild(
      document.createTextNode(img.alt ? img.alt : "(No Heading)")
    );
    popupBox.appendChild(imgHeading);
    // create the close button;
    let closeBtn = document.createElement("span");
    closeBtn.className = "close-btn";
    closeBtn.innerHTML = "X";
    popupBox.appendChild(closeBtn);
    closeBtn.addEventListener("click", function () {
      popupOverlay.remove();
    });
    // Create and append the image
    let popupImage = document.createElement("img");
    popupImage.src = img.src;
    popupOverlay.appendChild(popupBox);
    popupBox.appendChild(popupImage);
  });
});

toggleBtn.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  theLinks.classList.toggle("open");
};
theLinks.onclick = (e) => e.stopPropagation();
// Close the menu when clicking outside
document.addEventListener("click", function (e) {
  if (theLinks.classList.contains("open")) {
    if (e.target != toggleBtn && e.target != theLinks) {
      theLinks.classList.remove("open");
      toggleBtn.classList.remove("menu-active");
    }
  }
});

// Handdle the scroll on bullets and links
function scrollToSection(eles) {
  eles.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      let bullet = document.querySelector(e.target.dataset.section);
      bullet.scrollIntoView({ behavior: "smooth" });
      handleActive(e);
    });
  });
}

// Change the active button
function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((e) => {
    e.classList.remove("active");
  });
  ev.target.classList.add("active");
}

// Change the background randomly
function randomImg() {
  if (backgroundOption) {
    let landingPage = document.querySelector(".landing-page");
    backgroundIntravel = setInterval(() => {
      let randomNum = Math.ceil(Math.random() * 5);
      landingPage.style.backgroundImage = `url(./imgs/0${randomNum}.jpg)`;
    }, 5000);
  }
}

// Convert true or false strings to booleans
function booleanFrom(data) {
  return data == "true" || data == "on" ? true : false;
}

// Remove or add the bullets
function bulletsHandle(option, bullet) {
  if (booleanFrom(option)) {
    bullet.style.right = "0";
  } else {
    bullet.style.right = "-500px";
  }
}
