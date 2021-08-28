var canvas;
var ctx;
var imagen;
var anchoRecorte = 32;
var altoRecorte = 32;
var anchoBloque = 50;
var altoBloque = 50;
var tecla;
var refresco = 20; //20ms que es lo mismo que 1000/50FPS Frame per second
var heroe1;
var fantasma1;


//la variable tablero tiene la informacion de que imagen pegar en cada uno de los casilleros de la matriz de datos
var tablero = [
[1,1,1,1,1,1,1,1,1,1],
[1,0,0,0,0,1,0,1,1,1],
[1,0,0,0,0,1,0,2,1,1],
[1,0,0,1,0,1,0,1,1,1],
[1,0,1,1,0,0,0,0,0,1],
[1,0,1,1,0,1,0,0,0,1],
[1,0,1,1,1,1,0,0,0,1],
[1,1,1,1,1,1,1,1,1,1]
];

var heroe = function(x,y){
	this.x = x;
	this.y = y;
	
	this.dibuja = function(){
		imagen.onload = function(){console.log('ya se cargo');}
		ctx.drawImage(imagen,anchoRecorte*1,altoRecorte*1,anchoRecorte,altoRecorte,this.x*anchoBloque,this.y*altoBloque,anchoBloque,altoBloque);
	}
	
	this.mueveArriba = function(){
		if (1!=tablero[this.y-1][this.x]){
			this.y--;
		}
	}
	
	this.mueveAbajo = function(){
		if (1!=tablero[this.y+1][this.x]){
			this.y++;
		}
	}
	this.mueveIzquierda = function(){
		if (1!=tablero[this.y][this.x-1]){
			this.x--;
		}
	}
	this.mueveDerecha = function(){
		if (1!=tablero[this.y][this.x+1]){
			this.x++;
		}
	}
	
	this.colisionEnemigo = function(a,b){
		if (this.x == a && this.y == b){
			return true;
		}else{
			return false;
		}
	}
	
	this.gana = function(){
		if (this.x == 7 && this.y == 2){
			alert('Ganaste!!');
			inicializar();
		}
		
	}
}

var fantasma = function(x,y){
	//estas variables solo se llaman cuando se construye el objeto y su valor no vuelve a cambiar si no se hace explicitamente
	this.x = x;
	this.y = y;
	this.retraso = 50;
	this.cuenta;
			
	this.dibuja = function(){
		imagen.onload = function(){console.log('ya se cargo');}
		ctx.drawImage(imagen,anchoRecorte*0,altoRecorte*1,anchoRecorte,altoRecorte,this.x*anchoBloque,this.y*altoBloque,anchoBloque,altoBloque);
	}
	
	this.mueve = function(){
		
		if (heroe1.colisionEnemigo(this.x,this.y)){
			alert('Muerto');
			inicializar();
		};
				
		if (this.cuenta<this.retraso){
			this.cuenta++;
		}else{
			this.direccion = Math.floor(Math.random()*4);
			this.cuenta=0;
			switch (this.direccion){
				case 0:
					if (1!=tablero[this.y-1][this.x]){
						this.y--;
					}
				break;
				
				case 1:
					if (1!=tablero[this.y+1][this.x]){
						this.y++;
					}
				break;
			
				case 2:
					if (1!=tablero[this.y][this.x-1]){
						this.x--;
					}
				break;
			
				case 3:
					if (1!=tablero[this.y][this.x+1]){
						this.x++;
					}
				break;		
			}
			
	}
		
		
		
	}
	

}


function inicializar(){
	//Hago referencia al id en HTML
	canvas = document.getElementById('canvas');
	//Configuro el canvas 	
	ctx = canvas.getContext('2d');
	//Creo objeto imagen
	imagen = new Image();	
	//cargo la imagen
	imagen.src = ('img/tilemap.png');
	// imagen.onload = function(){...ctx.drawImage....}	//muestro la imagen cuando se termine de cargar
	
	imagen.onload = function(){
		console.log('ya se cargo la imagen');
	}

	heroe1 = new heroe(1,1);
	fantasma1 = new fantasma(2,2);
	fantasma2 = new fantasma(6,5);
	
	setInterval(function(){  //es una funcion flecha;
			principal(),refresco
			});
	
	
}

//esta es la funcion que borra el canvas, solo se necesita para eso setear las dimensiones del canvas, aunque sean las mismas
function borraCanvas(){
	canvas.width = 500;
	canvas.height = 400;
}

//esta es una funcion flacha? que se ejecuta cuando alguien apreta una tecla, dentro tiene una funcion
document.addEventListener('keydown',function(tecla){
	
	
	switch (tecla.keyCode){
		case 38:
			heroe1.mueveArriba();
		break;
		
		case 40:
			heroe1.mueveAbajo();
		break;
		
		case 37:
			heroe1.mueveIzquierda();
		break;
		
		case 39:
			heroe1.mueveDerecha();
		break;
	}
	
}); 

function dibujaTablero(){
//con la funcion for de x e y voy imprimiendo en pantalla un recorte previamente seleccionado, la seleccion del recorte se debe hacer con la matriz tablero
		for(x=0;x<10;x++){
			for(y=0;y<8;y++){
				switch(tablero[y][x]){
					case 0: ctx.drawImage(imagen,anchoRecorte*2,0,anchoRecorte,altoRecorte,x*anchoBloque,y*altoBloque,anchoBloque,altoBloque);   //void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
					break;
					case 1: ctx.drawImage(imagen,anchoRecorte*0,0,anchoRecorte,altoRecorte,x*anchoBloque,y*altoBloque,anchoBloque,altoBloque);   //void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
					break;
					case 2: ctx.drawImage(imagen,anchoRecorte*1,0,anchoRecorte,altoRecorte,x*anchoBloque,y*altoBloque,anchoBloque,altoBloque);   //void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
					break;
				}
			}
		}
		
}


function principal(){
	//borraCanvas();
	dibujaTablero();
	heroe1.dibuja();
	fantasma1.mueve();
	fantasma1.dibuja();
	fantasma2.mueve();
	fantasma2.dibuja();
	heroe1.gana();
}