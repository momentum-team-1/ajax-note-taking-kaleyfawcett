let notesForm = document.querySelector("#note-form")
let noteList = document.querySelector(".notelist")




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
        let editInput = document.createElement ("input") 
        let editTarget = event.target.parentElement
        let editButton = document.createElement ('button')
        editInput.classList.add ('editInput')
        editButton.id = "editButton"
        editButton.innerText = "Edit Note"
        editTarget.appendChild (editInput)
        editTarget.appendChild (editButton)
    }

})

noteList.addEventListener ('click' , function (event) {
    if (event.target.matches ('#editButton')) {
        let editText = document.querySelector ('.editInput')
        let newText = editText.value 
        let newTextID = event.target.parentElement.dataset.id 
        // console.log (newText , newTextID)
        editNoteItem (newText , newTextID)
    }
})

function editNoteItem (newText, newTextID) {
    fetch (`http://localhost:3000/notes/${newTextID}` , {
        method: 'PATCH' ,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: newText})
    })
        .then (response => response.json ()) 
}





renderNotes ()


        