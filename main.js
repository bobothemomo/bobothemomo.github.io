// Select elements
const image = document.querySelector('.image-clickable');
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeBtn = document.querySelector('.close');

// Open the modal when the image is clicked
image.onclick = function() {
  modal.style.display = "block";
  modalImg.src = this.src; // Set the modal image source
}

// Close the modal when the close button is clicked 
closeBtn.onclick = function() {
  modal.style.display = "none";
}

// Close the modal when the user clicks anywhere outside the modal
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const images = Array.from(document.querySelectorAll('.image-clickable'));
  const modal = document.getElementById('projectImageModal');
  const modalImg = document.getElementById('projectModalImg');
  const modalCaption = document.getElementById('projectModalCaption');
  const prevBtn = document.getElementById('imgPrevBtn');
  const nextBtn = document.getElementById('imgNextBtn');
  let currentIndex = 0;

  function showModal(index) {
    if (!images[index]) return;
    currentIndex = index;
    modalImg.src = images[index].src;
    modalImg.alt = images[index].alt;
    modalCaption.textContent = images[index].alt || '';
    const bsModal = bootstrap.Modal.getOrCreateInstance(modal);
    bsModal.show();
  }

  images.forEach((img, idx) => {
    img.addEventListener('click', function(e) {
      e.preventDefault();
      showModal(idx);
    });
  });

  prevBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    showModal((currentIndex - 1 + images.length) % images.length);
  });
  nextBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    showModal((currentIndex + 1) % images.length);
  });

  // Keyboard navigation
  modal.addEventListener('shown.bs.modal', function () {
    document.addEventListener('keydown', keyHandler);
  });
  modal.addEventListener('hidden.bs.modal', function () {
    document.removeEventListener('keydown', keyHandler);
  });
  function keyHandler(e) {
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'Escape') {
      const bsModal = bootstrap.Modal.getOrCreateInstance(modal);
      bsModal.hide();
    }
  }
});
