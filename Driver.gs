function teamRows (sheet_name) {
  //Created By Kennen Lawrence
  if (sheet_name == 'Team Merrie') {
    return [3, 37, 71, 105, 139, 173];
  }
  else if (sheet_name == 'Team Ben') {
    return [3, 37, 71, 105, 139, 173, 207];
  }
  else if (sheet_name == 'Team Robb') {
    return [3, 37, 71, 105, 139, 173];
  }
  else if (sheet_name == 'Team Josh') {
    return [3, 37, 71, 105, 139];
  }
  else if (sheet_name == 'Team Liz') {
    return [3, 37, 71, 105, 139, 173, 207];
  }
}

function teamNames (sheet_name) {
  //Created By Kennen Lawrence
  if (sheet_name == 'Team Merrie') {
    return ['Chris C', 'Ian H', 'Demitri G', 'Jim M', 'Robin W', 'Dan F'];
  }
  else if (sheet_name == 'Team Ben') {
    return ['Patrick Q', 'Marlowe J', 'Sam N', 'James P', 'Shahin N', 'Jeanne T', 'Adam E'];
  }
  else if (sheet_name == 'Team Robb') {
    return ['Jeff H', 'Conner G', 'Mo K', 'Jason H', 'Troy R', 'Stephanie R'];
  }
  else if (sheet_name == 'Team Josh') {
    return ['Alex D', 'Michael B', 'Ace T', 'Andrew S', 'Adam M'];
  }
  else if (sheet_name == 'Team Liz') {
    return ['Chuck N', 'Chris L', 'Damir M', 'Michael M', 'Patrick S', 'Toby H T', 'Tina W'];
  }
}

function axcessaNames (sheet_name) {
  //Created By Kennen Lawrence
  if (sheet_name == 'Team Merrie') {
    return ['Chris Castro', 'Ian Hudgens', 'Demitri Gavito', 'Jim Merrell', 'Robin Windhager', 'Dan Fink'];
  }
  else if (sheet_name == 'Team Ben') {
    return ['Patrick Quinlan', 'Marlowe Jones', 'Sam Nejad', 'James Pryor', 'Shahin Nia', 'Jeanne Tal', 'Adam Ellison'];
  }
  else if (sheet_name == 'Team Robb') {
    return ['Jeffrey Hanson', 'Conner Graves', 'Mohammed Kayeni', 'Jason Hovde', 'Troy Roth', 'Stephanie Reese'];
  }
  else if (sheet_name == 'Team Josh') {
    return ['Alexander Duquette', 'Michael Barrett', 'Ace Taylor-Brown', 'Andrew Sapoznik', 'Adam Maxwell'];
  }
  else if (sheet_name == 'Team Liz') {
    return ['Chuck Northrup', 'Christopher Leirer', 'Damir Memisevic', 'Michael Meis', 'Patrick Stenson', 'Toby Hesketh-Tutton', 'Tina Watson'];
  }
}

function viewTeams (type) {
  //Created By Kennen Lawrence
  var names = ['Team Merrie', 'Team Ben', 'Team Robb', 'Team Josh', 'Team Liz'];
  if (type == 'counts') { return [names]; }
  return names;
}

function dataRows (request) {
  //Created By Kennen Lawrence
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