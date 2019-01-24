function teamRows (sheet_name) {
  //Created By Kennen Lawrence
  if (sheet_name == 'Team Jeff') {
    return [3, 37, 71, 105];
  }
  else if (sheet_name == 'Team Ben') {
    return [3, 37, 71, 105, 139, 173];
  }
  else if (sheet_name == 'Team Robb') {
    return [3, 37, 71, 105, 139];
  }
  else if (sheet_name == 'Team Dean') {
    return [3, 37, 71, 105, 139, 173];
  }
  else if (sheet_name == 'Team Seth') {
    return [3, 37, 71, 105, 139, 173, 207];
  }
  else if (sheet_name == 'Team Portfolio') {
    return [3, 37, 71, 105];
  }
}

function teamNames (sheet_name) {
  //Created By Kennen Lawrence
  if (sheet_name == 'Team Jeff') {
    return ['Omar', 'Ian', 'Demitri', 'Shahin'];
  }
  else if (sheet_name == 'Team Ben') {
    return ['Patrick', 'Tony', 'Troy', 'Stephen', 'Willard', 'Damir'];
  }
  else if (sheet_name == 'Team Robb') {
    return ['Agye', 'Kathy', 'Castro', 'Conner', 'Mo'];
  }
  else if (sheet_name == 'Team Dean') {
    return ['Sam', 'Connor', 'Ace', 'Andrew', 'Tina', 'Wil'];
  }
  else if (sheet_name == 'Team Seth') {
    return ['Jeff H', 'Chuck', 'Chris L', 'Toby', 'Marlowe', 'Patrick S', 'Alex D'];
  }
  else if (sheet_name == 'Team Portfolio') {
    return ['Tim G', 'Josh', 'Fika', 'Brian'];
  }
}

function axcessaNames (sheet_name) {
  var name;
  if (sheet_name == 'Team Jeff') {
    return ['Omar Johnson', 'Ian Hudgens', 'Demitri Gavito', 'Shahin Nia'];
  }
  else if (sheet_name == 'Team Ben') {
    return ['Patrick Quinlan', 'Tony Moomau', 'Troy Roth', 'Stephen Giese', 'Willard Lovell', 'Damir Memisevic'];
  }
  else if (sheet_name == 'Team Robb') {
    return ['Agymang Spencer', 'Kathy Powell', 'Chris Castro', 'Conner Graves', 'Mohammed Kayeni'];
  }
  else if (sheet_name == 'Team Dean') {
    return ['Sam Nejad', 'Connor Hanlon', 'Ace Taylor-Brown', 'Andrew Sapoznik', 'Tina Watson', 'Wil Lemon'];
  }
  else if (sheet_name == 'Team Seth') {
    return ['Jeffrey Hanson', 'Chuck Northrup', 'Christopher Leirer', 'Toby Hesketh-Tutton', 'Marlowe Jones', 'Patrick Stenson', 'Alexander Duquette'];
  }
  else if (sheet_name == 'Team Portfolio') {
    return ['Tim Green', 'Joshua Ackerman', 'Fika Host', 'Brian Neal'];
  }
}

function viewTeams (type) {
  //Created By Kennen Lawrence
  var names = ['Team Jeff', 'Team Ben', 'Team Robb', 'Team Dean', 'Team Seth', 'Team Portfolio'];
  if (type == 'counts') { return [names]; }
  return names;
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