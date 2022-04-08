
package com.bootcamp.wordle.repository;

        import com.bootcamp.wordle.model.User;

        import org.springframework.data.jpa.repository.JpaRepository;
        import org.springframework.data.jpa.repository.Query;
        import org.springframework.stereotype.Repository;
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
        User findById(int id);
        User findByUserName(String user_name);
        boolean existsByUserName(String userName);
}
