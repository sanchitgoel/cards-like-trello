function COLUMN(){
	
	var $this = this;
	$this.html = document.createElement('div');
	$this.html.classList.add("column");
		
	this.create = function(text){
		
		//Append TItle of Coulmn
		$this.title = text;
		
		//Append a blank Card
		var e = document.createElement("div");
		e.classList.add('cardWrapper');
		e.innerHTML = '<h3>'+text+'</h3><input type="text" placeholder="Create Card" class="cardInput" onkeypress="generateCard(event, this)" />';
		$this.html.appendChild(e);
		
		//append to body
		$($this.html).insertBefore(".addClmInput");
		setTimeout(function(){ e.querySelector('.cardInput').focus() },1);
		
	}
}



function addColumn(event, $this){
	if(event.keyCode === 13){
		var column = new COLUMN();
		column.create($this.value);
		$this.value = '';
		$this.blur();
	}
};


///////////////////////////////////////////////////////
/////////				Card			//////////////
//////////////////////////////////////////////////////

var currentDragHoverTarget = '';
function CARD(){
	var $this = this;
	
	this.create = function(text, inserBeforeElement,additionalClass){
		$this.title = text;
		$this.html = document.createElement("p");
		$this.html.classList.add("card");
		
		let closeIcon = document.createElement("span");
		closeIcon.classList.add('card__closeIcon');
		closeIcon.onclick = function(){
			$this.html.parentNode.removeChild($this.html);
		}
		
		if(additionalClass)
		$this.html.classList.add(additionalClass);
		$this.html.innerHTML = text;
		$this.html.appendChild(closeIcon);
		$this.html.draggable = true;
		$this.html.ondragstart = function(event){ event.dataTransfer.setData('text/plain', null); }
		$this.html.ondrag = function(event){ event.target.classList.add("tilt-right"); event.target.parentNode.removeChild(event.target); }
		$this.html.ondragenter = function(event){
			if(!(currentDragHoverTarget == event.target || event.target.classList.contains("cardContainer"))){
				$('.cardContainer').detach();	
				currentDragHoverTarget = event.target;	
				let tempChild = new CARD();
				tempChild.create("", event.target , "cardContainer");
			}
		}
		$this.html.ondragover = function(event){
			event.preventDefault(); 
		}
		$this.html.ondragend = function(event){
			document.querySelector('.cardContainer').innerHTML = event.target.innerHTML;
			document.querySelector('.cardContainer').classList.remove("cardContainer");
		}
		
		$($this.html).insertBefore(inserBeforeElement);
		setTimeout(function(){$(inserBeforeElement).focus()} , 1);
	}
	this.createCardWrapper = function(){
		
	}
}



function generateCard(event, $this){
	if(event.keyCode === 13){
		var card = new CARD();
		card.create($this.value, $this);
		$this.value = '';
		$this.blur();
	}
}



/* Events fired on the drop target */
function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
	console.log(event);
    //var data = event.dataTransfer.getData("Text");
	$(this).append(event.target);
   // event.target.appendChild(document.getElementById(data));
   // document.getElementById("demo").innerHTML = "The p element was dropped";
}


