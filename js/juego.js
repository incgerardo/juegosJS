var canvas;
var ctx;
var FPS = 50;
var limiteX = 500;
var limiteY = 400;
var perAncho = 50;
var perAlto = 50;
var vel;
var img;
var tecla;
var velocidad = 5;

var personaje = function(x,y){
	this.x = x;
	this.y = y;
	this.dirDerecha = true;
		
	this.dibuja = function(){
		ctx.fillStyle = '#FF0000';
		ctx.fillRect(this.x,this.y,perAncho,perAlto);
	}
	
	this.texto = function(){
		ctx.font = '30px impact';
		ctx.fillStyle ='#555555';
		ctx.fillText('X: ' + this.x, 100,100);
	}
	
	this.dibujaPers = function(){
		ctx.drawImage(img,this.x,this.y);
	}
			
	this.mueve = function(vel){
		
		if (this.x>=(limiteX-perAncho)) {
			this.dirDerecha=false;
		}else if (this.x<=0) {
			this.dirDerecha=true;
		}
		
		if (this.dirDerecha==true){
			this.x+= vel;
		}else{
			this.x-= vel;
		}
	}
	
	this.arriba = function(){
		this.y -= velocidad;
	}
	
	this.abajo = function(){
		this.y += velocidad;
	}
	
	this.izquierda = function(){
		this.x -= velocidad;
	}
	
	this.derecha = function(){
		this.x += velocidad;
	}
}

var per1 = new personaje(10,10);
var per2 = new personaje(10,70);
var per3 = new personaje(10,130);
var per4 = new personaje(10,170);
var texto1 = new personaje(300,300);

function inicializar(){
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	img = new Image();
	img.src = "img/personaje1.png";
	img.onload = function(){
		ctx.drawImage(img, 10, 10);
	}
		
	setInterval(function(){
		principal();
		},1000/FPS);
}

function borraCanvas(){
	canvas.width = limiteX;
	canvas.height = limiteY;
}


document.addEventListener('keydown', function(tecla){
	
	//console.log(tecla.keyCode);
	if(tecla.keyCode == 38){
		per4.arriba();
	}

	if(tecla.keyCode == 40){
		per4.abajo();
	}
	
	if(tecla.keyCode == 37){
		per4.izquierda();
	}
	
	if(tecla.keyCode == 39){
		per4.derecha();
	}
});


function principal(){
	borraCanvas();
	per1.dibuja();
	per2.dibuja();
	per3.dibuja();
	per4.dibujaPers();
	texto1.texto();
	
	per1.mueve(2);
	per2.mueve(4);
	per3.mueve(8);
	
	//per4.mueve(2);
}


