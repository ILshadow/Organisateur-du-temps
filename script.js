
let tempNomModule = "";

const inputNomModule = document.getElementById('inputNom');

inputNomModule.addEventListener('keypress',(event)=>{
    if(event.target.value.length > 15){
        event.preventDefault();
    }
    if(event.target.value.length === 0 && event.key === " "){
        event.preventDefault();
    }
    if(event.key === 'Enter'){
        createtimer();
    }
})

function createtimer(){
    const containerElement = document.querySelector('.small-container');
    const newContainerElement = containerElement.cloneNode(true);

    tempNomModule = inputNomModule.value;
    inputNomModule.value = "";
    if(tempNomModule === ""){
        tempNomModule = "nom du module";
    }
    for(i = tempNomModule.length - 1; i > 0; i--){
        if(tempNomModule[i] === " "){
            tempNomModule = tempNomModule.slice(0, tempNomModule.length - 1);
        }else
            break;
    }

    newContainerElement.firstElementChild.innerHTML = tempNomModule;
    newContainerElement.style.display = 'flex';
    containerElement.after(newContainerElement);
}


const hours = 0 ,
    minutes = 1,
    seconds = 2;
let interval1 = interval2 = 0;
let upinterval = true;
let downinterval = true;

const anonymeBg = document.querySelector('.anonyme');

function incrementer(element) {
    const parent = element.parentElement;
    let buttons = parent.getElementsByTagName('button');

    if(upinterval){
        downinterval = false;
        decrementer(buttons[0])
        parent.style.zIndex = '100';
        anonymeBg.style.zIndex = "99";

        upinterval = false;

        let svgele = element.querySelector('img');
        svgele.style.animation = "animFlech .75s";
        setTimeout(()=>{
            svgele.style.removeProperty("animation")
        },750);
        buttons[1].style.backgroundColor = "rgb(30,30,30)";


        interval1 = setInterval(()=>{
            let duree = parent.children[1].textContent;
            duree = duree.split(":");
            for (let i = 0; i < duree.length; i++) {
                duree[i] = Number(duree[i]);
            }
            if(duree[seconds] < 59){
                duree[seconds]++;
            }else {
                duree[seconds] = 0;
                if (duree[minutes] < 59) {
                    duree[minutes]++;
                }else {
                    duree[hours]++;
                    duree[minutes] = 0;
                    if(duree[hours] > 999){
                        duree[hours] = 999;
                    }
                }
            }
            let newDuree = ((duree[hours].toString().length > 1) ? duree[hours].toString() : "0" + duree[hours].toString()) + ((duree[minutes].toString().length > 1) ? ":" + duree[minutes].toString() : ":" + "0" + duree[minutes].toString()) + ":" + ((duree[seconds].toString().length > 1)? duree[seconds].toString() : "0" +duree[seconds].toString());
            parent.children[1].innerHTML = newDuree;
            },1)
    }else {
        parent.style.zIndex = '0';
        anonymeBg.style.zIndex = "-1";
        buttons[1].style.backgroundColor = "rgba(255, 255, 255, 0.22)";
        upinterval = true;
        clearInterval(interval1);
    }
}

function decrementer(element , value = 1){
    const parent = element.parentElement;
    let buttons = parent.getElementsByTagName('button');

    if(downinterval){
        upinterval = false;
        incrementer(buttons[1]);
        downinterval = false;

        parent.style.zIndex = '100';
        anonymeBg.style.zIndex = "99";

        buttons[2].querySelector('img').style.padding = "1px 0 0 1px";
        buttons[2].querySelector('img').style.width = "12px";
        buttons[2].querySelector('img').src = "media/img/play.png"

        if(value === 1000){
            buttons[2].style.backgroundColor = "rgb(30,30,30)";
            buttons[2].querySelector('img').style.padding = "0";
            buttons[2].querySelector('img').style.width = "15px";
            buttons[2].querySelector('img').src = "media/img/pause.png";
        }
        if(value === 1){
            let svgele = element.querySelector('img');
            svgele.style.animation = "animFlech2 .75s";
            setTimeout(()=>{
                svgele.style.removeProperty("animation")
            },750);

            buttons[0].style.backgroundColor = "rgb(30,30,30)";
        }



        interval2 = setInterval(()=>{
            let duree = parent.children[1].textContent;

            if(duree === "00:00:00"){
                downinterval = false;
                clearInterval(interval2);
                decrementer(element,value);
            }

            duree = duree.split(":");

            for (let i = 0; i < duree.length; i++) {
                duree[i] = Number(duree[i]);
            }

            if(duree[seconds] > 0){
                duree[seconds]--;
            }else if(duree[minutes] > 0){
                duree[seconds] = 59;
                duree[minutes]--;
            }else if(duree[hours] > 0){
                duree[hours]--;
                duree[minutes] = 59;
                duree[seconds] = 59;
            }

            if(value === 0){
                downinterval = false;
            }

            let newDuree = ((duree[hours].toString().length > 1) ? duree[hours].toString() : "0" + duree[hours].toString()) + ((duree[minutes].toString().length > 1) ? ":" + duree[minutes].toString() : ":" + "0" + duree[minutes].toString()) + ":" + ((duree[seconds].toString().length > 1)? duree[seconds].toString() : "0" +duree[seconds].toString());

            parent.children[1].innerHTML = newDuree;
        },value)
    }else {
        clearInterval(interval2);
        buttons[2].querySelector('img').style.padding = "1px 0 0 1px";
        buttons[2].querySelector('img').style.width = "12px";
        buttons[2].querySelector('img').src = "media/img/play.png"
        parent.style.zIndex = '0';
        anonymeBg.style.zIndex = "-1";
        buttons[0].style.backgroundColor = "rgba(255, 255, 255, 0.22)"
        buttons[2].style.backgroundColor = "rgba(255, 255, 255, 0.22)"
        downinterval = true;
    }
}

function time_start(element){
    const parent = element.parentElement;
    let value = 1000;
    decrementer(parent.children[2],value);
}




const tempMax = document.querySelector('.temp-max');

function timerControl(editcont){
    editcont.addEventListener('keypress', (event)=>{
        if(event.target.textContent.length > 8 && event.key !== 'Enter'){
            tempMax.classList.add('animTemMax');
            setTimeout(()=>{
                tempMax.classList.remove('animTemMax');
            },2000)
            event.preventDefault();
        }

        if(isNaN(event.key) && event.key !== ':' && event.key !== 'backspace' && event.key !== 'Enter'){
            event.preventDefault();
        }
        if(event.key === ' '){
            event.preventDefault();
        }

        if(event.key === 'Enter')
            editcont.blur();

        editcont.addEventListener('blur',()=>{
            let timearray = event.target.textContent.split(':');
            if(timearray.length === 1){
                timearray[1] = 0;
                timearray[2] = 0;
            }
            if(timearray.length === 2){
                timearray[2] = 0;
            }

            for(i = 0 ; i < timearray.length ; i++){
                timearray[i] = Number(timearray[i]);
            }

            if(timearray[seconds] > 59){
                timearray[minutes] += parseInt(timearray[seconds]/60);
                timearray[seconds] = timearray[seconds] % 60;
            }
            if(timearray[minutes] > 59){
                timearray[hours] += parseInt(timearray[minutes]/60);
                timearray[minutes] = timearray[minutes] % 60;
            }

            if(timearray[hours] > 999){
                timearray[hours] = 999;
            }

            let dur = ((timearray[hours].toString().length > 1)? timearray[hours].toString() : "0" + timearray[hours].toString()) + ((timearray[minutes].toString().length > 1)? ":" + timearray[minutes].toString() : ":0" + timearray[minutes].toString()) + ((timearray[seconds].toString().length > 1)? ":" + timearray[seconds].toString() : ":0" + timearray[seconds].toString());
            editcont.textContent = dur;
        })

    });
}

const nomMax = document.querySelector('.nom-max');
function nomModuleMax(element) {
    element.addEventListener('keypress', (event)=>{
        if(event.target.textContent.length > 15){
            nomMax.classList.add('animTemMax');
            setTimeout(()=>{
                nomMax.classList.remove('animTemMax');
            },2000)
            event.preventDefault();
        }
    })
}

function save(){
    let arraytimesave = []
    let arraynomsave = []

    const allsmallcontainers = document.getElementsByClassName('small-container');

    for(i = 1 ; i < allsmallcontainers.length ; i++){
        arraynomsave[i-1] = allsmallcontainers[i].querySelectorAll('p')[0].textContent;
        arraytimesave[i-1] = allsmallcontainers[i].querySelectorAll('p')[1].textContent;
    }
    const myVarToStore = {
        noms: arraynomsave,
        durees: arraytimesave
    };
    localStorage.setItem("storedVar", JSON.stringify(myVarToStore))
}
function load(){
    const localvarStorage = localStorage.getItem("storedVar");
    if(localvarStorage){
        const myVars = JSON.parse(localvarStorage);
        for(i = myVars.noms.length - 1; i >= 0; i--){
            tempcreatetimer(myVars.noms[i],myVars.durees[i]);
        }
    }
}

function tempcreatetimer(nom,dure){
    const containerElement = document.querySelector('.small-container');
    const newContainerElement = containerElement.cloneNode(true);

    const p_of_container = newContainerElement.getElementsByTagName('p');
    p_of_container[0].textContent = nom;
    p_of_container[1].textContent = dure;

    newContainerElement.style.display = 'flex';
    containerElement.after(newContainerElement);
}
window.addEventListener('beforeunload',(event)=>{
    save();
})

window.addEventListener('load',()=>{
    load();
})

function deleteTimer(element){
    anonymeBg.style.zIndex = "-1";
    element.parentNode.remove();
}