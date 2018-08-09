
//popup game starter modal
$('#gameStarter').css('display', 'block');
$('#gameStarter').modal();
//Initialize game instructions guidance collapsible
$('.collapsible').collapsible();

//Initialize image picker plugin
$('select').imagepicker();

//Game Timer
$('#timer').timer({
    countdown: true,
    duration: '30s',    	// This will start the countdown from 3 mins 40 seconds
    callback: function() {	// This will execute after the duration has elapsed
    	console.log('Time up!');
    }
});
//Change Avatar
$('.change-avatar').click(function(){
    $('#gameStarter').css('display', 'block');
})

//set avatar according to user choice
$('select').on('change',function(){
    let val = $('select').val();
    //By default set char boy as avatar
    let imageUrl = 'images/char-boy.png'
        switch(parseInt(val)){
            case 1: imageUrl = 'images/char-boy.png';
                break;
            case 2: imageUrl = 'images/char-horn-girl.png';
                break;
            case 3: imageUrl = 'images/char-pink-girl.png';
                break;
            case 4: imageUrl = 'images/char-princess-girl.png';
                break;
        }
        console.log(imageUrl);
        player.imageUrl(imageUrl);
});

//close the starter modal
$('.modal-close').click(function(){
    $('#gameStarter').css('display', 'none');
})