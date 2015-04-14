        <header>
            <h1>Tic Tac Toe</h1>
            <p>Let's play a game. </p>
        </header>

        <p>Current player: <span id="current-player">X</span></p>
        <form name="board" class="player-x">

            <?php foreach(array(range(1,3), range(4,6), range(7,9)) as $row){?>
            <div class="row">

                <?php foreach($row as $tile){?>
                <div class="tile">
                    <select name="<?php echo $tile;?>">
                        <option value="_"></option>
                        <option value="x">X</option>
                        <option value="o">O</option>
                    </select>
                    <span></span>
                </div><!-- end tile -->
                <?php } ?>

            </div><!-- end row -->
            <?php } ?>

        </form>
        <section id="overlay"><p class="msg"></p><p><button>New game</button></p></section>
