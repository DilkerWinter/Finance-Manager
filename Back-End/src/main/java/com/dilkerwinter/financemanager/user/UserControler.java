package com.dilkerwinter.financemanager.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/User")
public class UserControler {
    private final UserService userService;

    @Autowired
    public UserControler(UserService userService) {
        this.userService = userService;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/newUser")
    public ResponseEntity<Object> createUser(@RequestBody User user) {
        return userService.newUser(user);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/getUser/{userID}")
    public ResponseEntity<Object> getUserbyId(@PathVariable("userID") Integer userID) {
        return userService.getUserbyId(userID);
    }

    @GetMapping("/getUserByEmail/{userEmail}")
    public ResponseEntity<Object> getUserbyEmail(@PathVariable("userEmail") String userEmail) {
        return userService.getUserbyEmail(userEmail);
    }

    @PatchMapping ("/updateUserName/{userId}")
    public ResponseEntity<Object> updateUserName(@PathVariable("userId") Integer userId,@RequestBody String userName) {
        return userService.updateUserName(userId , userName);
    }

    @PatchMapping ("/updateUserPassword/{userId}")
    public ResponseEntity<Object> updateUserPassword(@PathVariable("userId") Integer userId,@RequestBody String userPassword) {
        return userService.updateUserPassword(userId, userPassword);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/userLogin")
    public ResponseEntity<Object> userLogin(@RequestBody LoginRequest loginRequest) {
        return userService.userLogin(loginRequest);
    }

    @DeleteMapping("/deleteUser")
    public ResponseEntity<Object> deleteUser(@RequestBody User user) {
        return userService.deleteUser(user);
    }

    @GetMapping("/getAllUsers")
    public ResponseEntity<Object> getAllUsers() {
        return userService.getAllUsers();
    }
}
