class Set{
	constructor(id1,id2,id3){
		this.idArr = [];
		this.idArr.push(id1);
		this.idArr.push(id2);
		this.idArr.push(id3);
		this.idArr.sort(function(a,b){
			return a-b;
		});
	}
}
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
		this.element.setAttribute("class","set-card");
		this.element.setAttribute("style", "background-image:url(img/" + this.fill + "); color: " + this.color + ";");
		for(let i=0; i<this.count; i++){
			this.element.innerHTML += "<p class='shape' >&" + this.shape + ";</p>";
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
		this.shapes = ["diams", "hearts", "spades"];
		this.colors = ["#F44336", "#4CAF50", "#673AB7"];
		this.fills = ["none.jpg", "dotted.png", "stripes.gif"];
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
		this.numSets = 0.0;
		this.setsFound = 0;
		this.solvedSets = [];
		this.sets = [];
		this.addEventListener("click",this.checkCards);
	}

	populateDom(){
		for(let i=0;i<9;i++){
			this.river.push(this.deck.cards.pop() );
		}
		for(let i=0; i<this.river.length; i++){
			document.getElementById("river").appendChild(this.river[i].element);
		}
		this.findAllSets();
	}

	checkCards(){
		this.selected = [];
		for(let i=0; i<this.river.length; i++){
			if(this.river[i].chosen && this.selected.length < 3)this.selected.push(this.river[i]);
		}
		if(this.selected.length === 3 && this.isSet(this.selected[0],this.selected[1],this.selected[2])){
			if(this.newSetFound(this.selected[0].id,this.selected[1].id,this.selected[2].id)){
				this.setsFound++;
				this.solvedSets.push( new Set(this.selected[0].id,this.selected[1].id,this.selected[2].id) );
				document.getElementById("messageArea").innerHTML = "Set Found!";
				document.getElementById("setsArea").innerHTML = "<h1>total sets: " + this.numSets + "</h1><h1>" + this.setsFound + "</h1>";
			}
			else{
				document.getElementById("messageArea").innerHTML = "Already Found that set!";
			}

			if(this.numSets <= this.setsFound){
				location.reload();
			}
		}
		else if(this.selected.length === 3) document.getElementById("messageArea").innerHTML = "Not a set";

	}

	isSet(card1,card2,card3){
		let status = false;
		// each property must be all different or all the same
		if((card1.color !== card2.color && card1.color !== card3.color && card2.color !== card3.color) || (card1.color === card2.color && card1.color === card3.color) ){
			if( (card1.count !== card2.count && card1.count !== card3.count && card2.count !== card3.count) || (card1.count === card2.count && card1.count === card3.count) ){
				if( (card1.fill !== card2.fill && card1.fill !== card3.fill && card2.fill !== card3.fill) || (card1.fill === card2.fill && card1.fill == card3.fill) ){
					if((card1.shape !== card2.shape && card1.shape !== card3.shape && card2.shape !== card3.shape) || (card1.shape === card2.shape && card1.shape === card3.shape) ){
						status = true;
					}
				}
			}
		}

		return status;
	}

	findAllSets(){
		for(let i=0; i<this.river.length; i++){
			for(let j=0; j<this.river.length; j++){
				for(let k=0; k<this.river.length;k++){
					if( i !== j && j !== k && this.isSet(this.river[i],this.river[j],this.river[k]) ){
						this.numSets++;
					}
				}
			}
		}
		this.numSets /=6.0; // weird but do to out of order sets this needs to be done
		if(this.numSets === 0)location.reload();
		document.getElementById("setsArea").innerHTML = "<h1>Total Sets: " + this.numSets + "</h1><h1>Sets Found: " + this.setsFound + "</h1>";
	}

	newSetFound(id1,id2,id3){
		let tempSet = new Set(id1,id2,id3);
		console.log(tempSet);
		if(this.solvedSets.length>0){
			for(let i=0; i<this.solvedSets.length; i++){
				if(tempSet.idArr[0] == this.solvedSets[i].idArr[0] && tempSet.idArr[1] == this.solvedSets[i].idArr[1] && tempSet.idArr[2] == this.solvedSets[i].idArr[2]){
					return false;
				}
			}
		}
		console.log("new set found");
		return true;
	}

	addEventListener(domEvent, functionRef, bubbles=false){
		window.addEventListener(domEvent, functionRef.bind(this), bubbles);
	}
}
