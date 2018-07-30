function caList(v1,v2,v3,v4,v5,v6) {
  var final=[];
  var rows,names;
  var teams=viewTeams();
  for(var i=0;i<teams.length;i++){
    rows=teamRows(teams[i]);
    names=teamNames(teams[i]);
    for(var j=0;j<rows.length;j++){
      final[final.length]=[names[j],teams[i]+"!B"+(rows[j]+17)+":B"+(rows[j]+27)];
    }
  }
  return final;
}
