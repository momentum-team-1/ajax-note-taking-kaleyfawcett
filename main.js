let notesForm = document.querySelector("#note-form")
let noteList = document.querySelector(".notelist")

let editInput = document.createElement ("input")


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
        let editIcon = document.createElement ('span')
        editIcon.id = 'edit'
        editIcon.classList.add ('fa', 'fa-edit', 'mar-l-xs')
        listItem.appendChild(editIcon)
        listItem.appendChild (editInput)
        let deleteIcon = document.createElement('span')
        deleteIcon.id = 'delete'
        deleteIcon.classList.add('fa', 'fa-trash', 'mar-l-xs')
        listItem.appendChild(deleteIcon)
        list.appendChild (listItem)
    }
    noteList.appendChild (list)

    }) 
}

noteList.addEventListener ('click', function (event) {
    if (event.target.matches ('#delete')) {
        deleteNoteItem (event.target.parentElement.dataset.id)
    }
})

function deleteNoteItem (noteId) {
    
    fetch (`http://localhost:3000/notes/${noteId}` , {
        method: 'DELETE'
    })
        .then (response => response.json ())
}

noteList.addEventListener ('click' , function (event) {
    if (event.target.matches ('#edit')) {
        editNoteItem (event.target.parentElement.dataset.id)
    }
})

function editNoteItem (noteText) {
    fetch (`http://localhost:3000/notes/${noteText}` , {
        method: 'PATCH' ,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: noteText})
    })
        .then (response => response.json ())
}





renderNotes ()


        