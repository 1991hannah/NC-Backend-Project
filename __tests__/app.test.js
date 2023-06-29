const request = require('supertest')
const app = require('../app.js')
const db = require('../db/connection.js')
const seed = require('../db/seeds/seed.js')
const testData = require('../db/data/test-data')
const data = require('../endpoints.json')
const jestSorted = require('jest-sorted')

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
            expect(body.article.article_id).toEqual(1)
            expect(body.article.title).toEqual("Living in the shadow of a great man")
            expect(body.article.topic).toEqual("mitch")
            expect(body.article.author).toEqual("butter_bridge")
            expect(body.article.body).toEqual("I find this existence challenging")
            expect(body.article.created_at).toBe("2020-07-09T20:11:00.000Z")
            expect(body.article.votes).toBe(100)
            expect(body.article.article_img_url).toEqual("https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700")
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

describe('GET /api/articles', () => {
    test('status 200: should return an array of article objects sorted by date in descending order, minus the body property', () => {
        return request(app)
        .get('/api/articles')
        .then(({ body }) => {
            expect(body.articles.length).toBe(13)
            expect(Array.isArray(body.articles)).toBe(true)
            body.articles.forEach((article) => {
                expect(article).toMatchObject({
                    article_id:expect.any(Number),
                    title:expect.any(String),
                    topic:expect.any(String),
                    author:expect.any(String),
                    created_at:expect.any(String),
                    votes:expect.any(Number),
                    article_img_url:expect.any(String),
                    comment_count:expect.any(String)
                })
            })
        })
    })
    test('article objects should be sorted in descending order by date', () => {
        return request(app)
        .get('/api/articles')
        .then(({body}) => {
            expect(body.articles).toBeSortedBy("created_at", { descending: true });
        })
    })
})

describe('GET /api/articles/:article_id/comments', () => {
    test('status 200: should return an array of comment objects for the given article_id, each of which should have the following 6 properties', () => {
      return request(app)
      .get('/api/articles/1/comments')
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.comments)).toBe(true)
        body.comments.forEach((comment) => {
            expect(comment.article_id).toBe(1)
            expect(comment).toMatchObject({
            comment_id:expect.any(Number),
            votes:expect.any(Number),
            created_at:expect.any(String),
            author:expect.any(String),
            body:expect.any(String)
        
          })
        })
      })
    })
    test('status 200: comments should be sorted in order by date with the newest comment first', () => {
      return request(app)
      .get('/api/articles/1/comments')
      .expect(200)
      .then(({body}) => {
        expect(body.comments).toBeSortedBy("created_at", { descending: true });
      })
    })
    test('status 200: article_id for each comment in the array should match the article_id inputed in the api address', () => {
        return request(app)
        .get('/api/articles/1/comments')
        .expect(200)
        .then(({ body }) => {
            body.comments.forEach((comment) => {
                expect(comment.article_id).toEqual(1)
            })
        })
    })
    test('status 404: should return an error message stating no corresponding comments found, when given an ID of the correct format with no matching comments', () => {
        return request(app)
        .get('/api/articles/2/comments')
        .expect(404)
        .then(({ body }) => {
            expect(body.msg).toBe("No comments found for article_id: 2")     
        })
    })
    test("status 400: should return an error messafe when given an article_id that isn't valid", () => {
        return request(app)
        .get('/api/articles/£/comments')
        .expect(400)
        .then(({ body }) => {
            expect(body.msg).toBe("Invalid ID")
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