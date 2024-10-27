/* ! document.elementbyid ile elemanlara HTML'DEN ulaşma ve onları obje haline getime*/

const prevButton = document.getElementById('prev')
const nextButton = document.getElementById('next')
const repeatButton = document.getElementById('repeat')
const shuffleButton = document.getElementById('shuffle')
const audio = document.getElementById('audio')
const songImage = document.getElementById('song-image')
const songName = document.getElementById('song-name')
const songArtist = document.getElementById('song-artist')
const pauseButton = document.getElementById('pause')
const playButton = document.getElementById('play')
const playListButton = document.getElementById('playlist')


const maxDuration = document.getElementById('max-duration')
const currentTimeRef = document.getElementById('current-time')

const progressBar = document.getElementById('progress-bar')
const playListContainer = document.getElementById('playlist-container')
const closeButton= document.getElementById('close-button')
const playListSongs = document.getElementById('playlist-songs')

const currentProgress = document.getElementById('current-progress')

//!SIRA
let index

//!DÖNGÜ
let loop = true

//!LİSTE
const songsList = [
{
    name: "Gidenlerden.mp3",
    link: "ASSETS/Gidenlerden.mp3",
    artist: "Mustafa Sandal",
    image: "ASSETS/Mustafa Sandal.jpg"
},

{
    name: "Je nai pas change.mp3",
    link: "ASSETS/je nai pas change.mp3",
    artist: "Julio Iglesias",
    image: "ASSETS/Julio Iglesias.jpg"
},
   
{
    name: "The Winner Takes It All",
    link: "ASSETS/The Winner Takes It All.mp3",
    artist: "Abba",
    image: "ASSETS/Abba.jpg"
},

{
    name: "Sevdanin Son Vurusu",
    link: "ASSETS/Sevdanin Son Vurusu.mp3",
    artist: "Tarkan",
    image: "ASSETS/Tarkan.jpg"
},

{
    name: "Dut Agaci Dut Verir",
    link: "ASSETS/Dut Agaci Dut Verir.mp3",
    artist: "Burdurlu Hafiz",
    image: "ASSETS/Burdurlu Hafiz.jpg"
}
]

//!ŞARKI ATAMA 4  (INDEX OLUŞTURDUK, BU INDEXE ŞARKILAR ATADIK)
const setSong = (arrayIndex) =>{
    console.log(arrayIndex)
    let {name, link, artist, image} = songsList[arrayIndex]
    audio.src = link
    songName.innerHTML = name
    songArtist.innerHTML = artist
    songImage.src = image

    //!SÜREYİ AYARLAMA
    audio.onloadedmetadata = () => {
        maxDuration.innerText = timeFormatter(audio.duration)
    }

    playListContainer.classList.add('hide')
    playAudio()
}

//!ZAMANI İSTENİLEN FORMATTA DÜZENLEMEK İÇİN / 145
const timeFormatter = (timeInput) => {
    let minute = Math.floor(timeInput/60) // 3,25
    minute = minute < 10 ? "0"+minute : minute
    let second = Math.floor(timeInput % 60) // 25
    second = second < 10 ? "0"+second : second
    return `${minute}:${second}`
}


//!ŞARKIYI ÇALMAK İÇİN FONKYON
const playAudio = () =>{
    audio.play()
    pauseButton.classList.remove('hide')
    playButton.classList.add('hide')
}

//!ŞARKIYI DURDURMAK İÇİN FONKSYON
const pauseAudio = () =>{
    audio.pause()
    pauseButton.classList.add('hide')
    playButton.classList.remove('hide')
}

//!SONRAKİ ŞARKIYA GİTMEK İÇİN  FONKSYON
const nextSong = () =>{
    if (loop) {
        if (index == (songsList.length - 1)) {
            index = 0
        }else {
            index += 1 //! index = index + 1
        }
    } else {
        //!RASTGELE ŞARKI ATAMAK VE SIRA OLUŞTURMAK İÇİN
        let randIndex = Math.floor(Math.random()*songsList.length)
        index = randIndex
    }
    setSong(index)
    playAudio()
}

//!ÖNCEKİ ŞARKIYA GİTMEK İÇİN 
const previousSong = () =>{
    pauseAudio()
    if (index>0) {
        index -= 1 //! index = index - 1
    }else {
        index = songsList.length - 1
    }
    setSong(index)
    playAudio()
}



//!PLAY BUTONUNA TIKLADIĞIMIZ DA, ADDEVENTLISTENER OLAY İZLEYİCİSİ İLE KOMUT VERME
playButton.addEventListener('click',playAudio)

//! PAUSE BUTONUNA BASILMASI KOMUTUNU
pauseButton.addEventListener('click', pauseAudio)

//! SONRAKİ ŞARKIYA GEÇME KOMUTUNU ADDEVENTLISTENER İLE
nextButton.addEventListener('click',nextSong)

//!ÖNCEKİ ŞARKIYA GEÇME BUTONUNA TIKLAMA KOMUTU
prevButton.addEventListener('click', previousSong)

//! KARIŞTIRMA BUTONUNA TIKLANILDIĞINDA & IF/ELSE 
shuffleButton.addEventListener('click',()=>{
    if (shuffleButton.classList.contains('active')) {
        shuffleButton.classList.remove('active')
        loop = true
    } else {
        shuffleButton.classList.add("active")
        loop = false
    }
})

//!ŞARKIYI TEKRAR ETME BUTONUNA TIKLAMA KOMUTU
repeatButton.addEventListener('click',()=>{
    if (repeatButton.classList.contains('active')) {
        repeatButton.classList.remove('active')
        loop = false
    } else {
        repeatButton.classList.add("active")
        loop = true
    }
})

//!PROGRESS BAR'A TIKLAMA KOMUTU
progressBar.addEventListener('click',(event)=>{

    //! BAŞLANGIÇ SOL
    let coordStart = progressBar.getBoundingClientRect().left
   
    console.log("coordStart: " +coordStart)

    //! BİTİŞ
    let coordEnd = event.clientX
    console.log("coordEnd: " +coordEnd)

    console.log("progressBar.offsetWidth: " + progressBar.offsetWidth)

    let progress =  (coordEnd - coordStart) / progressBar.offsetWidth
    console.log("progress: " +progress)
    currentProgress.style.width = progress * 100 + "%"

    //! ZAMANI GÜNCELLEME
    audio.currentTime = progress * audio.duration // 300

    //! OYNATMA 
    audio.play()
    pauseButton.classList.remove('hide')
    playButton.classList.add('hide')
})

//! LİSTE BUTONUNA TIKLANILDIĞUNDA
playListButton.addEventListener('click',()=>{
    playListContainer.classList.remove('hide')
})

//! OYNATMA LİSTESİNİ KAPATMAYA TIKLANLDIĞNDSA
closeButton.addEventListener('click',()=>{
    playListContainer.classList.add('hide')
})

//! EKRAN YÜKLENİLDİĞİNDE
setInterval(() => {
    currentTimeRef.innerHTML = timeFormatter(audio.currentTime)
    currentProgress.style.width = (audio.currentTime/audio.duration.toFixed(3)) * 100 + "%"
}, 1000);


//! ZAMAN GÜNCELLENDİĞİNDE
audio.addEventListener('timeupdate',()=>{
    currentTimeRef.innerText = timeFormatter(audio.currentTime)
})

//! SONRAKİ ŞARKIYA GEÇMEK İÇİN 
audio.onended = () =>{
    nextSong()
}

//! OYNATMA LİSTESİ OLUŞTURMAK İÇİN 
const initializePlaylist = () =>{
    for (let i in songsList) {
        playListSongs.innerHTML += `<li class="playlistSong"
        onclick="setSong(${i})">
            <div class="playlist-image-container">
                <img src="${songsList[i].image}" />
            </div>
            <div class="playlist-song-details">
                <span id="playlist-song-name">
                    ${songsList[i].name}
                </span>
                <span id="playlist-song-artist-album">
                    ${songsList[i].artist}
                </span>
            </div>
        </li>
        `
    }
}

//! EKRAN YÜKLENİLDİĞİNDE
window.onload = () =>{
    index = 0
    setSong(index)
    pauseAudio()
    initializePlaylist()
}