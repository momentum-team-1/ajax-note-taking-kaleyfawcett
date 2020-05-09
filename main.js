let notesForm = document.querySelector("#note-form")


notesForm.addEventListener ('submit' , function (event) {
    event.preventDefault()
    let noteTextInput = document.querySelector ("#note-text")
    let noteText = noteTextInput.value 
    noteTextInput.value = ''
    createNewNote (noteText)

})

function createNewNote (noteText) {
    fetch ("http://localhost:3000/notes" , {
        method: 'POST' , 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: noteText, done: false, created: moment().format() })

    })
    .then (response => response.json ()) 
    .then (data => console.log (data))
}

function renderNotes () {
    fetch ("http://localhost:3000/notes" , {
        method: 'GET'
})
    .then(response => response.json())
    .then(function (data) {
    let list = document.createElement ("ul")
    for (let item of data) {
        let listItem = document.createElement ("li")
        listItem.dataset.id = item.id
        listItem.innerText = item.item 
        list.appendChild (listItem)
    }
    let noteList = document.querySelector(".notelist")
    noteList.appendChild (list)

    }) 
}

renderNotes ()


        