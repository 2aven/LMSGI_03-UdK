evaluacio = null;
formElement = null;

var resp_01 = null;
var resp_02 = null;
var resp_03 = null;
var resp_04 = null;
var resp_05 = [];
var resp_06 = [];
var resp_07 = null;
var resp_08 = null;
var resp_09 = [];
var resp_10 = [];

var rtest_01 = 0;
var rtest_02 = 0;
var rtest_03 = 0;
var rtest_04 = 0;
var rtest_05 = 0;
var rtest_06 = 0;
var rtest_07 = 0;
var rtest_08 = 0;
var rtest_09 = 0;
var rtest_10 = 0;

window.onload = function(){



	// Llegir el XML
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			gestionarXml(this);
		}
	};
	xhttp.open("GET", "xml/quest.xml", true);
	xhttp.send();

	evaluacio = document.getElementById("evaluacio");
	formElement = document.getElementById("formulari");

	document.getElementById("introButton").onclick = function () {
		document.getElementById("intro").style.display = "none";
		document.getElementById("test").style.display = "block";
	}

	document.getElementById("reloadButton").onclick = function () {
		init();
		document.getElementById("submitButton").style.display = "inline";
		document.getElementById("resetButton").style.display = "inline";
		formElement.reset();
	window.location.hash = '#test';
	}

	formElement.onsubmit = function () {
		if (confirm("Vols corregir l'exàmen?")) {
			if (comprovar()){
				init();
				correccio();
				evaluar();
			}
		}
	return false;
	}

}


// : : : : : : : : : : : : : : : : : : 
// : : : Gestionar contingut XML : : :
// : : : : : : : : : : : : : : : : : : 

function gestionarXml(dadesXml){
	var xmlDoc = dadesXml.responseXML; //Parse XML to xmlDoc

	// --- Enunciats ---
	document.getElementById("quest01").innerHTML = xmlDoc.getElementsByTagName("title")[0].innerHTML;
	document.getElementById("quest02").innerHTML = xmlDoc.getElementsByTagName("title")[1].innerHTML;
	document.getElementById("quest03").innerHTML = xmlDoc.getElementsByTagName("title")[2].innerHTML;
	document.getElementById("quest04").innerHTML = xmlDoc.getElementsByTagName("title")[3].innerHTML;
	document.getElementById("quest05").innerHTML = xmlDoc.getElementsByTagName("title")[4].innerHTML;
	document.getElementById("quest06").innerHTML = xmlDoc.getElementsByTagName("title")[5].innerHTML;
	document.getElementById("quest07").innerHTML = xmlDoc.getElementsByTagName("title")[6].innerHTML;
	document.getElementById("quest08").innerHTML = xmlDoc.getElementsByTagName("title")[7].innerHTML;
	document.getElementById("quest09").innerHTML = xmlDoc.getElementsByTagName("title")[8].innerHTML;
	document.getElementById("quest10").innerHTML = xmlDoc.getElementsByTagName("title")[9].innerHTML;

	// --- Contingut opcions ---
	// text
	// select
// Q_03
	var opcionsSelect = [];
	var select = document.getElementsByTagName("select")[0];
	var size = xmlDoc.getElementById("Q_03").getElementsByTagName('option').length;
	for (i = 0; i < size; i++) { 
		opcionsSelect[i] = xmlDoc.getElementById("Q_03").getElementsByTagName('option')[i].innerHTML;
	}

	for (i = 0; i < size; i++) { 
		var opcio = document.createElement("option");
		opcio.text = opcionsSelect[i];
		opcio.value=i+1;
		select.options.add(opcio);
	}  
// Q_04
	var opcionsSelect = [];
	var select = document.getElementsByTagName("select")[1];
	var size = xmlDoc.getElementById("Q_04").getElementsByTagName('option').length;
	for (i = 0; i < size; i++) { 
		opcionsSelect[i] = xmlDoc.getElementById("Q_04").getElementsByTagName('option')[i].innerHTML;
	}

	for (i = 0; i < size; i++) { 
		var opcio = document.createElement("option");
		opcio.text = opcionsSelect[i];
		opcio.value=i+1;
		select.options.add(opcio);
	} 

	// caselles
//Q_05
	var opcionsCheckbox = [];
	var checkboxContainer=document.getElementById("prova_05");
	var size = xmlDoc.getElementById("Q_05").getElementsByTagName('option').length;
	for (i = 0; i < size; i++) { 
		opcionsCheckbox[i]=xmlDoc.getElementById("Q_05").getElementsByTagName('option')[i].innerHTML;
	}  

	for (i = 0; i < size; i++) { 
		var input = document.createElement("input");
		var label = document.createElement("label");
		label.innerHTML=opcionsCheckbox[i];
		label.setAttribute("for", "prova_05"+"_"+i);
		input.type="checkbox";
		input.name="prova_05";
		input.id="prova_05"+"_"+i;
		checkboxContainer.appendChild(input);
		checkboxContainer.appendChild(label);
		checkboxContainer.appendChild(document.createElement("br"));
	}  
	
//Q_06
	var opcionsCheckbox = [];
	var checkboxContainer=document.getElementById("prova_06");
	var size = xmlDoc.getElementById("Q_06").getElementsByTagName('option').length;
	for (i = 0; i < size; i++) { 
		opcionsCheckbox[i]=xmlDoc.getElementById("Q_06").getElementsByTagName('option')[i].innerHTML;
	}  

	for (i = 0; i < size; i++) { 
		var input = document.createElement("input");
		var label = document.createElement("label");
		label.innerHTML=opcionsCheckbox[i];
		label.setAttribute("for", "prova_06"+"_"+i);
		input.type="checkbox";
		input.name="prova_06";
		input.id="prova_06"+"_"+i;
		checkboxContainer.appendChild(input);
		checkboxContainer.appendChild(label);
		checkboxContainer.appendChild(document.createElement("br"));
	}  
	
//Q_07
	var opcionsR = [];
	var size = xmlDoc.getElementById("Q_07").getElementsByTagName('option').length;
	for (i = 0; i < size; i++) {
		opcionsR[i] = xmlDoc.getElementById("Q_07").getElementsByTagName('option')[i].innerHTML;
	}
	var radioContainer = document.getElementById("prova_07");
	for (i = 0; i < size; i++) {
		var input = document.createElement("input");
		var label = document.createElement("label");
		label.innerHTML = opcionsR[i];
		label.setAttribute("for", "prova_07" + "_" + i);
		input.type = "radio";
		input.id = "prova_07" + "_" + i;
		input.className = "radio_opt";
		input.name = "prova_07";
		input.value = i;
		radioContainer.appendChild(input);
		radioContainer.appendChild(label);
		radioContainer.appendChild(document.createElement("br"));
	}

//Q_08
	var opcionsR = [];
	var size = xmlDoc.getElementById("Q_08").getElementsByTagName('option').length;
	for (i = 0; i < size; i++) {
		opcionsR[i] = xmlDoc.getElementById("Q_08").getElementsByTagName('option')[i].innerHTML;
	}
	var radioContainer = document.getElementById("prova_08");
	for (i = 0; i < size; i++) {
		var input = document.createElement("input");
		var label = document.createElement("label");
		label.innerHTML = opcionsR[i];
		label.setAttribute("for", "prova_08" + "_" + i);
		input.type = "radio";
		input.id = "prova_08" + "_" + i;
		input.className = "radio_opt";
		input.name = "prova_08";
		input.value = i;
		radioContainer.appendChild(input);
		radioContainer.appendChild(label);
		radioContainer.appendChild(document.createElement("br"));
	}

//Q_09

	var opcionsM = [];
	var size = xmlDoc.getElementById("Q_09").getElementsByTagName('option').length;
	for (i = 0; i < size; i++) {
		opcionsM[i] = xmlDoc.getElementById("Q_09").getElementsByTagName('option')[i].innerHTML;
	}
	var select = document.getElementsByTagName("select")[2];

	for (i = 0; i < size; i++) {
		var option = document.createElement("option");
		option.text = opcionsM[i];
		option.value = i;
		select.options.add(option);
	}

//Q_10
	var opcionsM = [];
	var size = xmlDoc.getElementById("Q_10").getElementsByTagName('option').length;
	for (i = 0; i < size; i++) {
		opcionsM[i] = xmlDoc.getElementById("Q_10").getElementsByTagName('option')[i].innerHTML;
	}
	var select = document.getElementsByTagName("select")[3];

	for (i = 0; i < size; i++) {
		var option = document.createElement("option");
		option.text = opcionsM[i];
		option.value = i;
		select.options.add(option);
	}



	// --- Obtenir respotes ---
	// --- Tipus text i select ---
	resp_01 = xmlDoc.getElementById("Q_01").getElementsByTagName('answer')[0].innerHTML;
	resp_02 = xmlDoc.getElementById("Q_02").getElementsByTagName('answer')[0].innerHTML;
	resp_03 = xmlDoc.getElementById("Q_03").getElementsByTagName('answer')[0].innerHTML;
	resp_04 = xmlDoc.getElementById("Q_04").getElementsByTagName('answer')[0].innerHTML;
	// --- Tipus casella ---
	var size = xmlDoc.getElementById("Q_05").getElementsByTagName('answer').length;
	for (i = 0; i < size; i++) { 
		resp_05[i] = xmlDoc.getElementById("Q_05").getElementsByTagName('answer')[i].innerHTML;
	}
	var size = xmlDoc.getElementById("Q_06").getElementsByTagName('answer').length;
	for (i = 0; i < size; i++) { 
		resp_06[i] = xmlDoc.getElementById("Q_06").getElementsByTagName('answer')[i].innerHTML;
	}
	// --- Tipus radio ---
	resp_07 = xmlDoc.getElementById("Q_07").getElementsByTagName('answer')[0].innerHTML;
	resp_08 = xmlDoc.getElementById("Q_08").getElementsByTagName('answer')[0].innerHTML;
	// --- Tipus select múltiple ---
	var size = xmlDoc.getElementById("Q_09").getElementsByTagName('answer').length;
	for (i = 0; i < size; i++) { 
		resp_09[i] = xmlDoc.getElementById("Q_09").getElementsByTagName('answer')[i].innerHTML;
	}
	var size = xmlDoc.getElementById("Q_10").getElementsByTagName('answer').length;
	for (i = 0; i < size; i++) { 
		resp_10[i] = xmlDoc.getElementById("Q_10").getElementsByTagName('answer')[i].innerHTML;
	}

}


// : : : : : : : : : : : : : : : : 
// : : : Gestionar l'exàmen  : : :
// : : : : : : : : : : : : : : : : 

function init(){
	evaluacio.style.display = "none";
	var rtest_01 = 0;
	var rtest_02 = 0;
	var rtest_03 = 0;
	var rtest_04 = 0;
	var rtest_05 = 0;
	var rtest_06 = 0;
	var rtest_07 = 0;
	var rtest_08 = 0;
	var rtest_09 = 0;
	var rtest_10 = 0;
}

function comprovar(){

	var restants = [];
	var pf = false;
	var i = 0;
	var chk=false;
	var prova = null;

	// Comprovar que cada prova està contestada
	// Si no, retorna a la primera sense contestar

	//prova 01
	prova = document.getElementById("prova_01");
	if (prova.value.length == 0) {
		restants[i++]= 1;
		if (!pf) { pf = prova; }
	}//prova 02
	prova = document.getElementById("prova_02");
	if (prova.value.length == 0) {
		restants[i++]= 2;
		if (!pf) { pf = prova; }
	}//prova 03
	prova = document.getElementById("prova_03");
	if (prova.selectedIndex == 0) {
		restants[i++]= 3;
		if (!pf) { pf = prova; }
	}//prova 04
	prova = document.getElementById("prova_04");
	if (prova.selectedIndex == 0) {
		restants[i++]= 4;
		if (!pf) { pf = prova; }
	}//prova 05
	prova = document.getElementById("prova_05");
	for (var j=0; j< formElement.prova_05.length; j++) {
	    if(formElement.prova_05[j].checked) chk = true;
	}
	if (!chk) {
		restants[i++]= 5;
		if (!pf) { pf = prova; }
	}//prova 06
	chk = false;
	prova = document.getElementById("prova_06");
	for (var j=0; j< formElement.prova_06.length; j++) {
	    if(formElement.prova_06[j].checked) chk = true;
	}
	if (!chk) {
		restants[i++]= 6;
		if (!pf) { pf = prova; }
	}//prova 07
	prova = document.getElementById("prova_07");
	for (var j=0; j< formElement.prova_07.length; j++) {
	    if(formElement.prova_07[j].checked) chk = true;
	}
	if (!chk) {
		restants[i++]= 7;
		if (!pf) { pf = prova; }
	}//prova 08
	chk = false;
	prova = document.getElementById("prova_08");
	for (var j=0; j< formElement.prova_08.length; j++) {
	    if(formElement.prova_08[j].checked) chk = true;
	}
	if (!chk) {
		restants[i++]= 8;
		if (!pf) { pf = prova; }
	}//prova 09
	prova = document.getElementById("prova_09");
	if (prova.selectedIndex == -1) {
		restants[i++]= 9;
		if (!pf) { pf = prova; }
	}//prova 10
	prova = document.getElementById("prova_10");
	if (prova.selectedIndex == -1) {
		restants[i++]= 10;
		if (!pf) { pf = prova; }
	}

	if (pf){
		alert("Has de contestar a cada qüestió. Falten les proves:{"+restants+"}");
		pf.focus();
		return false;
	} else return true;
}


function correccio(){

	var punt = false;
	var acertades = 0;
	var fail = 0;

	//text
//Q_01
	prova = document.getElementById("prova_01");
	if (prova.value == resp_01) rtest_01 = 1;
	else rtest_01 = -0.5;
//Q_02
	prova = document.getElementById("prova_02");
	if (prova.value == resp_02) rtest_02 = 1;
	else rtest_02 = -0.5;
//Q_03
	prova = document.getElementById("prova_03");
	if (prova.selectedIndex == resp_03) rtest_03 = 1;
	else rtest_03 = -0.5;
//Q_04
	prova = document.getElementById("prova_04");
	if (prova.selectedIndex == resp_04) rtest_04 = 1;
	else rtest_04 = -0.5;
//Q_05
	acertades = 0;
	fail = 0;
	for (i=0; i<formElement.prova_05.length; i++){
		punt = false;
		if (formElement.prova_05[i].checked){
			for (j=0; j<resp_05.length; j++){
				if (i==resp_05[j]-1) punt=true;
			} if (punt) ++acertades;
			else ++fail;
		} else {
			for (j=0; j<resp_05.length; j++){
				if (i==resp_05[j]-1) punt=true;
			} if (punt) ++fail;
			else ++acertades;

		}
	}

	rtest_05 = 0.25*acertades - 0.25*fail;
//Q_06
	acertades = 0;
	fail = 0;
	for (i=0; i<formElement.prova_06.length; i++){
		punt = false;
		if (formElement.prova_06[i].checked){
			for (j=0; j<resp_06.length; j++){
				if (i==resp_06[j]-1) punt=true;
			} if (punt) ++acertades;
			else ++fail;
		} else {
			for (j=0; j<resp_06.length; j++){
				if (i==resp_06[j]-1) punt=true;
			} if (punt) ++fail;
			else ++acertades;

		}
	}

	rtest_06 = 0.25*acertades - 0.25*fail;
//Q_07
	punt = false;
	for (i=0; i<formElement.prova_07.length; i++){
		if(formElement.prova_07[i].checked && i==resp_07-1) punt = true;
	}
	if (punt) rtest_07 = 1;
	else rtest_07 = -0.5;
//Q_08
	punt = false;
	for (i=0; i<formElement.prova_08.length; i++){
		if(formElement.prova_08[i].checked && i==resp_08-1) punt = true;
	}
	if (punt) rtest_08 = 1;
	else rtest_08 = -0.5;
//Q_09
	prova = document.getElementById("prova_09");
	acertades = 0;
	fail = 0;
	for (i=0; i < prova.options.length; i++){
		punt = false;
		if (prova.options[i].selected){
			for (j=0; j<resp_09.length; j++){
				if (i==resp_09[j]-1) punt=true;
			} if (punt) ++acertades;
			else ++fail;
		} else {
			for (j=0; j<resp_09.length; j++){
				if (i==resp_09[j]-1) punt=true;
			} if (punt) ++fail;
			else ++acertades;

		}
	}

	rtest_09 = 0.25*acertades - 0.25*fail;
//Q_10
	prova = document.getElementById("prova_10");
	acertades = 0;
	fail = 0;
	for (i=0; i < prova.options.length; i++){
		punt = false;
		if (prova.options[i].selected){
			for (j=0; j<resp_10.length; j++){
				if (i==resp_10[j]-1) punt=true;
			} if (punt) ++acertades;
			else ++fail;
		} else {
			for (j=0; j<resp_10.length; j++){
				if (i==resp_10[j]-1) punt=true;
			} if (punt) ++fail;
			else ++acertades;

		}
	}

	rtest_09 = 0.25*acertades - 0.25*fail;
}

function evaluar(){

	document.getElementById("submitButton").style.display = "none";
	document.getElementById("resetButton").style.display = "none";
	evaluacio.style.display = "block";
	var x = CalculNota();
	if (x < 0) 	document.getElementById("NotaEval").innerHTML = "Nota: 0 (negativa)";
	else document.getElementById("NotaEval").innerHTML = "Nota: " + CalculNota();

	//	Desglosament del test

	desglosar("resultat_01",rtest_01);
	desglosar("resultat_02",rtest_02);
	desglosar("resultat_03",rtest_03);
	desglosar("resultat_04",rtest_04);
	desglosar("resultat_05",rtest_05);
	desglosar("resultat_06",rtest_06);
	desglosar("resultat_07",rtest_07);
	desglosar("resultat_08",rtest_08);
	desglosar("resultat_09",rtest_09);
	desglosar("resultat_10",rtest_10);

	window.location.hash = '#evaluacio';
}

function CalculNota(){
	var nota = 0
	nota = rtest_01 + rtest_02 + rtest_03 + rtest_04 + rtest_05 + 
		rtest_06 + rtest_07 + rtest_08 + rtest_09 + rtest_10;
	return nota;	
}

function desglosar(id_res,rt){
	var msg = null;
	if (rt==1) msg = "Correcte! Puntuació: "+rt;
	else if (rt >= 0) msg = "Resposta incompleta. Puntuació: "+rt;
	else msg = "Resposta incorrecte. Puntuació: "+rt;

	document.getElementById(id_res).innerHTML = msg;
}
