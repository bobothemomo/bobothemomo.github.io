// Select elements
const images = document.querySelectorAll('.image-clickable');
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeBtn = document.querySelector('.close');

// Use Bootstrap's modal API
let bsModal = null;
if (modal) {
  bsModal = new bootstrap.Modal(modal);
}

// Open the modal when any image is clicked
if (images && bsModal) {
  images.forEach(image => {
    image.onclick = function() {
      modalImg.src = this.src; // Set the modal image source
      bsModal.show();
    }
  });
}

// Close the modal when the close button is clicked 
if (closeBtn && bsModal) {
  closeBtn.onclick = function() {
    bsModal.hide();
  }
}

// No need for window.onclick handler, Bootstrap handles backdrop clicks
