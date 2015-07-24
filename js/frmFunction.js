/*-----------------------------------------------------------------------------------
/*
/* Functions for the Main form.
/*
-----------------------------------------------------------------------------------*/

(function($) {

	var arrayBooks = [];
	var db = new PouchDB('db_books');

	/*---------------------------------------------------- */
	/* Preloader
	------------------------------------------------------ */
	$(window).load(function() {

		/* Add the OnClick function to the host page. */
		//$('#mySCR').html('function onClickfnc(i) {$("#message").html("<p>Selected: " + i + "</p>");removeLine(i);}');
		
		/* Add Books to Array */
		// arrayBooks.push('Game of Thrones');
		// arrayBooks.push('Lord of the Rings');
		// arrayBooks.push('The Hobbit');
		// arrayBooks.push('The Novel');

		populateDiv();

	});
	
	function removeLine(myVal) {
		
		// arrayBooks = jQuery.grep(arrayBooks, function(value) {
			// return value != arrayBooks[myVal];
		// });
		
		db.get(myVal).then(function(doc) {
		  return db.remove(doc);
		}).then(function (result) {
		  // handle result
		  console.log(result);
		}).catch(function (err) {
		  console.log(err);
		});
		
		populateDiv();
	
	}
	
	function addLine() {
		
		var myVal = document.getElementById('addTxt').value;
		
		db.post({
		  title: myVal
		}).then(function (response) {
		  // handle response
		  console.log(response);
		}).catch(function (err) {
		  console.log(err);
		});
		
		//arrayBooks.push(myVal);
		
		populateDiv();
	
	}
	
	function populateDiv() {
	
		/* Clear HTML */
		$('#Book').html("");
		
		db.allDocs({
		  include_docs: true, 
		  attachments: true
		}).then(function (result) {
		
			/* Loop through each book, create a list item with an action button. */
			for (i = 0; i < result.rows.length; i++) {
				
				/* Define the HTML for each book. */
				var liHtml = "<p>" + result.rows[i].doc.title + "</p>";
				liHtml = liHtml + "<button  type='button' id='button" + i + "' value='" + result.rows[i].doc._id + "'>Remove</button>";

				/* Post HTML code to the host page. */
				$('#Book').append(liHtml);
				
				var myButton = document.getElementById('button' + i);
				if (myButton.addEventListener) {
					myButton.addEventListener('click', function(e){removeLine(e.target.value);}, false);
				} else {
					myButton.attachEvent('onclick', function(e){removeLine(e.target.value);});
				}

			} //End of Loop
		
			var liCode = "<p>Add a book: <input type='text' id='addTxt' /><button type='button' id='addBtn'>Add</button></p>";
			
			$('#Book').append(liCode);
			
			var myButton2 = document.getElementById('addBtn');
			if (myButton2.addEventListener) {
				myButton2.addEventListener('click', function(e){addLine();}, false);
			} else {
				myButton2.attachEvent('onclick', function(e){addLine();});
			}
			
			$("#addTxt").keypress(function(e) {
				if(e.which == 13) {				
					addLine();
				}
			});
	
		}).catch(function (err) {
		  console.log(err);
		});
	
	}

})(jQuery);