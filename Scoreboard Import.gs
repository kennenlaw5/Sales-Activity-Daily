function scoreboard() {
  //Created By Kennen Lawrence
  //Version 1.5
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ui = SpreadsheetApp.getUi();
  var master = ss.getSheetByName('SBMaster');
  var primary = ss.getSheetByName('Team Merrie');
  var dates = primary.getRange(2, 1, 1, primary.getLastColumn()).getDisplayValues();
  var sheet_name = '';
  var col = 0;
  var teams = viewTeams();
  var rows, sheet, sbDate, range, row, formulas, target, name;
  var passed = false;
  
  while (!passed) {
    var sbInput = ui.prompt('Enter Date','Enter the date of the last scoreboard update (MM-DD):', ui.ButtonSet.OK_CANCEL);
    if (sbInput.getSelectedButton() == ui.Button.CANCEL) { ss.toast('Scoreboard was not uploaded.', 'Import Cancelled'); return; }
    if (sbInput.getResponseText().length != 5 || sbInput.getResponseText().split("-")[0].length != 2) {
      ui.alert('Error!', 'The date you entered "' + sbInput.getResponseText()
      + '" is in an incorrect format. Please try again in the format of "MM-DD"', ui.ButtonSet.OK);
    }
    else { passed = true; }
  }
  
  name = 'SB' + sbInput.getResponseText();
  
  if(ss.getSheetByName(name) != null) {
    var exists = ui.alert('Sheet already Exists!', 'The sheet named "' + name 
                          + '" has already been created! Would you like to overide that sheet and reasign the values?'
                          , ui.ButtonSet.YES_NO);
    
    if (exists != ui.Button.YES) { ss.toast('Scoreboard was not uploaded.', 'Import Cancelled'); return; }
    ss.deleteSheet(ss.getSheetByName(name)); SpreadsheetApp.flush();
  }
  passed = false;
  while (!passed) {
    var dateInput = ui.prompt('Enter Date','Enter the date where formulas should be pasted (MM-DD):', ui.ButtonSet.OK_CANCEL);
    if (dateInput.getSelectedButton() == ui.Button.CANCEL) { ss.toast('Scoreboard was not uploaded.', 'Import Cancelled'); return; }
    if (dateInput.getResponseText().length != 5 || dateInput.getResponseText().split("-")[0].length != 2) { 
      ui.alert('Error!', 'The date you entered "' + dateInput.getResponseText() 
      + '" is in an incorrect format. Please try again in the format of "MM-DD"', ui.ButtonSet.OK);
    }
    else { passed = true; }
  }
  ss.toast('Generating new sheet for scoreboard.', 'Duplicating Master', 20);
  master.copyTo(ss).setName(name);
  var sb = ss.getSheetByName(name);
  sb.getRange('D1').setValue(sbInput.getResponseText());
  SpreadsheetApp.flush();
  master.hideSheet();
  sb.hideSheet();
  ss.getSheetByName('1v1').hideSheet();
  SpreadsheetApp.flush();
  for(var i = 0; i < dates[0].length; i++) {
    if (dates[0][i] == dateInput.getResponseText()) {
      col = parseInt(parseInt(i) + parseInt(1)); i = dates[0].length;
    }
  }
  for (i = 0; i < teams.length; i++) {
    sheet_name = teams[i];
    ss.toast('Importing scoreboard for ' + sheet_name + '.', 'Importing ' + sheet_name);
    sheet = ss.getSheetByName(sheet_name);
    rows = teamRows(sheet_name);
    range = sheet.getRange(1, col, sheet.getLastRow(), 1).getValues();
    formulas = sheet.getRange(1, col, sheet.getLastRow(), 1).getFormulas();
    for(var j = 0; j < formulas.length; j++) {
      if (formulas[j][0] != '') { range[j][0] = formulas[j][0]; }
    }
    for(j = 0; j < rows.length; j++) {
      sbDate = sbInput.getResponseText();
      row = parseInt(rows[j]) + 15;
      range[row][0] = "=VLOOKUP($A" + rows[j] + ",'SB" + sbDate + "'!$A$4:$Z,4,FALSE)";
      range[row+1][0] = "=VLOOKUP($A" + rows[j] + ",'SB" + sbDate + "'!$A$4:$Z,14,FALSE)";
      range[row+2][0] = "=VLOOKUP($A" + rows[j] + ",'SB" + sbDate + "'!$A$4:$Z,21,FALSE)";
      range[row+3][0] = "=VLOOKUP($A" + rows[j] + ",'SB" + sbDate + "'!$A$4:$Z,8,FALSE)";
      range[row+4][0] = "=SUM(VLOOKUP($A" + rows[j] + ",'SB" + sbDate +
        "'!$A$4:$Z,24,FALSE),VLOOKUP($A" + rows[j] + ",'SB" + sbDate + "'!$A$4:$Z,26,FALSE))";
    }
    sheet.getRange(1, col, sheet.getLastRow(), 1).setValues(range);
  }
  SpreadsheetApp.flush();
  hardPrint(name);
  ss.toast('Scoreboard import complete!', 'Complete!');
}

function hardPrint(name) {
  //Created By Kennen Lawrence
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
//  var sheet = ss.getActiveSheet();
  var values = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn()).getDisplayValues();
  sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn()).setValues(values);
}