function teamRows (sheet_name) {
  //Created By Kennen Lawrence
  var rows;
  if(sheet_name=="Team Jeff"){
      return rows=[3,37,71,105,139];
    }else if(sheet_name=="Team Ben"){
      return rows=[3,37,71,105,139,173];
    }else if(sheet_name=="Team Robb"){
      return rows=[3,37,71,105,139];
    }else if(sheet_name=="Team Anna"){
      return rows=[3,37,71,105,139,173];
    }else if(sheet_name=="Team Seth"){
      return rows=[3,37,71,105,139,173,207,241];
    }else if(sheet_name=="Team Dean"){
      return rows=[3,37,71,105];
    }
}

function teamNames (sheet_name) {
  //Created By Kennen Lawrence
  var name;
  if(sheet_name=="Team Jeff"){
    return name=["Omar","Ian","Demitri","Steven","Shahin"];
  }else if(sheet_name=="Team Ben"){
    return name=["Patrick","Tony","Troy","Stephen","Willard","Damir"];
  }else if(sheet_name=="Team Robb"){
    return name=["Agye","Kathy","Castro","Conner","Mo"];
  }else if(sheet_name=="Team Anna"){
    return name=["Sam","Connor","Ace","Andrew","Erin","Wil"];
  }else if(sheet_name=="Team Seth"){
    return name=["Jeff H","Chuck","Chris L","Toby","Marlowe","Craig","Patrick S","Alex D"];
  }else if(sheet_name=="Team Dean"){
    return name=["Tim G","Josh","Fika","Brian"];
  }
}

function viewTeams (type) {
  //Created By Kennen Lawrence
  var names = ["Team Jeff","Team Ben","Team Robb","Team Anna","Team Seth","Team Dean"];
  if (type=="counts") { return [names]; }
  return names;
}

function axcessaNames (sheet_name) {
  var name;
  if(sheet_name=="Team Jeff"){
    return name=["Omar Johnson","Ian Hudgens","Demitri Gavito","Steve Nelson","Shahin Nia"];
  }else if(sheet_name=="Team Ben"){
    return name=["Patrick Quinlan","Tony Moomau","Troy Roth","Stephen Giese","Willard Lovell","Damir Memisevic"];
  }else if(sheet_name=="Team Robb"){
    return name=["Agymang Spencer","Kathy Powell","Chris Castro","Conner Graves","Mohammed Kayeni"];
  }else if(sheet_name=="Team Anna"){
    return name=["Sam Nejad","Connor Hanlon","Ace Taylor-Brown","Andrew Sapoznik","Erin Vangilder","Wil Lemon"];
  }else if(sheet_name=="Team Seth"){
    return name=["Jeffrey Hanson","Chuck Northrup","Christopher Leirer","Toby Hesketh-Tutton","Marlowe Jones","Craig Smeton","Patrick Stenson","Alexander Duquette"];
  }else if(sheet_name=="Team Dean"){
    return name=["Tim Green","Joshua Ackerman","Fika Host","Brian Neal"];
  }
}

function dataRows (request) {
  var rowOrder = ['emails','texts','3min','total calls','accolades','testimonials','advantastart','max digital','videos','fresh','phone'
                  ,'internet','appts','mtdAppts','podium','closing ratio','internet closing','phone closing','fresh closing','opent events'
                  ,'new','used','new product','new pvr','used product','used pvr','accessories','bulletin','1v1','help','tasks'
                  ,'follow through','blank'];
  var view, i, start, end;
  var found = false;
  if (request == 'activity') {
    start = 'emails';
    end = 'mtdAppts';
    for (i = 0; i < rowOrder.length; i++) {
      if (found && rowOrder[i] == end) { found = false; }
    }
  }
  return rowOrder;
}