const backlog = document.getElementById("items-backlog")
const in_progress = document.getElementById("items-in-progress")
const completed = document.getElementById("items-completed")
const on_hold = document.getElementById("items-on-hold")
const backlog_box = document.getElementById("backlog-box")
const in_progress_box = document.getElementById("in-progress-box")
const completed_box = document.getElementById("completed-box")
const on_hold_box = document.getElementById("on-hold-box")
const outscreen = document.getElementById("wrapper")
const all_item = document.getElementsByClassName("item")
let inputting = false
let current_box_dragged = null
let current_item_dragged = null

boxes = [backlog_box,in_progress_box,completed_box,on_hold_box]
boxes.forEach(box => {
    box.addEventListener("dragover", () => {
        current_box_dragged = box.children[1]
    });
})

const enable_inputting = (item) => {
    inputting = true
    item.style.backgroundColor = "white"
    item.style.color = "black"
}

const disable_inputting = (item) => {
    inputting = false
    item.disabled = true
    item.disabled = false
    if (item.value === "") {
        item.current_box.removeChild(item)
    }
}

const add_item = (box) => {
    const item = document.createElement("input")
    item.className = "item"
    item.current_box = box
    item.draggable = "true"
    if (inputting != true) {
        box.append(item)
        item.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                disable_inputting(item)
            }
        })
        item.addEventListener("click", () => {
            setTimeout(() => {
                enable_inputting(item)
            }, 1);     
        })
        outscreen.addEventListener("click", () => {
            if (inputting === true) {
                disable_inputting(all_item)
            }
        })
        item.addEventListener("dragend", () => {
            item.current_box.removeChild(item)
            item.current_box = current_box_dragged
            current_box_dragged.append(item)
        })
        item.addEventListener("dragover", () => {
            current_item_dragged = item
        })
    }

}

