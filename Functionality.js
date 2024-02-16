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
