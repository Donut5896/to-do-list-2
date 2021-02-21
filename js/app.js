
//select elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById('date');
const list = document.getElementById("list");
const input = document.getElementById("input");

//class names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";


//variables
let LIST = [],
 id = 0;




//show today date
const options = {weekday : "long", month:"short", day:"numeric"}
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//add to do function
function addToDo(toDo, id, done, trash){


    if(trash){return;}
    const DONE = done? CHECK : UNCHECK;
    const LINE = done? LINE_THROUGH : "";



    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" id="${id}"></i>
                    </li>`;

    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

//add an item to the list user by the enter key
document.addEventListener("keyup", function(event){
    if(event.keycode == 13){
        const toDo = input.value;

        //if the input isn't empthy
        if(toDo){
            addToDo(toDo);
            //push items to the list aray
            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });
            id++;
        }
        input.value = "";
    }
})

//complete button function
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    //update the lists
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
//update the list
LIST[element.id].trash = true;
}

//target the item created daynamically
list.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value; // return complete or delete

    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element)
    }
})