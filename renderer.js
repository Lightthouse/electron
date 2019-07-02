// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

let spheres=document.getElementsByClassName(`sp`);//игрушечные шары
let forms=document.getElementsByClassName(`images-hrefs`)[0];//модальное окно
let input=document.getElementsByTagName(`input`);//инпуты модального окна для изображений
let salut=document.getElementsByClassName(`salut`);//блоки салютов
let over=document.getElementById("over");

let fireworkOff=document.getElementsByClassName('fireworkOff')[0];//чекбокс для фейерверка
let finishCount=0;

let acceptButton=document.getElementsByClassName('accept-button')[0];
let closeButton=document.getElementsByClassName('close-button')[0];

let colorArr=[`#07A10B`,`#CE0A16`,`#0F50A2`,`#26A7EB`,`#0F50A2`,`#CE0A16`,`#E7A342`,`#0F50A2`];
let imageArr=[];
let imageArrReserv=['balls/1.jpg','balls/2.jpg','balls/3.jpg','balls/4.jfif','balls/5.jpeg','balls/6.jpeg','balls/7.jpeg'];
let tmpObj;

let patternBefore=/sp/;
let patternAfter=/spAction/;


inputHrefs();

document.onclick=(e)=>{
	
	if(patternBefore.test( e.target.className) ){

		if(patternAfter.test(e.target.className) ){
			e.target.style.display="none";
			over.classList.toggle("overHide");
			finishCount++;
			if(finishCount>=7){finish()};
		}

		else{
			e.target.classList.add(`spAction`);
			e.target.textContent="";
			for (let i = 0; i < spheres.length; i++) {
				if(spheres[i]==e.target){
					imagesAndColors(i);
				
				}
			}
		}				
	}

}

document.onkeydown=(e)=>{
	if(e.ctrlKey && e.keyCode == 73){showForms();}
	if(e.ctrlKey && e.keyCode == 70){e.preventDefault();finish();}
}

acceptButton.onclick=()=>{
	for (let i = 0; i < input.length-1; i++) {
		localStorage.setItem(`memory${i}`,input[i].value);
	}
	if (fireworkOff.checked) {localStorage.setItem("check","true")}
	else{localStorage.setItem("check","false")};

	inputHrefs();
	showForms();
}

closeButton.onclick=()=>{
	showForms();
}

function imagesAndColors(num){
	spheres[num].style.backgroundColor=colorArr[num];
	spheres[num].style.backgroundImage=`url(${imageArr[num]})`;
	over.classList.toggle("overHide");
}	

function showForms(){
	if(forms.style.display=="flex"){forms.style.display="none";}
	else{forms.style.display="flex";}
	over.classList.toggle("over");
}

function inputHrefs(){
	for (let i = 0; i < input.length-1; i++) {

		tmpObj=localStorage.getItem(`memory${i}`);
		if(tmpObj=="" || tmpObj==undefined){input[i].value=imageArrReserv[i];}
		else{input[i].value=tmpObj;}

		imageArr[i]=input[i].value;
		console.log(imageArr[i]+" -imgArr");
	}

	if(localStorage.getItem("check")=="false")fireworkOff.checked=false;
	else{fireworkOff.checked=true;}
}

function finish(){
	for (let i = 0; i < spheres.length; i++) {
		spheres[i].style.display="none";
	}
	if(fireworkOff.checked){
		for (let i = 0; i < salut.length; i++) {
			salut[i].style.display="block";
		}
	}
}