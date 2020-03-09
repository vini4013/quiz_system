console.log(data);

var start=Math.floor((Math.random() * 20) + 1);
var interval=Math.floor((Math.random() * 4) + 1);
var curQue=-1;
var queArr=[];
var atempt=0, correct=0;
//var que=[];

function question(queId,response){
	this.num=queId;
	this.response=response;
}
var count=0;

for(i=start; count<5; i=i+interval){
  
   if (i>19){
   	i=i%20;
   }
   //que.num=i;
   queArr[count]= new question(i);
   count++;
	
}
console.log(queArr);

function showQuiz(){
 document.getElementById('userInfoBox').style.display="none";
 document.getElementById('queBox').style.display="flex";
 nextQue(queArr[0].num);

}

function loadQuestion(i){
	//document.getElementById("queNo");
	document.getElementById("question").innerHTML=data[i].question;
	document.getElementById("option_a").innerHTML=data[i].a;
	document.getElementById("option_b").innerHTML=data[i].b;
	document.getElementById("option_c").innerHTML=data[i].c;
	document.getElementById("option_d").innerHTML=data[i].d;
	showResponse();

}

function test(){
	alert();
}

function setResponse(response){
	queArr[curQue].response=response;
	nextQue();
  
}

function startQuiz(){

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
	options=document.getElementsByClassName('option');
	for (var i =0;i<options.length;i++) {
			options[i].classList.remove("selected");
	}
	if(queArr[curQue].response){
 		document.getElementById('option_'+queArr[curQue].response).classList.add("selected");	
 	}
 
}

 function nextQue(){
 	if(curQue<4){
 		curQue++;
 		console.log(curQue);
	 	loadQuestion(queArr[curQue].num);
	 	manage_prev();
	 	manage_next();
 	}
 	//console.log(curQue);
 	//curQue++;
 }

  function prevQue(){
  	if (curQue>0) {
  		curQue--;
  		console.log(curQue);
	 	loadQuestion(queArr[curQue].num);
	 	manage_prev();
	 	manage_next();
  	}
  	
 	
 }
 function show_result(){
 	//confirm("Are you sure you want to submit the test?");
 	
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
 	document.getElementById("correct").innerHTML= correct;
 	document.getElementById("result").style.display="flex";
 	document.getElementById("queBox").style.display="none";

 	//console.log(atempt);
 	//console.log(correct);
 }

document.getElementById('sub_btn').addEventListener('click', showQuiz);

document.getElementById('option_a').addEventListener('click', function(){setResponse("a");});
document.getElementById('option_b').addEventListener('click', function(){setResponse("b");});
document.getElementById('option_c').addEventListener('click', function(){setResponse("c");});
document.getElementById('option_d').addEventListener('click', function(){setResponse("d");});

document.getElementById('next_btn').addEventListener('click',nextQue);
document.getElementById('prev_btn').addEventListener('click',prevQue);

document.getElementById('submit_btn').addEventListener('click', show_result);

