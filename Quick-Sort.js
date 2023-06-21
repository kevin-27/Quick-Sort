//Quick Sort
//Kevin P. Mulcahy

let data = [];
let swapCounter = 0;
let comparCounter = 0;

function setup() 
{
  //Center the canvas
  let W = windowWidth; //1080;
  let H = windowHeight; //720;
  let centerW = windowWidth/2-W/2;
  let centerH = windowHeight/2-H/2;
  
  let cnv = createCanvas(W, H);
  cnv.position(centerW, centerH);
  
  //Create Slider and Button
  speedCtrl = createSlider(1, 100, 100);
  speedCtrl.position(centerW + 20, centerH + 20);
  
  button = createButton('Reset');
  button.position(centerW + 200, centerH + 20);
  button.mousePressed(ResetData);
  
  //Create data to sort
  for (let i = 0; i < width/10; i++)
  {
    let num = random(5, 600);
    data[i] = new Block(0 + i*10, height - num, 10, num);
  }
  
  Sort1(0, data.length-1);
  //Sort2(0, data.length-1);
}

function ResetData()
{
  for (let i = 0; i < width/10; i++)
  {
    let num = random(5, 600);
    data[i].h = num;
    data[i].y = height - num;
  }
  swapCounter = 0;
  comparCounter = 0;
  Sort1(0, data.length-1);
}

async function Sort1(start, end)
{
  if (start >= end)
    return;
    
  let index = await Partition(start, end);
  
  await Promise.all([
    Sort1(start, index-1), 
    Sort1(index+1, end) ]);
  
  //await Sort1(start, index-1);
  //await Sort1(index+1, end);
}

function Sort2(start, end)
{
  //let index = Partition(start, end);
  //Partition(start, index-1);  
  //Partition(index+1, end);
}

async function Partition(start, end)
{
  let pIndex = start;
  let pValue = data[end].h;
  
  for (let i = start; i < end; i++)
  {
    comparCounter++;
    if (data[i].h < pValue)
      {
        await Swap(i, pIndex);
        pIndex++;
      }
  }
  
  await Swap(pIndex, end);  
  return pIndex;  
}

function draw() 
{
  background(0);
  
  textSize(16);
  fill(255);
  text('Swaps - ' + swapCounter, 20, 75);
  text('Comparisons  - ' + comparCounter, 20, 100);
  
  //Render the data Blocks
  for (let i = 0; i < data.length; i++) 
    data[i].render();
}

async function Swap(a, b)
{
  await sleep(speedCtrl.value());
  //await sleep(100);
  swapCounter++;
  
  let tempH = data[a].h;
  data[a].h = data[b].h;
  data[b].h = tempH;

  let tempY = data[a].y;
  data[a].y = data[b].y;
  data[b].y = tempY;
}

class Block
{  
  constructor(x, y, w, h) 
  {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  
  render()
  {
    rect(this.x, this.y, this.w, this.h);
  }
}

function sleep(ms)
{
  return new Promise(resolve => setTimeout(resolve, ms));
}
