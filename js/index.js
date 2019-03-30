
//新建一个pixi的实例，并加以配置
let app = new PIXI.Application({width: 256, height: 256});
app.renderer.backgroundColor = 0x061639;
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);
//将该实例append到页面中用于展示
document.body.appendChild(app.view);



//全局定义常用的pixi常量和方法
let Application = PIXI.Application,
    Loader = PIXI.loader,
    Resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    Container = PIXI.Container,
    TextureCache = PIXI.utils.TextureCache;


PIXI.hitTestRectangle = function (r1, r2) {

  //Define the variables we'll need to calculate
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

  //hit will determine whether there's a collision
  hit = false;

  //Find the center points of each sprite
  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;

  //Find the half-widths and half-heights of each sprite
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  //Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {

    //A collision might be occuring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {

      //There's definitely a collision happening
      hit = true;
    } else {

      //There's no collision on the y axis
      hit = false;
    }
  } else {

    //There's no collision on the x axis
    hit = false;
  }

  //`hit` will be either `true` or `false`
  return hit;
};


Loader.add('wrap',"images/circle.png").load(setup);
function setup() {
    //利用orange图片贴图生成精灵
    var sprite = new Sprite(TextureCache["wrap"]);
    sprite.width = 64;
    sprite.height = 64;
    sprite.x = window.innerWidth/2 - 32;
    sprite.y = window.innerHeight/2 - 32;

    var a = new PersonPanel().init();
    app.stage.addChild(a);
    //为pixi循环添加事件队列
    //app.ticker.add(gameLoop);
    // for (var i = 0; i < 1000; i++) {
    //   var size = 48;
    //   var padding = 20;
    //   var circle = new PIXI.Sprite(TextureCache["wrap"]);
    //   circle.width = size;
    //   circle.height = size;
    //   circle.x = (i%18)*(size+4) + padding;
    //   circle.y = ~~(i/18)*(size+4) + padding;
    //   app.stage.addChild(circle);
    // }
}

function gameLoop(){

  sprite.x += sprite.vx;
  sprite.y += sprite.vy;
  //console.log(PIXI.hitTestRectangle(sprite,sprite1));
  if(PIXI.hitTestRectangle(sprite,sprite1)){
    console.log('撞到啦~~~~~')
  }
}


function keyboard(keyCode) {
  let key = {
    code : keyCode,
    isDown : false,
    isUp : true,
    press : undefined,
    release : undefined
  };
  
  //The `downHandler`
  key.downHandler = event => {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = event => {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}

let left = keyboard(37),
    up = keyboard(38),
    right = keyboard(39),
    down = keyboard(40);

left.press = () => {
    sprite.vx = -5;
    sprite.vy = 0;
  };
left.release = () => {
  if (!right.isDown && sprite.vy === 0) {
    sprite.vx = 0;
  }
};

right.press = () => {
    sprite.vx = 5;
    sprite.vy = 0;
  };
right.release = () => {
  if (!left.isDown && sprite.vy === 0) {
    sprite.vx = 0;
  }
};


up.press = () => {
    sprite.vx = 0;
    sprite.vy = -5;
  };
up.release = () => {
  if (!down.isDown && sprite.vx === 0) {
    sprite.vy = 0;
  }
};
down.press = () => {
    sprite.vx = 0;
    sprite.vy = 5;
  };
down.release = () => {
  if (!up.isDown && sprite.vx === 0) {
    sprite.vy = 0;
  }
};