function axcessa() {
  //Created By Kennen Lawrence
  //Version 1.2.4
  var ss=SpreadsheetApp.getActiveSpreadsheet();
  var ui = SpreadsheetApp.getUi(); 
  var found=false;
  var target1=ss.getSheetByName("Performance");
  var target2=ss.getSheetByName("Report");
  var target3=ss.getSheetByName("Report (1)");
  var target4=ss.getSheetByName("Report (2)");
  var target5=ss.getSheetByName("Report (3)");
  var sheets=[target1,target2,target3,target4,target5];var temp,temp1;var current;
  if(target2==null||target1==null||target3==null||target4==null||target5==null){ui.alert('Sheets not uploaded!', 'One or more of the Axcessa sheets are missing or misnamed! Please correct then try again.', ui.ButtonSet.OK); return;}
  ss.toast('FURTHER ACTION NEEDED! Currently analyzing the imported sheets. Please wait for the pop up.', 'Please wait...',7);
  var values1=target1.getRange(1,1,target1.getLastRow(),target1.getLastColumn()).getValues();
  var values2=target2.getRange(1,1,target2.getLastRow(),target2.getLastColumn()).getValues();
  var values3=target3.getRange(1,1,target3.getLastRow(),target3.getLastColumn()).getValues();
  var values4=target4.getRange(1,1,target4.getLastRow(),target4.getLastColumn()).getValues();
  var values5=target5.getRange(1,1,target5.getLastRow(),target5.getLastColumn()).getValues();
  var pvr=[];var counts=[];
  var allValues=[values1,values2,values3,values4,values5];
  var allTargets=[target1,target2,target3,target4,target5];
  var cols=[];var acc=[];
  for(var i=1;i<allValues.length;i++){
    for(var j=0;j<allValues[i][0].length;j++){
      if(allValues[i][0][j]=="Acc"){acc[i-1]=j;}
      else if(allValues[i][0][j]=="Product"){cols[i-1]=j;j=allValues[i][0].length;}
    }
    if(acc[i-1]==undefined){acc[i-1]="None";}
  }
  temp1=[];
  for(i=1;i<allValues.length;i++){
    temp1[i-1]=0;
    for(j=1;j<allValues[i].length;j++){
      temp1[i-1]+=allValues[i][j][cols[i-1]+1];
    }
  }
  Logger.log(cols);Logger.log(acc);
  for(i=0;i<temp1.length;i++){
    for(j=0;j<temp1.length;j++){
      if(j+1<temp1.length){
        if(temp1[j]<temp1[j+1]){
          temp=temp1[j+1];temp1[j+1]=temp1[j];temp1[j]=temp;
          temp=allValues[j+1];allValues[j+1]=allValues[j+2];allValues[j+2]=temp;
          temp=allTargets[j+1];allTargets[j+1]=allTargets[j+2];allTargets[j+2]=temp;
          temp=cols[j];cols[j]=cols[j+1];cols[j+1]=temp;
          temp=acc[j];acc[j]=acc[j+1];acc[j+1]=temp;
        }
      }
    }
  }
  Logger.log(cols);Logger.log(acc);
  ss.setActiveSheet(allTargets[1]);
  SpreadsheetApp.flush();
  found=false;
  while(!found){
    sheets=ui.alert("New PVR", "Is this the sheet that contains the NEW PVR?", ui.ButtonSet.YES_NO_CANCEL);
    if(sheets==ui.Button.YES){found=true;}
    else if(sheets==ui.Button.NO){
      temp=allTargets[1];allTargets[1]=allTargets[2];allTargets[2]=temp;
      temp=allValues[1];allValues[1]=allValues[2];allValues[2]=temp;
      temp=cols[0];cols[0]=cols[1];cols[1]=temp;
      temp=acc[0];acc[0]=acc[1];acc[1]=temp;
      ss.setActiveSheet(allTargets[1]);
      SpreadsheetApp.flush();
    }
    else if(sheets==ui.Button.CANCEL){ss.toast('Axcessa values were not uploaded.','Import Cancelled');return;}
  }
  found=false;
  ss.setActiveSheet(allTargets[3]);
  SpreadsheetApp.flush();
  while(!found){
    sheets=ui.alert("New Counts", "Is this the sheet that contains the NEW counts?", ui.ButtonSet.YES_NO_CANCEL);
    if(sheets==ui.Button.YES){found=true;}
    else if(sheets==ui.Button.NO){
      temp=allTargets[3];allTargets[3]=allTargets[4];allTargets[4]=temp;
      temp=allValues[3];allValues[3]=allValues[4];allValues[4]=temp;
      temp=cols[2];cols[2]=cols[3];cols[3]=temp;
      temp=acc[2];acc[2]=acc[3];acc[3]=temp;
      ss.setActiveSheet(allTargets[3]);
      SpreadsheetApp.flush();
    }
    else if(sheets==ui.Button.CANCEL){ss.toast('Axcessa values were not uploaded.','Import Cancelled');return;}
  }
  found=false;
  while(!found){
    var dateInput = ui.prompt('Enter Date','Enter the date where values should be pasted (MM-DD):',ui.ButtonSet.OK_CANCEL);
    if(dateInput.getSelectedButton()==ui.Button.CANCEL){ss.toast('Axcessa values were not uploaded.','Import Cancelled');return;}
    if(dateInput.getResponseText().length!=5 || dateInput.getResponseText().split("-")[0].length!=2){ui.alert("Error!", "The date you entered '"+dateInput.getResponseText()+"' is in an incorrect format. Please try again in the format of 'MM-DD'", ui.ButtonSet.OK);}
    else{found=true;}
  }
  var primary=ss.getSheetByName("Team Jeff");
  var dates=primary.getRange(2,1,1,primary.getLastColumn()).getDisplayValues();var sheet_name="";var col=0;
  var teams=viewTeams();
  var rows, sheet, range, row, formulas, cas, accValue;
  ss.getSheetByName("1v1").hideSheet();
  for(var i=0;i<dates[0].length;i++){
    if(dates[0][i]==dateInput.getResponseText()){col=parseInt(parseInt(i)+parseInt(1));i=dates[0].length;}
  }
  for(i=0;i<teams.length;i++){
    sheet_name=teams[i];
    sheet=ss.getSheetByName(sheet_name);
    ss.toast(sheet.getSheetName()+' values are being imported.', sheet.getSheetName());
    rows=teamRows(sheet_name);
    cas=axcessaNames(sheet_name);
    range=sheet.getRange(1,col,sheet.getLastRow(),1).getValues();
    formulas=sheet.getRange(1,col,sheet.getLastRow(),1).getFormulas();
    for(var j=0;j<rows.length;j++){
      accValue=0;
      found=false;
      row=parseInt(rows[j])+20;
      for(var k=0;k<allValues[0].length && !found;k++){
        if((allValues[0][k]==undefined || allValues[0][k][0]=="" || allValues[0][k][0]==undefined) && (allValues[0][k+1]==undefined || allValues[0][k+1][0]=="" || allValues[0][k+1][0]==undefined)){break;}
        if(allValues[0][k]!=undefined && allValues[0][k][0]!="" && allValues[0][k][0]!="Employee"){
          if(allValues[0][k][0].toLowerCase()==cas[j].toLowerCase()){
            Logger.log("Found "+cas[j]+" in 1 "+allValues[0][k][1]+" "+allValues[0][k][2]);
            range[row][0]=allValues[0][k][1];
            range[row+1][0]=allValues[0][k][2];
            found=true;
          }
        }
      }
      if(!found){Logger.log(cas[j]+" wasn't found in "+allTargets[0].getSheetName());range[row][0]=0;range[row+1][0]=0;}
      found=false;
      for(k=0;k<allValues[1].length && !found;k++){
        if((allValues[1][k]==undefined || allValues[1][k][0]=="" || allValues[1][k][0]==undefined) && (allValues[1][k+1]==undefined || allValues[1][k+1][0]=="" || allValues[1][k+1][0]==undefined)){break;}
        if(allValues[1][k]!=undefined && allValues[1][k][0]!="" && allValues[1][k][0]!="Name"){
          if(allValues[1][k][0].toLowerCase()==cas[j].toLowerCase()){
            Logger.log("Found "+cas[j]+" in 2 "+allValues[1][k][cols[0]]+" "+allValues[1][k][cols[0]+1]);
            range[row+3][0]=Math.round(allValues[1][k][cols[0]+1]);
            found=true;
          }
        }
      }
      if(!found){Logger.log(cas[j]+" wasn't found in "+allTargets[1].getSheetName());range[row+3][0]=0;}
      found=false;
      for(k=0;k<allValues[2].length && !found;k++){
        if((allValues[2][k]==undefined || allValues[2][k][0]=="" || allValues[2][k][0]==undefined) && (allValues[2][k+1]==undefined || allValues[2][k+1][0]=="" || allValues[2][k+1][0]==undefined)){break;}
        if(allValues[2][k]!=undefined && allValues[2][k][0]!="" && allValues[2][k][0]!="Name"){
          if(allValues[2][k][0].toLowerCase()==cas[j].toLowerCase()){
            Logger.log("Found "+cas[j]+" in 3 "+allValues[2][k][cols[1]]+" "+allValues[2][k][cols[1]+1]);
            range[row+5][0]=Math.round(allValues[2][k][cols[1]+1]);
            found=true;
          }
        }
      }
      if(!found){Logger.log(cas[j]+" wasn't found in "+allTargets[2].getSheetName());range[row+5][0]=0;}
      found=false;
      for(k=0;k<allValues[3].length && !found;k++){
        if((allValues[3][k]==undefined || allValues[3][k][0]=="" || allValues[3][k][0]==undefined) && (allValues[3][k+1]==undefined || allValues[3][k+1][0]=="" || allValues[3][k+1][0]==undefined)){break;}
        if(allValues[3][k]!=undefined && allValues[3][k][0]!="" && allValues[3][k][0]!="Name"){
          if(allValues[3][k][0].toLowerCase()==cas[j].toLowerCase()){
            Logger.log("Found "+cas[j]+" in 4 "+allValues[3][k][cols[2]]);
            if(allValues[3][k][1]==0 && acc[2]!="None"){
              accValue+=Math.round(parseInt(allValues[3][k][acc[2]]));
              range[row+2][0]="N/A";
            }else if(allValues[3][k][1]==0 && acc[2]=="None"){
              range[row+2][0]="N/A";
            }else if(acc[2]=="None"){
              range[row+2][0]=allValues[3][k][cols[2]]/allValues[3][k][1];
              range[row+2][0]=range[row+2][0].toFixed(1);
            }
            else{
              range[row+2][0]=(allValues[3][k][cols[2]]-allValues[3][k][acc[2]])/allValues[3][k][1];
              range[row+2][0]=range[row+2][0].toFixed(1);
              accValue+=Math.round(parseInt(allValues[3][k][acc[2]]));
            }
            found=true;
          }
        }
      }
      if(!found){Logger.log(cas[j]+" wasn't found in "+allTargets[3].getSheetName());range[row+2][0]=0;}
      found=false;
      for(k=0;k<allValues[4].length && !found;k++){
        if((allValues[4][k]==undefined || allValues[4][k][0]=="" || allValues[4][k][0]==undefined) && (allValues[4][k+1]==undefined || allValues[4][k+1][0]=="" || allValues[4][k+1][0]==undefined)){break;}
        if(allValues[4][k]!=undefined && allValues[4][k][0]!="" && allValues[4][k][0]!="Name"){
          if(allValues[4][k][0].toLowerCase()==cas[j].toLowerCase()){
            Logger.log("Found "+cas[j]+" in 5 "+allValues[4][k][cols[3]]);
            if(allValues[4][k][1]==0 && acc[3]!="None"){
              accValue+=Math.round(parseInt(allValues[4][k][acc[3]]));
              range[row+4][0]="N/A";
            }else if(allValues[4][k][1]==0 && acc[3]=="None"){
              range[row+4][0]="N/A";
            }else if(acc[3]=="None"){
              range[row+4][0]=allValues[4][k][cols[3]]/allValues[4][k][1];
              range[row+4][0]=range[row+4][0].toFixed(1);
            }
            else{
              range[row+4][0]=(allValues[4][k][cols[3]]-allValues[4][k][acc[3]])/allValues[4][k][1];
              range[row+4][0]=range[row+4][0].toFixed(1);
              accValue+=Math.round(parseInt(allValues[4][k][acc[3]]));
            }
            found=true;
          }
        }
      }
      if(!found){Logger.log(cas[j]+" wasn't found in "+allTargets[4].getSheetName());range[row+4][0]=0;}
      Logger.log("Adding accValue '"+accValue+"' to range at row "+(row+6));
      range[row+6][0]=accValue;
    }
    for(j=0;j<formulas.length;j++){
      if(formulas[j][0]!=""){range[j][0]=formulas[j][0];}
    }
    //Logger.log(range);
    sheet.getRange(1,col,sheet.getLastRow(),1).setValues(range);
    ss.toast(sheet.getSheetName()+' has imported successfully.', sheet.getSheetName());
  }
  for(i=0;i<allTargets.length;i++){ss.deleteSheet(allTargets[i]);}
  ss.deleteSheet(ss.getSheetByName("Store Summary"));
}
