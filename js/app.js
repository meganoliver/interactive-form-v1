let activityTime = [];
let totalCost = 0;
let cost = 0;

//Hide other role box unless required.
$('#other-title').hide();


$('#title').change(function() {
	if($(this).val() === "other") {
		$('#other-title').show();
	} else {
		$('#other-title').hide();
	}
});

//Only show applicable t-shirt colors
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

//Register for Activities Section
const activities = [];
$('.activities label').each(function() {
	activities.push($(this).text());
});

$('.activities label').change(function() {	
	let activity = $(this).text();
	console.log(activity);
	activityTime = activity.match(new RegExp(/^-$,/));
	console.log(activityTime);
});
	//disable events at same time

	//Update total cost
	
//Payment Info
console.log($('#payment option').eq(1).val());
$('#payment option').eq(1).attr({selected: "selected"});
$('p').hide();

$('#payment').change(function() {
	console.log($(this).val());
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

//Form validation

$('#name').attr("required");
$('#mail').attr('required');
$('activities').attr('required');

//Submit button event listener
$('button').click(function() {


	//Activities
	if(($'.activities.required :checkbox:checked').length < 1) {
		$('.activities').css("border", "1px solid red");
	}

});



