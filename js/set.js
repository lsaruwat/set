class Card{
  
  constructor(color,shape,fill,count,id){
  	this.id = id;
    this.color = color;
    this.shape = shape;
    this.fill = fill;
    this.count = count;
  }

}

class DomCard extends Card{

	constructor(color,shape,fill,count,id){
		super(color,shape,fill,count,id);
		this.chosen = false;
		this.element = document.createElement("div");
		this.element.style.color = this.color;
		this.element.setAttribute("class","set-card");
		for(let i=0; i<this.count; i++){
			this.element.innerHTML += "<p class='shape' style='border: " + this.fill + " 2px black;'>&" + this.shape + ";</p>";
		}
		this.addEventListener("click",this.selected);
	}

	selected(){
		if(this.chosen == false){
			this.chosen=true;	
			this.element.classList.add("selected");
		}
		else{
			this.chosen = false;
			this.element.classList.remove("selected");
		}
	}

	addEventListener(domEvent, functionRef, bubbles=false){
		this.element.addEventListener(domEvent, functionRef.bind(this), bubbles);
	}
}

class Deck{

	constructor(){
		this.cards = [];
		this.shapes = ["diamond", "hearts", "spades"];
		this.colors = ["red", "green", "blue"];
		this.fills = ["none", "dotted", "solid"];
		this.counts = [1,2,3];
		this.getNewDeck();
		this.shuffleCards();

	}

	getNewDeck(){
		let index = 0;
		for(let i=0; i<3; i++){
			for(let j=0; j<3;j++){
				for(let k=0; k<3; k++){
					for(let l=0; l<3;l++){
						this.cards.push( new DomCard(this.colors[i],this.shapes[j],this.fills[k],this.counts[l], index ) );
						index++;
					}

				}	
			}
		}
	}

	shuffleCards(){
		let temp = [];
		for(let i=this.cards.length-1; i>=0; i--){
			let rand = Math.floor( Math.random()*(i+1) );
			temp.push(this.cards[rand]);
			this.cards.splice(rand,1);

		}
		this.cards = temp.slice();
	}
}


class SetGame{

	constructor(){
		this.deck = new Deck();
		this.river = [];
		this.selected = [];
		this.addEventListener("click",this.checkCards);
	}

	populateDom(){
		for(let i=0;i<9;i++){
			this.river.push(this.deck.cards.pop() );
		}
		for(let i=0; i<this.river.length; i++){
			document.getElementById("river").appendChild(this.river[i].element);
		}
	}

	checkCards(){
		this.selected = [];
		for(let i=0; i<this.river.length; i++){
			if(this.river[i].chosen)this.selected.push(this.river[i]);
		}
		console.log(this.selected);
	}

	addEventListener(domEvent, functionRef, bubbles=false){
		window.addEventListener(domEvent, functionRef.bind(this), bubbles);
	}
}
