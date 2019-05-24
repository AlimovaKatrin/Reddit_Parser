document.addEventListener("DOMContentLoaded", function () {

    const PostCard = document.querySelectorAll('.card-body');

    PostCard.forEach(function (item) {
        item.addEventListener('click', async (e) => {
            e.preventDefault();

            const likeForOnePost = item.getElementsByClassName('like')[0];
            const valueOfLikes = item.children[3];
            const likeCorrect = valueOfLikes.getAttribute('value');
            const postName = item.children[0];
            const postNameCorrect = postName.getAttribute('value');
            const userTag = item.children[4].getAttribute('value');
            const usernameLogged = document.querySelector('div[name="username"]').getAttribute('value');

            let res = await fetch('/main', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    like: likeCorrect,
                    postName: postNameCorrect,
                    tag: userTag,
                    username: usernameLogged
                })
            });
            let updatedPost = await res.json()
            likeForOnePost.innerText = `Likes: ${updatedPost.likeUpdated}`
            likeForOnePost.setAttribute('value', updatedPost.likeUpdated)
        });
    });

    const form = document.querySelector('form[class="form-inline my-2 my-lg-0"]');
    const searchInput = document.querySelector('input[class="form-control mr-sm-2"]');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        window.location = `/filter?tag=${searchInput.value}`
    })

    const preferencesButton = document.querySelector('button[name="getPreferences"]');
    const innerDiv = document.querySelector('div[class="card"]');
    preferencesButton.addEventListener('click', async (e) => {
        e.preventDefault();
        let resp = await fetch("https://dog.ceo/api/breeds/image/random");
        let json = await resp.json();
        console.log(json);
        
        innerDiv.innerHTML = `<div class="card-body">
        <p class='postName' value="{{ this.name }}">{{ this.name }}</p>
        <div class="card">
            <div class="card-body">
            <img src="${json.message}" />
            </div>
        </div>
        <button type="submit" id='likeIncrement' class="btn btn-light">❤️</button>
        <span class='like' value={{this.likes}}>
            Likes: {{ this.likes}}
        </span>
        <div value={{this.tag}}>
            Tag:@{{ this.tag}}
        </div>

    </div>`
        
    })
});

