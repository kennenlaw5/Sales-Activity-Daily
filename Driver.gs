function teamRows (sheet_name) {
  //Created By Kennen Lawrence
  if (sheet_name == 'Team Jeff') {
    return [3, 37, 71, 105];
  }
  else if (sheet_name == 'Team Ben') {
    return [3, 37, 71, 105, 139];
  }
  else if (sheet_name == 'Team Robb') {
    return [3, 37, 71, 105, 139];
  }
  else if (sheet_name == 'Team Dean') {
    return [3, 37, 71, 105, 139];
  }
  else if (sheet_name == 'Team Liz') {
    return [3, 37, 71, 105, 139, 173, 207, 241];
  }
  else if (sheet_name == 'Team Portfolio') {
    return [3, 37, 71, 105];
  }
}

function teamNames (sheet_name) {
  //Created By Kennen Lawrence
  if (sheet_name == 'Team Jeff') {
    return ['Omar', 'Ian', 'Demitri', 'Michael'];
  }
  else if (sheet_name == 'Team Ben') {
    return ['Patrick Q', 'Troy', 'Damir', 'James', 'Shahin'];
  }
  else if (sheet_name == 'Team Robb') {
    return ['Castro', 'Conner', 'Mo', 'Jason', 'Robert'];
  }
  else if (sheet_name == 'Team Dean') {
    return ['Sam', 'Connor', 'Ace', 'Andrew', 'Jeanne'];
  }
  else if (sheet_name == 'Team Liz') {
    return ['Jeff H', 'Chuck', 'Chris L', 'Marlowe', 'Alex D', 'Patrick S', 'Toby', 'Tina'];
  }
  else if (sheet_name == 'Team Portfolio') {
    return ['Tim G', 'Josh', 'Fika', 'Brian'];
  }
}

function axcessaNames (sheet_name) {
  //Created By Kennen Lawrence
  if (sheet_name == 'Team Jeff') {
    return ['Omar Johnson', 'Ian Hudgens', 'Demitri Gavito', 'Michael Barrett'];
  }
  else if (sheet_name == 'Team Ben') {
    return ['Patrick Quinlan', 'Troy Roth', 'Damir Memisevic', 'James Pryor', 'Shahin Nia'];
  }
  else if (sheet_name == 'Team Robb') {
    return ['Chris Castro', 'Conner Graves', 'Mohammed Kayeni', 'Jason Hovde', 'Robert Bird'];
  }
  else if (sheet_name == 'Team Dean') {
    return ['Sam Nejad', 'Connor Hanlon', 'Ace Taylor-Brown', 'Andrew Sapoznik', 'Jeanne Tal'];
  }
  else if (sheet_name == 'Team Liz') {
    return ['Jeffrey Hanson', 'Chuck Northrup', 'Christopher Leirer', 'Marlowe Jones', 'Alexander Duquette', 'Patrick Stenson', 'Toby Hesketh-Tutton', 'Tina Watson'];
  }
  else if (sheet_name == 'Team Portfolio') {
    return ['Tim Green', 'Joshua Ackerman', 'Fika Host', 'Brian Neal'];
  }
}

function viewTeams (type) {
  //Created By Kennen Lawrence
  var names = ['Team Jeff', 'Team Ben', 'Team Robb', 'Team Dean', 'Team Liz', 'Team Portfolio'];
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