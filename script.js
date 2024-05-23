let photoLinks = [
  "./img/ai-generated.png",
  "./img/blue.jpg",
  "./img/cocker.jpg",
  "./img/firework.jpg",
  "./img/pier.jpg",
  "./img/sea.jpg",
  "./img/sky.jpg",
  "./img/skyscraper.jpg",
  "./img/sunset.jpg",
  "./img/tiger.jpg",
];
let x = 0;
let myTimeout;

async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html"); // "includes/header.html"
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

function photos() {
  clearTimeout(myTimeout);
  document.getElementById("blackBackground").classList.add("d-none");
  document.getElementById("displayPhotos").innerHTML = "";

  for (i = 0; i < photoLinks.length; i++) {
    const photo = photoLinks[i];
    document.getElementById("displayPhotos").innerHTML += /*html*/ `
        <img onclick="photoWidthBlackBackground(${i})" class="singlePhoto" src="${photo}" alt="">
    `;
  }
}

function photoWidthBlackBackground(i) {
  x = i;
  document.getElementById("blackBackground").classList.remove("d-none");
  document.getElementById("blackBackground").innerHTML = /*html*/ `
    <img onclick='previousPhoto(${i}, event)' class="arrow" src="./img/arrow_reverse.png" alt="">
     <img onclick='photos()' class="bigPhoto" src="${photoLinks[i]}" alt="">
    <img onclick='nextPhoto(${i}, event)' class="arrow" src="./img/arrow.png" alt="">
    `;
}

function nextPhoto(i, event) {
  i++;
  if (i == photoLinks.length) {
    i = 0;
    photoWidthBlackBackground(i);
  } else {
    photoWidthBlackBackground(i);
  }
  event.stopPropagation();
}

function previousPhoto(i, event) {
  i--;
  if (i < 0) {
    i = photoLinks.length - 1;
    photoWidthBlackBackground(i);
  } else {
    photoWidthBlackBackground(i);
  }
  event.stopPropagation();
}

function diashow() {
  document.getElementById("blackBackground").classList.remove("d-none");
  document.getElementById("blackBackground").innerHTML = /*html*/ `
    <div class="buttonWithImage"> 

      <img onclick='photos()' class="bigPhoto" src="${photoLinks[x]}" alt="">
    </div>
    `;
  x++;
  if (x == photoLinks.length) {
    x = 0;
  }
  myTimeout = setTimeout(diashow, 2000);
}
