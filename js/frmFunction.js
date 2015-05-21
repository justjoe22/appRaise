/*-----------------------------------------------------------------------------------
/*
/* Functions for the Main form.
/*
-----------------------------------------------------------------------------------*/

(function($) {

	/*---------------------------------------------------- */
	/* Preloader
	------------------------------------------------------ */
	$(window).load(function() {

		/* Click Function */
		$('#mySCR').html('function onClickfnc(i) {$("#message").html("<p>Selected: " + i + "</p>");}');
		
		var arrayBooks = ['Game of Thrones', 'Lord of the Rings', 'The Hobbit'];

		for (i = 0; i < arrayBooks.length; i++) {
			var liHtml = "<p>" + arrayBooks[i] + "</p>";
			liHtml = liHtml + "<button  type='button' id='button'" + arrayBooks[i] + " onclick='onClickfnc(" + '"' + arrayBooks[i] + '"' + ")'>Action</button>";

			$('#Book').append(liHtml);

		} //End of Loop

	});

})(jQuery);