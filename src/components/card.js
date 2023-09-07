import axios from 'axios'

  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
  const Card = (article) => {

    const cardText = document.createElement('div');
    const headlineText = document.createElement('div');
    const authorText = document.createElement('div');
    const imgContainer = document.createElement('div');
    const authorPhoto = document.createElement('img');
    const authorName = document.createElement('span');


    cardText.classList.add('card');
    headlineText.classList.add('headline');
    authorText.classList.add('author');
    imgContainer.classList.add('img-container');
    authorPhoto.src = article.authorPhoto
    authorName.textContent = `By ${article.authorName}`
    headlineText.textContent = article.headline

    cardText.addEventListener('click', () => {
      console.log(article.headline)
    })

    cardText.appendChild(headlineText);
    cardText.appendChild(authorText);

    authorText.appendChild(imgContainer);
    authorText.appendChild(authorName)

    imgContainer.appendChild(authorPhoto);

    return cardText
}

  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5001/api/articles` (test it with console.log!!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  
  const cardAppender = async (selector) => {
    
    const root =  document.querySelector(selector)
    try {
    let res = await axios.get('http://localhost:5001/api/articles')
    console.log(Object.entries(res.data.articles))
    Object.entries(res.data.articles).forEach(arrArticles => {
      arrArticles[1].forEach(article => {
        root.appendChild(Card(article))
      })
    });
    }
    catch(err){
      console.error(err)
    }
  }

export { Card, cardAppender }
