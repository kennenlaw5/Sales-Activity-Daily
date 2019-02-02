function aStats(sheet_name,ca,type,x) {
  //Created By Kennen Lawrence
  //Version 3.1
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheet_name);
  var rows, name, row, range;
  var value = '';
  var points = 0;
  //Point types
  var acc=0;var testi=0;var vid=0;var max=0;var adv=0;
  //Other types
  var cti=0;var emails=0;var texts=0;var phone=0;var fresh=0;var internet=0;var j;
  //Create answer;
  var options=[];var maxMin=[];
  rows=teamRows(sheet_name);
  name=teamNames(sheet_name);
  range=sheet.getRange(3,3,parseInt(sheet.getLastRow())-2,parseInt(sheet.getLastColumn())-2).getValues();
  for(var l=0;l<rows.length;l++){
    if(ca != "TEAM" && ca != "maxMin"){
      for(var i=0;i<name.length;i++){
        if(name[i]==ca){row=parseInt(rows[i])-2;i=name.length;}
      }
      l=rows.length;
    }else{row=parseInt(rows[l])-2;}
    for(j=0;j<range[0].length;j++){
      if(!isNaN(parseInt(range[row][j]))){
        emails += parseInt(range[row][j]);
      }else{emails +=0;}
      if(!isNaN(parseInt(range[row+1][j]))){
        texts += parseInt(range[row+1][j]);
      }else{texts +=0;}
      if(!isNaN(parseInt(range[row+10][j]))){
        phone += parseInt(range[row+10][j]);
      }else{phone +=0;}
      if(!isNaN(parseInt(range[row+9][j]))){
        fresh += parseInt(range[row+9][j]);
      }else{fresh +=0;}
      if(!isNaN(parseInt(range[row+11][j]))){
        internet += parseInt(range[row+11][j]);
      }else{internet +=0;}
      if(!isNaN(parseInt(range[row+3][j]))){
        cti += parseInt(range[row+3][j]);
      }else{cti +=0;}
      //Point accumulation section
      if(!isNaN(parseInt(range[row+4][j]))){
        acc += parseInt(range[row+4][j]);
      }else{acc +=0;}
      if(!isNaN(parseInt(range[row+5][j]))){
        testi += parseInt(range[row+5][j]);
      }else{testi +=0;}
      if(!isNaN(parseInt(range[row+6][j]))){
        adv += parseInt(range[row+6][j]);
      }else{adv +=0;}
      if(!isNaN(parseInt(range[row+7][j]))){
        max += parseInt(range[row+7][j]);
      }else{max +=0;}
      if(!isNaN(parseInt(range[row+8][j]))){
        vid += parseInt(range[row+8][j]);
      }else{vid +=0;}
    }
    if(ca=="maxMin"){
      if(type=="All"){maxMin[l]=[name[l],parseInt(acc)+parseInt(testi)+parseInt(vid)+parseInt(max)+parseInt(adv)];}
      else if(type=="Videos"){maxMin[l]=[name[l],parseInt(vid)];}
      else if(type=="Accolades"){maxMin[l]=[name[l],parseInt(acc)];}
      else if(type=="Testimonials"){maxMin[l]=[name[l],parseInt(testi)];}
      else if(type=="Max Digital"){maxMin[l]=[name[l],parseInt(max)];}
      else if(type=="Advantastars"){maxMin[l]=[name[l],parseInt(adv)];}
      acc=0; testi=0; vid=0; max=0; adv=0;
    }
  }
  if(type=="main"){
    options=[cti,emails,texts,phone,fresh,internet];
    //for(var k in options){if(k==options.length-1){value+=options[k];}else{value+=options[k]+" ";}}
    return [options];
  }else if(type=="ranking"){
    options=[acc,testi,vid,max,adv];
    for(var m in options){points+=options[m];}
    return [ca,sheet_name,points,parseInt(points)/parseInt(internet),vid,acc,testi,max,adv];
  }
  else if(ca=="maxMin"){
    return maxMin;
  }
  else if(type=="Videos"){return vid;}else if(type=="Accolades"){return acc;}else if(type=="Testimonials"){return testi;}
  else if(type=="Max Digital"){return max;}else if(type=="Advantastars"){return adv;}
  else if(type=="All"){
    options=[acc,testi,vid,max,adv];
    for(var m in options){points+=options[m];}
    Logger.log(points);
    return points;
  }else if(type=="rank"){return [vid,acc,testi,max,adv];}
}

function maxMin(sheet_name,type,x){
  //Created By Kennen Lawrence
  //Version 2.0
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheet_name);
  var name, rows, team;
  var lead="";var leadpts=-1;var testpts;var pts="";var tailpts=9999;var tail="";var opp="";var tie=[];var t="0";
  rows=teamRows(sheet_name);
  name=teamNames(sheet_name);
  team=aStats(sheet_name,"maxMin",type);
  for(var i=0;i<name.length;i++){
    testpts=parseInt(team[i][1]);
    if(testpts>leadpts && testpts!=0){leadpts=testpts;lead=team[i][0];t=0;}else if(testpts==leadpts && testpts!=0){if(t==0){tie[t]=lead;t+=1;}tie[t]=team[i][0];t+=1;lead="TIE";}
    testpts=0;
  }
  
  if(lead=="TIE"){
    for(var m in tie){if(m==0){lead="TIE("+tie[0];}else{lead+=", "+tie[m]}}
    lead+=")";
  }
  if(leadpts==-1){pts="No Data!"}else{pts=lead+": "+leadpts+"pts";}
  //Reset Used values
  tie=[];t=0;
  for(i=0;i<name.length;i++){
    testpts=parseInt(team[i][1]);
    if(testpts<tailpts){tailpts=testpts;tail=team[i][0];t=0}else if(testpts==tailpts){if(t==0){tie[t]=tail;t+=1;}tie[t]=team[i][0];t+=1;tail="TIE";}
    testpts=0;
  }
  if(tail=="TIE"){
    for(var m in tie){if(m==0){tail="TIE("+tie[0];}else{tail+=", "+tie[m]}}
    tail+=")";
  }
  if(tailpts==9999 || tie.length == name.length){opp="No Data!";}else{opp=tail+": "+tailpts+"pts";}
  return pts+"*"+opp;
}