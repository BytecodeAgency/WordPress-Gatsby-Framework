<?php
?>
<div>
	<h1>Update version</h1>
<p id="status">
	Klik op de update button om de site te updaten met nieuwe content. Dit kan enkele minuten duren.
	</p>
	<button id="update">Update</button>
	<xmp id="json" style="display: block; color: #f1f1f1;">
	<?php
		echo Site_Parser::get_build_request_json();
	?>
	</xmp>
</div>
<script>
	const updateButton = document.getElementById("update");
	updateButton.addEventListener("click", () => {
		const json = {
			json: document.getElementById("json").innerHTML
		}
		//TODO: Make URL dynamic with some field.
		jQuery.ajax({
    		'type': 'POST',
			'url': "<?php the_field('compiler_url', 'options'); ?>",
			'contentType': 'application/x-www-form-urlencoded; charset=utf-8',
			'data': json,
			'dataType': 'json',
    		success: function() {
				document.getElementById("status").innerHTML = "De update is succesvol verzonden.";
				console.log("done");
			}
		});
	});
</script>
