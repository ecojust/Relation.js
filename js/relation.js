// //新建一个pixo的实例，并加以配置
// let app = new PIXI.Application({width: 256, height: 256});
// app.renderer.backgroundColor = 0x061639;
// app.renderer.view.style.position = "absolute";
// app.renderer.view.style.display = "block";
// app.renderer.autoResize = true;
// app.renderer.resize(window.innerWidth, window.innerHeight);
// //将该实例append到页面中用于展示
// document.body.appendChild(app.view);

let renderer = PIXI.autoDetectRenderer(
  256, 256,
  { antialias: true, transparent: false, resolution: 1 }
);
renderer.backgroundColor = 0x061639;
renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;
renderer.resize(window.innerWidth, 8000);
document.body.appendChild(renderer.view);

var stage = new PIXI.Container();




//全局定义常用的pixi常量和方法
let Application = PIXI.Application,
    Loader = PIXI.loader,
    Resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    Container = PIXI.Container,
    Graphics = PIXI.Graphics,
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

var data = {
	name:'桔子桑',
	gender:'male',
	img:'',
	relations:[
		{
			name:'桔子桑',
			gender:'male',
			img:'',
		},
		{
			name:'桔子桑',
			gender:'male',
			img:'',
		},
		{
			name:'桔子桑',
			gender:'male',
			img:'',
		},
		{
			name:'桔子桑',
			gender:'male',
			img:'',
		},
		{
			name:'桔子桑',
			gender:'male',
			img:'',
		}
	]
};



//setup();
Loader.add('wrap',"images/wrap.png").load(setup);
function setup() {
    //利用orange图片贴图生成精灵
    for (var i = 0; i < 6000; i++) {
  //   	let circle = new PIXI.Graphics();
		// circle.beginFill(0x9966FF);
		// circle.drawCircle(0, 0, 10);
		// circle.endFill();
		// circle.x = (i%50)*20+10;
		// circle.y = ~~(i/50)*20 + 10;
		var circle = new PIXI.Sprite(TextureCache["wrap"]);
		circle.width = 32;
		circle.height = 32;
		circle.x = (i%36)*36;
		circle.y = ~~(i/36)*36 + 20;
		stage.addChild(circle);
    }
    
	renderer.render(stage);

    //将精灵实例组添加到场景
    //stage.addChild(circle);
    
}
