function sendTeamsToAPI() {
  // Configuration
  const API_URL = "https://lelastechcup.com/api/import-teams"; // Update with your actual URL
  const SHEET_NAME = "convexbullshit"; // Update with your sheet name
  
  // Get the active spreadsheet and sheet
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  
  // Remove header row (expected headers: teamName, teamPicture, discordName, country, profilePicture, profileLink, rank)
  const headers = data.shift();
  
  // Transform each row into a player object
  const players = [];
  
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    
    // Skip empty rows
    if (!row[0]) continue;
    
    // Columns: teamName, teamPicture, discordName, country, profilePicture, profileLink, rank
    const player = {
      teamName: row[0],
      teamPicture: row[1],
      osuName: row[3],
      discordName: row[4],
      country: row[5],
      profilePicture: row[6],
      profileLink: row[7],
      rank: parseInt(row[8])
    };
    
    players.push(player);
  }
  
  Logger.log(`Sending ${players.length} players...`);
  
  // Send to API
  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(players),
    muteHttpExceptions: false
  };
  
  try {
    const response = UrlFetchApp.fetch(API_URL, options);
    const result = JSON.parse(response.getContentText());
    Logger.log("got here");
    if (response.getResponseCode() === 200) {
      let message = "Success!\n\n" + result.message;
      if (result.errors && result.errors.length > 0) {
        message += "\n\nWarnings:\n" + result.errors.join("\n");
      }
      Logger.log(message);
      try { SpreadsheetApp.getUi().alert(message); } catch (e) {}
    } else {
      Logger.log("Error: " + result.error);
      try { SpreadsheetApp.getUi().alert("Error: " + result.error); } catch (e) {}
    }
  } catch (error) {
    Logger.log("Error sending data: " + error);
    try { SpreadsheetApp.getUi().alert("Error sending data: " + error); } catch (e) {}
  }
}

function sendQualsToAPI() {
  const API_URL = "https://lelastechcup.com/api/import-schedule";
  const SHEET_NAME = "convexbullshit_quals";
  const RANGE = "A1:G";

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = sheet.getRange(RANGE).getValues();

  // Remove header row (A: round, B: lobbyId, C: date, D: time, E: referee, F: teams, G: mpLink)
  data.shift();

  const rows = [];

  for (const row of data) {
    // Skip rows with no lobbyId
    if (!row[1]) continue;

    const teamsRaw = String(row[5] || "").trim();
    const teams = teamsRaw
      ? teamsRaw.split("+").map(t => t.trim()).filter(Boolean)
      : [];

    rows.push({
      round:   String(row[0] || "").trim(),
      matchId: String(row[1] || "").trim(),
      date:    String(row[2] || "").trim(),
      time:    String(row[3] || "").trim(),
      referee: String(row[4] || "").trim(),
      teams:   teams,
      mp:      String(row[6] || "").trim(),
    });
  }

  Logger.log("Sending " + rows.length + " schedule entries...");

  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(rows),
    muteHttpExceptions: true,
  };

  try {
    const response = UrlFetchApp.fetch(API_URL, options);
    const result = JSON.parse(response.getContentText());

    if (response.getResponseCode() === 200) {
      const message = "Success!\n" + result.message;
      Logger.log(message);
      try { SpreadsheetApp.getUi().alert(message); } catch (e) {}
    } else {
      const message = "Error: " + result.error;
      Logger.log(message);
      try { SpreadsheetApp.getUi().alert(message); } catch (e) {}
    }
  } catch (error) {
    Logger.log("Error sending data: " + error);
    try { SpreadsheetApp.getUi().alert("Error sending data: " + error); } catch (e) {}
  }
}