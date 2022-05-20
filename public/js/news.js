window.addEventListener('load', () => {
  updateUI();
})

function updateUI(){
    fetch("/news/articles")
    .then(response => response.json())
    .then(data => {
      if(Object.keys(data).length != 0){
        fetch("/news/images")
        .then(response => response.json())
        .then(images => {
          let items = []
          let item
          
      if(Object.keys(images).length != 0){
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