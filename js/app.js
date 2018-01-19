
	const activityInputs = [];
	let $activities = [];
	let costArray = [];
	let totalCost = 0;
	let cost = 0;
	const jsFrame = document.getElementsByName("js-frameworks")[0];
	const jsLibs = document.getElementsByName("js-libs")[0];
	const express = document.getElementsByName("express")[0];
	const node = document.getElementsByName("node")[0];
	const buildTools = document.getElementsByName("build-tools")[0];
	const npm = document.getElementsByName("npm")[0];
	console.log(jsFrame);


//----------------------------------FUNCTIONS-------------------------

const validateEmail = (emailInput) => {
    const regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(emailInput);
};

const integerCheck = (number) => {
	const regex = /([0-9])/;
	return regex.test(number);
}

function timeCheck() {
	for(let i = 0; i < activityTime.length; i++) {
		if(activityTime[i] === chosenTime) {
			$(('.activities input')[i]).prop('disabled', true);	
		}
	}
};

	//---------------------------HIDE OTHER ROLE INPUT-------------------------------
	$('#other-title').hide();


	$('#title').change(function() {
		if($(this).val() === "other") {
			$('#other-title').show();
		} else {
			$('#other-title').hide();
		}
	});

	//--------------------------T-SHIRT COLORS---------------------------------
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

	//------------------------------REGISTER FOR ACTIVITIES---------------------

//Create an array of all activities
$('.activities label').each(function() {
	$activities.push($(this).text());
});

//Create an array of all checkboxes
$('input').each(function() {
	if($(this).is(':checkbox')) {
		activityInputs.push($(this));
	}
});

//----------------------------DEACTIVATE TIME OVERLAPS------------------------------
$('.activities input').change(function() {
	if(jsFrame.checked) {
		express.setAttribute("disabled", true);
	}	else {
		express.removeAttribute("disabled");
	}

	if(express.checked) {
		jsFrame.setAttribute("disabled", true);
	}	else {
		jsFrame.removeAttribute("disabled", false);
	}

	if(jsLibs.checked) {
		node.setAttribute("disabled", true);
	}	else {
		node.removeAttribute("disabled", false);
	}

	if(node.checked) {
		jsLibs.setAttribute("disabled", true);
	}	else {
		jsLibs.removeAttribute("disabled", false);
	}
	
});


//----------------------------------COST CALCULATIONS------------------------
$('.activities').append(`<span id="cost">Total Cost = $${totalCost}`).css("color", "black");

for(let i = 0; i < $activities.length; i++) {
	cost = parseInt($activities[i].slice(($activities[i].length) - 3));
	costArray.push(cost);
}
$('.activities').change(function() {
	$('#cost').remove();
	totalCost = 0;
	for(let i = 0; i < activityInputs.length; i++) {
		if(activityInputs[i].is(':checked')) {
			totalCost += costArray[i];
		}
	}
	$('.activities').append(`<span id="cost">Total Cost = $${totalCost}`).css("color", "black");
});

//---------------------------------PAYMENT INFO----------------------------

	$('#payment option').eq(1).attr({selected: "selected"});
	$('p').hide();

	$('#payment').change(function() {
		if($(this).val() === "select_method"){
			$('p').hide();
			$('#credit-card').hide();
		} else if($(this).val() === "credit card") {
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

	//--------------------------------------FORM VALIDATION---------------------

	$('#name').attr("required", true);
	$('#mail').attr('required', true);
	$('activities').attr('required', true);

	//Submit button event listener

	$('button').click(function(e) {
		$('#nameAlert').hide();
		$('#emailAlert').hide();
		$('#activitiesAlert').hide();
		if($('#name').val() === "") {
			e.preventDefault();
			$('#name').css("borderColor", "red");
			$('#name').prev().append(`<p id="nameAlert">Please enter your name.</p>`);
			$('#nameAlert').css("color", "red");
		} else {
			$('#name').css("border", "none");
			$('#nameAlert').hide();
		}

//-----------------------EMAIL VALIDATION--------------

	emailVerification();

//----------------ACTIVITIES VALIDATION-------------
		if($('.activities input:checked').length < 1) {
			e.preventDefault();
			$('.activities').prepend(`<p id="activitiesAlert">Please select at least one activity.</p>`);
			$('#activitiesAlert').css("color", "red");
		} else {
			$('#activitiesAlert').hide();
		}

//-----------------PAYMENT VALIDATION-----------------------------

		if('#payment option[value="select_method"]') {
			$('#payment').append(`<p>Please select a payment method.</p>`).css("color", "red");
		}

//-----------------CREDIT CARD VALIDATION----------------------------------
		if($('#payment option[value="credit card"]')) {
			let $ccInput = $('#cc-num').val();
			if($ccInput.length > 12 && $ccInput.length < 17 && integerCheck($ccInput)) {	
				$('#cc-num').css("borderColor", "black");	
				$('.col-6 label').text("Card Number").css("color", "black");
			} else if ($ccInput.length === 0) {
				$('.col-6 label').text("Please enter a card number.").css("color", "red");
			} else if(integerCheck($ccInput) === false) {
				e.preventDefault();
				$('#cc-num').css("borderColor", "red");
				$('.col-6 label').text("Card Number must only contain numbers.").css("color", "red");
			} else if($ccInput.length < 13 || $ccInput.length > 16)  {
				e.preventDefault();
				$('#cc-num').css("borderColor", "red");
				$('.col-6 label').text("Card Number must be 13-16 digits long.").css("color", "red");
				
			}
			let $zipInput = $('#zip').val();
			if($zipInput.length === 5 && integerCheck($zipInput)) {
				$('#zip').css("borderColor", "black").css("color", "black");
			} else {
				e.preventDefault();
				$('#zip').css("borderColor", "red");
					
			}
			let $cvvInput = $('#cvv').val();
			if($cvvInput.length === 3 && integerCheck($cvvInput)) {
				$('#cvv').css("borderColor", "black").css("color", "black");
			} else {
				e.preventDefault();
				$('#cvv').css("borderColor", "red");				
			}
		}

	});

//------------------EMAIL VALIDATION---------------------------------------
	const emailVerification = function() {
		let $email = $('#mail').val();
		let emailCheck = validateEmail($email);
		console.log($('#emailAlert'));
		$('#emailAlert').remove();
		if(emailCheck) {
			$('#mail').css("borderColor", "black");
			$('#emailAlert').hide();
		} else {
			$('#mail').css("borderColor", "red");
			$('#mail').prev().append(`<p id="emailAlert">Please enter a valid email address.</p>`);
			$('#emailAlert').css("color", "red");
		}	
	}


	$('#mail').keypress(function() { 
		emailVerification();
	});


