package com.dilkerwinter.financemanager.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;


    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

     public ResponseEntity<Object> newUser(User user) {
        user.setPassword(PasswordEncrypt.encrypt(user.getPassword()));
        userRepository.save(user);
        return new ResponseEntity<>(user , HttpStatus.CREATED);
     }

     public ResponseEntity<Object> getUserbyId(Integer userID) {
        Optional<User> user = userRepository.findById(userID);
        if(user.isPresent()) {
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found for ID: " + userID);
     }

     public ResponseEntity<Object> getUserbyEmail(String userEmail) {
        Optional<User> userOptional = userRepository.findByEmail(userEmail);
        if(userOptional.isPresent()) {
            User user = userOptional.get();
            return new ResponseEntity<>(user, HttpStatus.OK);
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found for email: " + userEmail);
        }
     }

     public ResponseEntity<Object> updateUserName(Integer userID, String userName) {
         if (!userRepository.findById(userID).isPresent()) {
             return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found for ID: " + userID);
         }
         User user = userRepository.findById(userID).get();
         user.setUsername(userName);
         userRepository.save(user);
         return ResponseEntity.ok("User updated successfully");
    }

    public ResponseEntity<Object> updateUserPassword(Integer userID, String userPassword) {
        if (!userRepository.findById(userID).isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found for ID: " + userID);
        }
        User user = userRepository.findById(userID).get();
        user.setPassword(PasswordEncrypt.encrypt(userPassword));
        userRepository.save(user);
        return ResponseEntity.ok("Password updated successfully");
    }

    public ResponseEntity<Object> userLogin(LoginRequest loginRequest) {
        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getUserEmail());
        if(!userOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found for email: " + loginRequest.getUserEmail());
        }
        User user = userOptional.get();
        if(user.getPassword().equals(PasswordEncrypt.encrypt(loginRequest.getUserPassword()))) {

            return ResponseEntity.ok(user);
        }else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Incorrect password");
        }
    }

    public ResponseEntity<Object> deleteUser(User user) {
        Optional<User> userOptional = userRepository.findById(user.getId());
        if(userOptional.isPresent()) {
            userRepository.delete(userOptional.get());
            return ResponseEntity.ok("User deleted successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found for ID: " + user.getId());
    }

    public ResponseEntity<Object> getAllUsers(){
        Iterable<User> users = userRepository.findAll();
        if(users != null) {
            return ResponseEntity.ok(users);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No users found");
    }
}
