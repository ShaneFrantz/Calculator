const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
var url = require('url');
router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/calculate', (request, response) => {
  console.log("Calculate working");
  var inputs = url.parse(request.url, true).query

  let ageNum = parseInt(inputs.ageNum);
  let famHistNum = parseInt(inputs.famHistNum);
  let systolic = parseInt(inputs.systolic);
  let diastolic = parseInt(inputs.diastolic);
  let weightLbs = parseInt(inputs.weightLbs);
  let heightIn = parseInt(inputs.heightIn);

  console.log(weightLbs);
  console.log(heightIn);
  console.log("");
  console.log("");
  console.log("");

  let weightKg = 0.453592 * weightLbs;
  let heightM = 0.0254 * heightIn;

  console.log(weightKg);
  console.log(heightM);
  
   //Assigning blood pressure values
   let bloodRisk;
   if(systolic < 120 && diastolic < 80){
     bloodRisk = 0;
   }
   else if(systolic < 129 && diastolic < 80){
     bloodRisk = 15;
   }
   else if(systolic < 139 || diastolic < 89){
     bloodRisk = 30;
   }
   else if(systolic > 180 || diastolic > 120){
     bloodRisk = 100
   }
   else if(systolic > 180 && diastolic > 120){
     bloodRisk = 100
   }
   else if(systolic > 140 || diastolic > 90){
     bloodRisk = 75
   }

   //Creating Bmi computation values
   let bmi = weightKg / ((heightM)^2);

   //Assigning BMI risk values
   let bmiNum;
   if(bmi > 18.5 && bmi < 25){
     bmiNum = 0;
   }
   else if(bmi > 24.9 && bmi < 30){
     bmiNum = 30
   }
   else{
     bmiNum = 75;
   }

   //Total risk
   riskTotal = ageNum + famHistNum + bmiNum + bloodRisk;
   //Assigning riskTotal values
   let riskVal;
   if(riskTotal <= 20){
     riskVal = "low risk";
   }
   else if(riskTotal <= 50){
     riskVal = "moderate risk"
   }
   else if(riskTotal <= 75){
     riskVal = "high risk";
   }
   else{
     riskVal = "uninsurable";
   }

   response.type("text/plain");
   response.send(riskVal.toString());

})

app.get('/reset', (request, response) => {


})
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');