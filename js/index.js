const dataMusic = [
	{
		id: '1',
		artist: 'The weeknd',
		track: 'Save your tears',
		poster: 'img/photo1.jpg',
		mp3: 'audio/The Weeknd - Save Your Tears.mp3',
	},
	{
		id: '2',
		artist: 'Imagine Dragons',
		track: 'Follow You',
		poster: 'img/photo2.jpg',
		mp3: 'audio/Imagine Dragons - Follow You.mp3',
	},
	{
		id: '3',
		artist: 'Tove Lo',
		track: 'How Long',
		poster: 'img/photo3.jpg',
		mp3: 'audio/Tove Lo - How Long.mp3',
	},
	{
		id: '4',
		artist: 'Tom Odell',
		track: 'Another Love',
		poster: 'img/photo4.jpg',
		mp3: 'audio/Tom Odell - Another Love.mp3',
	},
	{
		id: '5',
		artist: 'Lana Del Rey',
		track: 'Born To Die',
		poster: 'img/photo5.jpg',
		mp3: 'audio/Lana Del Rey - Born To Die.mp3',
	},
	{
		id: '6',
		artist: 'Adele',
		track: 'Hello',
		poster: 'img/photo6.jpg',
		mp3: 'audio/Adele - Hello.mp3',
	},
	{
		id: '7',
		artist: 'Tom Odell',
		track: "Can't Pretend",
		poster: 'img/photo7.jpg',
		mp3: "audio/Tom Odell - Can't Pretend.mp3",
	},
	{
		id: '8',
		artist: 'Lana Del Rey',
		track: 'Young And Beautiful',
		poster: 'img/photo8.jpg',
		mp3: 'audio/Lana Del Rey - Young And Beautiful.mp3',
	},
	{
		id: '9',
		artist: 'Adele',
		track: 'Someone Like You',
		poster: 'img/photo9.jpg',
		mp3: 'audio/Adele - Someone Like You.mp3',
	},
	{
		id: '10',
		artist: 'Imagine Dragons',
		track: 'Natural',
		poster: 'img/photo10.jpg',
		mp3: 'audio/Imagine Dragons - Natural.mp3',
	},
	{
		id: '11',
		artist: 'Drake',
		track: 'Laugh Now Cry Later',
		poster: 'img/photo11.jpg',
		mp3: 'audio/Drake - Laugh Now Cry Later.mp3',
	},
	{
		id: '12',
		artist: 'Madonna',
		track: 'Frozen',
		poster: 'img/photo12.jpg',
		mp3: 'audio/Madonna - Frozen.mp3',
	},
];

let playList = [];

const favoriteList = localStorage.getItem('favorite') ? JSON.parse(localStorage.getItem('favorite')) : [];

const tracksCard = document.getElementsByClassName('track');
const pauseBtn = document.querySelector('.player__controller-pause');
const stopBtn = document.querySelector('.player__controller-stop');
const prevBtn = document.querySelector('.player__controller-prev');
const nextBtn = document.querySelector('.player__controller-next');
const likeBtn = document.querySelector('.player__controller-like');
const muteBtn = document.querySelector('.player__controller-mute');
const playerVolumeInput = document.querySelector('.player__volume-input');
const player = document.querySelector('.player');
const catalogContainer = document.querySelector('.catalog__container');
const playerProgressInput = document.querySelector('.player__progress-input');
const playerTimePassed = document.querySelector('.player__time-passed');
const playerTimeTotal = document.querySelector('.player__time-total');
const favoriteBtn = document.querySelector('.header__favorite-btn');

const audio = new Audio();

const catalogAddBtn = document.createElement('button');
catalogAddBtn.classList.add('catalog__btn-add');
catalogAddBtn.innerHTML = `
  <span>Увидеть все</span>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" />
  </svg>
`;

const pausePlayer = () => {
	const trackActive = document.querySelector('.track--active');
	if (audio.paused) {
		audio.play();
		pauseBtn.classList.remove('player__icon--play');
		trackActive.classList.remove('track--pause');
	} else {
		audio.pause();
		pauseBtn.classList.add('player__icon--play');
		trackActive.classList.add('track--pause');
	}
};

const playMusic = (e) => {
	e.preventDefault();
	const trackActive = e.currentTarget;

	if (trackActive.classList.contains('track--active')) {
		pausePlayer();
		return;
	}

	let i = 0;
	const id = trackActive.dataset.idTrack;

	const index = favoriteList.indexOf(id);

	if (index !== -1) {
		likeBtn.classList.add('player__icon-like--active');
	} else {
		likeBtn.classList.remove('player__icon-like--active');
	}

	const track = dataMusic.find((item, index) => {
		i = index;
		return id === item.id;
	});
	audio.src = track.mp3;

	audio.play();
	pauseBtn.classList.remove('player__icon--play');
	player.classList.add('player--active');

	const prevTrack = i === 0 ? playList.length - 1 : i - 1;
	const nextTrack = i + 1 === playList.length ? 0 : i + 1;
	prevBtn.dataset.idTrack = playList[prevTrack].id;
	nextBtn.dataset.idTrack = playList[nextTrack].id;
	likeBtn.dataset.idTrack = id;

	for (let i = 0; i < tracksCard.length; i++) {
		if (id === tracksCard[i].dataset.idTrack) {
			tracksCard[i].classList.add('track--active');
		} else {
			tracksCard[i].classList.remove('track--active');
		}
	}
};

const addHandlerTrack = () => {
	Array.from(tracksCard).forEach((track) => {
		track.addEventListener('click', playMusic);
	});
};

pauseBtn.addEventListener('click', (e) => pausePlayer);
stopBtn.addEventListener('click', (e) => {
	audio.src = '';
	player.classList.remove('player--active');
	document.querySelector('.track--active').classList.remove('track--active');
});

const createCard = ({ artist, track, id, poster }) => {
	const card = document.createElement('a');
	card.classList.add('catalog__item', 'track');
	card.dataset.idTrack = id;
	card.href = '#';
	card.innerHTML = `
    <div class="track__img-wrap">
      <img
        class="track__poster"
        src="${poster}"
        alt="${artist} ${track}"
        width="180"
        height="180"
      />
    </div>
    <div class="track__info track-info">
      <p class="track-info__title">${track}</p>
      <p class="track-info__artist">${artist}</p>
    </div>
  `;
	return card;
};

const renderCatalog = (dataList) => {
	playList = [...dataList];
	catalogContainer.textContent = '';
	const listCards = dataList.map(createCard);
	catalogContainer.append(...listCards);
	addHandlerTrack();
};

const checkCount = (catalogAddBtn, i = 1) => {
	if (catalogContainer.clientHeight > tracksCard[0].clientHeight * 3) {
		tracksCard[tracksCard.length - i].style.display = 'none';
		return checkCount(catalogAddBtn, i + 1);
	}

	if (i !== 1) {
		catalogContainer.append(catalogAddBtn);
	}
};

const updateTime = () => {
	const duration = audio.duration;
	const currentTime = audio.currentTime;
	const progress = (currentTime / duration) * playerProgressInput.max;

	playerProgressInput.value = progress ? progress : 0;

	const minutesPassed = Math.floor(currentTime / 60) || '0';
	const secondsPassed = Math.floor(currentTime % 60) || '0';

	const minutesDuration = Math.floor(duration / 60) || '0';
	const secondsDuration = Math.floor(duration % 60) || '0';

	playerTimePassed.textContent = `${minutesPassed}:${secondsPassed < 10 ? '0' + secondsPassed : secondsPassed}`;
	playerTimeTotal.textContent = `${minutesDuration}:${secondsDuration < 10 ? '0' + secondsDuration : secondsDuration}`;
};

const init = () => {
  audio.volume = localStorage.getItem('volume') || 1;
  playerVolumeInput.value = audio.volume * 100;

	renderCatalog(dataMusic);
	checkCount(catalogAddBtn);

	catalogAddBtn.addEventListener('click', () => {
		Array.from(tracksCard).forEach((trackCard) => {
			trackCard.style.display = '';
			catalogAddBtn.remove();
		});
	});
	prevBtn.addEventListener('click', playMusic);
	nextBtn.addEventListener('click', playMusic);
	audio.addEventListener('timeupdate', updateTime);
	audio.addEventListener('ended', () => {
		nextBtn.dispatchEvent(new Event('click', { bubbles: true }));
	});
	playerProgressInput.addEventListener('input', () => {
		const progress = playerProgressInput.value;
		audio.currentTime = (progress / playerProgressInput.max) * audio.duration;
	});
	likeBtn.addEventListener('click', () => {
		const index = favoriteList.indexOf(likeBtn.dataset.idTrack);

		if (index === -1) {
			favoriteList.push(likeBtn.dataset.idTrack);
			likeBtn.classList.add('player__icon-like--active');
		} else {
			favoriteList.splice(index, 1);
			likeBtn.classList.remove('player__icon-like--active');
		}

		localStorage.setItem('favorite', JSON.stringify(favoriteList));
	});
	favoriteBtn.addEventListener('click', () => {
		const data = dataMusic.filter((item) => favoriteList.includes(item.id));
		renderCatalog(data);
	});

  playerVolumeInput.addEventListener('input', () => {
    const value = playerVolumeInput.value;
    audio.volume = value / 100;
  })

  muteBtn.addEventListener('click', () => {
    if (audio.volume) {
      localStorage.setItem('volume', audio.volume)
      audio.volume = 0;
      playerVolumeInput.value = 0;
      muteBtn.classList.add('player__icon--mute-off');
    } else {
      muteBtn.classList.remove('player__icon--mute-off');
      audio.volume = localStorage.getItem('volume');
			playerVolumeInput.value = audio.volume * 100;
    }
  })
  playerVolumeInput
};

init();
