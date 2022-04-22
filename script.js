// We're going to write code that will do 3 things:
//  1) It will create a canvas with a random background
//  2) It will draw a requested number on this canvas
//  3) It will download this image onto the users computer

let generateRandomCanvas = (canvas_height, canvas_width) => {
  // Javascript plays very well with HTML
  // and websites. This line of code creates a
  // [canvas] element on the website that includes
  // this script file
  let canvas = document.createElement('canvas')

  // We will set the width and height to be the values
  // that were passed into the function
  canvas.width = canvas_width
  canvas.height = canvas_height

  // We can choose to set the background as an image or
  // what we do here is randomly fill the background with
  // rectangles.
  let context = canvas.getContext("2d")
  context.fillStyle = "blue";

  // Lets fill 5x5 rectangles at random positions in the canvas
  let rectangle_width = 5
  let rectangle_height = 5
  let NUM_BOXES_TO_DRAW = 1200;
  for (let i = 0; i < NUM_BOXES_TO_DRAW; i++) {
    let x = Math.floor(Math.random() * canvas_width)
    let y = Math.floor(Math.random() * canvas_height)
    context.fillRect(x, y, rectangle_width, rectangle_height)
  }

  // Give back our original canvas
  return canvas
}

let textOnCanvas = (text, fontSize, canvas) => {
  // Getting 2D context tells JS that we want
  // to read coordinates in our canvas with
  // 2D points not doing anything fancy.
  let context = canvas.getContext("2d")

  // Just some text styling to make our text
  // look pretty
  context.font = `${fontSize}courier monospace`
  context.fillStyle = "black"
  context.textAlign = "center";
  context.textBaseline = "middle"

  // Lets draw the text right in the center of the image
  context.fillText(text, canvas.width / 2, canvas.height / 2)
  return canvas
}

let downloadCanvas = (canvas, filename) => {
  let image = canvas.toDataURL();
  let downloadLink = document.createElement('a')
  downloadLink.download = filename
  downloadLink.href = image

  downloadLink.click()
}

let NUM_IMAGES_TO_GENERATE = 20
for (let i = 0; i < NUM_IMAGES_TO_GENERATE; i++) {
  let randomBackground = generateRandomCanvas(1080, 1080)
  let canvasWithText = textOnCanvas(`${i}`, 200, randomBackground)
  downloadCanvas(canvasWithText, `samir_number_${i}.png`)
}
