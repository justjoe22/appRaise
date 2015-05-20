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

		var arrayBooks = ['Game of Thrones', 'Lord of the Rings', 'The Hobbit'];

		for (i = 0; i < arrayBooks.length; i++) {
			var liHtml = "<p>" + arrayBooks[i] + "</p>";
			liHtml = liHtml + "<button  type='button' id='button'" + arrayBooks[i] + ">Action</button>";

			$('#Book').append(liHtml);

			//$('#button' + arrayBooks[i]).on('click', window.location.href = 'http://www.google.com');
			
		}


	});

})(jQuery);