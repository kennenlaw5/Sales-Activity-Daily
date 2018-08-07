function teamRows(sheet_name) {
  //Created By Kennen Larence
  var rows;
  if(sheet_name=="Team Jeff"){
      return rows=[3,37,71,105,139,173,207];
    }else if(sheet_name=="Team Ben"){
      return rows=[3,37,71,105,139,173];
    }else if(sheet_name=="Team Robb"){
      return rows=[3,37,71,105,139,173];
    }else if(sheet_name=="Team Anna"){
      return rows=[3,37,71,105,139,173];
    }else if(sheet_name=="Team Seth"){
      return rows=[3,37,71,105,139,173,207];
    }else if(sheet_name=="Team Dean"){
      return rows=[3,37,71];
    }
}
function teamNames(sheet_name) {
  //Created By Kennen Larence
  var name;
  if(sheet_name=="Team Jeff"){
    return name=["Brian","Kiersten","Jonathan","Omar","Jeremy","Ian","Roger"];
  }else if(sheet_name=="Team Ben"){
    return name=["Demitri","Patrick","Tony","Kat","Troy","Stephen"];
  }else if(sheet_name=="Team Robb"){
    return name=["Agye","Jacob","Kathy","Castro","Tucker","Conner"];
  }else if(sheet_name=="Team Anna"){
    return name=["Sam","Connor","Ace","Jenny","Andrew","Erin"];
  }else if(sheet_name=="Team Seth"){
    return name=["Jeff H","Chuck","Chris L","Alex D","Marlowe","Shaun W","Craig"];
  }else if(sheet_name=="Team Dean"){
    return name=["Ben W","Tim G","Josh"];
  }
}
function viewTeams(type){
  //Created By Kennen Larence
  var names=["Team Jeff","Team Ben","Team Robb","Team Anna","Team Seth","Team Dean"];
  if(type=="counts"){return [names];}
  return names;
}
function axcessaNames(sheet_name){
  var name;
  if(sheet_name=="Team Jeff"){
    return name=["Brian Neal","Kiersten Peterson","Jonthan Wingfield","Omar Johnson","Jeremy Sanchez","Ian Hudgens","Roger Surroz"];
  }else if(sheet_name=="Team Ben"){
    return name=["Demitri Gavito","Patrick Quinlan","Tony Moomau","Karen Timmons","Troy","Stephen Giese"];
  }else if(sheet_name=="Team Robb"){
    return name=["Agymang Spencer","Jacob Ford","Kathy Powell","Chris Castro","Jeffrey Tucker","Conner Graves"];
  }else if(sheet_name=="Team Anna"){
    return name=["Sam Nejad","Connor Hanlon","Ace Taylor-Brown","Jenny Kim","Andrew Sapoznik","Erin Vangilder"];
  }else if(sheet_name=="Team Seth"){
    return name=["Jeffrey Hanson","Chuck Northrup","Christopher Leirer","Alexander Duquette","Marlowe Jones","Shaun Welch","Craig Smeton"];
  }else if(sheet_name=="Team Dean"){
    return name=["Ben Wegener","Tim Green","Joshua Ackerman"];
  }
}