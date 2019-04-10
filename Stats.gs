function aStats (sheet_name, ca, type, x) {
  //Created By Kennen Lawrence
  //Version 4.0
  
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheet_name);
  
  /* Point types: [
  0 = Appointment to Show Ratio (If >= 50% = 5 points; else if < 50% = 1 point),
  1 = Accessory Average (= 10 points per hundred average),
  2 = contacted internet leads (= 1 point per lead contacted),
  3 = Vehicle Video to lead ratio (If >= 10 && < 50% = 1 point;  else if >= 50 < 70% = 2 points; else if >= 70% = 5 points),
  ]*/
  var accAvgCount  = 0;
  var appt_to_show = 0, acc_avg = 1, contacted_leads = 2, video_to_lead = 3;
  var indv_points  = [0, 0, 0, 0];
  
  /* Other types: [
  0 = Emails,
  1 = Texts,
  2 = Fresh Leads,
  3 = Phone Leads,
  4 = Internet Leads,
  ]*/
  var emails     = 0, texts = 1, fresh = 2, phone = 3, internet = 4;
  var indv_other = [0, 0, 0, 0, 0];
  
  var rows   = teamRows(sheet_name);
  var name   = teamNames(sheet_name);
  var range  = sheet.getRange(3, 3, parseInt(sheet.getLastRow()) - 2, parseInt(sheet.getLastColumn()) - 2).getValues();
  var maxMin = [];
  var row;
  
  for (var l = 0; l < rows.length; l++) {
    
    if (ca != 'TEAM' && ca != 'maxMin') {
      
      for (var i = 0; i < name.length; i++) {
        if (name[i].toLowerCase() == ca.toLowerCase()) { row = parseInt(rows[i]) - 3; i = name.length; }
      }
      
      l = rows.length;
    }
    else { row = parseInt(rows[l]) - 3; }
    
    for (var j = 0; j < range[0].length; j++) {
      
      var data = parseInt(range[row + dataRows('emails')][j], 10);
      if (!isNaN(data)) {
        indv_other[emails] += parseInt(data);
      }
      
      data = parseInt(range[row + dataRows('texts')][j], 10);
      if (!isNaN(data)) {
        indv_other[texts] += parseInt(data);
      }
      
      data = parseInt(range[row + dataRows('phone')][j], 10);
      if (!isNaN(data)) {
        indv_other[phone] += parseInt(data);
      }
      
      data = parseInt(range[row + dataRows('fresh')][j], 10);
      if (!isNaN(data)) {
        indv_other[fresh] += parseInt(data);
      }
      
      data = parseInt(range[row + dataRows('internet')][j], 10);
      if (!isNaN(data)) {
        indv_other[internet] += parseInt(data);
      }
      
      
      //Point accumulation section
      data = parseInt(range[row + dataRows('appts shown')][j], 10);
      if (!isNaN(data)) {
        // Rule for point: If >= 50% = 5 points; else if < 50% = 1 point
        indv_points[appt_to_show] += data >= 0.5 ? 5 : 1;
      }
      
      data = parseInt(range[row + dataRows('avg accessories')][j], 10);
      if (!isNaN(data)) {
        //Accessory Average (Rules Below)
        //Needs to use unparsed value to properly average out
        indv_points[acc_avg] += range[row + dataRows('avg accessories')][j];
        accAvgCount ++;
      }
      
      data = parseInt(range[row + dataRows('contacted')][j], 10);
      if (!isNaN(data)) {
        //contacted internet leads (= 1 point per lead contacted),
        indv_points[contacted_leads] += parseInt(data);
      }
      
      data = parseInt(range[row + dataRows('videos/lead')][j], 10);
      if (!isNaN(data)) {
        //If >= 10 && < 50% = 1 point;  else if >= 50 < 70% = 2 points; else if >= 70% = 5 points
        if (data >= 0.7) { data = 5; }
        else if (data < 0.7 && data >= 0.5) { data = 2; }
        else if (data < 0.5 && data >= 0.1) { data = 1; }
        
        indv_points[video_to_lead] += data;
      }
    }
    
    //Calculate Accessory Average Points
    indv_points[acc_avg] /= accAvgCount;
    
    if (indv_points[acc_avg] >= 800) {
      indv_points[acc_avg] = 50;
    } else if (indv_points[acc_avg] >= 600) {
      indv_points[acc_avg] = 40;
    } else if (indv_points[acc_avg] >= 400) {
      indv_points[acc_avg] = 30;
    } else if (indv_points[acc_avg] >= 250) {
      indv_points[acc_avg] = 20;
    } else if (indv_points[acc_avg] >= 100) {
      indv_points[acc_avg] = 10;
    } else {
      indv_points[acc_avg] = 0;
    }
    
    if (ca == 'maxMin') {
      if (type == 'All') { maxMin[l] = [name[l], indv_points[appt_to_show] + indv_points[acc_avg] + indv_points[contacted_leads] + indv_points[video_to_lead]]; }
      else if (type == 'Appts/Shown') { maxMin[l] = [name[l], indv_points[appt_to_show]]; }
      else if (type == 'Acc Avg.') { maxMin[l] = [name[l], indv_points[acc_avg]]; }
      else if (type == 'Contacted Int') { maxMin[l] = [name[l], indv_points[contacted_leads]]; }
      else if (type == 'Videos/Lead') { maxMin[l] = [name[l], indv_points[video_to_lead]]; }
      
      //Reset All Values for next client advisor
      indv_points[appt_to_show]    = 0;
      indv_points[acc_avg]         = 0;
      indv_points[contacted_leads] = 0;
      indv_points[video_to_lead]   = 0;
    }
  }
  
  var points = 0;
  if (type == 'main') {
    return [indv_other];
  }
  else if (type == 'ranking') {
    for (var m in indv_points) { points += indv_points[m]; }
    return [ca, sheet_name, points].concat(indv_points);
  }
  else if (ca == 'maxMin') {
    return maxMin;
  }
  else if (type == 'Appts/Shown') { return indv_points[appt_to_show]; }
  else if (type == 'Acc Avg.') { return indv_points[acc_avg]; }
  else if (type == 'Contacted Int') { return indv_points[contacted_leads]; }
  else if (type == 'Videos/Lead') { return indv_points[video_to_lead]; }
  else if (type == 'All') {
    for (var m in indv_points) { points += indv_points[m]; }
    return points;
  }
  else if (type == 'rank') { return indv_points; }
}

//Starting from scratch due to excessive changes to sheet dynamic
/*function aStats(sheet_name, ca, type, x) {
  //Created By Kennen Lawrence
  //Version 3.1
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheet_name);
  var rows, name, row, range, j;
  var value = '';
  var points = 0;
  //Point types
  var acc = 0; var testi = 0; var vid = 0; var max = 0; var adv = 0;
  //Other types
  var cti = 0; var emails = 0; var texts = 0; var phone = 0; var fresh = 0; var internet = 0;
  //Create answer;
  var options = []; var maxMin = [];
  rows = teamRows(sheet_name);
  name = teamNames(sheet_name);
  range = sheet.getRange(3, 3, parseInt(sheet.getLastRow()) - 2, parseInt(sheet.getLastColumn()) - 2).getValues();
  for (var l = 0; l < rows.length; l++) {
    if (ca != 'TEAM' && ca != 'maxMin') {
      for (var i = 0; i < name.length; i++) {
        if (name[i] == ca) { row = parseInt(rows[i]) - 2; i = name.length; }
      }
      l = rows.length;
    } else { row = parseInt(rows[l]) - 2; }
    for (j = 0; j < range[0].length; j++) {
      if (!isNaN(parseInt(range[row][j]))) {
        emails += parseInt(range[row][j]);
      } else { emails += 0; }
      if (!isNaN(parseInt(range[row + 1][j]))) {
        texts += parseInt(range[row + 1][j]);
      } else { texts += 0; }
      if (!isNaN(parseInt(range[row + 10][j]))) {
        phone += parseInt(range[row + 10][j]);
      } else { phone += 0; }
      if (!isNaN(parseInt(range[row + 9][j]))) {
        fresh += parseInt(range[row + 9][j]);
      } else { fresh += 0; }
      if (!isNaN(parseInt(range[row + 11][j]))) {
        internet += parseInt(range[row + 11][j]);
      } else { internet += 0; }
      if (!isNaN(parseInt(range[row + 3][j]))) {
        cti += parseInt(range[row + 3][j]);
      } else { cti += 0; }
      //Point accumulation section
      if (!isNaN(parseInt(range[row + 4][j]))) {
        acc += parseInt(range[row + 4][j]);
      } else {acc += 0; }
      if (!isNaN(parseInt(range[row + 5][j]))) {
        testi += parseInt(range[row + 5][j]);
      } else { testi += 0; }
      if (!isNaN(parseInt(range[row + 6][j]))) {
        adv += parseInt(range[row + 6][j]);
      } else { adv += 0; }
      if (!isNaN(parseInt(range[row + 7][j]))) {
        max += parseInt(range[row + 7][j]);
      } else { max += 0; }
      if (!isNaN(parseInt(range[row + 8][j]))) {
        vid += parseInt(range[row + 8][j]);
      } else { vid += 0; }
    }
    if (ca == 'maxMin') {
      if (type == 'All') { maxMin[l] = [name[l], parseInt(acc) + parseInt(testi) + parseInt(vid) + parseInt(max) + parseInt(adv)]; }
      else if (type=='Videos') { maxMin[l] = [name[l], parseInt(vid)]; }
      else if (type == 'Accolades') { maxMin[l] = [name[l], parseInt(acc)]; }
      else if (type == 'Testimonials') { maxMin[l] = [name[l], parseInt(testi)]; }
      else if (type == 'Max Digital') { maxMin[l] = [name[l], parseInt(max)]; }
      else if (type == 'Advantastars') { maxMin[l] = [name[l], parseInt(adv)]; }
      acc=0; testi=0; vid=0; max=0; adv=0;
    }
  }
  if (type == 'main') {
    options = [cti, emails, texts, phone, fresh, internet];
    //for(var k in options) {if (k==options.length-1) {value+=options[k]; } else {value+=options[k]+" "; }}
    return [options];
  } else if (type == 'ranking') {
    options = [acc, testi, vid, max, adv];
    for (var m in options) { points += options[m]; }
    return [ca, sheet_name, points, parseInt(points) / parseInt(internet), vid, acc, testi, max, adv];
  }
  else if (ca == 'maxMin') {
    return maxMin;
  }
  else if (type == 'Videos') { return vid; } else if (type == 'Accolades') { return acc; } else if (type == 'Testimonials') { return testi; }
  else if (type == 'Max Digital') { return max; } else if (type == 'Advantastars') { return adv; }
  else if (type == 'All') {
    options = [acc, testi, vid, max, adv];
    for (var m in options) { points += options[m]; }
    return points;
  } else if (type == 'rank') { return [vid, acc, testi, max, adv]; }
}*/

function maxMin(sheet_name, type, x) {
  //Created By Kennen Lawrence
  //Version 2.0
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheet_name);
  var name, rows, team, testpts;
  var lead = '';
  var leadpts = -1;
  var pts = '';
  var tailpts = 9999;
  var tail='';
  var opp = '';
  var tie = [];
  var t = '0';
  rows = teamRows(sheet_name);
  name = teamNames(sheet_name);
  team = aStats(sheet_name, 'maxMin', type);
  
  for (var i = 0; i < name.length; i++) {
    testpts = parseInt(team[i][1]);
    
    if (testpts > leadpts && testpts != 0) { leadpts = testpts; lead = team[i][0]; t = 0; }
    else if (testpts == leadpts && testpts != 0) { if (t == 0) { tie[t] = lead; t += 1; } tie[t] = team[i][0]; t += 1; lead = 'TIE'; }
    
    testpts = 0;
  }
  
  if (lead == 'TIE') {
    for (var m in tie) { if (m == 0) { lead = 'TIE(' + tie[0]; } else { lead += ', ' + tie[m]; } }
    lead += ')';
  }
  if (leadpts == -1) { pts = 'No Data!'; } else { pts = lead + ': ' + leadpts + 'pts'; }
  //Reset Used values
  tie = []; t = 0;
  for (i = 0; i < name.length; i++) {
    testpts = parseInt(team[i][1]);
    
    if (testpts < tailpts) { tailpts = testpts; tail = team[i][0]; t = 0; }
    else if (testpts == tailpts) { if (t == 0) { tie[t] = tail; t += 1; } tie[t] = team[i][0]; t += 1; tail = 'TIE'; }
    
    testpts = 0;
  }
  if (tail == 'TIE') {
    for (var m in tie) { if (m == 0) { tail = 'TIE(' + tie[0]; } else { tail += ', ' + tie[m]; } }
    tail += ')';
  }
  if (tailpts == 9999 || tie.length == name.length) { opp = 'No Data!'; } else { opp = tail + ': ' + tailpts + 'pts'; }
  return pts + '*' + opp;
}