document.addEventListener('DOMContentLoaded', (event) => {
    const reviewForm = document.getElementById('reviewForm');
    const reviewsContainer = document.getElementById('reviews');

    // carrega reviews do localStorage
    //loadReviews();

    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // pega os valores dos inputs
        const title = document.getElementById('gameTitle').value;
        const comment = document.getElementById('gameComment').value;

        if(title && comment) {
            const review = {
                username: "gamehive ADM",
                title: title,
                comment: comment,
                likes: 0,
                dislikes: 0
            };
            
            addReview(review);
            saveReview(review);
            clean();
        }
    });

    // adiciona um review na tela
    function addReview(review) {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');

        //escolhe quais elementos serão exibidos na exibição do review
        reviewElement.innerHTML = `
            <div class="row1">
                <div class="row2">
                    <img src="imagens/usuario.png" class="icon">
                    <h4>${review.username}</h4>
                </div>
                <div class="column">
                    <img src="imagens/star.png" class="fav" onclick="toggleFavorite(this)">
                    <img src="imagens/share.png" class="fav" onclick="toggleShare(this)">
                </div>
            </div>
            <h3>${review.title}</h3>
            <p>${review.comment}</p>
            <div class='row1'>
                <button class="like-button"> 
                    <img src="imagens/like.png" class="like-icon">
                    <span class="like-count">${review.likes}</span>
                </button>
                <button class="dislike-button">
                    <img src="imagens/dislike.png" class="like-icon">
                    <span class="dislike-count">${review.dislikes}</span>
                </button>
            </div>
        `;

        const likeButton = reviewElement.querySelector('.like-button');
        const likeCount = likeButton.querySelector('.like-count');
        likeButton.addEventListener('click', function() {
            review.likes++;
            likeCount.textContent = review.likes;
            updateReviews();
        });

        const dislikeButton = reviewElement.querySelector('.dislike-button');
        const dislikeCount = dislikeButton.querySelector('.dislike-count');
        dislikeButton.addEventListener('click', function() {
            review.dislikes++;
            dislikeCount.textContent = review.dislikes;
            updateReviews();
        });

        reviewsContainer.appendChild(reviewElement);
    }

    // salva um review no localStorage
    function saveReview(review) {
        let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.push(review);
        localStorage.setItem('reviews', JSON.stringify(reviews));
    }

    // carrega reviews do localStorage
    function loadReviews() {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.forEach(review => {
            addReview(review);
        });
    }

    // atualiza reviews no localStorage
    function updateReviews() {
        const reviews = [];
        reviewsContainer.querySelectorAll('.review').forEach((reviewElement, index) => {
            const title = reviewElement.querySelector('h3').textContent;
            const comment = reviewElement.querySelector('p').textContent;
            const likes = parseInt(reviewElement.querySelector('.like-button').textContent.match(/\d+/)[0]);
            
            //empilha os reviews
            reviews.push({ title, comment, likes });
        });
        localStorage.setItem('reviews', JSON.stringify(reviews));
    }
    function clean(){
        document.getElementById('gameTitle').value = '';
        document.getElementById('gameComment').value = '';
    }
});

function toggleFavorite(favButton) {
    if (favButton.src.endsWith('imagens/star.png')) {
        favButton.src = 'imagens/starfull.png';
    } else {
        favButton.src = 'imagens/star.png';
    }
}

function toggleShare(shareButton) {
    if (shareButton.src.endsWith('imagens/share.png')) {
        shareButton.src = 'imagens/sharefull.png';
    } else {
        shareButton.src = 'imagens/share.png';
    }
}