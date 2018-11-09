function axcessa() {
  //Created By Kennen Lawrence
  //Version 1.3.0
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ui = SpreadsheetApp.getUi(); 
  var found = false;
  var target1 = ss.getSheetByName("Performance");
  var target2 = ss.getSheetByName("Report");
  var target3 = ss.getSheetByName("Report (1)");
  var target4 = ss.getSheetByName("Report (2)");
  var target5 = ss.getSheetByName("Report (3)");
  var sheets = [target1, target2, target3, target4, target5];
  var allTargets = [target1, null, null, null, null];
  var temp, temp1;
  var current, input, type;
  if (target1 == null || target2 == null || target3 == null || target4 == null || target5 == null) {
    ui.alert('Sheets not uploaded!', 'One or more of the Axcessa sheets are missing or misnamed! Please correct then try again.', ui.ButtonSet.OK);
    return;
  }
  for (var i = 1; i < sheets.length; i++) {
    sheets[i].activate();
    SpreadsheetApp.flush();
    //Determine new or used
    if ((allTargets[1] == null || allTargets[3] == null) && (allTargets[2] == null || allTargets[4] == null)) {
      input = ui.alert('New?', 'Is this a sheet for NEW sales?', ui.ButtonSet.YES_NO);
      if (input == ui.Button.CLOSE) { return; }
      if (input == ui.Button.YES) { current = [1, 3]; type = 'new'; }
      else if (input == ui.Button.NO) { current = [2, 4]; type = 'used'; }
      else { throw 'Invalid selection made. Neither Yes, No, or Close were selected'; }
    }
    //must be used
    else if (allTargets[1] != null && allTargets[3] != null) { current = [2, 4]; type = 'used'; }
    //must be new
    else if (allTargets[2] != null && allTargets[4] != null) { current = [1, 3]; type = 'new'; }
    //impossible scenario
    else { throw 'Impossible New/Used scenario at i = ' + i + ' and allTargets = ' + allTargets;}
    
    //Determine PVR or Counts
    if (allTargets[current[0]] == null && allTargets[current[1]] == null) {
      input = ui.alert('PVR?', 'Is this sheet the ' + type.toUpperCase() + ' PVR sheet?', ui.ButtonSet.YES_NO);
      if (input == ui.Button.CLOSE) { return; }
      if (input == ui.Button.YES) { current = current[0]; }
      else if (input == ui.Button.NO) { current = current[1]; }
      else { throw 'Invalid selection made. Neither Yes, No, or Close were selected'; }
    }
    //must be PVR
    else if (allTargets[current[0]] == null && allTargets[current[1]] != null) { current = current[0]; }
    //must be Counts
    else if (allTargets[current[0]] != null && allTargets[current[1]] == null) { current = current[1]; }
    //impossible scenario
    else { throw 'Impossible PVR/Counts scenario at i = ' + i + ' and allTargets = ' + allTargets;}
    
    if (current.length == undefined && current > 0 && current < 5 && allTargets[current] == null) { allTargets[current] = sheets[i]; }
    else { throw 'Selection error at i = ' + i + ' with current = ' + current + ' and allTargets[current] = ' + allTargets[current]; }
  }
  //Logger.log(allTargets);
  for (i = 0; i < allTargets.length; i++) {
    //Logger.log(allTargets[i].getSheetName());
  }
  var allValues = [];
  for (i = 0; i < allTargets.length; i++) {
    allValues[i] = allTargets[i].getRange(1, 1, allTargets[i].getLastRow(), allTargets[i].getLastColumn()).getValues();
    //Logger.log(allValues[i]);
  }
  var cols = [];
  var acc = [];
  for (i = 1; i < allValues.length; i++) {
    for (var j = 0; j < allValues[i][0].length; j++) {
      if (allValues[i][0][j] == 'Acc') { acc[i-1]=j; }
      else if (allValues[i][0][j] == 'Product') { cols[i-1] = j; j = allValues[i][0].length; }
    }
    if (acc[i-1] == undefined) {acc[i-1] = 'None'; }
  }
  Logger.log(cols);Logger.log(acc);
  found = false;
  while (!found) { 
    var dateInput = ui.prompt('Enter Date', 'Enter the date where values should be pasted (MM-DD):', ui.ButtonSet.OK_CANCEL);
    if (dateInput.getSelectedButton() == ui.Button.CANCEL) { ss.toast('Axcessa values were not uploaded.', 'Import Cancelled'); return; }
    if (dateInput.getResponseText().length != 5 || dateInput.getResponseText().split("-")[0].length != 2) {
      ui.alert('Error!', 'The date you entered "' + dateInput.getResponseText() + '" is in an incorrect format. Please try again in the format of "MM-DD"', ui.ButtonSet.OK);
    }
    else { found = true; }
  }
  var sheet_name = '';
  var col = parseInt(dateInput.getResponseText().split('-')[1], 10) + 2;
  //Logger.log(col);
  var teams = viewTeams();
  var rows, sheet, range, row, formulas, cas, accValue;
  ss.getSheetByName('1v1').hideSheet();
  
  for (i = 0; i < teams.length; i++) { 
    sheet_name = teams[i];
    ss.toast('Importing Axcessa for ' + sheet_name + '.', 'Importing ' + sheet_name, 20);
    sheet = ss.getSheetByName(sheet_name);
    rows = teamRows(sheet_name);
    cas = axcessaNames(sheet_name);
    range = sheet.getRange(1, col, sheet.getLastRow(), 1).getValues();
    formulas=sheet.getRange(1, col, sheet.getLastRow(), 1).getFormulas();
    for (j = 0; j < rows.length; j++) { 
      accValue = 0;
      found = false;
      row = parseInt(rows[j]) + 20;
      for (var k = 0; k < allValues[0].length && !found; k++) {
        if ((allValues[0][k] == undefined || allValues[0][k][0] == '' || allValues[0][k][0] == undefined)
            && (allValues[0][k+1] == undefined || allValues[0][k+1][0] == '' || allValues[0][k+1][0] == undefined))
        {
          break;
        }
        if (allValues[0][k][0] != '' && allValues[0][k][0] != undefined && allValues[0][k][0] != 'Employee') {
          if (allValues[0][k][0].toLowerCase() == cas[j].toLowerCase()) { 
            Logger.log("Found "+cas[j]+" in 1 "+allValues[0][k][1]+" "+allValues[0][k][2]);
            range[row][0] = allValues[0][k][1];
            range[row+1][0] = allValues[0][k][2];
            found = true;
          }
        }
      }
      if (!found) { Logger.log(cas[j]+" wasn't found in "+allTargets[0].getSheetName()); range[row][0]=0; range[row+1][0]=0; }
      found = false;
      for (k = 0; k < allValues[1].length && !found; k++) { 
        if ((allValues[1][k] == undefined || allValues[1][k][0] == '' || allValues[1][k][0] == undefined)
            && (allValues[1][k+1] == undefined || allValues[1][k+1][0] == '' || allValues[1][k+1][0] == undefined))
        {
          break;
        }
        if (allValues[1][k] != undefined && allValues[1][k][0] != '' && allValues[1][k][0] != 'Name') { 
          if (allValues[1][k][0].toLowerCase() == cas[j].toLowerCase()) { 
            Logger.log("Found "+cas[j]+" in 2 "+allValues[1][k][cols[0]]+" "+allValues[1][k][cols[0]+1]);
            range[row+3][0] = Math.round(allValues[1][k][cols[0]+1]);
            found = true;
          }
        }
      }
      if (!found) { Logger.log(cas[j]+" wasn't found in "+allTargets[1].getSheetName()); range[row+3][0]=0; }
      found = false;
      for (k = 0; k < allValues[2].length && !found; k++) { 
        if ((allValues[2][k] == undefined || allValues[2][k][0] == '' || allValues[2][k][0] == undefined)
            && (allValues[2][k+1] == undefined || allValues[2][k+1][0] == '' || allValues[2][k+1][0] == undefined))
        { 
          break; 
        }
        if (allValues[2][k] != undefined && allValues[2][k][0] != '' && allValues[2][k][0] != 'Name') { 
          if (allValues[2][k][0].toLowerCase() == cas[j].toLowerCase()) { 
            Logger.log("Found "+cas[j]+" in 3 "+allValues[2][k][cols[1]]+" "+allValues[2][k][cols[1]+1]);
            range[row+5][0] = Math.round(allValues[2][k][cols[1]+1]);
            found = true;
          }
        }
      }
      if (!found) { Logger.log(cas[j]+" wasn't found in "+allTargets[2].getSheetName()); range[row+5][0]=0; }
      found = false;
      for (k = 0; k < allValues[3].length && !found; k++) { 
        if ((allValues[3][k] == undefined || allValues[3][k][0] == '' || allValues[3][k][0] == undefined)
            && (allValues[3][k+1] == undefined || allValues[3][k+1][0] == '' || allValues[3][k+1][0] == undefined))
        { 
          break;
        }
        if (allValues[3][k] != undefined && allValues[3][k][0] != '' && allValues[3][k][0] != 'Name') { 
          if (allValues[3][k][0].toLowerCase() == cas[j].toLowerCase()) { 
            Logger.log("Found "+cas[j]+" in 4 "+allValues[3][k][cols[2]]);
            if (allValues[3][k][1] == 0 && acc[2] != 'None') { 
              accValue += Math.round(parseInt(allValues[3][k][acc[2]]));
              range[row+2][0] = 'N/A';
            } else if (allValues[3][k][1] == 0 && acc[2] == 'None') { 
              range[row+2][0] = 'N/A';
            } else if (acc[2] == 'None') { 
              range[row+2][0] = allValues[3][k][cols[2]] / allValues[3][k][1];
              range[row+2][0] = range[row+2][0].toFixed(1);
            } else { 
              range[row+2][0] = (allValues[3][k][cols[2]] - allValues[3][k][acc[2]]) / allValues[3][k][1];
              range[row+2][0] = range[row+2][0].toFixed(1);
              accValue += Math.round(parseInt(allValues[3][k][acc[2]]));
            }
            found = true;
          }
        }
      }
      if (!found) { Logger.log(cas[j]+" wasn't found in "+allTargets[3].getSheetName()); range[row+2][0]=0; }
      found = false;
      for (k = 0; k < allValues[4].length && !found; k++) { 
        if ((allValues[4][k] == undefined || allValues[4][k][0] == '' || allValues[4][k][0] == undefined)
            && (allValues[4][k+1] == undefined || allValues[4][k+1][0] == '' || allValues[4][k+1][0] == undefined))
        {
          break;
        }
        if (allValues[4][k] != undefined && allValues[4][k][0] != '' && allValues[4][k][0] != 'Name') { 
          if (allValues[4][k][0].toLowerCase() == cas[j].toLowerCase()) { 
            Logger.log("Found "+cas[j]+" in 5 "+allValues[4][k][cols[3]]);
            if (allValues[4][k][1] == 0 && acc[3] != 'None') { 
              accValue += Math.round(parseInt(allValues[4][k][acc[3]]));
              range[row+4][0] = 'N/A';
            }else if (allValues[4][k][1] == 0 && acc[3] == 'None') { 
              range[row+4][0] = 'N/A';
            }else if (acc[3] == 'None') { 
              range[row+4][0] = allValues[4][k][cols[3]] / allValues[4][k][1];
              range[row+4][0] = range[row+4][0].toFixed(1);
            }
            else { 
              range[row+4][0] = (allValues[4][k][cols[3]] - allValues[4][k][acc[3]]) / allValues[4][k][1];
              range[row+4][0] = range[row+4][0].toFixed(1);
              accValue += Math.round(parseInt(allValues[4][k][acc[3]]));
            }
            found = true;
          }
        }
      }
      if (!found) { Logger.log(cas[j]+" wasn't found in "+allTargets[4].getSheetName()); range[row+4][0]=0; }
      Logger.log("Adding accValue '"+accValue+"' to range at row "+(row+6));
      range[row+6][0] = accValue;
    }
    for (j = 0; j < formulas.length; j++) { 
      if (formulas[j][0] != '') { range[j][0] = formulas[j][0]; }
    }
    //Logger.log(range);
    sheet.getRange(1, col, sheet.getLastRow(), 1).setValues(range);
  }
  ss.toast('All teams have been imported successfully. Now deleteing Axcessa sheets.', 'Removing Axcessa Sheets', 20);
  for (i = 0; i < allTargets.length; i++) { ss.deleteSheet(allTargets[i]); }
  ss.deleteSheet(ss.getSheetByName('Store Summary'));
  ss.toast('Axcessa sheets have been deleted. Import completed successfully!', 'Complete!', 5);
}
