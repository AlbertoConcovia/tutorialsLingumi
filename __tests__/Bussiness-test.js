/**
 * @aconcovia
 * Unit Test for bussiness logic
 * @format
 */
const {
    getAll,
    getTopRatedForTags,
    searchForTutorials,
} = require("../tutorialsCore/tutorialService");

const emptyVideoList = [];

const videoList = require('./resources/case001.json');

const tagsEasy = ["Easy"];

const wordsTeachears = ["Graham","Bob"];

const wordsTitle = ["Activity","Practice"];

const wordsTags = ["Exploring","Easy"];


const wordsMixed = ["Eve","Easy","Interactive","School"];

describe("getAll", () => {
    
    test("returns complete list of video tutorials", () => {   
        expect(getAll(emptyVideoList).length).toBe(0);
        expect(getAll(videoList).length).toBe(19);
    });
});

describe("getTopRatedForTags", () => {
    test("returns Top 20 tutorials that match with tags", () => {   
        expect(getTopRatedForTags(videoList,["Economics"]).length).toBe(0);
        expect(getTopRatedForTags(videoList,tagsEasy).length).toBe(3);
        expect(getTopRatedForTags(videoList,tagsEasy).length).toBe(3);
    });
});

describe("searchForTutorials", () => {
    test("returns list tutorials that match with id, videoTitle, tags and/or teacherName, ", () => {   
        expect(searchForTutorials(videoList,wordsTeachears).length).toBe(4);
        expect(searchForTutorials(videoList,wordsTitle).length).toBe(9);
        expect(searchForTutorials(videoList,wordsTags).length).toBe(7);
        expect(searchForTutorials(videoList,wordsMixed).length).toBe(13);
        expect(searchForTutorials(videoList,["Alberto"]).length).toBe(0);
    });
});