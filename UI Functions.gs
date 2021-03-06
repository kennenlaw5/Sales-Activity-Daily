function onOpen() {
  //Created By Kennen Lawrence
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  SpreadsheetApp.setActiveSheet(ss.getSheetByName('Team Stats'));
  ss.getSheetByName('Team Stats').getRange('B2').getValue();
  SpreadsheetApp.setActiveSheet(ss.getSheetByName('CA Ranking'));
  ss.getSheetByName('Team Merrie').getRange('C4').getValue();
  SpreadsheetApp.setActiveSheet(ss.getSheetByName('Team Stats'));
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Utilities').addItem('Reset Statistics','reset').addItem('Refresh CA Ranking','rank')
  .addSubMenu(ui.createMenu('Import').addItem('Scoreboard','scoreboard').addItem('Axcessa','axcessa').addItem('Daily Recap','dailyRecapImport'))
  .addSeparator().addSubMenu(ui.createMenu('Help').addItem('By Phone','menuItem1').addItem('By Email','menuItem2')).addToUi();
  var message = 'The spreadsheet has loaded successfully! Have a great day!';
  var title = 'Complete!';
  ss.getSheetByName('1v1').hideSheet();
  ss.getSheetByName('Daily Recap').hideSheet();
  ss.getSheetByName('SBMaster').hideSheet();
  SpreadsheetApp.flush();
  ss.toast(message, title);
}

function menuItem1() {
  SpreadsheetApp.getUi().alert('Call or text (720) 317-5427');
}

function menuItem2() {
  //Created By Kennen Lawrence
  var ui = SpreadsheetApp.getUi();
  var input = ui.prompt('Email Sheet Creator','Describe the issue you\'re having in the box below, then press "Ok" to submit your issue via email:',ui.ButtonSet.OK_CANCEL);
  if (input.getSelectedButton() == ui.Button.OK) {
    MailApp.sendEmail('kennen.lawrence@a2zsync.com','HELP Sales Daily_March',input.getResponseText(),{name:getName()});
  } else if (input.getSelectedButton() == ui.Button.CANCEL) {
    Logger.log('User cancelled');
  }
}

function reset() {
  //Created By Kennen Lawrence
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Team Stats');
  var teams = viewTeams().length;
  sheet.getRange(2, 2, teams).setValue('---');
  sheet.getRange(2, 8, teams).setValue('---');
  ss.getSheetByName('1v1').hideSheet();
}

function all() {
  //Created By Kennen Lawrence
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Team Stats');
  var teams = viewTeams().length;
  var preRange = sheet.getRange(2, 2, teams, 7);
  var range = preRange.getFormulas();
  for (var i = 0; i < range.length; i++) {
    range[i][0]='TEAM';
    range[i][6]='All';
  }
  preRange.setValues(range);
  emailPopUp('All teams and points shown successfully','All stats shown!');
}

function leaders() {
  //Created By Kennen Lawrence
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Team Stats');
  var teams = viewTeams().length;
  var range1 = sheet.getRange(2, 2, teams).setValue('---');
  var range2 = sheet.getRange(2, 8, teams).setValue('All');
}

function refresh() {
  //Created By Kennen Lawrence
  //Version 3.0
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Team Stats');
  var teams = viewTeams().length;
  var range = sheet.getRange(teams + 3, 1, 2)
  var values = range.getValues();
  values[0][0]++;
  values[1][0]++;
  range.setValues(values);
  emailPopUp('All stats refreshed successfully','Stats Refreshed');
}

function refreshpts() {
  //Created By Kennen Lawrence
  //Version 2.0
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Team Stats');
  var teams = viewTeams().length;
  var range = sheet.getRange(teams + 4, 1);
  var value = range.getValue();
  value++;
  range.setValue(value);
  emailPopUp('Points refreshed successfully','Points Refreshed');
}

function team_lead(range) {
  //Created By Kennen Lawrence
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Team Stats');
  var max = 0;
  var names = viewTeams();
  var team = '';
  var rank = [];
  var tie = [];
  var t = 0;
  for (var i in range) {
    rank[i] = [range[i][0], names[i]];
    if (rank[i][0] > max) {
      max = parseInt(rank[i][0]);
      t = 0;
      team = rank[i][1]; 
    } else if (rank[i][0] == max) {
      if (t == 0) { tie[t] = team; t++; }
      tie[t] = rank[i][1];
      t ++;
    }
  }
  if (t > 0) {
    for (i in tie) {
      if (i == 0) { team = tie[0]; }
      else { team += ', ' + tie[i]; }
    }
    team += ' Tied';
  }
  if (max == 0) { return 'No Data!'; } 
  else { return team + ': ' + max + 'pts'; }
}

function team_tail(range) {
  //Created By Kennen Lawrence
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Team Stats');
  var min = 9000;
  var names = viewTeams();
  var team;
  var tie = [];
  var t = 0;
  for (var i in range) {
    if (range[i][0] < min) {
      min = range[i][0];
      team = names[i];
      t = 0;
    } else if (range[i][0] == min) {
      if (t == 0) { tie[t] = team; t++; }
      tie[t]=names[i];
      t++;
    }
  }
  if (t > 0) {
    for (i in tie) {
      if (i == 0) { team = tie[0]; }
      else { team += ', ' + tie[i]; }
    }
    team += ' Tied';
  }
  if (min == 0 && t >= names.length) { return 'No Data!'; }
  else { return team + ': ' + min + 'pts'; }
}
function goto() {
  //Created By Kennen Lawrence
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  SpreadsheetApp.setActiveSheet(ss.getSheetByName('Team Stats'));
}
function viewrank() {
  //Created By Kennen Lawrence
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  SpreadsheetApp.setActiveSheet(ss.getSheetByName('CA Ranking'));
}
function emailPopUp(message, title) {
  //Created By Kennen Lawrence
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var email = Session.getActiveUser().getEmail();
  var name, first;
  name = email.split('@');
  name = name[0];
  name = name.split('.');
  first = name[0];
  first = first[0].toUpperCase() + first.substring(1);
  if (email == 'marko@schomp.com') { first = 'Mr. Osborne'; }
  else if (email == 'jeffe@schomp.com') { first = 'Mr. Edgell'; }
  ss.toast(message + ', ' + first + '!', title, 7);
}
function getName() {
  //Created By Kennen Lawrence
  //Version 1.0
  var email = Session.getActiveUser().getEmail();
  var name, first, last;
  name = email.split('@');
  name = name[0];
  name = name.split('.');
  first = name[0];
  last = name[1];
  first = first[0].toUpperCase() + first.substring(1);
  last = last[0].toUpperCase() + last.substring(1);
  name = first + ' ' + last;
  return name;
}

function showHide (rows) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
}