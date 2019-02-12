function teamCounts (team,range) {
  var numProd = 7;
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(team);
  var rows = teamRows(team);
  var values = [];
  for (var i = 0; i < numProd + 1; i++) { values[i] = [0]; }
  for (i = 0; i < rows.length; i++) {
    if (!isNaN(parseInt(range[rows[i] + 15][0]))) {
      values[numProd][0] += range[rows[i] + 15][0];
    }
    rows[i] += 20;
    for (var j = 0; j < numProd; j++) {
      if (!isNaN(parseInt(range[rows[i] + j][0]))) {
        values[j][0] += range[rows[i] + j][0];
      }
    }
  }
  values[numProd][0] /= rows.length;
  return values;
}