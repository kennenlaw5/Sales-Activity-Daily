//Created By Kennen Lawrence
function maxdig(){
  //Created By Kennen Lawrence
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Team Stats");
  var range = sheet.getRange("I2:I7");
  sheet.getRange("B2:B7").setValue('TEAM');
  range.setValue('Max Digital');
}
function vid(){
  //Created By Kennen Lawrence
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Team Stats");
  var range = sheet.getRange("I2:I7");
  sheet.getRange("B2:B7").setValue('TEAM');
  range.setValue('Videos');
}
function testi(){
  //Created By Kennen Lawrence
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Team Stats");
  var range = sheet.getRange("I2:I7");
  sheet.getRange("B2:B7").setValue('TEAM');
  range.setValue('Testimonials');
}
function acc(){
  //Created By Kennen Lawrence
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Team Stats");
  var range = sheet.getRange("I2:I7");
  sheet.getRange("B2:B7").setValue('TEAM');
  range.setValue('Accolades');
}
function adv(){
  //Created By Kennen Lawrence
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Team Stats");
  var range = sheet.getRange("I2:I7");
  sheet.getRange("B2:B7").setValue('TEAM');
  range.setValue('Advantastars');
}