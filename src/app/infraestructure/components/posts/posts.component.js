import postsHTML from './posts.component.html';
import postsCSS from './posts.component.css';

export class PostsComponent extends HTMLElement {
    constructor () {
      super();
      // this.content = this.createPosts();
    }
    getPosts =  () => {
      // const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      // return await response.json();
      return [
        {
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        },
        {
        "userId": 1,
        "id": 2,
        "title": "qui est esse",
        "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
        },
        {
        "userId": 1,
        "id": 3,
        "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
        },
        {
        "userId": 1,
        "id": 4,
        "title": "eum et est occaecati",
        "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
        },
        {
        "userId": 1,
        "id": 5,
        "title": "nesciunt quas odio",
        "body": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"
        },
        {
        "userId": 1,
        "id": 6,
        "title": "dolorem eum magni eos aperiam quia",
        "body": "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae"
        }
      ];
    };
    
    createPosts = () => {
      console.log("in createPosts");
      const divElement = document.createElement("div");
      divElement.innerHTML = postsHTML;
    
      const postsElement = divElement.querySelector("#posts");
      const totalPosts = divElement.querySelector('#total');
    
      const posts = this.getPosts();
      console.log(posts[0].title);
    
      posts.forEach((post) => {
        postsElement.innerHTML += `
          <li class="list-group-item border-light bg-dark text-white">
          <h5>${post.title}</h5>
          <p>
          ${post.body}
          </p>
          </li>
        `;
      });
    
      totalPosts.innerHTML += posts.length;
      return divElement
    };
    connectedCallback() { // Cuando se carga el componente, atributos modificables double binding
      
      // console.log(this.content);
      this.innerHTML = `
      <div><h2 class="text-center text-white display-4">Total Posts: <span id="total">6</span></h2>

      <ul class="list-group" id="posts" style="height: 70vh; overflow: auto">
                <li class="list-group-item border-light bg-dark text-white">
                <h5>sunt aut facere repellat provident occaecati excepturi optio reprehenderit</h5>
                <p>
                quia et suscipit
      suscipit recusandae consequuntur expedita et cum
      reprehenderit molestiae ut ut quas totam
      nostrum rerum est autem sunt rem eveniet architecto
                </p>
                </li>
              
                <li class="list-group-item border-light bg-dark text-white">
                <h5>qui est esse</h5>
                <p>
                est rerum tempore vitae
      sequi sint nihil reprehenderit dolor beatae ea dolores neque
      fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis
      qui aperiam non debitis possimus qui neque nisi nulla
                </p>
                </li>
              
                <li class="list-group-item border-light bg-dark text-white">
                <h5>ea molestias quasi exercitationem repellat qui ipsa sit aut</h5>
                <p>
                et iusto sed quo iure
      voluptatem occaecati omnis eligendi aut ad
      voluptatem doloribus vel accusantium quis pariatur
      molestiae porro eius odio et labore et velit aut
                </p>
                </li>
              
                <li class="list-group-item border-light bg-dark text-white">
                <h5>eum et est occaecati</h5>
                <p>
                ullam et saepe reiciendis voluptatem adipisci
      sit amet autem assumenda provident rerum culpa
      quis hic commodi nesciunt rem tenetur doloremque ipsam iure
      quis sunt voluptatem rerum illo velit
                </p>
                </li>
              
                <li class="list-group-item border-light bg-dark text-white">
                <h5>nesciunt quas odio</h5>
                <p>
                repudiandae veniam quaerat sunt sed
      alias aut fugiat sit autem sed est
      voluptatem omnis possimus esse voluptatibus quis
      est aut tenetur dolor neque
                </p>
                </li>
              
                <li class="list-group-item border-light bg-dark text-white">
                <h5>dolorem eum magni eos aperiam quia</h5>
                <p>
                ut aspernatur corporis harum nihil quis provident sequi
      mollitia nobis aliquid molestiae
      perspiciatis et ea nemo ab reprehenderit accusantium quas
      voluptate dolores velit et doloremque molestiae
                </p>
                </li>
              </ul>
      </div>
      `;

    }
}
window.customElements.define("posts-page", PostsComponent);

