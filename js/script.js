document.addEventListener("DOMContentLoaded", () => {
    // Load YAML file
    fetch('config/config.yml')
      .then(response => response.text())
      .then(yamlText => {
        const config = jsyaml.load(yamlText); // Parse YAML
        const blogContainer = document.getElementById("blog-posts");
  
        // Loop through posts
        config.posts.forEach(post => {
          // Fetch each markdown file
          fetch(`blog/${post.filename}`)
            .then(response => response.text())
            .then(markdown => {
              // Create blog post element
              const postElement = document.createElement('article');
              postElement.innerHTML = `<h2>${post.title}</h2>
                                        <p><em>By ${post.author} on ${post.date}</em></p>
                                        <div>${marked(markdown)}</div>`;
              blogContainer.appendChild(postElement);
            });
        });
      })
      .catch(error => console.error('Error loading YAML:', error));
  });
  