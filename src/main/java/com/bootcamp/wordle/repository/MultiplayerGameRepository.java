package com.bootcamp.wordle.repository;

        import com.bootcamp.wordle.model.MultiplayerGame;
        import org.springframework.data.jpa.repository.JpaRepository;
        import org.springframework.stereotype.Repository;

@Repository
public interface MultiplayerGameRepository extends JpaRepository<MultiplayerGame, String> {
        MultiplayerGame findById(int id);
        MultiplayerGame findByGameList_id(int id);

}
