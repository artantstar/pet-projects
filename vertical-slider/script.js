const upBtn = document.querySelector('.button-up')
const downBtn = document.querySelector('.button-down')
let sidebar = document.querySelector('.sidebar')
let slide = document.querySelector('.main')
let container = document.querySelector('.container')
let slideCount = sidebar.querySelectorAll('div').length

let firstSlide = slide.children[0]
let firstSlideClone = firstSlide.cloneNode(true)
let lastSlide = slide.children[slideCount - 1]
let lastSlideClone = lastSlide.cloneNode(true)
slide.append(firstSlideClone)
slide.insertBefore(lastSlideClone, firstSlide)

let firstSidebar = sidebar.children[0]
let firstSidebarClone = firstSidebar.cloneNode(true)
let lastSidebar = sidebar.children[slideCount - 1]
let lastSidebarClone = lastSidebar.cloneNode(true)
sidebar.append(firstSidebarClone)
sidebar.insertBefore(lastSidebarClone, firstSidebar)

let slideIndex = 1
let slideHeight = container.clientHeight
slide.style.transform = `translateY(-${slideIndex * slideHeight}px)`
sidebar.style.transform = `translateY(-${slideCount * slideHeight}px)`

let isScroll = false

upBtn.addEventListener('click', () => {
  changeSlide('up')
})
downBtn.addEventListener('click', () => {
  changeSlide('down')
})

function resetSlideUp() {
  slide.classList.remove('animated')
  sidebar.classList.remove('animated')
  slideIndex = 1
  slide.style.transform = `translateY(-${slideIndex * slideHeight}px)`
  sidebar.style.transform = `translateY(-${(slideCount - slideIndex + 1) * slideHeight}px)`
}

function resetSlideDown() {
  slide.classList.remove('animated')
  sidebar.classList.remove('animated')
  slideIndex = slideCount
  slide.style.transform = `translateY(-${slideIndex * slideHeight}px)`
  sidebar.style.transform = `translateY(-${(slideCount - slideIndex + 1) * slideHeight}px)`
}

function changeSlide(direction) {
  slide.classList.add('animated')
  sidebar.classList.add('animated')
  if (direction === 'up') {
    slideIndex++
    if (slideIndex === (slideCount + 1)) {
      setTimeout(resetSlideUp, 500);
    }
  } else if (direction === 'down') {
    slideIndex--
    if (slideIndex < 1) {
      setTimeout(resetSlideDown, 500);
    }
  }
  slide.style.transform = `translateY(-${slideIndex * slideHeight}px)`
  sidebar.style.transform = `translateY(-${(slideCount - slideIndex + 1) * slideHeight}px)`
}

slide.addEventListener("wheel", eventSlide => {
  if (isScroll === false) {
    isScroll = true
    if (eventSlide.deltaY > 0)
      changeSlide('up')
    else
      changeSlide('down')
    setTimeout('isScroll = false', 1000);
  }
})

sidebar.addEventListener("wheel", eventSidebar => {
  if (isScroll === false) {
    isScroll = true
    if (eventSidebar.deltaY > 0)
      changeSlide('down')
    else
      changeSlide('up')
    setTimeout('isScroll = false', 1000);
  }
})

const playBtn = document.querySelector('.button-play')
let play = false
let intervalID

playBtn.addEventListener('click', () => {
  playBtn.children[0].classList.toggle('fa-play');
  playBtn.children[0].classList.toggle('fa-pause');
  play = !play
  if (play === true) {
    intervalID = setInterval("changeSlide('up')", 3000)
  } else {
    clearInterval(intervalID)
  }
})

console.log('score: 30/30\n✓ Повторить исходный проект +10\n✓ Обязательный дополнительный функционал: сделать слайдер бесконечным (зацикленным) +10\n✓ Дополнительный функционал на выбор: Пролистывание слайдера колёсиком мышки (+ реализовано реверсивное направление скролла для сайдбара и изображения) +10\n✓ Дополнительный функционал на выбор: Кнопка автовоспроизведения каждые 3 секунды (play/pause) +10')