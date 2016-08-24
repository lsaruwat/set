<script type="text/javascript" src="js/set.js"></script>
<script type="text/javascript">
window.addEventListener("load",main);

function main(){
	let set = new SetGame();
	console.log(set.deck.cards);
	set.populateDom();
}


</script>