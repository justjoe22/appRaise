/*-----------------------------------------------------------------------------------
/*
/* Functions for the Main form.
/*
-----------------------------------------------------------------------------------*/

(function($) {
	
	//Define new PouchDB database for the entire process
	var db = new PouchDB('db_books', {auto_compaction: true});
	
	/*---------------------------------------------------- */
	/* Preloader
	------------------------------------------------------ */
	$(window).load(function() {
		
		//Initial Sync with Remote Server
		PouchDB.sync(db, 'http://localhost:5984/db_books');
		
		//Populate the data into the main DIV
		populateDiv();

	});
	
	/*---------------------------------------------------- */
	/* Populate the data from PouchDB to the main DIV
	/* Params: N/A
	------------------------------------------------------ */
	function populateDiv() {
	
		//Clear HTML
		$('#Book').html("");
		
		//Get data from the PouchDB
		db.allDocs({
		  include_docs: true, 
		  attachments: true
		}).then(function (result) {
		
			// Loop through each book, create a list item with an action button.
			for (i = 0; i < result.rows.length; i++) {
				
				// Define the HTML for each book.
				var liHtml = "<p>" + result.rows[i].doc.title + "</p>";
				liHtml = liHtml + "<button  type='button' class='btn btn-primary btn-lg active' id='button" + i + "' value='" + result.rows[i].doc._id + "'>Remove</button>";

				// Append HTML code to the host page.
				$('#Book').append(liHtml);
				
				//Add event OnClick to the book button control
				BookButton(i);

			} //End of Loop
		
			//Add HTML code to Add another book.
			var liCode = "<p><input type='text' id='addTxt' placeholder='Add A Book' /><button type='button' class='btn btn-primary btn-lg active' id='addBtn'>Add</button></p>";
			
			//Append HTML code to the host page.
			$('#Book').append(liCode);
			
			//Add event OnClick to the addBtn control
			var myButton2 = document.getElementById('addBtn');
			if (myButton2.addEventListener) {
				myButton2.addEventListener('click', function(e){addLine();}, false);
			} else {
				myButton2.attachEvent('onclick', function(e){addLine();});
			}
			
			//Add event OnEnter to the addTxt control
			$("#addTxt").keypress(function(e) {
				if(e.which == 13) {				
					addLine();
				}
			});
	
		}).catch(function (err) {
		  console.log(err);
		});
	
	}
	
	/*---------------------------------------------------- */
	/* Add event to a PouchDB record in the main DIV
	/* Params: i (The ID from the Pouch DB record)
	------------------------------------------------------ */
	function BookButton(i){
		//Assign a variable to the button control
		var myButton = document.getElementById('button' + i);
		
		//Add event OnClick to the button control
		if (myButton.addEventListener) {
			myButton.addEventListener('click', function(e){removeLine(e.target.value,'button' + i);}, false);
		} else {
			myButton.attachEvent('onclick', function(e){removeLine(e.target.value,'button' + i);});
		}
	}
	
	/*---------------------------------------------------- */
	/* Remove a record from the PouchDB
	/* Params: myVal (db ID), myID (button ID)
	------------------------------------------------------ */
	function removeLine(myVal,myID) {
		
		//Fade out the current button
		$(myID).fadeOut();
		
		//Find and mark the current record for delete
		db.get(myVal).then(function (doc) {
		  doc._deleted = true;
		  return db.put(doc);
		}).catch(function (err) {
		  console.log(err);
		});
		
		//Sync Database
		db.replicate.to('http://localhost:5984/db_books');
		
		PouchDB.sync(db, 'http://localhost:5984/db_books');
		
		//Pause the function before refreshing the data in the main DIV
		var sec = 0;
		
		//Start Timer
		var timer = window.setInterval(function(){
			
			sec = sec + 1;
			
			if(sec==1){
				//Refresh data in the main DIV
				populateDiv();
				
				//Stop Timer
				clearInterval(timer);
			}
				
		}, 1000); //Loop every 1 second	
	
	}

	/*---------------------------------------------------- */
	/* Add a new record to the PouchDB
	/* Params: N/A
	------------------------------------------------------ */
	function addLine() {
		
		//Get value from the addTxt control
		var myVal = document.getElementById('addTxt').value;
		
		//Post the value to the PouchDB
		db.post({
		  title: myVal
		}).then(function (response) {
		  // handle response
		  console.log(response);
		  
		}).catch(function (err) {
		  console.log(err);
		});

		//Sync Database
		db.replicate.to('http://localhost:5984/db_books');
		
		PouchDB.sync(db, 'http://localhost:5984/db_books');
		
		//Refresh data in the main DIV
		populateDiv();
	
	}

})(jQuery);