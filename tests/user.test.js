// import request from 'supertest';
// import app from '../app';

const request = require('supertest');
const app = require('../app');

// to run the tests, npm test user.test.js
// run correctly !!!

describe('User', () => {
    let token;
    let id;

    it('should register a user', async () => {
        const response = await request(app)
            .post('/api-user/register')
            .set('Accept', 'application/json')
            .send({
                "email": "example@exale.com",
                "name": "Doe",
                "password": "Password123!",
                "age": 25,
                "city": "NewYork",
                "interests": "Programming",
                "allowsReceivingOffers": true,
                "role": "user"
            });

        expect(response.status).toBe(200);
    });

    it('should login a user ', async () => {
        const response = await request(app)
            .post('/api-user/login')
            .set('Accept', 'application/json')
            .send({
                "email": "example@exale.com",
                "password": "Password123!"
            });

        expect(response.status).toBe(200);

        console.log(response.body);

        token = response.body.token;
        id = response.body.user._id;
    });

    it('should update the user (user)', async () => {
        const response = await request(app)
            .patch(`/api-user/user/patch/${id}`)
            .send({
                "allowsReceivingOffers": true
            })
            .set('Accept', 'application/json')
            .expect(200);

        // expect(response.body).toHaveProperty('message', 'User updated successfully');
    });

    it('should post a review (user)', async () => {
        const shopId = '66320ea1f6cf493c1a7f81a0';
        const response = await request(app)
            .patch(`/api-shop/postReview/${shopId}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                "score": 2,
                "text": "This is a review for the shop test user"
            });

        expect(response.status).toBe(200);
        // expect(response.body).toHaveProperty('message', 'Review posted successfully');
    });

    it('should get shops (user)', async () => {
        const response = await request(app)
            .get('/api-user/userShop')
            .set('Authorization', `Bearer ${token}`)
            .query({
                city: 'NewYork',
                interests: 'Programming'
            })
            .expect(200);
        // expect(response.body).toHaveProperty('message', 'User shops retrieved successfully');
    });

    it('should delete a user (user)', async () => {
        const response = await request(app)
            .delete(`/api-user/user/${id}`)
            .set('Accept', 'application/json')
            .expect(200);

        // expect(response.body.acknowledged).toEqual(true);
    });
});