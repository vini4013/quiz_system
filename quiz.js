data=data1;


var start=Math.floor((Math.random() * 10) + 1);
var interval=Math.floor((Math.random() * 2) + 1);
var curQue=-1;
var queArr=[];
var atempt=0, correct=0;
var flag=0;
var mode=0;
//var que=[];
var option_a=document.getElementById("option_a");
var option_b=document.getElementById("option_b");
var option_c=document.getElementById("option_c");
var option_d=document.getElementById("option_d");


var options=document.getElementsByClassName('option');

function select_que(category){
	if (category==1){
		data=data1;
	}else if (category==2){
		data=data2;
	}else if (category==3){
		data=data3;
	}else{
		alert("Cannot load questions")
	}

  	var count=0;
  	for(i=start; count<5; i=i+interval){
	   if (i>9){
	   	i=i%10;
	   }
	   //que.num=i;
	   queArr[count]= new question(i);
	   count++;	
	}

	//console.log(data);
}
//console.log(queArr);

var limit = 29;//in seconds
var time=limit;
var timer;

function starTimer(){
	 timer= setInterval(myTimer, 1000);
	//window.setTimeout(show_result, limit*1000);
}

function myTimer() {
	if (time>=0) {
		document.getElementById("timer").innerHTML = "Time left: "+time-- + " s";
	}
	else{
		show_result("timeout");
	}
  
  //console.log(time);
}

function question(queId,response){
	this.num=queId;
	this.response=response;
}


function showQuiz(){
 	document.getElementById('userInfoBox').style.display="none";
 	document.getElementById('heading1').style.display="none";
 	document.getElementById('heading2').style.display="flex";
 	document.getElementById('queBox').style.display="flex";
 	document.getElementById('result').style.display="none";
 	nextQue(queArr[0].num);
 
}

function loadQuestion(i){
	//document.getElementById("queNo");
	document.getElementById("question").innerHTML=data[i].question;
	option_a.innerHTML=data[i].a;
	option_b.innerHTML=data[i].b;
	option_c.innerHTML=data[i].c;
	option_d.innerHTML=data[i].d;
	document.getElementById("queNo").innerHTML="Question  "+ (curQue+1)+" of 5";
	if (mode=='') {
		showResponse();
	}else{
		showAns();
	}
	
	
}

function test(){
	alert();
}

function setResponseA(){
	queArr[curQue].response="a";
	nextQue();
	if (flag==1) {show_result();}
}
function setResponseB(){
	queArr[curQue].response="b";
	nextQue();
	if (flag==1) {show_result();}
}
function setResponseC(){
	queArr[curQue].response="c";
	nextQue();
	if (flag==1) {show_result();}
}
function setResponseD(){
	queArr[curQue].response="d";
	nextQue();
	if (flag==1) {show_result();}
}


function manage_prev(){
  if (curQue<=0) {
  	document.getElementById('prev_btn').classList.remove('btn2');
  	document.getElementById('prev_btn').classList.add('btn_deactive');
  }else{
  	document.getElementById('prev_btn').classList.add('btn2');
  	document.getElementById('prev_btn').classList.remove('btn_deactive');
  }
}

function manage_next(){
	if (curQue>=4) {
		document.getElementById('next_btn').classList.remove('btn2');
  		document.getElementById('next_btn').classList.add('btn_deactive');
	}else{
		document.getElementById('next_btn').classList.add('btn2');
  		document.getElementById('next_btn').classList.remove('btn_deactive');
	}
}

function showResponse(){
	
	clear_options();
	if(queArr[curQue].response){
 		document.getElementById('option_'+queArr[curQue].response).classList.add("selected");	
 	}
}

function nextQue(){
 	if(curQue<4){
 		curQue++;
 		//console.log(curQue);
	 	loadQuestion(queArr[curQue].num);
	 	manage_prev();
	 	manage_next();
 	}
 	else{
 		flag=1;
 	}
 	//console.log(curQue);
 	//curQue++;
}

function prevQue(){
  	if (curQue>0) {
  		curQue--;
  		//console.log(curQue);
	 	loadQuestion(queArr[curQue].num);
	 	manage_prev();
	 	manage_next();
  	}
}
function calResult(){
	atempt=0;
	correct=0;
	for(i=0;i<5;i++){
	 		//id=queArr[i].num;
	 	if(queArr[i].response){
	 		atempt++;
	       	if (data[queArr[i].num].ans==queArr[i].response) {
	       	  	correct++;
	       	}
	 	}
	 }
	 document.getElementById("score").innerHTML= "Score: "+correct;
	 document.getElementById("atempt").innerHTML= atempt;
	 document.getElementById("time").innerHTML= (limit-time)+"s";
	 document.getElementById("result").style.display="flex";
	 document.getElementById("queBox").style.display="none";
}

function show_result(submit_type){
	if(submit_type=='timeout'){
		alert("Time up! Click OK to show results.");
		clearInterval(timer);
		document.getElementById("timer").style.display="none";
		calResult();
	}
	else{
		if(confirm("Are you sure you want to submit the test?")){
			clearInterval(timer);
			document.getElementById("timer").style.display="none";
	  		calResult();	
 		}else{
 			showResponse();
 			if (flag==1) {
 				flag=0;
 			}
 		}

	}
 	//console.log(atempt);
 	//console.log(correct);
}

function showAns(){
   	clear_options();
	//for (var i =0;i<options.length;i++) {
	//		options[i].classList.remove("correct");
	//}
	selected=queArr[curQue].response;
	correct=data[queArr[curQue].num].ans;
   	document.getElementById('option_'+correct).classList.add("correct");
   	if(!queArr[curQue].response){
 		document.getElementById('ans_res').innerHTML="You did not atempt this question";
 	}
 	else if (selected==correct){
 		document.getElementById('ans_res').innerHTML="Your answer was correct";
 	}
 	else if (selected!=correct){
 		document.getElementById('ans_res').innerHTML="Your answer was wrong";
 		document.getElementById('option_'+selected).classList.add("wrong");	
 	}
}

function clear_options(){
	for (var i =0;i<options.length;i++) {
			options[i].classList.remove("selected");
	}
	for (var i =0;i<options.length;i++) {
			options[i].classList.remove("correct");
	}
	for (var i =0;i<options.length;i++) {
			options[i].classList.remove("wrong");
	}

}

function viewAnswer(){
	//alert();
	document.getElementById('submit_btn').style.display="none";
	document.getElementById('back_btn').style.display="block";
	document.getElementById('reset_btn').style.display="none";
	option_a.removeEventListener('click', setResponseA);
	//document.getElementById('option_a').classList.remove('option');
	option_b.removeEventListener('click', setResponseB);
	option_c.removeEventListener('click', setResponseC);
	option_d.removeEventListener('click', setResponseD);
	options=document.getElementsByClassName('option');
	for (i=0;i<4;i++) {
		//options[i].classList.add("option_view");
		options[i].classList.remove("op-hover");
		//document.getElementsByClassName('option')[i].classList.remove("option");
	}
	mode="view";
	curQue=-1;
	showQuiz();

}

function reset_ans(){
	queArr[curQue].response='';
	showResponse();
}


document.getElementById('sub_btn').addEventListener('click', function(){
	category=document.getElementById('category').value;
	//alert(category);
	select_que(category);
	starTimer();
	showQuiz();
});

option_a.addEventListener('click', setResponseA);
option_b.addEventListener('click', setResponseB);
option_c.addEventListener('click', setResponseC);
option_d.addEventListener('click', setResponseD);
document.getElementById('next_btn').addEventListener('click',nextQue);
document.getElementById('prev_btn').addEventListener('click',prevQue);
document.getElementById('reset_btn').addEventListener('click',reset_ans);
document.getElementById('submit_btn').addEventListener('click', show_result);
document.getElementById('back_btn').addEventListener('click', calResult);
document.getElementById('view_ans').addEventListener('click', viewAnswer);







