document.addEventListener("DOMContentLoaded", function () {
    changeBackground();
    showRandomImages();
  });
  
  function changeBackground() {
    var colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8000', '#8000ff', '#0080ff', '#80ff00'];
    var randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;
  }
  
  function showRandomImages() {
    var imageContainer = document.getElementById('imageContainer');
    var images = ['skeleton.jpg', 'skeletonn.jpg', 'skeletonnn.jpg', 'skeletonnnn.jpg', 'skeletonnnnnn.jpg'];
  
    for (var i = 0; i < 1; i++) {
      var randomImage = images[Math.floor(Math.random() * images.length)];
      var imgElement = document.createElement('img');
      imgElement.src = randomImage;
      imageContainer.appendChild(imgElement);
    }
  }
  
  function toggleImages() {
    var imageContainer = document.getElementById('imageContainer');
    imageContainer.classList.toggle('show');
  }
  