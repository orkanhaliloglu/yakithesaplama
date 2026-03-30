export default async function handler(req, res) {
  const targetUrl = 'https://api.opet.com.tr/api/fuelprices/allprices';
  
  try {
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Referer': 'https://www.opet.com.tr/',
        'Origin': 'https://www.opet.com.tr',
        'Channel': 'Web',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Opet API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Set cache headers to avoid hitting the API too often
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.status(200).json(data);
    
  } catch (error) {
    console.error('API Proxy Error:', error);
    res.status(500).json({ error: 'Failed to fetch fuel prices', message: error.message });
  }
}
