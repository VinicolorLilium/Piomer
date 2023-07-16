$(function(){

	// функция, делающая картинку в элементе с классом ibg фоновым изображением
	function ibg(){
		$.each($('.ibg'), function(index, val) {
			if($(this).find('img').length>0){
				$(this).css('background-image','url("'+$(this).find('img').attr('src')+'")');
			}
		});
	};
	ibg();

	// ========================== Акордион ==========================
	$('.sub-menu ul').hide();
	$(".sub-menu a").on('click', function (e) {
		e.preventDefault();
		$(this).parent(".sub-menu").children("ul").slideToggle("100");
	});

	// ========================== Модально окно ==========================
	$(".modal").each( function(){
		$(this).wrap('<div class="overlay"></div>')
	});

	$(".open-modal").on('click', function(e){
		e.preventDefault();
		e.stopImmediatePropagation;

		var $this = $(this),
		modal = $($this).data("modal");

		$(modal).parents(".overlay").addClass("open");
		setTimeout( function(){
			$(modal).addClass("open");
		}, 350);

		$(document).on('click', function(e){
			var target = $(e.target);

			if ($(target).hasClass("overlay")){
				$(target).find(".modal").each( function(){
					$(this).removeClass("open");
				});
				setTimeout( function(){
					$(target).removeClass("open");
				}, 350);
			}

		});

	});

	$(".close-modal").on('click', function(e){
		e.preventDefault();
		e.stopImmediatePropagation;

		var $this = $(this),
		modal = $($this).data("modal");

		$(modal).removeClass("open");
		setTimeout( function(){ 
			$(modal).parents(".overlay").removeClass("open");
		}, 350);

	});

// ========================== Плеер ==========================
//Получаем объекты

//Плеер
var videoPlayer = document.getElementById('video-player');
//Время
var progressBar = document.getElementById('video-hud__progress-bar');
var currTime = document.getElementById('video-hud__curr-time');
var durationTime = document.getElementById('video-hud__duration');
//Кнопки
var actionButton = document.getElementById('video-hud__action');
var muteButton = document.getElementById('video-hud__mute');
var volumeScale = document.getElementById('video-hud__volume');
var speedSelect = document.getElementById('video-hud__speed');
function videoAct() { //Запускаем или ставим на паузу
	if(videoPlayer.paused) {
		videoPlayer.play();
		actionButton.setAttribute('class','video-hud__element video-hud__action video-hud__action_play');
	} else {
		videoPlayer.pause();
		actionButton.setAttribute('class','video-hud__element video-hud__action video-hud__action_pause');
	}
	if(durationTime.innerHTML == '00:00') {
		durationTime.innerHTML = videoTime(videoPlayer.duration); //Об этой функции чуть ниже
	}
	}
//Запуск, пауза
actionButton.addEventListener('click',videoAct);
videoPlayer.addEventListener('click',videoAct);
function videoTime(time) { //Рассчитываем время в секундах и минутах
	time = Math.floor(time);
	var minutes = Math.floor(time / 60);
	var seconds = Math.floor(time - minutes * 60);
	var minutesVal = minutes;
	var secondsVal = seconds;
	if(minutes < 10) {
		minutesVal = '0' + minutes;
	}
	if(seconds < 10) {
		secondsVal = '0' + seconds;
	}
	return minutesVal + ':' + secondsVal;
}
function videoProgress() { //Отображаем время воспроизведения
	progress = (Math.floor(videoPlayer.currentTime) / (Math.floor(videoPlayer.duration) / 100));
	progressBar.value = progress;
	currTime.innerHTML = videoTime(videoPlayer.currentTime);
}
function videoChangeTime(e) { //Перематываем
	var mouseX = Math.floor(e.pageX - progressBar.offsetLeft);
	var progress = mouseX / (progressBar.offsetWidth / 100);
	videoPlayer.currentTime = videoPlayer.duration * (progress / 100);
}
//Отображение времени
videoPlayer.addEventListener('timeupdate',videoProgress);
//Перемотка
progressBar.addEventListener('click',videoChangeTime);
function videoChangeVolume() { //Меняем громкость
	var volume = volumeScale.value / 100;
	videoPlayer.volume = volume;
	if(videoPlayer.volume == 0) {
		muteButton.setAttribute('class','video-hud__element video-hud__mute video-hud__mute_true');
	} else {
		muteButton.setAttribute('class','video-hud__element video-hud__mute video-hud__mute_false');
	}
}
function videoMute() { //Убираем звук
	if(videoPlayer.volume == 0) {
		videoPlayer.volume = volumeScale.value / 100;
		muteButton.setAttribute('class','video-hud__element video-hud__mute video-hud__mute_false');
	} else {
		videoPlayer.volume = 0;
		muteButton.setAttribute('class','video-hud__element video-hud__mute video-hud__mute_true');
	}
}
function videoChangeSpeed() { //Меняем скорость
	var speed = speedSelect.value / 100;
	videoPlayer.playbackRate = speed;
}
//Звук
muteButton.addEventListener('click',videoMute);
volumeScale.addEventListener('change',videoChangeVolume);
//Работа со скоростью
speedSelect.addEventListener('change',videoChangeSpeed);

// ========================== Вкладки ==========================
$('.tab-nav a').on('click', function() {
	$('.tab-nav a').removeClass('active');
	$(this).addClass('active');
	var href = $(this).attr('href');
	$('.tab-pane').removeClass('active').removeClass('in');
	var id = $(href).addClass('active');
	setTimeout(function() {
		$(href).addClass('in');
	});
	return false;
});
});