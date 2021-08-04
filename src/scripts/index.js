const slider = document.querySelector(".slider");
const next = document.querySelector(".arrow-right");
const prev = document.querySelector(".arrow-left");
const cards = document.querySelector(".cards");
const cardItem = document.querySelectorAll(".card");
const indicator = document.querySelector(".header__scroll-indicator");
const scroll = document.querySelector(".header__scroll");
const width = window.getComputedStyle(slider).width;
let offset = 0;

cards.style.width = 25 * cardItem.length + "%";

cards.style.transition = "0.5s all";
const widthItem = cardItem[0].offsetWidth;
slider.style.overflow = "hidden";
const cardMargin = +window
  .getComputedStyle(cardItem[0])
  .getPropertyValue("margin-right")
  .slice(0, -2);
const cardsWidth = (widthItem + cardMargin) * cardItem.length;

next.addEventListener("click", () => {
  if (offset <= -(cardsWidth - (widthItem + cardMargin) * 4)) {
    offset = 0;
  } else {
    offset = offset - (widthItem + cardMargin);
  }

  cards.style.transform = `translateX(${offset}px)`;
});

prev.addEventListener("click", () => {
  if (offset >= 0) {
    console.log(cardsWidth);
    console.log(widthItem);
    console.log(cardMargin);
    offset = -(cardsWidth - (widthItem + cardMargin) * 4);
  } else {
    offset = offset + (widthItem + cardMargin);
  }
  console.log(offset);

  cards.style.transform = `translateX(${offset}px)`;
});
