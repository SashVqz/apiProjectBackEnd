// import request from 'supertest';
// import app from '../app';

const request = require('supertest');
const app = require('../app');

// to run the tests, npm test unRegistedUser.test.js 
// run correctly !!!

describe('unRegistedUser', () => {
    it('should return all shop', async () => {
        const response = await request(app).get('/api-shop/sho/search/');
        expect(response.status).toBe(200);
    });

    it('should return a shop by id', async () => {
        const response = await request(app).get('/api-shop/shop/search/id/66320ea1f6cf493c1a7f81a0');
        expect(response.status).toBe(200);
    });

    it('should return shop by city', async () => {
        const response = await request(app).get('/api-shop/shop/search/city/Test_City');
        expect(response.status).toBe(200);
    });

    it('should return shop by activity', async () => {
        const response = await request(app).get('/api-shop/shop/search/activity/Test_Activity');
        expect(response.status).toBe(200);
    });

    it('should return shop by name', async () => {
        const response = await request(app).get('/api-shop/shop/search/name/Test_Shop');
        expect(response.status).toBe(200);
    });

    it('should return shop by city and activity', async () => {
        const response = await request(app).get('/api-shop/shop/search/cityActivity/Test_City/Test_Activity');
        expect(response.status).toBe(200);
    });

    it('should return shop by city, activity, and score', async () => {
        const response = await request(app).get('/api-shop/shop/search/score?score=false&city=Test_City&activity=Test_Activity');
        expect(response.status).toBe(200);
    });
});