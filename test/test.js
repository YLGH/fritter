var assert = require("assert");
var User = require("../models/User.js");
var Freet = require("../models/Freet.js");


// test user model
describe("User", function() {

    User.createUser("kim", function() {});

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
            User.findByUsername("kim", function(err, result) {
                assert.deepEqual(err, null);
                assert.deepEqual(result, {username: "kim"});
            });
        });

    });

    //test authUser
    describe("#authUser", function () {

        // test nonexistent user
        it("should return error when user does not exist", function () {
            User.authUser("hello", function(err, result) {
                assert.notDeepEqual(err, null);
            });
        });

        // test existing user
        it("should not return error when user exists", function () {
            User.findByUsername("kim", function(err, result) {
                assert.deepEqual(err, null);
            });
        });

        // test existing user different capitalization
        it("should not return error when user exists", function () {
            User.findByUsername("Kim", function(err, result) {
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
        it("should not return error when user does not exist", function () {
            User.createUser("Blah", function(err, result) {
                assert.deepEqual(err, null);
                assert.deepEqual(result, {username: "blah"});
            });
        });
    });

});