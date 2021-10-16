const increaseButton = document.getElementById('increase-button');
const decreaseButton = document.getElementById('decrease-button');
const svg = document.getElementById('svg');

// ask user for SVG

var svgPath = prompt('Enter a 512x512 SVG Path!');

svg.innerHTML = svgPath;

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

// flatten(path,300);

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