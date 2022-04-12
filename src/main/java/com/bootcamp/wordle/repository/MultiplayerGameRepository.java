package com.bootcamp.wordle.repository;

        import com.bootcamp.wordle.model.Game;
        import com.bootcamp.wordle.model.MultiplayerGame;
        import com.bootcamp.wordle.model.Word;
        import org.springframework.data.jpa.repository.JpaRepository;
        import org.springframework.data.jpa.repository.Query;
        import org.springframework.stereotype.Repository;

        import java.util.List;

@Repository
public interface MultiplayerGameRepository extends JpaRepository<MultiplayerGame, String> {
        MultiplayerGame findById(int id);
//        @Query(value = "SELECT * FROM multiplayer_game_game_list where" , nativeQuery = true)
//        MultiplayerGame findMultiplayerGameByGameSession();

        MultiplayerGame findByGameList_id(int id);

}
