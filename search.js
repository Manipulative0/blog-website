document.getElementById('search-button').addEventListener('click', async function () {
    const keyword = document.getElementById('search-input').value.trim();
    if (!keyword) return;

    // JSONから記事データを取得
    const response = await fetch('articles.json');
    const articles = await response.json();

    // キーワードでフィルター
    const matched = articles.filter(article =>
        article.title.includes(keyword) || article.desc.includes(keyword)
    );

    // 記事表示部分をクリアして、検索結果だけ表示
    const resultsContainer = document.querySelector('.articles');
    resultsContainer.innerHTML = '';

    if (matched.length === 0) {
        resultsContainer.innerHTML = '<p>該当する記事がありません。</p>';
    } else {
        matched.forEach(article => {
            const div = document.createElement('div');
            div.className = 'article';
            div.onclick = () => window.location.href = article.url;
            div.innerHTML = `<h2>${article.title}</h2><p>${article.desc}</p>`;
            resultsContainer.appendChild(div);
        });
    }
});
