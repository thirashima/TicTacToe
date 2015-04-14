if(!window.TTT) var TTT = {};

TTT.current_player = 'x'; //default starting player

TTT.tileClick = function(){
    $(this).find('span').addClass('player-'+TTT.current_player);
    $(this).find('select').val(TTT.current_player).trigger('change');
};
TTT.sendMove = function(){
    var board = {};
    $(document.forms['board']).find('select').each(function(i){
        board[this.name] = this.value;
    });
    $.post('/move', {'board':board, 'player':TTT.current_player}, function(json){
        if(json && json.success === true){

            if(json.has_winner === false && json.has_moves === false){
                TTT.endGame();
                return;
            }

            if(json.has_winner === true){
                TTT.winGame();
                return;
            }

            TTT.switchPlayer(json.next_player);

        }
    }, 'JSON');
};

TTT.showOverlay = function(msg){
    var overlay = $('#overlay'),
        msg_el = $('#overlay .msg'),
        screen_height = window.innerHeight;

    msg_el.text(msg);
    overlay.height(screen_height+'px');
    overlay.show();
};

TTT.closeOverlay = function(){
    $('#overlay').hide();
    $('#overlay .msg').text('');
};

TTT.endGame = function(){
    var msg = "No more moves left!";
    TTT.showOverlay(msg);
};

TTT.winGame = function(){
    var msg = 'Player ' + TTT.current_player.toUpperCase() + ' has won the game!';
    TTT.showOverlay(msg);
};

TTT.resetGame = function(){
    document.forms['board'].reset();
    var form = $(document.forms['board']);
    form.attr('class', 'player-x');
    $('#current-player').text('X');
    form.find('.tile span').removeClass('player-x player-o');
};

TTT.switchPlayer = function(next_player){
    var form = $(document.forms['board']);
    form.removeClass('player-'+TTT.current_player);
    TTT.current_player = next_player;
    form.addClass('player-'+TTT.current_player);
    $('#current-player').text(TTT.current_player.toUpperCase());
};

$(function(){
    $('select').change(TTT.sendMove);
    $('.tile').click(TTT.tileClick);
    $('#overlay button').click(function(){TTT.resetGame(); TTT.closeOverlay();});
});
