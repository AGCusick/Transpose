const fromNotesContainer = document.querySelector('.notes');
const toNotesContainer = document.querySelector('.to-notes')
const fromKey = document.querySelector('.from-key')
const toKey = document.querySelector('.to-key')
const transposeNote = document.querySelector('.transpose-notes')
const hideNotes = document.querySelector('.hide-notes')
const reset = document.querySelector('.reset');
const transposedNotes = document.querySelector('.transposed-notes');
const answer = document.querySelector('.answer');


let arrC = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
let fromKeyArr = [];
let toKeyArr = [];
let offset = '';
let transposeFromKey = '';
let transposeToKey = '';
let notesToTranspose = [];
let noteIndex = [];
let newNotes = [];
let index = [];


function createNotesFrom() {
    // initial array for C chromatic scale
    for (i = 0; i < arrC.length; i++) {
        let fromDiv = document.createElement('button');
        fromDiv.className = 'note-from';
        fromDiv.innerHTML = arrC[i];
        fromNotesContainer.appendChild(fromDiv);
    }

    fromNotesContainer.addEventListener('click', (e) => {
        // get key name to transpose from
        fromKey.innerHTML = e.target.innerHTML;
        //set offset
        offset = arrC.indexOf(e.target.innerHTML)

        // write key name on screen
        transposeFromKey = e.target.innerHTML;
        // create next array for key to transpose to
        for (z = 0; z < arrC.length; z++) {
            let toDiv = document.createElement('button');
            let pointer = (z + offset) % arrC.length;
            toDiv.className = 'note-to'
            toDiv.innerHTML = arrC[pointer];
            toNotesContainer.appendChild(toDiv);
            fromKeyArr.push(arrC[pointer])

        }
        document.querySelector('.notes').style.display = 'none'
    }, { once: true })


    toNotesContainer.addEventListener('click', (e) => {


        if (e.target.className == 'note-to') {
            transposeNote.style.display = 'block';
            transposeToKey = e.target.innerHTML;
            offset = arrC.indexOf(e.target.innerHTML)

            for(x=0;x<arrC.length;x++){
                let pointer = (x + offset) % arrC.length;

                toKeyArr.push(arrC[pointer])
            }
        
            for (k = 0; k < fromKeyArr.length; k++) {
                toKey.innerHTML = e.target.innerHTML;
                let transposingNotesDiv = document.createElement('button');
                transposingNotesDiv.innerHTML = fromKeyArr[k];
                transposingNotesDiv.className = 'transpose-note';
                transposeNote.appendChild(transposingNotesDiv);
            }
         
            document.querySelector('.to-notes').style.display = 'none'

            // pick notes to transpose
            transposeNote.addEventListener('click', (e) => {

                if (e.target.className == 'transpose-note') {
                    newNotes = [];
                    notesToTranspose = [];
                    e.target.className = 'bgColor';
                    notesToTranspose.push(e.target.innerHTML);
                    // transposedNotes.innerHTML = notesToTranspose
                    let index = fromKeyArr.indexOf(e.target.innerHTML)
                    newNotes.push(toKeyArr[index]);
                    // answer.innerHTML = newNotes;

                    for(i=0;i<newNotes.length; i++){
                        let finalNotes = document.createElement('div');
                        finalNotes.className = 'final-notes';
                        finalNotes.innerHTML = `${notesToTranspose}  <div class='final-note-div'>  ${newNotes[i]}</div>`;
                        answer.appendChild(finalNotes)
                    }
                
                }
            })
        }
    }, { once: true })

    reset.addEventListener('click', () => {
        window.location.reload();
    })
}

createNotesFrom();
