if(!window.TTT) var TTT = {};

TTT.game = (function(){
    var current_player = 'x',
        form = $(document.forms['board']);

    function tileClick(){
        $(this).find('span').addClass('player-' + current_player);
        $(this).find('select').val(current_player).trigger('change');
    }

    function sendMove(){
        var board = {};
        form.find('select').each(function(i){
            board[this.name] = this.value;
        });
        $.post('/move', {'board':board, 'player':current_player}, function(json){
            if(json && json.success === true){

                if(json.has_winner === false && json.has_moves === false){
                    endGame();
                    return;
                }

                if(json.has_winner === true){
                    winGame();
                    return;
                }

                switchPlayer(json.next_player);

            }
        }, 'JSON');
    }

    function showOverlay(msg){
        var overlay = $('#overlay'),
            msg_el = $('#overlay .msg'),
            screen_height = window.innerHeight;

        msg_el.text(msg);
        overlay.height(screen_height+'px');
        overlay.show();
    }

    function closeOverlay(){
        $('#overlay').hide();
        $('#overlay .msg').text('');
    }

    function endGame(){
        var msg = "No more moves left!";
        showOverlay(msg);
    }

    function winGame(){
        var msg = 'Player ' + current_player.toUpperCase() + ' has won the game!';
        showOverlay(msg);
    }

    function resetGame(){
        current_player = 'x';
        form.get(0).reset();
        form.attr('class', 'player-x');
        $('#current-player').text('X');
        form.find('.tile span').removeClass('player-x player-o');
    }

    function switchPlayer(next_player){
        form.removeClass('player-' + current_player);
        current_player = next_player;
        form.addClass('player-' + current_player);
        $('#current-player').text(current_player.toUpperCase());
    }

    return {
        'sendMove': sendMove,
        'tileClick': tileClick,
        'resetGame': resetGame,
        'closeOverlay': closeOverlay
    };

})();


//Attach events
$(function(){
    $('select').change(TTT.game.sendMove);
    $('.tile').click(TTT.game.tileClick);
    $('#overlay button').click(function(){TTT.game.resetGame(); TTT.game.closeOverlay();});
});
