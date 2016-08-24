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

	constructor(color,shape,fill,count){
		super(color,shape,fill,count);
		this.element = document.createElement("div");
		this.element.style.color = this.color;
		this.element.style.border= "solid 2px black";
		this.element.innerHTML = "<p>" + this.count + "</p>";
		this.element.innerHTML += "<p>" + this.shape + "</p>";
		this.element.innerHTML += "<p>" + this.fill + "</p>";
	}
}

class Deck{

	constructor(){
		this.cards = [];
		this.shapes = ["diamond", "squiggle", "oval"];
		this.colors = ["red", "green", "blue"];
		this.fills = ["none", "half", "full"];
		this.counts = [1,2,3];
		this.getNewDeck();
		this.shuffleCards();

	}

	getNewDeck(){
		for(let i=0; i<3; i++){
			for(let j=0; j<3;j++){	
			this.cards.push( new DomCard(this.colors[i],this.shapes[j],this.fills[j],this.counts[j], (i+1)*(j+1) ) );
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
	}

	populateDom(){
		for(let i=0;i<9;i++){
			this.river.push(this.deck.cards.pop() );
		}
		for(let i=0; i<this.river.length; i++){
			document.body.appendChild(this.river[i].element);
		}
	}
}
