window.addEventListener('load', () => {
  updateUI();
})

function updateUI() {
  fetch("/news/articles")
    .then(response => response.json())
    .then(data => {
      if (Object.keys(data).length != 0) {
        fetch("/news/images")
          .then(response => response.json())
          .then(images => {
            let items = []
            let item

            if (Object.keys(images).length != 0) {
              let index = 0
              for (const photo of images.photos) {
                item = `<article class="blog-box">
          <figure class="blog-img">
            <img src="${photo.src.medium}" alt="">
          </figure>
          <section class="blog-text">
            <p>20 May 2020 / ${data[index].source}</p>
            <a href="${data[index].url}"  target="_blank"><p class="blog-title">${data[index].title}<p/></a>
          </section>
        </article>`

                items.push(item)
                index++
              }
              document.getElementById("blog").innerHTML = items.join('')
            }
          });
      }
    });
}

// SVG loaders
let loadList = Array(20).fill().map(i =>
  `<svg class='blog-box' role="img" width="300" height="250" aria-labelledby="loading-aria" viewBox="0 0 300 250"
              preserveAspectRatio="none">
              <title id="loading-aria">Loading...</title>
              <rect x="0" y="0" width="100%" height="100%" clip-path="url(#clip-path)" style='fill: url("#fill");'>
              </rect>
              <defs>
                  <clipPath id="clip-path">
                      <rect x="1" y="141" rx="3" ry="3" width="410" height="6" />
                      <rect x="2" y="157" rx="3" ry="3" width="380" height="6" />
                      <rect x="1" y="173" rx="3" ry="3" width="178" height="6" />
                      <rect x="2" y="0" rx="0" ry="0" width="407" height="121" />
                  </clipPath>
                  <linearGradient id="fill">
                      <stop offset="0.599964" stop-color="#404040" stop-opacity="1">
                          <animate attributeName="offset" values="-2; -2; 1" keyTimes="0; 0.25; 1" dur="2s"
                              repeatCount="indefinite"></animate>
                      </stop>
                      <stop offset="1.59996" stop-color="#e6e6e6" stop-opacity="1">
                          <animate attributeName="offset" values="-1; -1; 2" keyTimes="0; 0.25; 1" dur="2s"
                              repeatCount="indefinite"></animate>
                      </stop>
                      <stop offset="2.59996" stop-color="#404040" stop-opacity="1">
                          <animate attributeName="offset" values="0; 0; 3" keyTimes="0; 0.25; 1" dur="2s"
                              repeatCount="indefinite"></animate>
                      </stop>
                  </linearGradient>
              </defs>
          </svg>`
);
document.getElementById('blog').innerHTML = loadList.join(' ');