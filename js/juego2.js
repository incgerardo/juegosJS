

function inicializar(){
	var elemento = document.getElementById(canvas);
	var ctx = elemento.getContext('2d');
	
	var img = new Image();
    img.src = 'img/personaje1.png';
      //defino el evento onload del objeto imagen (recien se va a ejecutar cuando la imagen se haya cargado
      img.onload = function(){
         //incluyo la imagen en el canvas
         ctx.drawImage(img, 10, 10);
      }
   }
}
