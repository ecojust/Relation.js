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
	const PERSONPANEL = Symbol();
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
		this.size =size;
		this.position = position;
		var center = {
			x:(config.width||64)/2,
			y:(config.height||64)/2
		}
	    this[PERSONPANEL] = new Container();
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


	    this[PERSONPANEL].addChild(wrap,icon);
	    this[PERSONPANEL].style = size;
	    this[PERSONPANEL].position = position;
	    app.stage.addChild(that[PERSONPANEL]);
	    if(config.openMove){
			this.openMove = true;
			this.mouseDown();
			this.mouseUp();
			this.mouseMove();
		}else{
			this.openMove = false;
		}
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
	      	texture:null,
	      	openMove:false
		};
		config.icon = config.icon?config.icon:{
      		img:null,
      		offsetX:null,
      		offsetY:null
      	};
	    return config;
	}
	PersonPanel.getPersonPanel = function(){
		return this[PERSONPANEL];
	}
	PersonPanel.moveTo = function(x,y){
		var centerx = x-(this.size.width/2);
		var centery = y-(this.size.height/2);
		this.getPersonPanel().position = {
			x:centerx>0?(centerx>window.innerWidth-this.size.width?window.innerWidth-this.size.width:centerx):0,
			y:centery>0?(centery>window.innerHeight-this.size.height?window.innerHeight-this.size.height:centery):0,
		}
		this.position = {
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
	PersonPanel.mouseDown = function(callback){
		var personPanel = this.getPersonPanel();
		personPanel.interactive = true;
		if(this.openMove){
			personPanel.mousedown = personPanel.touchstart =function(data){
				this.dragging = true;
	            this.alpha = 0.6;
	            if(callback){
	            	callback();
	            }
	        }
		}
	}
	PersonPanel.mouseUp = function(callback){
		var personPanel = this.getPersonPanel();
		if(this.openMove){
			personPanel.mouseup = personPanel.mouseupoutside = personPanel.touchend = function(data){
	            this.alpha = 1
	            this.dragging = false;
	            if(callback){
	            	callback();
	            }
	        };
		}	
	}
	PersonPanel.mouseMove = function(callback){
		var personPanel = this.getPersonPanel();
		var that = this;
		if(this.openMove){
			personPanel.mousemove = personPanel.touchmove = function(data){
	            if(this.dragging){
	            	var evevt = event||window.event;
	            	var x = event.clientX>0?event.clientX:0;
	            	var y = event.clientY>0?event.clientY:0;
	            	that.moveTo(x,y);
	                //console.log(that.position);
	                if(callback){
		            	callback();
		            }
	            }
	        }
		}
	}
	return PersonPanel;
}

