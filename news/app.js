// Using Axios for making HTTP requests
// Make sure to include the Axios library in your project
// You can include it via CDN or use a package manager like npm

// Mock API endpoint URLs
const globalMarketAPI = 'https://api.coingecko.com/api/v3/coins/list?include_platform=true';
const newsAPI = 'https://api.example.com/news';

// Function to fetch data from an API
async function fetchData(apiUrl) {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

// Function to populate global market data
async function populateGlobalMarket(containerId) {
  const container = document.getElementById(containerId);
  const globalMarketData = await fetchData(globalMarketAPI);

  if (globalMarketData) {
    container.innerHTML = `
      <p>Total Market Cap: ${globalMarketData.totalMarketCap}</p>
      <p>Bitcoin Dominance: ${globalMarketData.bitcoinDominance}</p>
    `;
  } else {
    container.innerHTML = '<p>Error fetching global market data.</p>';
  }
}

// Function to populate news articles
async function populateNews(containerId) {
  const container = document.getElementById(containerId);
  const newsData = await fetchData(newsAPI);

  if (newsData) {
    newsData.forEach(article => {
      const newsItem = document.createElement('li');
      newsItem.classList.add('news-item');
      newsItem.innerHTML = `
        <h3>${article.title}</h3>
        <p>${article.content}</p>
      `;
      container.appendChild(newsItem);
    });
  } else {
    container.innerHTML = '<p>Error fetching news data.</p>';
  }
}

// Populate global market data
populateGlobalMarket('globalMarket');

// Populate news articles
populateNews('newsList');
