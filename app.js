const addBtn = document.querySelector('#addNote');
const main = document.querySelector('#main');

addBtn.addEventListener(
    "click", function () {
        AddNote();
    }
)

const saveNote = () => {
    const notes = document.querySelectorAll('.note textarea');
    const data = [];
    notes.forEach(
        (note) => {
            data.push(note.value);
        }
    )
    if (data.length == 0) {
        localStorage.removeItem("notes");
    } else {
        localStorage.setItem("notes", JSON.stringify(data));
    }

}

const AddNote = (text = "") => {
    saveNote();
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
    <div class="tool">
        <i class="trash fa fa-trash-o" style="font-size:24px"></i>
        <i class="save fa fa-save" style="font-size:24px"></i>
    </div>
    <textarea>${text}</textarea>
    `;

    note.querySelector('.trash').addEventListener(
        "click", function () {
            note.remove();
            saveNote();
        }
    )

    note.querySelector('.save').addEventListener(
        "click", function () {
            saveNote()
        }
    )
    note.querySelector("textarea").addEventListener(
        "focusout",function(){
            saveNote();
        }
    )
    main.appendChild(note);
    saveNote();

}

(
    function () {
        const notels = JSON.parse(localStorage.getItem("notes"));
        if (notels === null) {
            AddNote();
        } else {
            notels.forEach(
                (notels) => {
                    AddNote(notels);
                }
            )
        }
    }

)()