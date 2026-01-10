package com.synapse.backend.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Document(collection = "Blogs")
public class Blog {
    private String id;
    private String image;
    private String email;
    private int likes = 0;
    private String title;
    private String content;
    private Set<String> likedBy = new HashSet<>();

    // Add missing getter for likes
    public int getLikes() {
        return likes;
    }

    // Add missing getter for likedBy
    public Set<String> getLikedBy() {
        return likedBy;
    }

    // Add missing setter for likes
    public void setLikes(int likes) {
        this.likes = likes;
    }

    // Add missing setter for likedBy
    public void setLikedBy(Set<String> likedBy) {
        this.likedBy = likedBy;
    }
}
