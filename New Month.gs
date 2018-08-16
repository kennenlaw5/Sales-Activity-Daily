function newMonth() {
  //Created By Kennen Lawrence
  var ss=SpreadsheetApp.getActiveSpreadsheet();
  var teams=viewTeams();
  var sheet;var range;var rows;var row;
  for(var i=0;i<teams.length;i++){
    sheet=ss.getSheetByName(teams[i]);
    range=sheet.getRange(2,3,sheet.getLastRow()-1,sheet.getLastColumn()-2).getFormulas();
    rows=teamRows(teams[i]);
    for(var l=0;l<rows.length;l++){
      row=parseInt(parseInt(rows[l])+13);
      for(var j=0;j<6;j++){
        for(var k=0;k<range[row].length;k++){
          range[row][k]='';
        }
        row+=1;
      }
    }
    sheet.getRange(2,3,sheet.getLastRow()-1,sheet.getLastColumn()-2).setValues(range);
    sheet.getRange(2,3,sheet.getLastRow()-1,sheet.getLastColumn()-2).clearNote();
  }
  sbClear();
}
function sbClear(){
  var ss=SpreadsheetApp.getActiveSpreadsheet();
  var sheets=ss.getSheets();
  var names=[];var start=false;
  for(var i=0;i<sheets.length;i++){
    names[i]=sheets[i].getSheetName();
  }
  Logger.log(names);
  for(i=0;i<names.length;i++){
    if(start==true){
      ss.deleteSheet(ss.getSheetByName(names[i]));
      SpreadsheetApp.flush();
    }
    if(names[i]=="SBMaster"){start=true;}
  }
}
function sbRename(){
  var ss=SpreadsheetApp.getActiveSpreadsheet();
  var sheets=ss.getSheets();
  var range,sheet;
  var oldName = "Karen";
  var newName = "Kat";
  var names=[];var start=false;
  for(var i=0;i<sheets.length;i++){
    names[i]=sheets[i].getSheetName();
  }
  for(i=0;i<names.length;i++){
    if(start==true){
      sheet=ss.getSheetByName(names[i]);
      ss.setActiveSheet(sheet);
      range=sheet.getRange(4,1).getFormula();
      if(range==undefined||range==""||range==null){hardPrint(names[i]);}
      range=ss.getSheetByName(names[i]).getRange(4, 1, sheet.getLastRow()).getValues();
      for(var j=0;j<range.length;j++){if(range[j][0].toLowerCase()==oldName.toLowerCase()){range[j][0]=newName;}}
      sheet.getRange(4, 1, sheet.getLastRow()).setValues(range);
      sheet.hideSheet();
      SpreadsheetApp.flush();
    }
    if(names[i]=="SBMaster"){start=true;}
  }
}