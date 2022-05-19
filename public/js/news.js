function updateUI(){
    // console.log('in ui trig')
    fetch("/news/articles")
    .then(response => {
        response.json()
    })
  }

//   await updateUI()
async function uiTrigger(){
    // console.log('in ui trig')
    let temp = await updateUI()
    console.log(temp)
}

uiTrigger()
uiTrigger()