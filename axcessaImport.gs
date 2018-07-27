function axcessa() {
  //Created By Kennen Larence
  //Version 1.0
  var ss=SpreadsheetApp.getActiveSpreadsheet();
  var ui = SpreadsheetApp.getUi();
  var found=false;
  var target1=ss.getSheetByName("Performance");
  var target2=ss.getSheetByName("Report");
  var target3=ss.getSheetByName("Report (1)");
  var sheets=[target1,target2,target3];var temp;var check=[];
  if(target2==null||target1==null||target3==null){ui.alert('Sheets not uploaded!', 'One or more of the Axcessa sheets are missing or misnamed! Please correct then try again.', ui.ButtonSet.OK); return;}
  ss.setActiveSheet(target2);
  SpreadsheetApp.flush();
  while(!found){
    sheets=ui.alert("New PVR", "Is this the sheet that contains the NEW PVR?", ui.ButtonSet.YES_NO_CANCEL);
    if(sheets==ui.Button.YES){found=true;}
    else if(sheets==ui.Button.NO){
      temp=target2;target2=target3;target3=temp;
      ss.setActiveSheet(target2);
      SpreadsheetApp.flush();
    }
    else if(sheets==ui.Button.CANCEL){ss.toast('Axcessa values were not uploaded.','Import Cancelled');return;}
  }Logger.log(target2.getSheetName());
  sheets=[target1,target2,target3];
  found=false;
  while(!found){
    var dateInput = ui.prompt('Enter Date','Enter the date where values should be pasted (MM-DD):',ui.ButtonSet.OK_CANCEL);
    if(dateInput.getSelectedButton()==ui.Button.CANCEL){ss.toast('Axcessa values were not uploaded.','Import Cancelled');return;}
    if(dateInput.getResponseText().length!=5 || dateInput.getResponseText().split("-")[0].length!=2){ui.alert("Error!", "The date you entered '"+dateInput.getResponseText()+"' is in an incorrect format. Please try again in the format of 'MM-DD'", ui.ButtonSet.OK);}
    else{found=true;}
  }
  var values1=target1.getRange(1,1,target1.getLastRow(),target1.getLastColumn()).getValues();
  var values2=target2.getRange(1,1,target2.getLastRow(),target2.getLastColumn()).getValues();
  var values3=target3.getRange(1,1,target3.getLastRow(),target3.getLastColumn()).getValues();
  var allValues=[values1,values2,values3];
  var primary=ss.getSheetByName("Team Jeff");
  var dates=primary.getRange(2,1,1,primary.getLastColumn()).getDisplayValues();var sheet_name="";var col=0;
  var teams=viewTeams();
  var rows, sheet, range, row, formulas, cas;
  var cols=[];
  for(var i=1;i<allValues.length;i++){
    for(var j=0;j<allValues[i][0].length;j++){
      if(allValues[i][0][j]=="Product"){cols[i-1]=j;j=allValues[i][0].length;}
    }
  }
  ss.getSheetByName("1v1").hideSheet();
  for(var i=0;i<dates[0].length;i++){
    if(dates[0][i]==dateInput.getResponseText()){col=parseInt(parseInt(i)+parseInt(1));i=dates[0].length;}
  }
  for(i=0;i<teams.length;i++){
    sheet_name=teams[i];
    sheet=ss.getSheetByName(sheet_name);
    rows=teamRows(sheet_name);
    cas=axcessaNames(sheet_name);
    range=sheet.getRange(1,col,sheet.getLastRow(),1).getValues();
    formulas=sheet.getRange(1,col,sheet.getLastRow(),1).getFormulas();
    for(var j=0;j<rows.length;j++){
      found=false;
      row=parseInt(rows[j])+20;
      for(var k=0;k<values1.length && !found;k++){
        if((values1[k]==undefined || values1[k][0]=="" || values1[k][0]==undefined) && (values1[k+1]==undefined || values1[k+1][0]=="" || values1[k+1][0]==undefined)){break;}
        if(values1[k]!=undefined && values1[k][0]!="" && values1[k][0]!="Employee"){
          if(values1[k][0].toLowerCase()==cas[j].toLowerCase()){
            Logger.log("Found "+cas[j]+" in 1 "+values1[k][1]+" "+values1[k][2]);
            range[row][0]=values1[k][1];row++;
            range[row][0]=values1[k][2];row++;
            found=true;
          }
        }
      }
      if(!found){Logger.log(cas[j]+" wasn't found in "+target1.getSheetName());range[row][0]=0;row++;range[row][0]=0;row++;}
      found=false;
      for(k=0;k<values2.length && !found;k++){
        if((values2[k]==undefined || values2[k][0]=="" || values2[k][0]==undefined) && (values2[k+1]==undefined || values2[k+1][0]=="" || values2[k+1][0]==undefined)){break;}
        if(values2[k]!=undefined && values2[k][0]!="" && values2[k][0]!="Name"){
          if(values2[k][0].toLowerCase()==cas[j].toLowerCase()){
            Logger.log("Found "+cas[j]+" in 2 "+values2[k][cols[0]]+" "+values2[k][cols[0]+1]);
            range[row][0]=Math.round(values2[k][cols[0]]);row++;
            range[row][0]=Math.round(values2[k][cols[0]+1]);row++;
            found=true;
          }
        }
      }
      if(!found){Logger.log(cas[j]+" wasn't found in "+target2.getSheetName());range[row][0]=0;row++;range[row][0]=0;row++;}
      found=false;
      for(k=0;k<values3.length && !found;k++){
        if((values3[k]==undefined || values3[k][0]=="" || values3[k][0]==undefined) && (values3[k+1]==undefined || values3[k+1][0]=="" || values3[k+1][0]==undefined)){break;}
        if(values3[k]!=undefined && values3[k][0]!="" && values3[k][0]!="Name"){
          if(values3[k][0].toLowerCase()==cas[j].toLowerCase()){
            Logger.log("Found "+cas[j]+" in 3 "+values3[k][cols[1]]+" "+values3[k][cols[2]+1]);
            range[row][0]=Math.round(values3[k][cols[1]]);row++;
            range[row][0]=Math.round(values3[k][cols[1]+1]);row++;
            found=true;
          }
        }
      }
      if(!found){Logger.log(cas[j]+" wasn't found in "+target3.getSheetName());range[row][0]=0;row++;range[row][0]=0;row++;}
    }
    for(j=0;j<formulas.length;j++){
      if(formulas[j][0]!=""){range[j][0]=formulas[j][0];}
    }
    //Logger.log(range);
    sheet.getRange(1,col,sheet.getLastRow(),1).setValues(range);
  }
  for(i=0;i<sheets.length;i++){ss.deleteSheet(sheets[i]);}
  ss.deleteSheet(ss.getSheetByName("Store Summary"));
}
