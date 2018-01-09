
	let activityTime = [];
	let activities = [];
	let chosenActivity = "";
	let schedule = [];
	let chosenTime = "";
	let totalCost = 0;
	let cost = 0;



	//---------------------------Hide other role box unless required.
	$('#other-title').hide();


	$('#title').change(function() {
		if($(this).val() === "other") {
			$('#other-title').show();
		} else {
			$('#other-title').hide();
		}
	});

	//--------------------------Only show applicable t-shirt colors
	$('#colors-js-puns').hide();

	$('#design').change(function() {
		$('#colors-js-puns').show();
		if($(this).val() === "js puns") {
			$('#color option').eq(3).removeAttr("selected");
			$('#color option').eq(0).attr({selected: "selected"});
			$('#color option').hide();
			$('#color option:lt(3)').show();
		} else {
			$('#color option').eq(0).removeAttr("selected");
			$('#color option').eq(3).attr({selected: "selected"});
			$('#color option').hide();
			$('#color option:gt(2)').show();
		}
	});

	//------------------------------Register for Activities Section

	//Put all activity times into an array
	$('.activities label').each(function() {
		let hyphen = $(this).text().indexOf("—");
		let comma = $(this).text().indexOf(",");
		let time = $(this).text().slice(hyphen, comma);
		activityTime.push(time);
	});

	function timeCheck() {
		for(let i = 0; i < activityTime.length; i++) {
			if(activityTime[i] === chosenTime) {
				$(('.activities input')[i]).prop('disabled', true);	
			}
		}
	};

	$('.activities label').click(function() {	
		chosenActivity = this.innerHTML;
			chosenTime = "";
			let hyphen = chosenActivity.indexOf("—");
			let comma = chosenActivity.indexOf(",");
			let time = chosenActivity.slice(hyphen, comma);
			chosenTime += time;
			schedule.push(time);
			timeCheck();
	});

	//Payment Info
	$('#payment option').eq(1).attr({selected: "selected"});
	$('p').hide();

	$('#payment').change(function() {
		if($(this).val() === "credit card") {
			$('p').hide();
			$('#credit-card').show();
		} else if ($(this).val() === "paypal") {
			$('#credit-card').hide();
			$('p').hide();
			$('p').first().show();
		} else if($(this).val() === "bitcoin"){
			$('#credit-card').hide();
			$('p').hide();
			$('p').last().show();
		} else {
			$('#payment option').eq(1).attr({selected: "selected"});
			$('p').hide();
		}
	});

	//--------------------------------------Form validation

	$('#name').attr("required");
	$('#mail').attr('required');
	$('activities').attr('required');

	//Submit button event listener

	$('button').click(function(e) {
		e.preventDefault();

		if($('#name').val() === "") {
			$('#name').css("borderColor", "red");
			$('#name').prev().append(`<p id="nameAlert">Please enter your name.</p>`);
			$('#nameAlert').css("color", "red");
		} else {
			$('#name').css("borderColor", "black");
			$('#nameAlert').hide();
		}

		if($('#mail').val() !== "" && $('#mail').val().indexOf('@') > 2 && $('#mail').val().indexOf('.') > 5) {
				console.log("valid");
			$('#mail').css("borderColor", "black");
			$('#emailAlert').hide();
		} else {
			$('#mail').css("borderColor", "red");
			$('#mail').prev().append(`<p id="emailAlert">Please enter your email address.</p>`);
			$('#emailAlert').css("color", "red");
		}

		if($('.activities input:checked').length < 1) {
			$('.activities').prepend(`<p id="activitiesAlert">Please select at least one activity.</p>`);
			$('#activitiesAlert').css("color", "red");
		} else {
			$('#activitiesAlert').hide();
		}

		if($('#payment option[value="credit card"]')) {
			if($('#cc-num').val().length < 13 || $('#cc-num').val().length > 16) {
				$('#cc-num').css("borderColor", "red");
			} else {
				$('#cc-num').css("borderColor", "black");
				
			}
			if($('#zip').val().length !== 5) {
				$('#zip').css("borderColor", "red");
			} else {
				$('#zip').css("borderColor", "black").css("color", "black");
				
			}
			if($('#cvv').val().length !== 3 ) {
				$('#cvv').css("borderColor", "red");
			} else {
				$('#cvv').css("borderColor", "black").css("color", "black");
				
			}
		}

	});

