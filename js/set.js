class Card{
  
  constructor(color,shape,fill,count){
    this.color = color;
    this.shape = shape;
    this.fill = fill;
    this.count = count;
  }
}

class Deck{

	constructor(){
		this.cards = [];
		this.shapes = ["diamond", "squiggle", "oval"];
		this.colors = ["red", "green", "blue"];
		this.fills = ["none", "half", "full"];
		this.counts = [1,2,3];

	}

	getNewDeck(){
		for(let i=0; i<3; i++){
			for(let j=0; j<3;j++){	
			this.cards.push(new Card(this.colors[i],this.shapes[j],this.fills[j],this.counts[j]) );
			}
		}
	}

	shuffleCards(){
		let temp = [];
		for(let i=this.cards.length; i>=0; i--){
			let rand = Math.floor( Math.random()*(i+1) );
			temp.push(this.cards[rand]);
			this.cards.splice(i,1);

		}
		this.cards = temp;
	}
}
