(() => {
    document.addEventListener('DOMContentLoaded', async () => {
        const apiKey = 'cc925fb54c5b41e8a2f3d2a7ded354f4';
        const newsCategories = {
            'home-news': `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`,
            'world-news': `https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=${apiKey}`,
            'technology-news': `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${apiKey}`,
            'in-sport-news': `https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=${apiKey}`,
            'us-sport-news': `https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=${apiKey}`,
            'in-entertainment-news': `https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=${apiKey}`,
            'us-entertainment-news': `https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=${apiKey}`,
            'us-business-news': `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`,
            'in-business-news': `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=${apiKey}`
        };

        for (const [sectionId, url] of Object.entries(newsCategories)) {
            try {
                const data = await fetchNews(url);
                displayArticles(data.articles, sectionId);
            } catch (error) {
                console.error(`Error fetching news for ${sectionId}:`, error);
            }
        }
    });

    const fetchNews = async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    };

    const displayArticles = (articles, sectionId) => {
        const articlesContainer = document.querySelector(`#${sectionId} .articles`);
        articles.forEach(article => {
            const articleElement = createArticleElement(article);
            articlesContainer.appendChild(articleElement);
        });
    };

    const createArticleElement = (article) => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('article');

        articleElement.innerHTML = `
            <img src="${article.urlToImage || 'default-image.jpg'}" alt="${article.title}">
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank" rel="noopener noreferrer">Read more</a>
        `;

        return articleElement;
    };
})();
