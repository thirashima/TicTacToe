<?php
    require_once('flight/Flight.php');

    Flight::set('flight.views.path', 'tmpl');

    Flight::route('/', function(){
        Flight::render('home.php', array(), 'body');
        Flight::render('layout.php', array('title' => 'Tic Tac Toe Example'));
    });

    Flight::route('POST /move', function(){
        $request = Flight::request();
        $player_types = array('x', 'o');
        $player = $request->data['player'];
        $board = $request->data['board'];
        $has_winner = FALSE;
        $has_moves = FALSE;

        if(!in_array($player, $player_types)){
            $out = array('success'=>FALSE);
            return Flight::json($out);
        }

        if(gettype($board) != 'array' or count($board) != 9){
            $out = array('success'=>FALSE);
            return Flight::json($out);
        }

        //Check all winning conditions
        if(
            ($board['1'] == $player && $board['2'] == $player && $board['3'] == $player) ||
            ($board['4'] == $player && $board['5'] == $player && $board['6'] == $player) ||
            ($board['7'] == $player && $board['8'] == $player && $board['9'] == $player) ||
            ($board['1'] == $player && $board['4'] == $player && $board['7'] == $player) ||
            ($board['2'] == $player && $board['5'] == $player && $board['8'] == $player) ||
            ($board['3'] == $player && $board['6'] == $player && $board['9'] == $player) ||
            ($board['3'] == $player && $board['5'] == $player && $board['7'] == $player) ||
            ($board['1'] == $player && $board['5'] == $player && $board['9'] == $player)
        ){
            $has_winner = TRUE;
        }

        //check to see if there are any open squares remaining
        foreach($board as $b=>$p){
            if($p == '_'){
                $has_moves = TRUE;
            }
        }

        if($player == 'x'){
            $next_player = 'o';
        }else{
            $next_player = 'x';
        }

        $out = array(
            'success' => TRUE,
            'has_winner' => $has_winner,
            'has_moves' => $has_moves,
            'next_player' => $next_player
        );
        return Flight::json($out);
    });

    Flight::route('GET /move', function(){
        echo "Nope";
    });

    Flight::start();
?>
