const increaseButton = document.getElementById('increase-button');
const decreaseButton = document.getElementById('decrease-button');
const pathButton = document.getElementById('upload-path')
const examplesButton = document.getElementById('examples')
const svg = document.getElementById('svg');

svg.innerHTML = '<path xmlns="http://www.w3.org/2000/svg" d="M62.3 18.5c-1.7.7-4.1 1.1-5.2.8-1.5-.4-2.1-.1-2.1 1.1 0 1.1-.4 1.4-1.2 1-2.1-1.3-11.1-.3-13.8 1.5-1.4.9-4.2 2.4-6.2 3.4-4 1.7-4.9 3.3-2.3 3.9 1.3.2.9 1.5-1.9 6-2.4 4.1-3 5.8-2 5.8.8 0 1.4-.4 1.4-1 0-.5.9-1.4 2-2 2.8-1.5 2.5 0-.8 3.6-8.9 9.8-13.3 20.2-14 33.1l-.4 9.3H7.9c-4.6 0-7.9.4-7.9 1 0 .7 22 1 64 1s64-.3 64-1c0-.6-.5-1-1.1-1-.6 0-1.9-1-2.9-2.3l-1.9-2.2.6 2.2c.3 1.4.1 2.3-.6 2.3-.6 0-1.2-.3-1.2-.8-.1-.4-.4-1.8-.6-3.2-.2-1.4-.4-3.5-.5-4.8 0-1.3-1.1-3.4-2.4-4.7-1.3-1.3-2.4-3.2-2.4-4.2.1-1.2.8-.6 2.1 1.7 1.5 2.7 1.9 2.9 1.4 1-.4-1.4-.7-3.3-.8-4.2-.1-.9-.4-1.5-.8-1.3-.9.6-2.8-4-3.5-8.8-.4-2.3-1.3-5-2.1-5.9-.8-.9-1.2-2.1-.9-2.6 1-1.6-9.7-11.9-13.2-12.6-2.3-.6-16.8-9-21.2-12.3-.2-.2.2-.8.9-1.3 1-.6-.1-1.3-3.9-2.4-6.4-1.9-6.6-1.9-10.7-.1zm20.3 13c3.2 1.6 8.2 5.5 12.5 9.8 7.4 7.6 12 15.2 20.4 34l4.3 9.7-2.5.6c-1.3.4-7.8.3-14.4-.1-11.3-.6-12-.8-15-3.6-2-1.8-4.2-2.9-6-2.9-3.2 0-3.9 1.7-1.1 2.7.9.4 2.3 1.3 3 2 1.1 1.1.6 1.3-2.8 1.3s-4.6-.6-6.7-3c-1.7-2.1-3.4-3-5.4-3-3.9 0-3.7 2.3.4 4.4l3.2 1.6h-4.2c-3.2 0-4.3-.4-4.3-1.5 0-.9-.6-2.8-1.4-4.4-.8-1.5-1.6-5.8-1.7-9.7-.1-3.8-1.1-10.7-2.1-15.3-1-4.7-1.8-8.6-1.8-8.7 0-.2.8-1 1.7-2 1.3-1.3 1.4-1.9.5-2.2-.6-.2-1.2-1-1.2-1.7 0-.8-.7-1.8-1.6-2.3-2.4-1.3-.5-4 4.7-6.9 5.7-3.1 13.6-2.7 21.5 1.2z M75 45.7c-6.7.4-9.3 1.6-8.8 4.1.2 1.3 2.6 1.6 13.5 1.7 10.4.1 13.7.5 15.7 1.8 2.9 2 3.6 2.1 3.6.7 0-.5-2.3-2.8-5.1-5-4.1-3.2-5.8-4-8.7-3.8-2.1.1-6.6.3-10.2.5zm-.9 10.9c-2.5 2.8-3.1 4.2-2.6 6.3 1.4 6.3 10.2 9.4 14.5 5.1 1.4-1.4 3.4-2 6.8-2 4.1-.1 4.5-.2 2.9-1.4-.9-.7-3.6-1.6-5.8-2-4.5-.7-8.9-3.2-8.9-5.1 0-.6-.8-2-1.9-2.9-1.7-1.6-2-1.5-5 2z"/>';

// flatten SVG

function flatten(path,num){
  var l = path.getTotalLength()
  var p = path.getPointAtLength(0)
  var d = `M${p.x} ${p.y}`
  for(var i = (l/num);i<=l;i+=(l/num)){
    p = path.getPointAtLength(i)
    d+=`L${p.x} ${p.y}`
  }
  path.setAttribute("d",d+"z")
};

const path = svg.children[0];

var initialPath = path.getAttribute('d');

function generateCoords(path) {
  const pathSegs = path.pathSegList;

  const input = [];

  for (let i = 0; i < pathSegs.length-1; i++) {
    const coords = pathSegs[i];
    
    var newArray = [];

    newArray[0] = coords.x;
    newArray[1] = coords.y;

    input.push(newArray);
  };

  return input;
};

const newPathCoords = generateCoords(path);

// scronch thing

function scronchArray(coordinates,num) {
  for (let i = 0; i < coordinates.length; i++) {
    const coords = coordinates[i];
    coordinates[i] = [coords[0] * num,coords[1] * (1/num)];
  };
  return coordinates;
};

// set new X and Y

function scronchSVG(num) {
  if (num == 0) return;

  const path = svg.children[0];

  flatten(path,300);

  const scronched = scronchArray(generateCoords(path),num);

  for (let i = 0; i < scronched.length; i++) {
    const coords = scronched[i];

    path.pathSegList[i].x = coords[0];
    path.pathSegList[i].y = coords[1];
  };
};

increaseButton.addEventListener('click',function () {
  scronchSVG(2);
}); 

decreaseButton.addEventListener('click',function () {
  scronchSVG(1/2);
}); 

pathButton.addEventListener('click',function () {
  var svgPath = prompt('Enter a 512x512 SVG Path!');

  svg.innerHTML = svgPath;
 }); 
 
examplesButton.addEventListener('click',function () {
  window.location.href = '#examples'
});