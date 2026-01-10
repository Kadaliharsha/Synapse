package com.synapse.backend.service;

import com.synapse.backend.model.Users;
import com.synapse.backend.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsersService {
    @Autowired
    private UsersRepository usersRepository;

    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }

    public Users getUserById(String id) {
        return usersRepository.findById(id).orElse(null);
    }

    public Users saveUser(Users user) {
        return usersRepository.save(user);
    }

    public void deleteUser(String id) {
        usersRepository.deleteById(id);
    }
}
