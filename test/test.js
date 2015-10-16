var assert = require("assert");
var mongoose = require("mongoose");
var User = require("../models/User");
var Freet = require("../models/Freet");

mongoose.connect('mongodb://localhost/model_test');  

// test user model
describe("User", function() {

    User.createUser("kim", "pass123", function() {});

    //test findByUsername
    describe("#findByUsername", function () {
        // test nonexistent user
        it("should return error when user does not exist", function () {
            User.findByUsername("hello", function(err, result) {
                assert.notDeepEqual(err, null);
            });
        });

        // test created user
        it("should return username when user exists", function () {
            User.findByUsername("Kim", function(err, result) {
                assert.deepEqual(err, null);
                assert.deepEqual(result, {username: "kim"});
            });
        });

    });

    //test authUser
    describe("#authUser", function () {

        // test nonexistent user
        it("should return error when user does not exist", function () {
            User.authUser("hello", "hoo", function(err, result) {
                assert.notDeepEqual(err, null);
            });
        });

        // test existing user
        it("should not return error when user exists", function () {
            User.authUser("kim", "pass123", function(err, result) {
                assert.deepEqual(err, null);
            });
        });

        // test existing user different capitalization
        it("should not return error when user exists with different capitalization", function () {
            User.authUser("Kim", "pass123", function(err, result) {
                assert.deepEqual(err, null);
            });
        });

    });

    //test createUser
    describe("#createUser", function () {
        // test nonexistent user
        it("should return error when user exists", function () {
            User.createUser("bob", function() {});
            User.createUser("bob", function(err, result) {
                assert.notDeepEqual(err, null);
            });
        });

        // test username min length
        it("should return error when username too short", function () {
            User.createUser("ki", function(err, result) {
                assert.notDeepEqual(err, null);
            });
        });

        // test username max length
        it("should return error when username too long", function () {
            User.createUser("kewfewfweewfefwgi", function(err, result) {
                assert.notDeepEqual(err, null);
            });
        });

        // test username invalid characters
        it("should return error when username has invalid chars", function () {
            User.createUser("hi<>mi", function(err, result) {
                assert.notDeepEqual(err, null);
            });
        });

        // test new user
        it("should not return error when user does not exist", function () {
            User.createUser("eek", function(err, result) {
                assert.deepEqual(err, null);
                assert.deepEqual(result, {username: "eek"});
            });
        });

        // test new user capitalized
        it("should not return error when username capitalized", function () {
            User.createUser("Blah", function(err, result) {
                assert.deepEqual(err, null);
                assert.deepEqual(result, {username: "blah"});
            });
        });
    });

});

// test freet model
describe("Freet", function() {

    //test addFreet
    describe("#addFreet", function () {

        // test undefined user
        it("should return error when invalid username", function () {
            Freet.addFreet(undefined, "hello", Date.now(), function(err, result) {
                assert.notDeepEqual(err, null);
            });
            Freet.clearFreets();
        });

        // test nonexistent user
        it("should fail when has a nonexistent user", function () {
            Freet.addFreet("djax", "hello world", Date.now(), function(err, result) {
                assert.notDeepEqual(err, null);
            });
            Freet.clearFreets();
        });

        // test valid freet
        it("should succeed when has a valid username", function () {
            User.createUser("boo", function(){});
            Freet.addFreet("Boo", "hello world", Date.now(), function(err, result) {
                assert.deepEqual(err, null);
                assert.notDeepEqual(result, {id: undefined});
            });
            Freet.clearFreets();
        });

    });

    //test getFreetById
    describe("#getFreetById", function () {

        // test invalid freet id
        it("should fail when invalid id", function () {
            Freet.getFreetById("fakeId", function(err, result) {
                assert.notDeepEqual(err, null);
            });
        });

        // test valid freet
        it("should succeed when valid id", function () {
            var id;
            User.createUser("test2test", function(){});
            Freet.addFreet("test2test", "hello world", Date.now(), function(err, result) {
                id = result.id;
            });
            Freet.getFreetById(id, function(err, result) {
                assert.deepEqual(err, null);
                assert.deepEqual(result.text, "hello world")
            });
            Freet.clearFreets();
        });
    });

    //test getFreets
    describe("#getFreets", function () {
        // test getting all the freets
        it("should return all freets", function () {
            User.createUser("123", function(){});
            User.createUser("456", function(){});
            Freet.addFreet("123", "hello world1", Date.now(), function() {});
            Freet.addFreet("456", "hello world2", Date.now(), function() {});
            Freet.getFreets(function(err, result) {
                assert.deepEqual(err, null);
                assert.deepEqual(result.length,2);
                assert.deepEqual(result[0]._user,"123");
                assert.deepEqual(result[0].text,"hello world1");
                assert.deepEqual(result[1]._user,"456");
                assert.deepEqual(result[1].text,"hello world2");
            });
            Freet.clearFreets();
        });
    });

    //test deleteFreetById
    describe("#deleteFreetById", function () {
        // test delete freet authorized user
        it("should succeed when valid id and authorized user", function () {
            var id;
            User.createUser("user1", function(){});
            Freet.addFreet("user1", "hello world", Date.now(), function(err, result) {
                id = result.id;
            });
            Freet.deleteFreetById("user1", id, function(err, result) {
                assert.deepEqual(err, null);
                assert.deepEqual(result[0]._id, id)
            });
            Freet.clearFreets();
        });

        // test delete freet unauthorized user
        it("should fail when valid id and unauthorized user", function () {
            var id;
            User.createUser("user1", function(){});
            Freet.addFreet("user1", "hello world", Date.now(), function(err, result) {
                id = result.id;
            });
            Freet.deleteFreetById("user2", id, function(err, result) {
                assert.notDeepEqual(err, null);
            });
            Freet.clearFreets();
        });

        // test delete freet invalid id
        it("should fail when invalid id", function () {
            User.createUser("user1", function(){});
            Freet.addFreet("user1", "hello world", Date.now(), function(){});
            Freet.deleteFreetById("user1", "fakeId", function(err, result) {
                assert.notDeepEqual(err, null);
            });
            Freet.clearFreets();
        });
    });

});