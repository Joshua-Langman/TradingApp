// function updateUI(){
//     // console.log('in ui trig')
//     fetch("/news/articles")
//     .then(response => {
//         response.json()
//     })
//   }

// //   await updateUI()
// async function uiTrigger(){
//     // console.log('in ui trig')
//     let temp = await updateUI()
//     console.log(temp)
// }

// uiTrigger()
// uiTrigger()

updateUI()

function updateUI(){
    //Fetch Market prices
    fetch("/news/articles")
    .then(response => response.json())
    .then(data => {
        console.log(data)
      if(Object.keys(data).length != 0){
        console.log(data)
        for (const key in data) {


        }
      }
    });
  }