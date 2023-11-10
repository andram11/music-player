const image= document.querySelector('img')
const title=document.getElementById('title')
const artist=document.getElementById('artist')
const music=document.querySelector('audio')
const progressContainer= document.getElementById('progress-container')
const progress= document.getElementById('progress')
const currentTimeEl=document.getElementById('current-time')
const durationEl= document.getElementById('duration')
const prevBtn=document.getElementById('prev')
const playBtn=document.getElementById('play')
const nextBtn=document.getElementById('next')

//Music
const songs=[
    {
        name: 'mirrors',
        displayName: 'Mirrors in Creation',
        artist: '11th Cut'
    },
    {
        name: 'grey',
        displayName: 'Grey',
        artist: 'EXES'
    },

    {
        name: 'prelude',
        displayName: 'Prelude',
        artist: 'Yanni'
    },
    {
        name: 'synchronized',
        displayName: 'Synchronized',
        artist: 'Ilkay Sencan feat. Mr And Mrs Cactus'
    },

]
//Check if playing
let isPlaying=false;

//Play 
function playSong(){
    isPlaying= true
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'Pause')
    music.play()
    
}

//Pause 
function pauseSong(){
    isPlaying= false
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'Play')
    music.pause()
}

//Play or pause event listener
playBtn.addEventListener('click', ()=>{isPlaying ? pauseSong():playSong()})





//Update DOM
function loadSong(song){
    title.textContent=song.displayName;
    artist.textContent=song.artist
    music.src=`music/${song.name}.mp3`
    image.src=`img/${song.name}.jpg`
}


//Current SOng
let songIndex=0

function prevSong(){
    songIndex--
    if (songIndex<0){
        songIndex=songs.length-1
    }
    loadSong(songs[songIndex])
    playSong()
}

//Next song
function nextSong(){
    songIndex++
    if (songIndex>songs.length-1){
        songIndex=0
    }
    loadSong(songs[songIndex])
    playSong()
}

//On Load - Select first song
loadSong(songs[songIndex])


//Progress bar and time

function updatePogressBar(e){
    if (isPlaying){
        const {duration, currentTime}= e.srcElement
        //Update progress bar width
        const progressPercent= (currentTime/duration)*100
        progress.style.width=`${progressPercent}%`
        //Calculate display for duration
        const durationMinutes= Math.floor(duration/60)
        let durationSeconds=Math.floor(duration%60)
        if (durationSeconds <10){
            durationSeconds=`0${durationSeconds}`
        }
        
        //Delay switching the duration element to avoid NaN
        if (durationSeconds){
            durationEl.textContent=`${durationMinutes}:${durationSeconds}`
        }

        //Calculate display for current time
        const currentTimeMinutes= Math.floor(currentTime/60)
        let currentSeconds=Math.floor(currentTime%60)
        if (currentSeconds <10){
            currentSeconds=`0${currentSeconds}`
        }
        currentTimeEl.textContent=`${currentTimeMinutes}:${currentSeconds}`

    }
}

//Set Progress Bar
function setProgressBar(e){
    const width=this.clientWidth
    const clickX=e.offsetX
    const {duration}=music
    music.currentTime=(clickX/width)*duration

}

//Event Listeners
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
music.addEventListener('ended', nextSong)
music.addEventListener('timeupdate', updatePogressBar)
progressContainer.addEventListener('click', setProgressBar)