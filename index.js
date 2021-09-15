let songs = [
    {
        name: 'Viah Nai Karauna',
        singer: 'Asees Kaur',
        album: 'images/viah.jpg',
        song: 'songs/viah.mp3',
        duration: '3:26'
    },
    {
        name: 'Temporary Pyar',
        singer: 'Kaka',
        album: 'images/temporary.png',
        song: 'songs/temporary.mp3',
        duration: '4:35'
    },
    {
        name: 'Coca Cola',
        singer: 'Neha Kakar & Young Desi',
        album: 'images/coca.jpg',
        song: 'songs/coca.mp3',
        duration: '2:23'
    }
];



// Targeting DOM Elements
let songName = document.querySelector('h1');
let singer = document.querySelector('h2');
let album = document.querySelector('img');
let backBtn = document.querySelector('#backward-btn');
let nextBtn = document.querySelector('#forward-btn');
let playBtn = document.querySelector('#play-btn');
let pauseBtn = document.querySelector('#pause-btn');
let elapsedDuration = document.querySelector('#elapsed-duration');
let totalDuration = document.querySelector('#total-duration');
let bar = document.querySelector('#bar');



// Common Variables
let index = 0;
let currentTime = 0;
let totalTime = 0;
let audio = new Audio();



// Utility Functions
const loadSong = ()=>{
    songName.textContent = songs[index].name;
    singer.textContent = songs[index].singer;
    album.setAttribute('src', songs[index].album);
}


const nextSong = ()=>{
    if(index==songs.length-1){
        index = 0;
    }else{
        index = index+1;
    }
    loadSong();
    currentTime = 0;
    audio.src = songs[index].song;
    audio.play();
    totalDuration.textContent = songs[index].duration;
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'block';
}



const previousSong = ()=>{
    if(index==0){
        index = songs.length-1;
    }else{
        index = index-1;
    }
    loadSong();
    currentTime = 0;
    audio.src = songs[index].song;
    audio.play();
    totalDuration.textContent = songs[index].duration;
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'block';
}




// Progress Bar code starts here
const calculateTotalDuration = ()=>{
    return ((Number((songs[index].duration.slice(0,1)))*60)+((Number(songs[index].duration.slice(2)))));
    
}

const restartBarAnimation = ()=>{
    bar.firstElementChild.classList.remove('inside-bar');
    void bar.firstElementChild.offsetWidth;
    bar.firstElementChild.classList.add('inside-bar');
    bar.firstElementChild.style.animationDuration = Number(calculateTotalDuration())+'s';
}
// Progress Bar code ends here
let min = 00;
let sec = 00;
let str;
let id;
let interval = 1000;
const elapsedTime = ()=>{
    id = setInterval(()=>{
        if(str==songs[index].duration){
            console.log(songs[index].duration.length);
            min = 0;
            sec = 0;
        }
        if(sec==59){
            min = min+1;
            sec = 00;
        }else{
            sec = sec+1;
        }
        str = String(min)+":"+String(sec);
        elapsedDuration.textContent = str;
    },interval);
    
    
}







// Events sections starts here
window.addEventListener('load', ()=>{
    loadSong();
    totalDuration.textContent = songs[index].duration;
});

playBtn.addEventListener('click', ()=>{
    audio.src=songs[index].song;
    audio.currentTime = currentTime;
    audio.play();
    bar.firstElementChild.classList.add('inside-bar');
    bar.firstElementChild.style.animationPlayState = 'running';
    bar.firstElementChild.style.animationDuration = Number(calculateTotalDuration())+'s';
    album.classList.add('image-animation');
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'block';
    setTimeout(()=>{
        nextSong();
    },Number(calculateTotalDuration())*1000);
    elapsedTime();
});

playBtn.addEventListener('mouseenter', ()=>{
    playBtn.setAttribute('title', 'Play');
});



pauseBtn.addEventListener('click', ()=>{
    audio.pause();
    bar.firstElementChild.style.animationPlayState = 'paused';
    album.classList.remove('image-animation');
    currentTime = audio.currentTime;
    pauseBtn.style.display = 'none';
    playBtn.style.display = 'block';
    clearInterval(id);
});

pauseBtn.addEventListener('mouseenter', ()=>{
    pauseBtn.setAttribute('title', 'Pause');
});


nextBtn.addEventListener('click', ()=>{
    nextSong();
    restartBarAnimation();
    min = 0;
    sec = 0;
    elapsedTime();
});

nextBtn.addEventListener('mouseenter', ()=>{
    nextBtn.setAttribute('title','Next');
});


backBtn.addEventListener('click', ()=>{
    previousSong();
    restartBarAnimation();
    min = 0;
    sec = 0;
    // elapsedTime();
});

backBtn.addEventListener('mouseenter', ()=>{
    backBtn.setAttribute('title', 'Previous');
});







// Progress Bar Code


