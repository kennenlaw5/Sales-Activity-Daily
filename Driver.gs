function teamRows(sheet_name) {
  //Created By Kennen Lawrence
  var rows;
  if(sheet_name=="Team Jeff"){
      return rows=[3,37,71,105,139,173];
    }else if(sheet_name=="Team Ben"){
      return rows=[3,37,71,105,139];
    }else if(sheet_name=="Team Robb"){
      return rows=[3,37,71,105,139,173];
    }else if(sheet_name=="Team Anna"){
      return rows=[3,37,71,105,139,173,207];
    }else if(sheet_name=="Team Seth"){
      return rows=[3,37,71,105,139,173];
    }else if(sheet_name=="Team Dean"){
      return rows=[3,37,71,105];
    }
}
function teamNames(sheet_name) {
  //Created By Kennen Lawrence
  var name;
  if(sheet_name=="Team Jeff"){
    return name=["Brian","Omar","Jeremy","Ian","Demitri","Scott"];
  }else if(sheet_name=="Team Ben"){
    return name=["Patrick","Tony","Troy","Stephen","Willard"];
  }else if(sheet_name=="Team Robb"){
    return name=["Agye","Jacob","Kathy","Castro","Conner","Steven"];
  }else if(sheet_name=="Team Anna"){
    return name=["Sam","Connor","Ace","Andrew","Erin", "Shaun W","Wil"];
  }else if(sheet_name=="Team Seth"){
    return name=["Jeff H","Chuck","Chris L","Alex D","Marlowe","Craig"];
  }else if(sheet_name=="Team Dean"){
    return name=["Ben W","Tim G","Josh","Fika"];
  }
}
function viewTeams(type){
  //Created By Kennen Lawrence
  var names=["Team Jeff","Team Ben","Team Robb","Team Anna","Team Seth","Team Dean"];
  if(type=="counts"){return [names];}
  return names;
}
function axcessaNames(sheet_name){
  var name;
  if(sheet_name=="Team Jeff"){
    return name=["Brian Neal","Jonthan Wingfield","Omar Johnson","Jeremy Sanchez","Ian Hudgens","Demitri Gavito","Scott Vye"];
  }else if(sheet_name=="Team Ben"){
    return name=["Patrick Quinlan","Tony Moomau","Troy Roth","Stephen Giese","Willard Lovell"];
  }else if(sheet_name=="Team Robb"){
    return name=["Agymang Spencer","Jacob Ford","Kathy Powell","Chris Castro","Conner Graves","Steve Nelson"];
  }else if(sheet_name=="Team Anna"){
    return name=["Sam Nejad","Connor Hanlon","Ace Taylor-Brown","Andrew Sapoznik","Erin Vangilder","Shaun Welch","Wil Lemon"];
  }else if(sheet_name=="Team Seth"){
    return name=["Jeffrey Hanson","Chuck Northrup","Christopher Leirer","Alexander Duquette","Marlowe Jones","Craig Smeton"];
  }else if(sheet_name=="Team Dean"){
    return name=["Ben Wegener","Tim Green","Joshua Ackerman","Fika Host"];
  }
}