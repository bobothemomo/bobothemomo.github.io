/*============================= BARIŞDEĞIRMENCI PORTFOLIO JS =============================*/
/* 🔄 Bu dosya, eski projeden (bobothemomo.github.io) içerikler kullanılarak yeni Bedimcode template yapısıyla oluşturulmuştur */
/* 📅 Tarih: 2025-11-09 */

/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== ACCORDION SKILLS ====================*/
/* 📌 Eski projeden aktarılan beceri listesi: Adobe Illustrator, Unity, C#, etc. */
const skillsContent = document.getElementsByClassName('skills__content'),
      skillsHeader = document.querySelectorAll('.skills__header')

function toggleSkills(){
    let itemClass = this.parentNode.className

    for(i = 0; i < skillsContent.length; i++){
        skillsContent[i].className = 'skills__content skills__close'
    }
    if(itemClass === 'skills__content skills__close'){
        this.parentNode.className = 'skills__content skills__open'
    }
}

skillsHeader.forEach((el) =>{
    el.addEventListener('click', toggleSkills)
})

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab =>{
    tab.addEventListener('click', () =>{
        const target = document.querySelector(tab.dataset.target)

        tabContents.forEach(tabContent =>{
            tabContent.classList.remove('qualification__active')
        })
        target.classList.add('qualification__active')

        tabs.forEach(tab =>{
            tab.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active')
    })
})

/*==================== SERVICES MODAL ====================*/
/* 📌 Eski projeden aktarılan hizmetler: Graphic Design, Game Development, UX/UI, Scrum Master */
const modalViews = document.querySelectorAll('.services__modal'),
      modalBtns = document.querySelectorAll('.services__button'),
      modalCloses = document.querySelectorAll('.services__modal-close')

// Function to open modal
let modal = function(modalClick){
    modalViews[modalClick].classList.add('active-modal')
    document.body.style.overflow = 'hidden' // Prevent body scroll
}

// Function to close all modals
const closeAllModals = () => {
    modalViews.forEach((modalView) => {
        modalView.classList.remove('active-modal')
    })
    document.body.style.overflow = 'auto' // Restore body scroll
}

// Open modal on button click
modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        modal(i)
    })
})

// Close modal on X button click
modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        closeAllModals()
    })
})

// Close modal when clicking outside (on backdrop)
modalViews.forEach((modalView) => {
    modalView.addEventListener('click', (e) => {
        if (e.target === modalView) {
            closeAllModals()
        }
    })
})

// Close modal on ESC key press
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAllModals()
    }
})

/*==================== PORTFOLIO SWIPER  ====================*/
/* 📌 Eski projeden aktarılan projeler: Sketch & Mockup, Community Products, School Works, Game Projects */
let swiperPortfolio = new Swiper('.portfolio__container', {
    cssMode: true,
    loop: true,
    spaceBetween: 24,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
    breakpoints: {
        568: {
            spaceBetween: 48,
        }
    }
})

/*==================== TESTIMONIAL ====================*/
// Only initialize if testimonial section exists and is visible
const testimonialContainer = document.querySelector('.testimonial__container');
if (testimonialContainer && window.getComputedStyle(document.querySelector('.testimonial')).display !== 'none') {
    let swiperTestimonial = new Swiper('.testimonial__container', {
        loop: true,
        grabCursor: true,
        spaceBetween: 48,

        pagination: {
            el: '.swiper-pagination-testimonial',
            clickable: true,
            dynamicBullets: true,
        },
        breakpoints:{
            568:{
                slidesPerView: 2,
            }
        }
    })
}

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*==================== DARK LIGHT THEME ====================*/ 
/* 📌 Eski projeden aktarılan dark mode özelliği */
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

