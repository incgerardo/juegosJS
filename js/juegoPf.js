var canvas;
var ctx;
var imagen;
var personaje1;

var tablero = [	[1,1,1,1,1,1,1,1,1,1],
				[1,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,1],
				[1,0,1,1,0,0,0,0,1,1],
				[1,0,0,0,0,0,0,1,1,1],
				[1,0,0,0,0,0,0,0,0,1],
				[1,1,1,1,0,0,0,0,0,1],
				[1,0,0,0,0,0,1,0,1,1],
				[1,1,1,1,1,1,1,1,1,1],
];

var personaje = function(x,y){
	
	this.x = x;
	this.y = y;
	
	this.vx = 0;
	this.vy = 0;
	
	this.gravedad = 0.1;
	this.rozamiento = 10;
	
	this.salto = 5;
	this.velocidad = 2;
	
	this.vMax = 3;
	
	this.suelo = false;
	this.colisionDerecha = false;
	this.colisionIzquierda = false;
	this.techo = false;
	
	this.pulsaDerecha = false;
	this.pulsaIzquiera = false;
	
	this.pulsaTeclaDerecha = function(){
		this.pulsaDerecha = true;
		//console.log("pulsaDerecha");
	}
	
	this.sueltaTeclaDerecha = function(){
		this.pulsaDerecha = false;
		//console.log("sueltaderecha");
	}
	
	this.pulsaTeclaIzquierda = function(){
		this.pulsaIzquiera = true;
		//console.log("pulsaIzquierda");
	}
	
	this.sueltaTeclaIzquierda = function(){
		this.pulsaIzquiera = false;
		//console.log("sueltaIzquierda");
	}
	
		
	this.fisica = function(){

		

		if (this.pulsaDerecha){
			if (!colisionDerecha){
				if (this.vx > this.vMax){
					this.vx = this.vMax;
				}else{
					this.vx += this.velocidad;
				}
			}else{
				this.vx = 0;
			}
		}	
	
		if (this.pulsaIzquiera){
			if (!colisionIzquierda){
				if (this.vx < this.vMax){
					this.vx = -this.vMax;
				}else{
					this.vx -= this.velocidad;
				}
			}else{
				this.vx = 0;
			}
				
		}
		
		this.y += this.vy;
		this.x += this.vx;
			
		
		//caida
		if (this.suelo == false){
			this.vy += this.gravedad;
		}else{
			this.vy = 0;
		}
		
				
		//colision piso
		if (tablero[parseInt(((this.y)/50)+1)][parseInt((this.x+5)/50)] || tablero[parseInt((this.y/50)+1)][parseInt(((this.x-5)/50)+1)]){
			this.suelo = true;
			this.y = (parseInt(this.y/50))*50;
			this.techo = false;
		}else{
			this.suelo = false;
		}
		
		//colision techo
		if ((tablero[parseInt(((this.y)/50)-1)][parseInt((this.x+5)/50)] || tablero[parseInt((this.y/50)-1)][parseInt(((this.x-5)/50)+1)]) && (!this.techo)) {
			this.y = ((parseInt(this.y/50)))*50;
			this.vy = 0;
			this.techo = true;
		}
		
		//colision izquierda
		if (tablero[parseInt(((this.y)/50))][parseInt((this.x)/50)]){
			this.colisionIzquierda = true;
			this.x = ((parseInt(this.x/50))+1)*50;
		}else{
			this.colisionIzquierda = false;
		}
		
		//colision derecha
		if (tablero[parseInt(((this.y)/50))][parseInt((this.x/50)+1)]){
			this.colisionDerecha = true;
			this.x = (parseInt(this.x/50))*50;
		}else{
			this.colisionDerecha = false;
		}
		
		//rozamiento derecha
		if (this.vx>0){
			this.vx -= rozamiento;
			if (this.vx<0){
				this.vx = 0;
			}
		}
		
		//rozamiento izquierda
		if (this.vx<0){
			this.vx += rozamiento;
			if (this.vx>0){
				this.vx = 0;
			}
		}
		
				
		
	}
	
	//salto
	this.teclaArriba = function(){
		if (this.suelo && !this.techo){
			this.vy -= this.salto;
			this.suelo = false;
		}
	}
	
	this.dibuja = function() {
		this.fisica();
		
		ctx.drawImage(imagen,this.x,this.y-50,50,50);
		
		//ctx.fillStyle = '#FF0000'
		//ctx.fillRect(this.x,this.y-50,50,50);
	}
		
}

document.addEventListener('keydown',function(tecla){
	
	switch (tecla.keyCode){
	
	case 38:
		personaje1.teclaArriba();
	break;
		
	case 37:
		personaje1.pulsaTeclaIzquierda();
	break;
	
	case 39:
		personaje1.pulsaTeclaDerecha();
	break;
	
	}

});

document.addEventListener('keyup',function(tecla){
	
	switch (tecla.keyCode){

	case 37:
		personaje1.sueltaTeclaIzquierda();
	break;
	
	case 39:
		personaje1.sueltaTeclaDerecha();
	break;
	
	}

});

function inicializar(){
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	
	imagen = new Image();
	imagen.src = 'img/personaje1.bmp';
	
	imagen.onload = function(){
		console.log('Imagen cargada');
	}
	
	personaje1 = new personaje(50,50);
	
	setInterval(function(){
			principal(),20
			});
}

function dibujaTablero(){ 
	
	for(let y=1;y<9;y++){
		for (let x=0;x<10;x++){
			if (tablero[y][x]==1){
			ctx.fillStyle = '#C0C0C0';
			ctx.fillRect(x*50,(y-1)*50,50,50);
			}
		}
	}
}

function borraCanvas(){
	canvas.width = 500;
	canvas.height = 400;
}

function principal(){
		borraCanvas();
		dibujaTablero();
		personaje1.dibuja();
		personaje();

}