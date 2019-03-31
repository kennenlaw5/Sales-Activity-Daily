function newMonth() {
  //Created By Kennen Lawrence
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var teams = viewTeams();
  var sheet, range, rows, row, formulas;
  var rowsToClear = ['appts shown', 'closing ratio', 'internet closing'
                     , 'phone closing', 'fresh closing', 'opent events'];
  
  for (var i = 0; i < teams.length; i++) {
    sheet = ss.getSheetByName(teams[i]);
    range = sheet.getRange(2, 3, sheet.getLastRow() - 1, sheet.getLastColumn() - 2);
    formulas = range.getFormulas();
    rows = teamRows(teams[i]);
    
    for (var l = 0; l < rows.length; l++) {
      
      for (var m = 0; m < rowsToClear.length; m++) {
        row = parseInt(rows[l]) - 2 + dataRows(rowsToClear[m]);
        
        for (var n = 0; n < formulas[row].length; n++) {
          formulas[row][n] = '';
        }
      }
    }
    
    range.setValues(formulas);
    range.clearNote();
  }
  
  sbClear();
  rank();
  reset();
  ss.getSheetByName('SBMaster').activate().getRange('A4').activateAsCurrentCell();
  ss.toast('Please allow access to Scoreboard in cell A4!', 'Allow Access');
}

function sbClear() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  var names = [];
  var start = false;
  
  for (var i = 0; i < sheets.length; i++) {
    names[i] = sheets[i].getSheetName();
  }
  
  for (i = 0; i < names.length; i++) {
    if (start) {
      ss.deleteSheet(ss.getSheetByName(names[i]));
      SpreadsheetApp.flush();
    }
    if (names[i] == 'SBMaster') { start = true; }
  }
}

function sbRename() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  var range, sheet;
  var oldName = 'Karen';
  var newName = 'Kat';
  var names = [];
  var start = false;
  
  for (var i = 0; i < sheets.length; i++) {
    names[i] = sheets[i].getSheetName();
  }
  
  for (i = 0; i < names.length; i++) {
    if (start) {
      sheet = ss.getSheetByName(names[i]);
      ss.setActiveSheet(sheet);
      range = sheet.getRange(4, 1).getFormula();
      if (range == undefined || range == ''|| range == null) { hardPrint(names[i]); }
      range = ss.getSheetByName(names[i]).getRange(4, 1, sheet.getLastRow()).getValues();
      
      for(var j = 0; j < range.length; j++) {
        if (range[j][0].toLowerCase() == oldName.toLowerCase()) { range[j][0] = newName; }
      }
      
      sheet.getRange(4, 1, sheet.getLastRow()).setValues(range);
      sheet.hideSheet();
      SpreadsheetApp.flush();
    }
    if (names[i] == 'SBMaster') { start = true; }
  }
}

function accAvg () {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var teams = viewTeams();
  var letters = ['C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG'];
  
  for (var i = 0; i < teams.length; i++) {
    var sheet = ss.getSheetByName(teams[i]);
    var range = sheet.getRange(3, 3, sheet.getLastRow() - 2, sheet.getLastColumn() - 2);
    var formulas = range.getFormulas();
    var values = range.getValues();
    var rows = teamRows(teams[i]);
    
    for (var j = 0; j < values.length; j++) {
      for (var k = 0; k < values[i].length; k++) {
        if (formulas[j][k] !== '') { values[j][k] = formulas[j][k]; }
      }
    }
    
    for (j = 0; j < rows.length; j++) {
      var row = rows[j] - 3 + dataRows('avg accessories');
      
      for (k = 0; k < values[row].length; k++) {
        values[row][k] = '=IFERROR(' + letters[k] + (rows[j] + dataRows('accessories')) + '/SUM(' + letters[k] + (rows[j] + dataRows('new')) + ',' + letters[k] + (rows[j] + dataRows('used')) + '),"")';
      }
    }
    range.setValues(values);
  }
}