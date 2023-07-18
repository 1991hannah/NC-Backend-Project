# Northcoders News API

Run the following in the terminal to get setup:
npm i 

If you wish to clone this project and run it locally, you will need to add the following two hidden files to this repo:

<.env.development>   - once created, link it to the relevant database by adding the following to the first line of the file: PGDATABASE=nc_news
<.env.test>    - once created, link it to the relevant database by adding the following to the first line of the file: PGDATABASE=nc_news_test

Finally, add these two files to .gitignore so they remain hidden.


Add onto line 277 in app.test for post request

test('status 404: should return an error message stating no corresponding article found, when given an ID of the correct format with no matching article', () => {
        const data = {
            inc_votes: "10"
        }
        return request(app)
        .patch('/api/articles/9999')
        .send(data)
        .expect(404)
        .then(({ body }) => {
            expect(body.msg).toBe("No article found for article_id: 9999");
        })
    })


