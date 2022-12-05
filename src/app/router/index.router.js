// import { pages } from "../pages/index";

// componentes
import { HomeComponent } from "../infraestructure/components/home/home.component.js";
import { PostsComponent } from "../infraestructure/components/posts/posts.component.js";

const router = (route) => {
  let content = document.getElementById("root");
  content.innerHTML = "";


  console.log(route);

  switch (route) {
    // case "#/": {
    //   return content.appendChild(pages.home());
      
    // }
    case "#/home": {
      // content.appendChild(pages.home()); // esto será un webComponent
      const homeComponent = new HomeComponent();
      return content.appendChild(homeComponent);
    }
    case "#/posts": {
      // return content.appendChild(await pages.posts());
      const postsComponent = new PostsComponent();
      return content.appendChild(postsComponent);
    }
    default: {
      window.location.hash = '#/home';
      // return content.appendChild(pages.home()); 
    }
  }
};

export { router };
