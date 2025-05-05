// Test script to check API connectivity
const apiUrl = 'https://tabletennisapitest.azurewebsites.net/Players/GetPlayers';
const apiKey = '22CE0455-1351-4E85-B815-28F90986EB20';

async function testApi() {
  try {
    // Try with standard header format
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'ApiKey': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': 'ARRAffinity=238749086034d6cdbb98326c4d59882b164f69372feb8cbaa62b41cb738d93da; ARRAffinitySameSite=238749086034d6cdbb98326c4d59882b164f69372feb8cbaa62b41cb738d93da'
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log('API request successful:', data);
      return;
    }

    console.warn(`API request failed with status ${response.status}`);
    const errorText = await response.text();
    console.error('Error response:', errorText);
  } catch (error) {
    console.error('Error fetching from API:', error);
  }
}

testApi();
