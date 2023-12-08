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
    var images = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg', 'image6.jpg', 'image7.jpg', 'image8.jpg', 'image9.jpg', 'image10.jpg'];
  
    for (var i = 0; i < 3; i++) {
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
  