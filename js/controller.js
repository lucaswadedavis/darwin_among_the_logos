var controller={

initBounds:function(){
	model.bounds={
		bottom:window.innerHeight,
		right:window.innerWidth,
		top:0,
		left:0
		}
	},

initPaper:function(){
	model.paper=Raphael(model.bounds.left,model.bounds.top,model.bounds.right,model.bounds.bottom);
	},

save:function(){
	store.set(model.appName,model);
	console.log("model saved!");
	console.log(store.get(model.appName));
	},
	
load: function(){
	if (!store.get(model.appName)){
		controller.save();
		console.log("new model saved!");
		console.log(store.get(model.appName));
		}
	else {
		model=store.get(model.appName);
		console.log("model retrieved!");
		console.log(model);
		}
	}
};
