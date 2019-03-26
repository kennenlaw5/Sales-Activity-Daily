function dailyRecapImport() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ui = SpreadsheetApp.getUi();
  var date = new Date();
  var day = date.getDay() - 1;
  if (day < 1) { day = 6; }
  var date = date.getDate() - 2;
  var format = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th',
                '16th', '17th', '18th', '19th', '20th', '21st', '22nd', '23rd', '24th', '25th', '26th', '27th', '28th', '29th',
                '30th', '31st'];
  var prompt, pasteSheet, pasteRange, pasteFormulas, pasteValues, teams, rows, currentRow, recapNames;
  var confirmed = false;
  
  while (!confirmed) {
    if (day < 1 || date < 0 || date > 30) {
      prompt = ui.prompt('Enter day of Month', 'Please enter the day of the month you wish to import from scoreboard.' +
                         ' It will be imported for the same day on SAD.', ui.ButtonSet.OK_CANCEL); 
      if (prompt.getSelectedButton() != ui.Button.OK) { return; }
      date = parseInt(prompt.getResponseText(), 10) - 1;
    }
    if (date >= 0 && date < 31) {
      prompt = ui.alert('Confirm Day', 'Daily Recap will be imported from the ' + format[date] + ' to SAD on the same day. Is this date correct?'
                         , ui.ButtonSet.YES_NO_CANCEL);
      if (prompt == ui.Button.YES) { confirmed = true; }
      else if (prompt == ui.Button.NO) { date = -1; }
      else { return; }
    }
  }
  
  var sourceSheet = ss.getSheetByName('Daily Recap');
  sourceSheet.getRange(1, 4).setValue(format[date]);
  SpreadsheetApp.flush();
  var sourceRange = sourceSheet.getRange(3, 1, sourceSheet.getLastRow(), sourceSheet.getLastColumn()).getValues();
  var advisors = [[sourceRange[0][0], sourceRange[0][9] == '' ? 0 : parseInt(sourceRange[0][9], 10), 1]];
  
  for (var i = 1; i < sourceRange.length; i++) {
    confirmed = false;
    if (sourceRange[i][0] != '') {
      for (var j = 0; j < advisors.length && !confirmed; j++) {
        if (advisors[j][0].toLowerCase() === sourceRange[i][0].toLowerCase()) {
          confirmed = true;
          advisors[j][1] += sourceRange[i][9] == '' ? 0 : parseInt(sourceRange[i][9], 10);
          advisors[j][2]++;
        }
      }
      if (!confirmed) { advisors[advisors.length] = [sourceRange[i][0], sourceRange[i][9] == '' ? 0 : parseInt(sourceRange[i][9], 10), 1]; }
    }
  }
  
  var teams = viewTeams();
  date += 3;
  for (i = 0; i < teams.length; i++) {
    ss.toast('Now Importing for ' + teams[i], teams[i], 30);
    pasteSheet = ss.getSheetByName(teams[i]);
    pasteRange = pasteSheet.getRange(1, date, pasteSheet.getLastRow());
    pasteFormulas = pasteRange.getFormulas();
    pasteValues = pasteRange.getValues();
    
    for (j = 0; j < pasteValues.length; j++) {
      if (pasteFormulas[j][0] != '') { pasteValues[j][0] = pasteFormulas[j][0]; }
    }
    
    rows = teamRows(teams[i]);
    recapNames = dailyRecapNames(teams[i]);
    
    for (j = 0; j < rows.length; j++) {
      currentRow = rows[j] - 1 + dataRows('accessories');
      confirmed = false;
      
      for (var k = 0; k < advisors.length && !confirmed; k++) {
        if (recapNames[j].toLowerCase() == advisors[k][0].toLowerCase()) {
          pasteValues[currentRow][0] = advisors[k][1];
          confirmed = true;
        }
      }
      
      if (!confirmed) { pasteValues[currentRow][0] = 0; }
    }
    
    pasteRange.setValues(pasteValues);
  }
  ss.toast('Daily Recap Import has completed successfully!', 'Complete', 5);
}
