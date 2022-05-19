updateUI()

function updateUI(){
    //Fetch Market prices
    fetch("/news/articles")
    .then(response => response.json())
    .then(data => {
      if(Object.keys(data).length != 0){
        console.log(data)
        
        
      }
    });
  }