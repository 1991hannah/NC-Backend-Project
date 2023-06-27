const request = require('supertest')
const app = require('../app.js')
const db = require('../db/connection.js')
const seed = require('../db/seeds/seed.js')
const testData = require('../db/data/test-data')

beforeEach(() => {
    return seed(testData);
})

afterAll(() => {
    return db.end();
})

describe('GET /api/topics', () => {
    test('status 200: should return an array of topics, each of which should have a slug property and a description property', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({ body }) => {
            console.log(body)
            expect(body.topics.length).toBe(3)
            expect(Array.isArray(body.topics)).toBe(true)
            body.topics.forEach((topic) => {
                expect(topic).toMatchObject({
                    slug:expect.any(String),
                    description:expect.any(String)
                })
            })
        })
    })
})
const request = require('supertest')
// const app = require('../app.js')
const db = require('../db/connection.js')
const seed = require('../db/seeds/seed.js')
const testData = require('../db/data/test-data')

beforeEach(() => {
    return seed(testData);
})

afterAll(() => {
    return db.end();
})

describe('GET /api/topics', () => {
    test.skip('status 200: should return an array of topics, each of which should have a slug property and a description property', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({ body }) => {
            expect(body.length).toBe(3)
            expect(Array.isArray(body)).toBe(true)
            body.forEach((topic) => {
                expect(topic).toMatchObject({
                    slug:expect.any(String),
                    description:expect.any(String)
                })
            })
        })
    })
})

describe('GET /api', () => {
    test.skip('status 200: should return an object describing all the available endpoints on this API', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then(({ body }) => {
            // expect body to be an object
            // expect body to have three key value pairs
            // expect first key value pair to be "/api", 2nd to be "/api/topics", 3rd to be "/api/articles
            expect(body).toBe(3)
            expect()
        }) 
    })
})

describe('all non-existent paths', () => {
    test("404: should return an error message when the path is not found", () => {
        return request(app)
        .get('/api/invalidpath')
        .expect(404)
        .then(({ body }) => {
            expect(body.msg).toBe("Path not found");
        })
    })
})