(function($) {

   $(document).ready(function() {
		window.addEventListener("paste",processEvent);

		function processEvent(e) {
			for (var i = 0 ; i < e.clipboardData.items.length ; i++) {

				// get the clipboard item
				var clipboardItem = e.clipboardData.items[i];
				var type = clipboardItem.type;

				// if it's an image add it to the image field
				if (type.indexOf("image") != -1) {

					// get the image content and create an img dom element
					var blob = clipboardItem.getAsFile();
					var blobUrl = window.webkitURL.createObjectURL(blob);
					var img = $("<img/>");
					img.attr("src",blobUrl);

					// our slider requires an li item.
					//var li = $("<li></li>");

					// add the correct class and add the image
					//li.addClass("bjqs-slide");
					//li.append(img);

					// add this image to the list of images
					$("pasteImg").append(img);
					//$("#contactMessage").html
					
					// reset the basic-slider added elements
					// $(".bjqs-controls").remove();
					// $(".bjqs-markers").remove();

					// reset the image slider
					// $('#banner-fade').bjqs({
						// height      : 320,
						// width       : 620,
						// responsive  : true
					// });
				} else {
					console.log("Not supported: " + type);
				}

			}
		}
	});

})(jQuery);

