// import request from 'supertest';
// import app from '../app';

const request = require('supertest');
const app = require('../app');

// to run the tests, npm test admin.test.js
// run correctly !!!s

describe('Admin', () => {
    let token;
    let id;
    let shopId;

    it('should register a admin', async () => {
        const response = await request(app)
            .post('/api-user/registerAdmin')
            .set('Accept', 'application/json')
            .send({
                "email": "admin2@admin.com",
                "name": "admin2",
                "password": "Password123!",
                "age": 25,
                "city": "admin",
                "interests": "admin",
                "allowsReceivingOffers": false,
                "role": "admin"
            });

        expect(response.status).toBe(200);
    });

    it('should login a admin', async () => {
        const response = await request(app)
            .post('/api-user/login')
            .set('Accept', 'application/json')
            .send({
                "email": "admin2@admin.com",
                "password": "Password123!"
            });

        expect(response.status).toBe(200);

        console.log(response.body);

        token = response.body.token;
        id = response.body.user._id;
    });

    it('should create a shop (admin)', async () => {
        const response = await request(app)
            .post('/api-shop/shopAdminRegister')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                "cif": "ABC",
                "name": "ShopTestAdmin",
                "email": "ShopTestAdmin@example.com",
                "password": "Password123!",
                "city": "Miami",
                "activity": "Music",
                "phone": "12341234"
            });
    
        if(response.status === 400) {
            console.log(response.body);
        }
    
        expect(response.status).toBe(200);
        shopId = response.body.shop._id;
    });

    it('should update a shop (admin)', async () => {
        const response = await request(app)
            .put(`/api-shop/shopAdmin/${shopId}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                "cif": "ABC",
                "name": "ShopTestAdminUpdated",
                "email": "ShopTestAdmin@example.com",
                "password": "Password123!",
                "city": "Miami",
                "activity": "Music",
                "phone": "4"
            });

        expect(response.status).toBe(200);
    });

    it('should get shops (admin)', async () => {
        const response = await request(app)
            .get('/api-shop/shopAdmin')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
        // expect(response.body).toHaveProperty('message', 'User shops retrieved successfully');
    });

    it('should get a specific shop (admin)', async () => {
        const response = await request(app)
            .get(`/api-shop/shopAdmin/${shopId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
        // expect(response.body).toHaveProperty('message', 'Shop retrieved successfully');
    });

    it('should update a specific shop (admin)', async () => {
        const response = await request(app)
            .patch(`/api-shop/shopAdmin/${shopId}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
                "cif": "A_B_C",
            });

        expect(response.status).toBe(200);
    });

    it('should delete a specific shop (admin)', async () => {
        const response = await request(app)
            .delete(`/api-shop/shopAdmin/${shopId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
        // expect(response.body).toHaveProperty('message', 'Shop deleted successfully');
    });
    
    it('should delete a admin', async () => {
        const response = await request(app)
            .delete(`/api-user/user/${id}`)
            .set('Accept', 'application/json')
            .expect(200);

        // expect(response.body.acknowledged).toEqual(true);
    });
});