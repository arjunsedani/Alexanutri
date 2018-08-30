
let speechOutput;

let welcomeOutput  = 'Hi, I am Food Nutrition Guru. You can ask me about calorie, protein and fat content information of food items.';
let welcomeReprompt = 'For example, you can say how many calories are in butter salted or you can say how many proteins are in 1 grams of butter salted';

"use strict";
const Alexa = require('alexa-sdk');
const appName = 'Nutrition Guru';
const APP_ID = 'amzn1.ask.skill.0f17036c-4530-4118-963f-e2218535ad23';

const STOP_MESSAGE = 'Thanks for using '+appName+'. Have a great day!';
const CANCEL_MESSAGE = 'Thanks for using '+appName+'. Have a nice day!';

const LAUNCH_SPEAK = 'I can help you to get your nutrtion.';
const UNHANDLED_MESSAGE = 'I am Sorry, Can you please repeat that';

speechOutput = '';
const handlers = {
	'LaunchRequest': function () {
	    const speechOutput = "<say-as interpret-as=\"interjection\">"+getPartOfDay()+"</say-as><break time=\"300ms\"/>"+
	                        "<say-as interpret-as=\"interjection\">"+welcomeOutput+"</say-as><break time=\"300ms\"/>"+welcomeReprompt; 
        this.response.speak(speechOutput).listen(welcomeReprompt);
        this.emit(':responseReady');
	},
	'AMAZON.HelpIntent': function () {
	     const speechOutput = welcomeOutput;
        const reprompt = welcomeReprompt;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
	},
   'AMAZON.CancelIntent': function () {
       this.response.speak(CANCEL_MESSAGE);
// 		this.emit(':tell', CANCEL_MESSAGE);
		this.emit(':responseReady');
	},
   'AMAZON.StopIntent': function () {
       this.response.speak(STOP_MESSAGE);
// 		this.emit(':tell', STOP_MESSAGE);
		this.emit(':responseReady');
   },
   'SessionEndedRequest': function () {
		speechOutput = '';
		//this.emit(':saveState',true);//uncomment to save attributes to db on session end
		this.emit(':tell', speechOutput);
   },
	'AMAZON.FallbackIntent': function () {
		this.emit(":ask", UNHANDLED_MESSAGE);
    },
	'AMAZON.NavigateHomeIntent': function () {
		speechOutput = '';

		//any intent slot variables are listed here for convenience


		//Your custom intent handling goes here
		speechOutput = "This is a place holder response for the intent named AMAZON.NavigateHomeIntent. This intent has no slots. Anything else?";
		this.emit(":ask", speechOutput, speechOutput);
    },
	'GetNutritionCaloriesInfo': function () {
	    let FoodItemSlotRaw = this.event.request.intent.slots.FoodItem.value;
		console.log(FoodItemSlotRaw);
		let FoodItemSlot = resolveCanonical(this.event.request.intent.slots.FoodItem);
		console.log(FoodItemSlot);
		let WeightSlotRaw = this.event.request.intent.slots.Weight.value;
		console.log(WeightSlotRaw);
		let WeightSlot = resolveCanonical(this.event.request.intent.slots.Weight);
		console.log(WeightSlot);
		let TeaSpoonSlotRaw = this.event.request.intent.slots.TeaSpoon.value;
		console.log(TeaSpoonSlotRaw);
		let TeaSpoonSlot = resolveCanonical(this.event.request.intent.slots.TeaSpoon);
		console.log(TeaSpoonSlot);
	      var MAX_RESPONSES = 3;
          var MAX_FOOD_ITEMS = 10;
		speechOutput = '';
        var foodDb = require('./food_db.json');
        var results = searchFood(foodDb,FoodItemSlot);
        if (results.length == 0) {
          speechOutput = "Could not find any food item for" +FoodItemSlot+ "Please try different food item.";
        } else {
        results.slice(0, MAX_RESPONSES).forEach(function (item) {
        	let weightpermygm = (item[1]/100)*WeightSlot;
        	let weightpermytsp = (item[1]/400)*TeaSpoonSlot;
        	if(WeightSlot)
        	{
            speechOutput = WeightSlot+" grams of "+ item[0] +" contains " +weightpermygm+ " calories";
        	}
        	else if(TeaSpoonSlot)
        	{
        	 speechOutput = TeaSpoonSlot+" tea spoon "+ item[0] +" contains " +weightpermytsp+ " calories";   
        	}
        	else{
        	speechOutput = "100 grams of "+ item[0] +" contains " +(item[1])+ " calories";
        	}
        });
      }
		this.emit(":ask", speechOutput, speechOutput);
    },
	'GetNutritionProteinInfo': function () {
		let FoodItemSlotRaw = this.event.request.intent.slots.FoodItem.value;
		console.log(FoodItemSlotRaw);
		let FoodItemSlot = resolveCanonical(this.event.request.intent.slots.FoodItem);
		console.log(FoodItemSlot);
		let WeightSlotRaw = this.event.request.intent.slots.Weight.value;
		console.log(WeightSlotRaw);
		let WeightSlot = resolveCanonical(this.event.request.intent.slots.Weight);
		console.log(WeightSlot);
		let TeaSpoonSlotRaw = this.event.request.intent.slots.TeaSpoon.value;
		console.log(TeaSpoonSlotRaw);
		let TeaSpoonSlot = resolveCanonical(this.event.request.intent.slots.TeaSpoon);
		console.log(TeaSpoonSlot);
	      var MAX_RESPONSES = 3;
          var MAX_FOOD_ITEMS = 10;
		speechOutput = '';
        var foodDb = require('./food_db.json');
        var results = searchFood(foodDb,FoodItemSlot);
        if (results.length == 0) {
          speechOutput = "Could not find any food item for" +FoodItemSlot+ "Please try different food item.";
        } else {
        results.slice(0, MAX_RESPONSES).forEach(function (item) {
        	let weightpermygm = (item[2]/100)*WeightSlot;
        	let weightpermytsp = (item[2]/400)*TeaSpoonSlot;
        	if(WeightSlot)
        	{
            speechOutput = WeightSlot+" grams of "+ item[0] +" contains " +weightpermygm+ " proteins";
        	}
        	else if(TeaSpoonSlot)
        	{
        	 speechOutput = TeaSpoonSlot+" tea spoon "+ item[0] +" contains " +weightpermytsp+ " proteins";   
        	}
        	else{
        	speechOutput = "100 grams of "+ item[0] +" contains " +(item[2])+ " proteins";
        	}
        });
      }
		this.emit(":ask", speechOutput, speechOutput);
    },
	'GetNutritionFatInfo': function () {
		let FoodItemSlotRaw = this.event.request.intent.slots.FoodItem.value;
		console.log(FoodItemSlotRaw);
		let FoodItemSlot = resolveCanonical(this.event.request.intent.slots.FoodItem);
		console.log(FoodItemSlot);
		let WeightSlotRaw = this.event.request.intent.slots.Weight.value;
		console.log(WeightSlotRaw);
		let WeightSlot = resolveCanonical(this.event.request.intent.slots.Weight);
		console.log(WeightSlot);
		let TeaSpoonSlotRaw = this.event.request.intent.slots.TeaSpoon.value;
		console.log(TeaSpoonSlotRaw);
		let TeaSpoonSlot = resolveCanonical(this.event.request.intent.slots.TeaSpoon);
		console.log(TeaSpoonSlot);
	      var MAX_RESPONSES = 3;
          var MAX_FOOD_ITEMS = 10;
		speechOutput = '';
        var foodDb = require('./food_db.json');
        var results = searchFood(foodDb,FoodItemSlot);
        if (results.length == 0) {
          speechOutput = "Could not find any food item for" +FoodItemSlot+ "Please try different food item.";
        } else {
        results.slice(0, MAX_RESPONSES).forEach(function (item) {
        	let weightpermygm = (item[3]/100)*WeightSlot;
        	let weightpermytsp = (item[3]/400)*TeaSpoonSlot;
        	if(WeightSlot)
        	{
            speechOutput = WeightSlot+" grams of "+ item[0] +" contains " +weightpermygm+ " fats";
        	}
        	else if(TeaSpoonSlot)
        	{
        	 speechOutput = TeaSpoonSlot+" tea spoon "+ item[0] +" contains " +weightpermytsp+ " fats";   
        	}
        	else{
        	speechOutput = "100 grams of "+ item[0] +" contains " +(item[3])+ " fats";
        	}
        });
      }
		this.emit(":ask", speechOutput, speechOutput);
    },
    'GetNutritionInfo': function () {
		speechOutput = '';
		let FoodItemSlotRaw = this.event.request.intent.slots.FoodItem.value;
		console.log(FoodItemSlotRaw);
		let FoodItemSlot = resolveCanonical(this.event.request.intent.slots.FoodItem);
		console.log(FoodItemSlot);
		let TeaSpoonSlotRaw = this.event.request.intent.slots.TeaSpoon.value;
		console.log(TeaSpoonSlotRaw);
		let TeaSpoonSlot = resolveCanonical(this.event.request.intent.slots.TeaSpoon);
		console.log(TeaSpoonSlot);
		let WeightSlotRaw = this.event.request.intent.slots.Weight.value;
		console.log(WeightSlotRaw);
		let WeightSlot = resolveCanonical(this.event.request.intent.slots.Weight);
		console.log(WeightSlot);

	  var MAX_RESPONSES = 3;
          var MAX_FOOD_ITEMS = 10;
		speechOutput = '';
        var foodDb = require('./food_db.json');
        var results = searchFood(foodDb,FoodItemSlot);
        if (results.length == 0) {
          speechOutput = "Could not find any food item for" +FoodItemSlot+ "Please try different food item.";
        } else {
        results.slice(0, MAX_RESPONSES).forEach(function (item) {
        // 	let weightpermygm = (item[1]/100)*WeightSlot;
        	let weightpermytsp = (item[1]/400)*TeaSpoonSlot;
        	if(WeightSlot)
        	{
            speechOutput = WeightSlot+" grams of "+ item[0] +" contains " +(item[1]/100)*WeightSlot+ " calories"+(item[2]/100)*WeightSlot+" proteins"+(item[3]/100)*WeightSlot+"fats";
        	}
        	else if(TeaSpoonSlot)
        	{
        	 speechOutput = TeaSpoonSlot+" tea spoon "+ item[0] +" contains " +weightpermytsp+ " calories";   
        	}
        	else{
        	speechOutput = "100 grams of "+ item[0] +" contains " +(item[1])+ " calories";
        	}
        });
      }
		this.emit(":ask", speechOutput, speechOutput);
    },
	'GetNextEventIntent': function () {
		speechOutput = '';

		//any intent slot variables are listed here for convenience


		//Your custom intent handling goes here
		speechOutput = "This is a place holder response for the intent named GetNextEventIntent. This intent has no slots. Anything else?";
		this.emit(":ask", speechOutput, speechOutput);
    },
	'DontKnowIntent': function () {
		speechOutput = '';

		//any intent slot variables are listed here for convenience


		//Your custom intent handling goes here
		speechOutput = "This is a place holder response for the intent named DontKnowIntent. This intent has no slots. Anything else?";
		this.emit(":ask", speechOutput, speechOutput);
    },	
	'Unhandled': function () {
        speechOutput = "The skill didn't quite understand what you wanted.  Do you want to try something else?";
        this.emit(':ask', speechOutput, speechOutput);
    }
};


//    END of Intent Handlers {} ========================================================================================
// 3. Helper Function  =================================================================================================

function resolveCanonical(slot){
	//this function looks at the entity resolution part of request and returns the slot value if a synonyms is provided
	let canonical;
    try{
		canonical = slot.resolutions.resolutionsPerAuthority[0].values[0].value.name;
	}catch(err){
	    console.log(err.message);
	    canonical = slot.value;
	}
	return canonical;
}



function searchFood(fDb, foodName) {
    foodName = foodName.toLowerCase();
    foodName = foodName.replace(/,/g, '');
    var foodWords = foodName.split(/\s+/);
    var regExps = [];
    var searchResult = [];


    foodWords.forEach(function (sWord) {
        regExps.push(new RegExp(`^${sWord}(es|s)?\\b`));
        regExps.push(new RegExp(`^${sWord}`));
    });

    fDb.forEach(function (item) {
        var match = 1;
        var fullName = item[0];
        var cmpWeight = 0;

        foodWords.forEach(function (sWord) {
            if (!fullName.match(sWord)) {
                match = 0;
            }
        });

        if (match == 0) {
            return;
        }

        regExps.forEach(function (rExp) {
            if (fullName.match(rExp)) {
                cmpWeight += 10;
            }
        });

        if (fullName.split(/\s+/).length == foodWords.length) {
            cmpWeight += 10;
        }


        searchResult.push([item, cmpWeight]);

    });

    var finalResult = searchResult.filter(function (x) {
        return x[1] >= 10;
    });
    if (finalResult.length == 0) {
        finalResult = searchResult;
    } else {
        finalResult.sort(function (a, b) {
            return b[1] - a[1];
        });
    }

    finalResult = finalResult.map(function (x) {
        return x[0];
    });

    return finalResult;
}

function getPartOfDay() {
    let partOfDay;
    let IST = new Date();
    IST.setHours(IST.getHours() + 5);
    IST.setMinutes(IST.getMinutes() + 30);
    if(IST.getHours() > 9 && IST.getHours() <12) {
        partOfDay = "Good Morning";
    }else if(IST.getHours() >= 12 && IST.getHours() < 16){
        partOfDay = "Good Afternoon";
    }else {
        partOfDay = "Good Evening";
    }
    return partOfDay;
}

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
