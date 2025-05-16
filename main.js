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
  // Add overlay if not present
  if (!document.querySelector('.card-overlay')) {
    const overlay = document.createElement('div');
    overlay.className = 'card-overlay';
    document.body.appendChild(overlay);
  }
  const overlay = document.querySelector('.card-overlay');
  const cards = document.querySelectorAll('.expandable-card');
  let expandedCard = null;

  cards.forEach(card => {
    card.addEventListener('click', function(e) {
      // Prevent click on close button from toggling
      if (e.target.classList.contains('close-card-btn')) return;
      if (expandedCard && expandedCard !== card) {
        expandedCard.classList.remove('expanded-card');
        expandedCard.querySelector('.close-card-btn').style.display = 'none';
      }
      if (!card.classList.contains('expanded-card')) {
        card.classList.add('expanded-card');
        card.querySelector('.close-card-btn').style.display = 'block';
        overlay.classList.add('active');
        expandedCard = card;
      }
    });
    card.querySelector('.close-card-btn').addEventListener('click', function(e) {
      e.stopPropagation();
      card.classList.remove('expanded-card');
      this.style.display = 'none';
      overlay.classList.remove('active');
      expandedCard = null;
    });
  });
  overlay.addEventListener('click', function() {
    if (expandedCard) {
      expandedCard.classList.remove('expanded-card');
      expandedCard.querySelector('.close-card-btn').style.display = 'none';
      overlay.classList.remove('active');
      expandedCard = null;
    }
  });

  // --- Robust Modal Image Viewer ---
  const images = Array.from(document.querySelectorAll('.image-clickable'));
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const prevBtn = document.getElementById('prevImageBtn');
  const nextBtn = document.getElementById('nextImageBtn');
  const modalCaption = document.getElementById('modalImageCaption');
  let currentImageIndex = 0;

  function showImageModal(index) {
    if (!images[index]) return;
    currentImageIndex = index;
    modalImg.classList.remove('loaded');
    modalImg.src = images[index].src;
    modalImg.alt = images[index].alt;
    modalCaption.textContent = images[index].alt || '';
    if (typeof bootstrap !== 'undefined' && modal.classList.contains('modal')) {
      const bsModal = bootstrap.Modal.getOrCreateInstance(modal);
      bsModal.show();
    } else {
      modal.style.display = 'block';
    }
  }
  if (modalImg) {
    modalImg.onload = function() {
      modalImg.classList.add('loaded');
    };
    modalImg.onerror = function() {
      modalImg.src = 'https://via.placeholder.com/600x400?text=Image+not+found';
      modalCaption.textContent = 'Image not found';
    };
  }
  images.forEach((img, idx) => {
    img.addEventListener('click', function(e) {
      e.stopPropagation();
      showImageModal(idx);
    });
  });
  if (prevBtn) {
    prevBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      showImageModal((currentImageIndex - 1 + images.length) % images.length);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      showImageModal((currentImageIndex + 1) % images.length);
    });
  }
  // Keyboard navigation
  if (modal) {
    modal.addEventListener('shown.bs.modal', function () {
      document.addEventListener('keydown', modalKeyHandler);
    });
    modal.addEventListener('hidden.bs.modal', function () {
      document.removeEventListener('keydown', modalKeyHandler);
    });
  }
  function modalKeyHandler(e) {
    if (e.key === 'ArrowLeft') prevBtn && prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn && nextBtn.click();
    if (e.key === 'Escape' && typeof bootstrap !== 'undefined') {
      const bsModal = bootstrap.Modal.getOrCreateInstance(modal);
      bsModal.hide();
    }
  }
});
