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
	var PersonPanel = {};
	PersonPanel.init = function(app,config){
		var that = this;
		var panel = config.texture||'images/circle.png';
		this[SPRITE] = new Sprite.fromImage(panel);
	    this[SPRITE].width = config.width||64;
	    this[SPRITE].height = config.height||64;
	    this[SPRITE].x = config.x||(window.innerWidth/2 - 32);
	    this[SPRITE].y = config.y||(window.innerHeight/2 - 32);
	    app.stage.addChild(that[SPRITE]);
        return this;
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
	return PersonPanel;
}

