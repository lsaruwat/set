<script type="text/javascript" src="js/set.js"></script>
<script type="text/javascript">
window.addEventListener("load",main);

function main(){
	let d = new Deck();
	d.getNewDeck();
	d.shuffleCards();
	console.log(d.cards);
}


</script>