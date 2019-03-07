function rank(){
  //Version 3.1
  //Created By Kennen Lawrence
  //initialization
  var options = ['points', 'appts/shown', 'acc avg.', 'contacted int', 'videos/lead'];
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet, row, type, name, rows, sheet_name, teams, pointsArray;
  var rank = []; var r = 0; var temp = []; var current = '';
  
  ss.getSheetByName('CA Ranking').getRange(2, 2, ss.getSheetByName('CA Ranking').getLastRow()-1, 7).setValue('');
  ss.getSheetByName('CA Ranking').getRange('J7:K7').setValues([['Updating...', '']]);
  ss.toast('The list is refreshing, please wait! This may take up to 30 seconds!', 'Updating!', 25);
  
  var check = ss.getSheetByName('CA Ranking').getRange('I5:I7').getValues();
  if (check[0][0] != 'All') { teams = [check[0][0]]; } else { teams = viewTeams(); }
  
  var selected = options.indexOf(check[2][0].toLowerCase());
  if (selected === -1) { selected = 0; options = 'invalid'};
  
  for (var l = 0; l < teams.length; l++) {
    sheet_name = teams[l];
    sheet = ss.getSheetByName(sheet_name);
    rows = teamRows(sheet_name);
    name = teamNames(sheet_name);
    for (var k = 0; k < name.length; k++) {
      current = name[k];
      pointsArray = aStats(sheet_name, current, 'ranking');
      if (r === 0) { rank[0] = pointsArray; }
      else {
        for (var m = 0; m < rank.length; m++) {
            
          if (pointsArray[2 + selected] > rank[m][2 + selected]) {
            temp = rank[m];
            rank[m] = pointsArray;
            pointsArray = temp;
          }
          //Handle a tie
          else if (selected !== 0 && pointsArray[2 + selected] === rank[m][2 + selected]) {
            if (pointsArray[2] > rank[m][2]) {
              temp = rank[m];
              rank[m] = pointsArray;
              pointsArray = temp;
            }
          }
          
        }
        rank[r] = pointsArray;
      }
      r++;
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
