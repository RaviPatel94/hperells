// Handle image upload from file input
function handleImageUpload(event) {
  const fileInput = event.target;
  if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
          if (event.target) {
              const imagePreview = document.querySelector('.upload-preview');
              const previewContainer = imagePreview.querySelector('.preview-container');
              const img = imagePreview.querySelector('.upload-img');
              const removeButton = imagePreview.querySelector('.remove-button');
              const uploadButton = imagePreview.querySelector('#upload-button');
              const cameraButton = imagePreview.querySelector('#open-camera');

              img.src = event.target.result;
              img.alt = 'Uploaded wardrobe';
              previewContainer.style.display = 'block';
              uploadButton.style.display = 'none';
              cameraButton.style.display = 'none';

              // Enable the remove button
              removeButton.onclick = function() {
                  img.src = '';
                  previewContainer.style.display = 'none';
                  uploadButton.style.display = 'block';
                  cameraButton.style.display = 'block';
              };
          }
      };
      reader.readAsDataURL(fileInput.files[0]);
  }
}

// Handle occasion input change
function setOccasion(event) {
  const occasionInput = event.target;
  const occasion = occasionInput.value;
  const getSuggestionsButton = document.getElementById('get-suggestions');
  const imagePreview = document.querySelector('.upload-preview');
  const hasImage = imagePreview.querySelector('.upload-img').src !== '';
  getSuggestionsButton.disabled = !hasImage || !occasion;
}

// Get outfit suggestions (placeholder function)
function getOutfitSuggestions() {
  const suggestionsText = document.getElementById('suggestions-text');
  suggestionsText.textContent = 'Click "Get Outfit Suggestions" to see AI recommendations';
}

// Open camera functionality
document.getElementById('open-camera').addEventListener('click', function() {
  const video = document.createElement('video');
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  // Request video stream from the user's device
  navigator.mediaDevices.getUserMedia({ video: true })
      .then(function(stream) {
          video.srcObject = stream;
          video.play();

          // Create a modal or overlay to display the video and capture button
          const modal = document.createElement('div');
          modal.className = 'modal';

          const container = document.createElement('div');
          container.className = 'modal-content';

          const captureButton = document.createElement('button');
          captureButton.className = 'modal-capture-button';
          captureButton.textContent = 'Capture';
          captureButton.style.marginTop = '10px';

          container.appendChild(video);
          container.appendChild(captureButton);
          modal.appendChild(container);

          document.body.appendChild(modal);

          captureButton.addEventListener('click', function() {
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
              context.drawImage(video, 0, 0, canvas.width, canvas.height);

              // Stop the video stream
              stream.getTracks().forEach(track => track.stop());

              // Remove the modal
              document.body.removeChild(modal);

              // Display the captured image in the upload preview
              const imagePreview = document.querySelector('.upload-preview');
              const previewContainer = imagePreview.querySelector('.preview-container');
              const img = imagePreview.querySelector('.upload-img');
              const removeButton = imagePreview.querySelector('.remove-button');
              const uploadButton = imagePreview.querySelector('#upload-button');
              const cameraButton = imagePreview.querySelector('#open-camera');

              img.src = canvas.toDataURL();
              img.alt = 'Captured wardrobe';
              previewContainer.style.display = 'block';
              uploadButton.style.display = 'none';
              cameraButton.style.display = 'none';

              // Enable the remove button
              removeButton.onclick = function() {
                  img.src = '';
                  previewContainer.style.display = 'none';
                  uploadButton.style.display = 'block';
                  cameraButton.style.display = 'block';
              };
          });
      })
      .catch(function(error) {
          console.error('Error accessing the camera:', error);
          alert('Unable to access the camera. Please check your device settings.');
      });
});

// Initialize the upload input to trigger the file dialog
document.getElementById('upload-button').addEventListener('click', function() {
  document.getElementById('wardrobe-upload').click();
});

// Handle file input change
document.getElementById('wardrobe-upload').addEventListener('change', handleImageUpload);