package com.bootcamp.wordle.model;
import java.util.UUID;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Word {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String word;

    public Word(){

    }
    public int getId()
    {
        return id;
    }
    public void setId(int id)
    {
        this.id = id;
    }
    public String getWord()
    {
        return word;
    }
    public void setWord(String word)
    {
        this.word = word;
    }
}
