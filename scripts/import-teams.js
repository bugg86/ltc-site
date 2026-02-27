// save as import-teams.js
const fs = require('fs');

async function importTeams() {
  // Read your data (adjust path as needed)
  const data = JSON.parse(fs.readFileSync('./scripts/csvjson.json', 'utf-8'));

  console.log(`Sending ${data.length} player records...`);

  const response = await fetch('https://lelastechcup.com/api/import-teams', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  console.log('Response status:', response.status);
  console.log('Response headers:', Object.fromEntries(response.headers));

  const responseText = await response.text();
  console.log('Response body:', responseText);

  // Try to parse as JSON
  try {
    const result = JSON.parse(responseText);
    console.log('Parsed result:', result);
  } catch (e) {
    console.error('Failed to parse response as JSON. Response was:', responseText.substring(0, 500));
  }
}

importTeams();