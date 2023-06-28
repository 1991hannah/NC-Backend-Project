const request = require('supertest')
const app = require('../app.js')
const db = require('../db/connection.js')
const seed = require('../db/seeds/seed.js')
const testData = require('../db/data/test-data')
const data = require('../endpoints.json')

beforeEach(() => {
    return seed(testData);
})

afterAll(() => {
    return db.end();
})

describe('GET /api/topics', () => {
    test('status 200: should return contents of endpoints.json', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({ body }) => {
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

describe('GET /api', () => {
    test('status 200: should return an object describing all the available endpoints on this API', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then(({ body }) => {
            expect(body).toEqual(data)
        }) 
    })
})

describe('GET /api/articles/:article_id', () => {
    test('status 200: should return an article object containing the 8 properties the article in the database has', () => {
        return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then(({ body }) => {
            expect(body.article_id).toEqual(1)
            expect(body.title).toEqual("Living in the shadow of a great man")
            expect(body.topic).toEqual("mitch")
            expect(body.author).toEqual("butter_bridge")
            expect(body.body).toEqual("I find this existence challenging")
            expect(body.created_at).toBe("2020-07-09T20:11:00.000Z")
            expect(body.votes).toBe(100)
            expect(body.article_img_url).toEqual("https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700")
        })
    })
    test('status 400: should return an error message when given an invalid article_id', () => {
        return request(app)
        .get('/api/articles/NotId')
        .expect(400)
        .then(({ body }) => {
            expect(body.msg).toBe("Invalid ID");
        })
    })
    test('status 404: should return an error message stating no corresponding article found, when given an ID of the correct format with no matching article', () => {
        return request(app)
        .get('/api/articles/9999')
        .expect(404)
        .then(({ body }) => {
            expect(body.msg).toBe("No article found for article_id: 9999");
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