
let Application = PIXI.Application,
    Loader = PIXI.loader,
    Resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    Container = PIXI.Container,
    TextureCache = PIXI.utils.TextureCache;


export function PersonPanel(){
	var PersonPanel = {
		sprite:undefined,
	};
	PersonPanel.init = function(app,config){
		var that = this;
		var panel;
		if(!config.texture){
			panel = "images/circle.png";
		}else{
			panel = texture;
		}
		this.sprite = new PIXI.Sprite.fromImage(panel);
	    this.sprite.width = config.width||64;
	    this.sprite.height = config.height||64;
	    this.sprite.x = config.x||(window.innerWidth/2 - 32);
	    this.sprite.y = config.y||(window.innerHeight/2 - 32);
	    app.stage.addChild(that.sprite);
        return this;
	}
	return PersonPanel;
	
}