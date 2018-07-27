function score1v1(){
  //initialization
  //Created By Kennen Larence
  //Version 2.0
  /*sheet_name="Team Robb";days=9;*/
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet;
  var row;var sheet_name="";
  var value=0;
  var rows;
  var range;
  var off=0;var check=0;
  var teams=viewTeams();
  var days=parseInt(ss.getSheetByName("1v1").getRange("B2").getValue());
  var values=[];
  for(var m in teams){
    off=0;check=0;
    sheet_name=teams[m];
    sheet = ss.getSheetByName(sheet_name);
    rows=teamRows(sheet_name);
    for(var i in rows){
      row=parseInt(rows[i])+28;
      range=sheet.getRange(row,3,3,parseInt(days)).getValues();
      for(var n in range[0]){range[0][n]=range[0][n].toLowerCase();}
      for(var n in range[1]){range[1][n]=range[1][n].toLowerCase();}
      for(var n in range[2]){range[2][n]=range[2][n].toLowerCase();}
      for(var j=0;j<days;j++){
        if(range[0][j]!=""){if(range[0][j]=="off"||range[0][j]=="x"||range[0][j]=="vaca"||range[0][j]=="vacay"||range[0][j]=="sick"||range[0][j]=="sick day"||range[0][j]=="vacation"){off+=1;}else{check+=1;}}
        else{
          if(range[1][j]!=""){if(range[1][j]=="off"||range[1][j]=="x"||range[1][j]=="vaca"||range[1][j]=="vacay"||range[1][j]=="sick"||range[1][j]=="sick day"||range[1][j]=="vacation"){off+=1;}else{check+=1;}}
          else{
            if(range[2][j]!=""){if(range[2][j]=="off"||range[2][j]=="x"||range[2][j]=="vaca"||range[2][j]=="vacay"||range[2][j]=="sick"||range[2][j]=="sick day"||range[2][j]=="vacation"){off+=1;}else{check+=1;}}
            //else{Logger.log(row+' '+j+' '+range+','+range+','+range);}
          }
        }
      }
    }
    values[m]=[off,check,rows.length];
  }
  //Logger.log(off+" "+check+" "+rows.length);
  ss.getSheetByName("1v1").getRange(5,3,viewTeams().length,3).setValues(values);
  //return(off+" "+check+" "+rows.length);
}
function refresh1v1(){
  /*var ss = SpreadsheetApp.getActiveSpreadsheet();
  var range = ss.getSheetByName("1v1").getRange("A5:A8");
  range.setValue('');
  range.getValues();
  range.setValues([["Team Jeff"],["Team Anna"],["Team Robb"],["Team MER"]]);*/
  //UPDATED TO ONLY USE MAIN FUNCTION
  score1v1();
}
  