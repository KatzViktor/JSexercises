
const readlineSync=require('readline-sync');
function ListNumbers(str, outNumber) {
  if (str.length==0) {
    str=outNumber;
  } else {
    str=str+', '+outNumber;
  }
  return str
}

function Change(str, index) {
	arr=Array.from(str);  
	arr[index]='*';
	str=arr.join('');
  return str;
}

function Compare(botNumber, userNumber){
  twinNrQnt=0;
  twinNr='';
  everyNrQnt=0;
  srchChar='';
  lastNrQnt=0;
  lastNr='';
  str1='';
  str2='';
  for (i=0; i<botNumber.length; i++){
		srchChar=botNumber[i];
    if (srchChar!='*'){
    	everyNrQnt=0;
      for (j=0; j<botNumber.length; j++) {   
      	if (botNumber[j]==srchChar) {
        	if (botNumber[j]==userNumber[j]){
        		botNumber=Change(botNumber, j);
        		userNumber=Change(userNumber, j);
            twinNrQnt=twinNrQnt+1;
            everyNrQnt=everyNrQnt+1;
        	}
        }
      }
     	if (everyNrQnt>0){
      	  if (twinNr!=''){
        	  twinNr=twinNr+', '+ 'symbol <'+srchChar+'> - '+ everyNrQnt;
        	} else {
            twinNr='symbol <'+srchChar+'> - '+ everyNrQnt;
          }
     	}																			
    }
  }
  for (i=0; i<botNumber.length; i++){
		srchChar=botNumber[i];
    if (srchChar!='*'){    
      if (userNumber.includes(srchChar)) {    
      	botCharQnt=0;
        userCharQnt=0;
        for (j=0; j<botNumber.length; j++) {  
        	
         	if (botNumber[j]==srchChar) {
            botCharQnt=botCharQnt+1;
            botNumber=Change(botNumber, j);
          }
          if (userNumber[j]==srchChar) {
          	userCharQnt=userCharQnt+1;
          }       	
        }
        if (botCharQnt<userCharQnt) {
          lastNrQnt=lastNrQnt+botCharQnt;
          	if (lastNr!=''){
              lastNr=lastNr+', '+ 'symbol <'+srchChar+'> - '+ botCharQnt;
            } else {
              lastNr='symbol <'+srchChar+'> - '+ botCharQnt;
            }
          } else {
            lastNrQnt=lastNrQnt+userCharQnt;
            if (lastNr!=''){
              lastNr=lastNr+', '+ 'symbol <'+srchChar+'> - '+ userCharQnt;
            } else {
              lastNr='symbol <'+srchChar+'> - '+ userCharQnt;
            }
          }                                   
  		}
    
    }  
    
  }
 
  if(twinNrQnt>0 | lastNrQnt>0){ 
  	if (twinNrQnt>0){
  		str1=`Right symbols - ${twinNrQnt}, including ${twinNr}.`;
  	}
  	if (lastNrQnt>0){  
    	str2=`Right symbols, but wrong position - ${lastNrQnt}, including ${lastNr}.`;
  	}
  } else {
    str1='All symbols are wrong';
  }
    
    return str1+str2;
}
  
  botCypher='1234';
  userCypher='1235';
  

function Cypher(){
	cypher='';
	minPstn=3;
	maxPstn=6;
  pstnsQnt=Math.floor(Math.random()*(maxPstn-minPstn+1))+minPstn;
	for (let i=0; i<pstnsQnt; i++){
    cypher=cypher+String(Math.floor(Math.random()*10));
  }
  return cypher;
}

botCypher=Cypher();
console.log('Length of cypher is '+ botCypher.length + ' digit');
console.log(botCypher);
userCypher='';
do {
	if (readlineSync.keyInYN("To pick a number - enter \'y\'")) {
                      		userCypher=readlineSync.question('Press number \n');
							if (userCypher==botCypher) {
                           	console.log(`You're entered correct number`);
                         	} else {
								if(userCypher.length==botCypher.length){	
									console.log(Compare(botCypher,userCypher));
                         	    } else {
									console.log(`Length of your number is wrong`);
								}
							}					
   } else {
     break;
   }  
} while (userCypher!=botCypher);