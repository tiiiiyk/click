let isRecording = false; // Variable to keep track of whether recording is enabled
let firstTapSkipped = false; // Flag to skip the first tap

// Snowflakes generation function
function createSnowflakes() {
  let numberOfSnowflakes = 50; // Number of snowflakes
  for (let i = 0; i < numberOfSnowflakes; i++) {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.textContent = '❄'; // Snowflake symbol
    snowflake.style.left = `${Math.random() * 100}%`;
    snowflake.style.animationDuration = `${Math.random() * 10 + 5}s`; // Random duration
    snowflake.style.animationDelay = `${Math.random() * 5}s`; // Random delay

    document.getElementById('snow-container').appendChild(snowflake);
  }
}

// Start recording function
function startRecording() {
  isRecording = true;
  firstTapSkipped = false; // Reset the flag each time recording starts
  document.getElementById('startBtn').disabled = true;
  document.getElementById('stopBtn').disabled = false;
  document.getElementById('clearBtn').disabled = true; // Disable Clear Records button while recording
  console.log('Recording started');
  applyButtonEffect(document.getElementById('startBtn'));
}

// Stop recording function
function stopRecording() {
  isRecording = false;
  document.getElementById('startBtn').disabled = false;
  document.getElementById('stopBtn').disabled = true;
  document.getElementById('clearBtn').disabled = false; // Enable Clear Records button when recording stops
  console.log('Recording stopped');
  applyButtonEffect(document.getElementById('stopBtn'));
}

// Clear all recorded taps
function clearRecords() {
  const tapCoordinatesList = document.getElementById('tapCoordinates');
  tapCoordinatesList.innerHTML = ''; // Remove all list items
  console.log('All records cleared');
  applyButtonEffect(document.getElementById('clearBtn'));
}

// Apply a nice button effect (scale animation)
function applyButtonEffect(button) {
  button.classList.add('clicked');
  setTimeout(() => button.classList.remove('clicked'), 300); // Remove effect after 300ms
}

// Delete specific tap record
function deleteRecord(button) {
  const listItem = button.parentElement; // Get the parent list item
  listItem.remove(); // Remove the list item from the DOM
  console.log('Record deleted');
}

// Add event listener for tap area to record taps when recording is enabled
document.getElementById('tapArea').addEventListener('click', function(event) {
  if (event.target.classList.contains('deleteBtn')) {
    return; // Do nothing if the delete button is clicked
  }

  if (isRecording && !firstTapSkipped) {
    firstTapSkipped = true; // Skip the first tap
    return; // Don't record the first tap
  }

  if (isRecording) {
    // Get the coordinates of the tap relative to the viewport
    const tapX = event.clientX;
    const tapY = event.clientY;

    // Create a new list item to display the tap coordinates
    const listItem = document.createElement('li');
    listItem.innerHTML = `X: <span>${tapX}</span>, Y: <span>${tapY}</span>`;

    // Create the delete button for each tap
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('deleteBtn');
    deleteButton.addEventListener('click', function() {
      deleteRecord(deleteButton);
    });

    // Append the delete button to the list item
    listItem.appendChild(deleteButton);

    // Append the new list item to the tap coordinates list
    document.getElementById('tapCoordinates').appendChild(listItem);
  }
});

// Add event listeners to the buttons to start, stop recording, and clear records
document.getElementById('startBtn').addEventListener('click', startRecording);
document.getElementById('stopBtn').addEventListener('click', stopRecording);
document.getElementById('clearBtn').addEventListener('click', clearRecords);

// Start the snow effect
createSnowflakes();
