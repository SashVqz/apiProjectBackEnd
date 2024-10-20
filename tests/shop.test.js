// import request from 'supertest';
// import app from '../app';

const request = require('supertest');
const app = require('../app');

// to run the tests, npm test shop.test.js
// run correctly !!!s

describe('Shop', () => {
    let admintoken; // admin token
    let adminid; // admin id   

    let shoptoken; // shop token
    let shopId; // shop id

    it('should register admin', async () => {
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

    it('should login admin', async () => {
        const response = await request(app)
            .post('/api-user/login')
            .set('Accept', 'application/json')
            .send({
                "email": "admin2@admin.com",
                "password": "Password123!"
            });

        expect(response.status).toBe(200);

        admintoken = response.body.token;
        adminid = response.body.user._id;
    });

    it('should create shop (admin)', async () => {
        const response = await request(app)
            .post('/api-shop/shopAdminRegister')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${admintoken}`)
            .send({
                "cif": "ABC",
                "name": "ShopTestAdmin",
                "email": "ShopTestShop@example.com",
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

    it('should login shop', async () => {
        const response = await request(app)
            .post('/api-shop/shop/login')
            .set('Accept', 'application/json')
            .send({
                "email": "ShopTestShop@example.com",
                "password": "Password123!"
            });

        expect(response.status).toBe(200);

        if(response.status === 400) {
            console.log(response.body);
        }

        shoptoken = response.body.token;
    });    
    
    it('should update shop (shop)', async () => {
        const response = await request(app)
            .put(`/api-shop/shop/shop/${shopId}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${shoptoken}`)
            .send({
                "cif": "ABC",
                "name": "ShopTestUpdate",
                "email": "ShopTestAdmin@example.com",
                "password": "Password123!",
                "city": "Miami",
                "activity": "Sports",
                "phone": "12341234"
            });

        expect(response.status).toBe(200);
    });

    it('should update specific shelldom shop (shop)', async () => {
        const response = await request(app)
            .patch(`/api-shop/shop/shop/${shopId}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${shoptoken}`)
            .send({
                "cif": "ABCUPDATEPATCH"
            });

        expect(response.status).toBe(200);
    });

    it('should create webshop (shop)', async () => {
        const response = await request(app)
            .post(`/api-shop/webShop/${shopId}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${shoptoken}`)
            .send({  
                "title": "Example WebShop", 
                "summary": "This is an example web shop", 
                "texts": ["Lorem ipsum dolor sit amet", "consectetur adipiscing elit"], 
                "photos": ["photo1.jpg", "photo2.jpg"], 
                "scoring": 3.5, 
                "numRatings": 2, 
                "reviews": [ { "score": 3, "text": "Great shop!" }, { "score": 4, "text": "Good products" } ] 
            });
    
        if(response.status === 400) {
            console.log(response.body);
        }
    
        expect(response.status).toBe(200);
    });

    it('should update webshop (shop)', async () => {
        const response = await request(app)
            .put(`/api-shop/webShop/${shopId}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${shoptoken}`)
            .send({  
                "title": "Example WebShop (test update)", 
                "summary": "This is an example web shop", 
                "texts": ["Lorem ipsum dolor sit amet", "consectetur adipiscing elit"], 
                "photos": ["photo1.jpg", "photo2.jpg"], 
                "scoring": 3.5, 
                "numRatings": 2, 
                "reviews": [ { "score": 3, "text": "Great shop!" }, { "score": 4, "text": "Good products" } ] 
            });
    
        if(response.status === 400) {
            console.log(response.body);
        }
    
        expect(response.status).toBe(200);
    });

    it('should update specific shelldom webshop (shop)', async () => {
        const response = await request(app)
            .patch(`/api-shop/webShop/${shopId}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${shoptoken}`)
            .send({
                "title": "Example WebShop (test update patch)"
            });

        expect(response.status).toBe(200);
    });

    it('should update/add photos to webshop (shop)', async () => {
        const response = await request(app)
            .patch(`/api-shop/webShop/${shopId}/photo`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${shoptoken}`)
            .send({
                "photo": "photo3.jpg"
            });

        expect(response.status).toBe(200);
    });

    it('should update/add texts to webshop (shop)', async () => {
        const response = await request(app)
            .patch(`/api-shop/webShop/${shopId}/text`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${shoptoken}`)
            .send({
                "text": "this is a new text"
            });

        expect(response.status).toBe(200);
    });

    it('should get photos to webshop (shop)', async () => {
        const response = await request(app)
            .get(`/api-shop/webShop/66320e7df6cf493c1a7f819d/photo`)
            .set('Authorization', `Bearer ${shoptoken}`)
            .expect(401);
        // expect(response.body).toHaveProperty('message', 'Shop retrieved successfully');
    });

    it('should get texts to webshop (shop)', async () => {
        const response = await request(app)
            .get(`/api-shop/webShop/${shopId}/text`)
            .set('Authorization', `Bearer ${shoptoken}`)
            .expect(200);
        // expect(response.body).toHaveProperty('message', 'Shop retrieved successfully');
    });

    it('should get reviews to webshop (shop)', async () => {
        const response = await request(app)
            .get(`/api-shop/webShop/${shopId}/reviews`)
            .set('Authorization', `Bearer ${shoptoken}`)
            .expect(200);
        // expect(response.body).toHaveProperty('message', 'Shop retrieved successfully');
    });

    it('should delete specific webshop (shop)', async () => {
        const response = await request(app)
            .delete(`/api-shop/webShop/${shopId}`)
            .set('Authorization', `Bearer ${shoptoken}`)
            .expect(200);
        // expect(response.body).toHaveProperty('message', 'Shop deleted successfully');
    });
    
    it('should delete specific shop (shop)', async () => {
        const response = await request(app)
            .delete(`/api-shop/shop/shop/${shopId}`)
            .set('Authorization', `Bearer ${shoptoken}`)
            .expect(200);
        // expect(response.body).toHaveProperty('message', 'Shop deleted successfully');
    });
    
    it('should delete admin', async () => {
        const response = await request(app)
            .delete(`/api-user/user/${adminid}`)
            .set('Accept', 'application/json')
            .expect(200);

        // expect(response.body.acknowledged).toEqual(true);
    });
});
