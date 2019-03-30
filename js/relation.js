/*!
 * relation.js - v0.1
 * 2019.3.30
 * Author 桔子桑
 *
 * github：https://github.com/ecojust/Relation.js
 * relation.js is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */

let Application = PIXI.Application,
    Loader = PIXI.loader,
    Resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    Container = PIXI.Container,
    TextureCache = PIXI.utils.TextureCache;


export function PersonPanel(){
	const SPRITE = Symbol();
	const INITCONFIG = Symbol();
	var PersonPanel = {};
	PersonPanel.init = function(app,config){
	    var config = this[INITCONFIG](config); 
		var that = this;
		var position = {
			x:config.x||(window.innerWidth/2 - 32),
			y:config.y||(window.innerHeight/2 - 32)
		}
		var size = {
			width:config.width||64,
			height:config.height||64
		}
		var center = {
			x:(config.width||64)/2,
			y:(config.height||64)/2
		}
	    this[SPRITE] = new Container();
	    
	    
	    /*外围环*/
		var wrap = new Sprite.fromImage(config.frame||'images/circle.png');
		this.setSize(wrap,size);
	    /*头像*/
	    var icon = new Sprite.fromImage(config.icon.img||'images/icon.png');
	    var offset = {
	    	x:config.icon.offsetX||0,
	    	y:config.icon.offsetY||0
	    }
	    this.setSize(icon,size,0.6,offset);


	    this[SPRITE].addChild(wrap,icon);


	    this[SPRITE].style = size;
	    this[SPRITE].position = position;
	    app.stage.addChild(that[SPRITE]);
	    if(!window.stack){
	    	window.stack = [];
	    }
	    window.stack.push(that);
        return this;
	}
	PersonPanel[INITCONFIG] = function(config){
		var config = config?config:{
			width:null,
	      	height:null,
	      	icon:{
	      		img:null,
	      		offsetX:null,
	      		offsetY:null
	      	},
	      	x:null,
	      	y:null,
	      	texture:null
		};
		config.icon = config.icon?config.icon:{
      		img:null,
      		offsetX:null,
      		offsetY:null
      	};
	    return config;
	}
	PersonPanel.getSprite = function(){
		return this[SPRITE];
	}
	PersonPanel.moveTo = function(x,y){
		this.getSprite().position = {
			x:x,
			y:y
		}
	}
	PersonPanel.setSize = function(obj,size,percent,offset){
		obj.width = size.width * (percent||1);
		obj.height = size.height * (percent||1);
		obj.position = {
			x:percent?(1-percent)*size.width/2+offset.x||0:0,
			y:percent?(1-percent)*size.height/2+offset.y||0:0,
		}
	}
	PersonPanel.onClick = function(callback){
		var sprite = this.getSprite();
		sprite.interactive = true;
		sprite.mousedown = sprite.touchstart =function(data){
            // stop the default event...
            //data.originalEvent.preventDefault();
            //this.data = data;
            //this.alpha = 0.9;
            //this.dragging = true;
            //console.log(this);
            callback();
        }
	
	}
	return PersonPanel;
}

