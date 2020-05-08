let notesForm = document.querySelector("#note-form")


notesForm.addEventListener ('submit' , function (event) {
    event.preventDefault()
    let noteTextInput = document.querySelector ("#note-text")
    let noteText = noteTextInput.value 
    noteTextInput.value = ''
    createNewNote (noteText)

})

function createNewNote (noteText) {
    
}