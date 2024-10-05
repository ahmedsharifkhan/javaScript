// document.addEventListener("DOMContentLoaded", () => {
//     // Load YAML file
//     fetch('config/config.yml')
//       .then(response => response.text())
//       .then(yamlText => {
//         const config = jsyaml.load(yamlText); // Parse YAML
//         const blogContainer = document.getElementById("blog-posts");
  
//         // Loop through posts
//         config.posts.forEach(post => {
//           // Fetch each markdown file
//           fetch(`blog/${post.filename}`)
//             .then(response => response.text())
//             .then(markdown => {
//               // Create blog post element
//               const postElement = document.createElement('article');
//               postElement.innerHTML = `<h2>${post.title}</h2>
//                                         <p><em>By ${post.author} on ${post.date}</em></p>
//                                         <div>${marked(markdown)}</div>`;
//               blogContainer.appendChild(postElement);
//             });
//         });
//       })
//       .catch(error => console.error('Error loading YAML:', error));
//   });
  


document.addEventListener("DOMContentLoaded", () => {
  console.log("Script loaded...");

  // Load YAML file
  fetch('config/config.yml')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(yamlText => {
      console.log("YAML Loaded", yamlText);  // Debugging log
      const config = jsyaml.load(yamlText);  // Parse YAML

      const blogContainer = document.getElementById("blog-posts");
      console.log("YAML parsed: ", config);

      // Loop through posts
      config.posts.forEach(post => {
        console.log("Loading Post:", post.filename);  // Debugging log
        fetch(`blog/${post.filename}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
          })
          .then(markdown => {
            console.log("Markdown Loaded", markdown);  // Debugging log
            const postElement = document.createElement('article');
            postElement.innerHTML = `<h2>${post.title}</h2>
                                      <p><em>By ${post.author} on ${post.date}</em></p>
                                      <div>${marked(markdown)}</div>`;
            blogContainer.appendChild(postElement);
          });
      });
    })
    .catch(error => console.error('Error loading YAML or Markdown:', error));
});
