function rank(){
  //Version 3.1
  //Created By Kennen Lawrence
  //initialization
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet, row, type, name, rows, sheet_name, teams, check, pointsArray, check1;
  var rank = []; var r = 0; var temp = []; var current = '';
  
  ss.getSheetByName('CA Ranking').getRange(2, 2, ss.getSheetByName('CA Ranking').getLastRow()-1, 7).setValue('');
  ss.getSheetByName('CA Ranking').getRange('J7:K7').setValues([['Updating...', '']]);
  ss.toast('The list is refreshing, please wait! This may take up to 30 seconds!', 'Updating!', 25);
  
  check = ss.getSheetByName('CA Ranking').getRange('I5:I7').getValues();
  if (check[0][0] != 'All') { teams = [check[0][0]]; } else { teams = viewTeams(); }
  
  for (var l = 0; l < teams.length; l++) {
    sheet_name = teams[l];
    sheet = ss.getSheetByName(sheet_name);
    rows = teamRows(sheet_name);
    name = teamNames(sheet_name);
    for (var k = 0; k < name.length; k++) {
      current = name[k];
      pointsArray = aStats(sheet_name, current, 'ranking');
      if (r == 0) { rank[0] = pointsArray; }
      else {
        for (var m = 0; m < rank.length; m++) {
          if (check[2][0] == 'Points') {
            if (pointsArray[2] > rank[m][2]) {
              temp = rank[m];
              rank[m] = pointsArray;
              pointsArray = temp;
            }
          } else if (check[2][0] == 'Videos') {
            if (pointsArray[3] > rank[m][4]) {
              temp = rank[m];
              rank[m] = pointsArray;
              pointsArray = temp;
            }
          } else if (check[2][0] == 'Accolades') {
            if (pointsArray[4] > rank[m][5]) {
              temp = rank[m];
              rank[m] = pointsArray;
              pointsArray = temp;
            }
          } else if (check[2][0] == 'Testimonials') {
            if (pointsArray[5] > rank[m][6]) {
              temp = rank[m];
              rank[m] = pointsArray;
              pointsArray = temp;
            }
          } else if (check[2][0] == 'Max Digital') {
            if (pointsArray[6] > rank[m][7]) {
              temp = rank[m];
              rank[m] = pointsArray;
              pointsArray = temp;
            }
          } else if (check[2][0] == 'Advantastars') {
            if (pointsArray[7] > rank[m][8]) {
              temp = rank[m];
              rank[m] = pointsArray;
              pointsArray = temp;
            }
          }
        }
        rank[r] = pointsArray;
      }
      r += 1;
    }
  }
  row = 2;
  sheet = ss.getSheetByName('CA Ranking');
  sheet.getRange(row, 2, rank.length, rank[0].length).setValues(rank);
  var email = Session.getActiveUser().getEmail();
  var name, first;
  name = email.split('@');
  name = name[0];
  name = name.split('.');
  first = name[0];
  first = first[0].toUpperCase() + first.substring(1);
  if (email == 'marko@schomp.com') { first = 'Mr. Osborne'; }
  if (email == 'jeffe@schomp.com'){ first = 'Mr. Edgell'; }
  var d = new Date();
  var timestamp = d.toLocaleTimeString();
  timestamp = timestamp.split(' MDT')[0];
  timestamp = timestamp.split(' MST')[0];
  timestamp = timestamp.split(':');
  timestamp = [timestamp[0], timestamp[1]].join(':') + timestamp[2].split(' ')[1];
  sheet.getRange('J7:K8').setValues([[timestamp,d], ['Last Sort By:', check[2][0]]]);
  ss.toast('The list has successfully updated! Have a great rest of your day, ' + first + '!', 'Success!', 7);
}

function ranking(){
  //Version 2.1
  //Created By Kennen Lawrence
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("CA Ranking");
  var names = sheet.getRange("B2:B29").getValues();
  var teams = sheet.getRange("C2:C29").getValues();
  var points = [];
  for(var i in names) {
    i = parseInt(i);
    if (names[i] != '') { points[i] = aStats(teams[i], names[i], 'rank'); }
    else { points[i] = ['', '', '', '', '']; }
  }
  sheet.getRange('F2:J29').setValues(points);
}
//OUTDATED CODE - OLD VERSION
//Version 1.2
/*function ranking(sheet_name,n){
  //initialization
  var type;
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheet_name);
  var row;
  var value=0;
  var name;
  var rows;
  var option=["Videos","Accolades","Testimonials","Max Digital","Advantastars"];
  var answer=[];
  
  rows=teamRows(sheet_name);
  
  for(var j=0;j<option.length;j++){
    type=option[j];
    for(var i=0;i<name.length;i++){
      if(n==name[i]){row=rows[i];}
    }
    if(type=="Accolades"){row+=5;}else if(type=="Testimonials"){row+=6;}else if(type=="Advantastars"){row+=7;}else if(type=="Max Digital"){
      row+=8;}else if(type=="Total CTI"){row+=4;}else if(type=="Emails"){row+=1;}else if(type=="Texts"){row+=2;}else if(type=="CTI >3 Min"){row+=3;}else if(type=="Videos"){row+=9;}
    var range = sheet.getRange(parseInt(row),3,1,sheet.getLastColumn()).getValues();
    for (var i in range[0]) {
      if(!isNaN(parseInt(range[0][i]))){
        value += parseInt(range[0][i]);
        //Logger.log(parseInt(range[0][i]));
      }else{value +=0;}
    }
    answer[j]=parseInt(value);
    value=0;
  }
  return answer;
}*/
