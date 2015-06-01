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

		/* Add the OnClick function to the host page. */
		$('#mySCR').html('function onClickfnc(i) {$("#message").html("<p>Selected: " + i + "</p>");}');
		
		/* Add Books to Array */
		var arrayBooks = ['Game of Thrones', 'Lord of the Rings', 'The Hobbit', 'The Novel'];

		/* Loop through each book, create a list item with an action button. */
		for (i = 0; i < arrayBooks.length; i++) {
			
			/* Define the HTML for each book. */
			var liHtml = "<p>" + arrayBooks[i] + "</p>";
			liHtml = liHtml + "<button  type='button' id='button'" + arrayBooks[i] + " onclick='onClickfnc(" + '"' + arrayBooks[i] + '"' + ")'>Action</button>";

			/* Post HTML code to the host page. */
			$('#Book').append(liHtml);

		} //End of Loop

	});

})(jQuery);