<link rel="stylesheet" type="text/css" href="css/style.css">

<div id="river"></div>
<div id="messageArea"></div>
<div id="setsArea"></div>
<script type="text/javascript" src="js/set.js"></script>
<script type="text/javascript">
window.addEventListener("load",main);

function main(){
	let set = new SetGame();
	set.populateDom();
}


</script>