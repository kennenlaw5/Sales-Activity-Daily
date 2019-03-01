function teamRows (sheet_name) {
  //Created By Kennen Lawrence
  if (sheet_name == 'Team Merrie') {
    return [3, 29, 55, 81, 107, 133];
  }
  else if (sheet_name == 'Team Ben') {
    return [3, 29, 55, 81, 107, 133, 159];
  }
  else if (sheet_name == 'Team Robb') {
    return [3, 29, 55, 81, 107, 133];
  }
  else if (sheet_name == 'Team Josh') {
    return [3, 29, 55, 81, 107];
  }
  else if (sheet_name == 'Team Liz') {
    return [3, 29, 55, 81, 107, 133, 159];
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
  var rowOrder = ['emails', 'texts', 'fresh', 'phone', 'internet', 'videos', 'videos/lead', 'contacted'
                  , 'appts', 'mtd appts', 'podium', 'appts shown', 'closing ratio', 'internet closing'
                  , 'phone closing', 'fresh closing', 'opent events', 'new', 'used', 'new product'
                  , 'new pvr', 'used product', 'used pvr', 'accessories', 'avg accessories'];
  
  if (request == undefined) { return rowOrder; }
  
  if (typeof request === 'number') { return rowOrder[request]; }
  
  rowOrder = rowOrder.indexOf(request.toLowerCase());
  
  if (rowOrder === -1) { throw 'Could not find "' + request + '" in dataRows()'; }
  
  return rowOrder + 1;
}

function test() {
  Logger.log(dataRows('fresh'));
}