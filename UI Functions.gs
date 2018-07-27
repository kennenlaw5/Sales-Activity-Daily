function onOpen() {
  //Created By Kennen Larence
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  SpreadsheetApp.setActiveSheet(ss.getSheetByName("Team Stats"));
  ss.getSheetByName("Team Stats").getRange("B2").getValue();
  SpreadsheetApp.setActiveSheet(ss.getSheetByName("CA Ranking"));
  ss.getSheetByName("Team Jeff").getRange("C4").getValue();
  SpreadsheetApp.setActiveSheet(ss.getSheetByName("Team Stats"));
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Utilities').addSubMenu(ui.createMenu('Help').addItem('By Phone','menuItem1').addItem('By Email','menuItem2')).addItem('Reset Statistics','reset')
  .addItem('Refresh CA Ranking','rank').addItem('Import Scoreboard','scoreboard').addItem('Axcessa Import','axcessa').addToUi();
  var message = 'The spreadsheet has loaded successfully! Have a great day!';
  var title = 'Complete!';
  SpreadsheetApp.getActiveSpreadsheet().toast(message, title);
}
function menuItem1() {
  SpreadsheetApp.getUi().alert('Call or text (720) 317-5427');
}
function menuItem2() {
  //Created By Kennen Larence
  var ui = SpreadsheetApp.getUi();
  var input = ui.prompt('Email Sheet Creator','Describe the issue you\'re having in the box below, then press "Ok" to submit your issue via email:',ui.ButtonSet.OK_CANCEL);
  if (input.getSelectedButton() == ui.Button.OK) {
    MailApp.sendEmail('kennen.lawrence@schomp.com','HELP Sales Daily_July',input.getResponseText(),{name:getName()});
  } else if (input.getSelectedButton() == ui.Button.CANCEL) {
    Logger.log('User cancelled');
  }
}
function reset(){
  //Created By Kennen Larence
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Team Stats");
  sheet.getRange("B2:B7").setValue('---');
  sheet.getRange("I2:I7").setValue('---');
  ss.getSheetByName("1v1").hideSheet();
}
function all(){
  //Created By Kennen Larence
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Team Stats");
  var preRange=sheet.getRange("B2:I7");
  var range=preRange.getFormulas();
  for(var i=0;i<range.length;i++){
    range[i][0]="TEAM";range[i][7]="All";
  }
  preRange.setValues(range);
  emailPopUp('All teams and points shown successfully','All stats shown!');
}
function leaders(){
  //Created By Kennen Larence
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Team Stats");
  var range1 = sheet.getRange("B2:B7").setValue('---');
  var range2 = sheet.getRange("I2:I7").setValue('All');
}
function refresh(){
  //Created By Kennen Larence
  //Version 3.0
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Team Stats");
  var range1 = sheet.getRange("A9:A10").getValues();
  range1[0][0]+=1;range1[1][0]+=1;
  sheet.getRange("A9:A10").setValues(range1);
  emailPopUp('All stats refreshed successfully','Stats Refreshed');
}
function refreshpts(){
  //Created By Kennen Larence
  //Version 2.0
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Team Stats");
  var range = sheet.getRange("A10").getValue();
  range+=1;
  sheet.getRange("A10").setValue(range);
  emailPopUp('Points refreshed successfully','Points Refreshed');
}
function team_lead(){
  //Created By Kennen Larence
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Team Stats");
  var range = sheet.getRange("J2:J7").getValues();
  var max=0;
  var names=viewTeams();
  var team="";
  var rank=[];
  var tie=[];var t=0;
  for(var i in range){
    rank[i]=[range[i][0],names[i]];
    if(rank[i][0]>max){max=rank[i][0];t=0;team=rank[i][1];}else if(rank[i][0]==max){if(t==0){tie[t]=rank[i][1];t+=1;}tie[t]=rank[i][1];t+=1;team="Tie";}
  }
  if(team=="Tie"){
    for(var m in tie){if(m==0){team=tie[0];}else{team+=", "+tie[m]}}
    team+=" Tied";
  }//else{team="Team "+team;}
  if(max==0){return "No Data!";}else{return team+": "+max+"pts";}
}
function team_tail(){
  //Created By Kennen Larence
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Team Stats");
  var range = sheet.getRange("J2:J7").getValues();
  var min=9000;
  var names=viewTeams();
  var team;
  var tie=[];var t=0;
  for(var i in range){
    if(range[i][0]<min){min=range[i][0];team=names[i];t=0;}else if(range[i][0]==min){if(t==0){tie[t]=team;t+=1;}tie[t]=names[i];t+=1;team="Tie";}
  }
  if(team=="Tie"){
    for(var m in tie){if(m==0){team=tie[0];}else{team+=", "+tie[m]}}
    team+=" Tied";
  }//else{team="Team "+team;}
  if(min==0&&team_lead()=="No Data!"){return "No Data!";}else{return team+": "+min+"pts";}
}
function goto(){
  //Created By Kennen Larence
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  SpreadsheetApp.setActiveSheet(ss.getSheetByName("Team Stats"));
}
function viewrank(){
  //Created By Kennen Larence
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  SpreadsheetApp.setActiveSheet(ss.getSheetByName("CA Ranking"));
}
function emailPopUp(message,title){
  //Created By Kennen Larence
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var email = Session.getActiveUser().getEmail();
  var name;var first;
  name = email.split("@schomp.com");
  Logger.log(name);
  name=name[0];
  name=name.split(".");
  first=name[0];
  first=first[0].toUpperCase() + first.substring(1);
  if(email=="marko@schomp.com"){first="Mr. Osborne";}
  else if(email=="jeffe@schomp.com"){first="Mr. Edgell";}
  ss.toast(message+', '+first+'!',title, 7);
}
function getName(){
  //Created By Kennen Lawrence
  //Version 1.0
  var email = Session.getActiveUser().getEmail();
  var name;var first;var last;
  name = email.split("@schomp.com");
  name=name[0];
  name=name.split(".");
  first=name[0];
  last=name[1];
  first= first[0].toUpperCase() + first.substring(1);
  last=last[0].toUpperCase() + last.substring(1);
  name=first+" "+last;
  Logger.log(name);
  return name;
}