
	const activityInputs = [];
	let activityTime = [];
	let $activities = [];
	let chosenActivity = "";
	let schedule = [];
	let chosenTime = "";

	let costArray = [];
	let totalCost = 0;
	let cost = 0;


//----------------------------------FUNCTIONS-------------------------

const validateEmail = (emailInput) => {
    const regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(emailInput);
};

const integerCheck = (number) => {
	const regex = /([0-9])/;
	return regex.test(number);
}



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

$('.activities label').each(function() {
	$activities.push($(this).text());
});

$('input').each(function() {
	if($(this).is(':checkbox')) {
		activityInputs.push($(this));
	}
});
	//Put all activity times into an array
	// $('.activities label').each(function() {
	// 	let hyphen = $(this).text().indexOf("—");
	// 	let comma = $(this).text().indexOf(",");
	// 	let time = $(this).text().slice(hyphen, comma);
	// 	activityTime.push(time);
	// });

	// function timeCheck() {
	// 	for(let i = 0; i < activityTime.length; i++) {
	// 		if(activityTime[i] === chosenTime) {
	// 			$(('.activities input')[i]).prop('disabled', true);	
	// 		}
	// 	}
	// };

	// $('.activities label').click(function() {	
	// 	chosenActivity = this.innerHTML;
	// 		chosenTime = "";
	// 		let hyphen = chosenActivity.indexOf("—");
	// 		let comma = chosenActivity.indexOf(",");
	// 		let time = chosenActivity.slice(hyphen, comma);
	// 		chosenTime += time;
	// 		schedule.push(time);
	// 		timeCheck();
	// });

//----------------------------------COST CALCULATIONS------------------------
$('.activities').append(`<span id="cost">Total Cost = $${totalCost}`).css("color", "black");

for(let i = 0; i < $activities.length; i++) {
	cost = parseInt($activities[i].slice(($activities[i].length) - 3));
	costArray.push(cost);
}
console.log(costArray);
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

	//--------------------------------------FORM VALIDATION---------------------

	$('#name').attr("required", true);
	$('#mail').attr('required', true);
	$('activities').attr('required', true);

	//Submit button event listener

	$('button').click(function(e) {
		$('#nameAlert').hide();
		$('#emailAlert').hide();
		$('#activitiesAlert').hide();
		e.preventDefault();
		if($('#name').val() === "") {
			$('#name').css("borderColor", "red");
			$('#name').prev().append(`<p id="nameAlert">Please enter your name.</p>`);
			$('#nameAlert').css("color", "red");
		} else {
			$('#name').css("border", "none");
			$('#nameAlert').hide();
		}
//----------------ACTIVITIES VALIDATION-------------
		if($('.activities input:checked').length < 1) {
			$('.activities').prepend(`<p id="activitiesAlert">Please select at least one activity.</p>`);
			$('#activitiesAlert').css("color", "red");
		} else {
			$('#activitiesAlert').hide();
		}
//-----------------CREDIT CARD VALIDATION----------------------------------
		if($('#payment option[value="credit card"]')) {
			let $ccInput = $('#cc-num').val();
			if($ccInput.length > 12 && $ccInput.length < 17 && integerCheck($ccInput)) {	
				$('#cc-num').css("borderColor", "black");	
				$('.col-6 label').text("Card Number").css("color", "black");
			} else if(integerCheck($ccInput) === false) {
				$('#cc-num').css("borderColor", "red");
				$('.col-6 label').text("Card Number must only contain numbers.").css("color", "red");
			} else if($ccInput.length < 13 || $ccInput.length > 16)  {
				$('#cc-num').css("borderColor", "red");
				$('.col-6 label').text("Card Number must be 13-16 digits long.").css("color", "red");
				
			}
			let $zipInput = $('#zip').val();
			if($zipInput.length === 5 && integerCheck($zipInput)) {
				$('#zip').css("borderColor", "black").css("color", "black");
			} else {
				$('#zip').css("borderColor", "red");
					
			}
			let $cvvInput = $('#cvv').val();
			if($cvvInput.length === 3 && integerCheck($cvvInput)) {
				$('#cvv').css("borderColor", "black").css("color", "black");
			} else {
				$('#cvv').css("borderColor", "red");				
			}
		}

	});

//------------------EMAIL VALIDATION---------------------------------------
		
	$('#mail').keypress(function() { 
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
	});


