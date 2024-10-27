let textLines = [];
let index = 0;
let wordSize = 32;
let wordColor;
let isGrowing = true;
let interval = 2000; // 2 seconds interval for each line
let lastChangeTime = 0;
let bgImage; // Background image variable

// Words to highlight in pink
let pinkWords = ["I", "you", "me", "love"];

function preload() {
  // Load text from the file using loadStrings
  textLines = loadStrings("love story.txt");
  // Load the background image
  bgImage = loadImage("rose.png"); // Replace with your image filename
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  wordColor = color(255); // Default to white color
}

function draw() {
  background(0);
  // Set the transparency of the background image (0 is fully transparent, 255 is fully opaque)
  tint(255, 100); // Adjust second parameter to change transparency (150 is semi-transparent)

  image(bgImage, 0, 0, width, height); // Display background image, scaled to fit the canvas

  if (textLines.length > 0) {
    // Split the current line into words
    let words = textLines[index].split(" ");

    // Display each word with color, size, and position
    for (let i = 0; i < words.length; i++) {
      // Calculate position for each word
      let posX = width / 2 + (i - words.length / 2) * 100; // Increased spacing
      let posY = height / 2;

      // Check if the word is in the pinkWords list
      if (pinkWords.includes(words[i])) {
        fill(255, 105, 180); // Pink color

        // Make "love" larger
        if (words[i] === "love") {
          textSize(wordSize + 20); // Increase size specifically for "love"
        } else {
          textSize(wordSize + 10); // Slightly larger for other pink words
        }
      } else {
        fill(wordColor); // Default color (white)
        textSize(wordSize); // Default size
      }

      // Display the word
      text(words[i], posX, posY);
    }
  }

  // Pulse animation for the text size
  if (isGrowing) {
    wordSize += 0.5;
    if (wordSize > 100) isGrowing = false;
  } else {
    wordSize -= 0.5;
    if (wordSize < 32) isGrowing = true;
  }

  // Change default color slightly to create a lively effect
  wordColor = color(random(150, 255));

  // Change to the next line every 2 seconds
  if (millis() - lastChangeTime > interval && textLines.length > 0) {
    index = (index + 1) % textLines.length; // Loop through lines
    lastChangeTime = millis(); // Reset timer
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Adjust canvas on window resize
}
