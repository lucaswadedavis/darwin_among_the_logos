$(document).ready(function() {
controller.initBounds();
controller.initPaper();
view.init();
});

view={

	listeners:function(){
	$("body").click(function(event){
		var x=event.pageX;
		var y=event.pageY;
		model.x=x;
		model.y=y;
		var circle=model.paper.circle(x,y,0).attr({'stroke':"white",'stroke-width':3});
		circle.animate({"r":100,"opacity":0},500,function(){
			eve("orbital");
			this.remove();
			});
		});

	},

	

	orbital:function(x,y,r,n,color,pencil){
	if (!x){x=model.bounds.right/2;}
	if (!y){y=model.bounds.bottom/2;}
	if (!r){r=model.bounds.bottom/3;}
	if (!n){n=10;}
	if (!pencil){pencil=1;}
	if (!color){color="#FFF";}
	var set=[];
	
	for (var i=0;i<n;i++){
		var theta1=_.random(180);
		var theta2=theta1+(18*_.random(1,20));
		var w=(0.1*r)*_.random(1,4);
	
		var arcPath=geo.arcPath(x,y,r,theta1,theta2,w);
		var circle=model.paper.path(arcPath)
			.attr({"fill":color,"opacity":0.1})
		set.push(circle);
		}
	return set;
	},

	init:function(){
	var fonts=["Arial","Helvetica","Garamond","Verdana","OCR","Courier New"];
	var fontSize=_.random(100,200);
	var fontColor=[davis.randomColor(),"#000","#fff"];
	fontColor=davis.pick(fontColor);
	var fontFamily=davis.pick(fonts);
	var title=["Dev Club","dev club","DEV CLUB","dev(club)","dev.club()","devClub()"];
	title=davis.pick(title);
	var text=model.paper.text(model.bounds.right/2,model.bounds.bottom/2,title)
		.attr({"font-size":fontSize,"fill":fontColor,"font-family":fontFamily,"stroke":"#999"});
	var bBox=text.getBBox();
	var paddingX=_.random(10,200);
	var paddingY=_.random(10,200);
	var x=bBox.x-paddingX;
	var w=bBox.width+(2*paddingX);
	var y=bBox.y-paddingY;
	var h=bBox.height+(2*paddingY);

	var border=_.random(20);
	var backfield=model.paper.rect(x,y,w,h).attr({fill:davis.randomColor(),"stroke-width":border}).toBack();
	var backfieldBorder=model.paper.rect(x,y,w,h).attr({"stroke-width":border}).toFront();

	var barBoldness=_.random(bBox.height);
	var centerBarColor=davis.pick([fontColor,"#000","#fff",davis.randomColor()]);
	var centerBarOpacity=0.1*(0,10)
	var centerBar=model.paper.rect(x,(y+barBoldness),w,(h-(2*barBoldness))).attr({fill:centerBarColor,"stroke-width":0,"opacity":centerBarOpacity});

	var numberOfOrbitals=5;
	var pencil=_.random(1,5);
	for (var i=0;i<numberOfOrbitals;i++){	
		var orbitalX=model.bounds.right/2;
		//var orbitalY=_.random(y,(y+h));
		var orbitalY=model.bounds.bottom/2;
		var orbitalR=10+(i*_.random(20,70));
		console.log(orbitalR);
		var orbitalSet=view.orbital(orbitalX,orbitalY,orbitalR,5,fontColor,pencil);
		}
	text.toFront();
	backfieldBorder.toFront();
	}

};

geo={};

geo.getPoint=function(x,y,r,theta){
	theta+=90;
	theta=theta*(Math.PI/180);
	var x2=x+(r*Math.sin(theta));
	var y2=y+(r*Math.cos(theta));
	var circle={x1:x,y1:y,r:r,x2:x2,y2:y2};
	return circle;
	};

geo.arcPath=function(x,y,r,theta1,theta2,w){
	var f1=0;
	var f2=0;
	var f3=0;
	var f4=1;
	if ((theta2-theta1)>180){
		f1=1;
		f3=1;
		}
	
	var arcPath="";
	arcPath+="M "+geo.getPoint(x,y,r,theta1).x2+" "+geo.getPoint(x,y,r,theta1).y2;
	arcPath+=" A "+r+" "+r+" "+(theta2-theta1)+" "+f1+" "+f2+" "+geo.getPoint(x,y,r,theta2).x2+" "+geo.getPoint(x,y,r,theta2).y2;
	arcPath+=" L "+geo.getPoint(x,y,(r-w),theta2).x2+" "+geo.getPoint(x,y,(r-w),theta2).y2;
	arcPath+=" A "+(r-w)+" "+(r-w)+" "+(theta2-theta1)+" "+f3+" "+f4+" "+geo.getPoint(x,y,(r-w),theta1).x2+" "+geo.getPoint(x,y,(r-w),theta1).y2;
	arcPath+=" Z";
	return arcPath;
	};


