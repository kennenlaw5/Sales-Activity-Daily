//Created By Kennen Lawrence
function apptsShown(){
  //Created By Kennen Lawrence
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Team Stats");
  var range = sheet.getRange('H2:H7');
  sheet.getRange("B2:B7").setValue('TEAM');
  range.setValue('Appts/Shown');
}
function accAvg(){
  //Created By Kennen Lawrence
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Team Stats");
  var range = sheet.getRange('H2:H7');
  sheet.getRange("B2:B7").setValue('TEAM');
  range.setValue('Acc Avg.');
}
function contactedInt(){
  //Created By Kennen Lawrence
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Team Stats");
  var range = sheet.getRange('H2:H7');
  sheet.getRange("B2:B7").setValue('TEAM');
  range.setValue('Contacted Int');
}
function videosPerLead(){
  //Created By Kennen Lawrence
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Team Stats");
  var range = sheet.getRange('H2:H7');
  sheet.getRange("B2:B7").setValue('TEAM');
  range.setValue('Videos/Lead');
}
function allPoints(){
  //Created By Kennen Lawrence
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Team Stats");
  var range = sheet.getRange('H2:H7');
  sheet.getRange("B2:B7").setValue('TEAM');
  range.setValue('All');
}