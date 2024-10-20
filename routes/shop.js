const express = require("express")
const router = express.Router()

const { 
    loginCtrl, postWebShop, putWebShop, patchWebShop, patchWebShopPhoto, patchWebShopText, deleteWebShop, getWebShopPhoto, getWebShopReviews, getWebShopText,
    getShop, getShopById, getShopByName, getShopsCity, getShopByActivity, getShopsCityAndActivity,
    getShopByScore, postShop, putShop, patchShop, deleteShop, postReviewToShop,
} = require("../controllers/shop")

const { validatorShop, validatorShopData, validatorReview, shopValidatorLogin, validatorWebShop, validatorWebShopData, validatorWebShopPhoto, validatorWebShopText } = require("../validators/shop")

const { authShopMiddleware, authUserMiddleware, checkRol }  = require("../middleware/jwt")

/** Shop --- shop
 * 
 * Login 
 * PUT /shop/:id - update a shop
 * PATCH /shop/:id - update a shop
 * DELETE /shop/:id - delete a shop
 * 
**/

/**
 * @openapi
 * /shop/login:
 *   post:
 *     summary: Login to the shop
 *     tags: [Shop]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *                
 *              example:
 *                email: shopSwagger@admin.com
 *                password: Password123! 
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/shop/login", shopValidatorLogin, loginCtrl) 

/**
 * @openapi
 * /shop/shop/{id}:
 *   put:
 *     summary: Replace a specific shop
 *     security:
 *       - BearerAuth: []
 *     tags: [Shop]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the shop
 *     requestBody:
 *       description: Shop data to replace
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Shop'
 *     responses:
 *       200:
 *         description: Shop replaced successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Shop not found
 */
router.put("/shop/shop/:id", authShopMiddleware, validatorShop, validatorShopData, putShop) 

/**
 * @openapi
 * /shop/shop/{id}:
 *   patch:
 *     summary: Update a specific shop
 *     security:
 *       - BearerAuth: []
 *     tags: [Shop]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the shop
 *     requestBody:
 *       description: Shop data to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Shop'
 *     responses:
 *       200:
 *         description: Shop updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Shop not found
 */
router.patch("/shop/shop/:id", authShopMiddleware, validatorShop, patchShop)

/**
 * @openapi
 * /shop/shop/{id}:
 *   delete:
 *     summary: Delete a specific shop
 *     security:
 *       - BearerAuth: []
 *     tags: [Shop]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the shop
 *     responses:
 *       200:
 *         description: Shop deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Shop not found
 */
router.delete("/shop/shop/:id", authShopMiddleware, validatorShop, deleteShop)

/** Shop --- webShop 
 * 
 * POST /webShop/:id - create a new webShop 
 * PUT /webShop/:id - update a webShop
 * PATCH /webShop/:id - update a webShop
 * DELETE /webShop/:id - delete a webShop
 * 
 * PATCH /webShop/:id/photo - update a webShop photo 
 * PATCH /webShop/:id/text - update a webShop text
 * 
 * GET /webShop/:id/photo - get a webShop photo
 * GET /webShop/:id/text - get a webShop text
 * GET /webShop/:id/reviews - get a webShop reviews
 * 
**/

/**
 * @openapi
 * /webShop/{id}:
 *   post:
 *     summary: Create a new webShop with a specific id
 *     security:
 *       - BearerAuth: []
 *     tags: [WebShop]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the new webShop
 *     requestBody:
 *       description: WebShop data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WebShop'
 *     responses:
 *       201:
 *         description: WebShop created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       409:
 *         description: Conflict, webShop already exists
 */
router.post("/webShop/:id", authShopMiddleware, validatorWebShopData, postWebShop)

/**
 * @openapi
 * /webShop/{id}:
 *   put:
 *     summary: Replace a specific webShop
 *     security:
 *       - BearerAuth: []
 *     tags: [WebShop]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the webShop
 *     requestBody:
 *       description: WebShop data to replace
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WebShop'
 *     responses:
 *       200:
 *         description: WebShop replaced successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: WebShop not found
 */
router.put("/webShop/:id", authShopMiddleware, validatorWebShopData, putWebShop)

/**
 * @openapi
 * /webShop/{id}:
 *   patch:
 *     summary: Update a specific webShop
 *     security:
 *       - BearerAuth: []
 *     tags: [WebShop]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the webShop
 *     requestBody:
 *       description: WebShop data to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WebShop'
 *     responses:
 *       200:
 *         description: WebShop updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: WebShop not found
 */
router.patch("/webShop/:id", authShopMiddleware, patchWebShop)

/**
 * @openapi
 * /webShop/{id}:
 *   delete:
 *     summary: Delete a specific webShop
 *     security:
 *       - BearerAuth: []
 *     tags: [WebShop]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the webShop
 *     responses:
 *       200:
 *         description: WebShop deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: WebShop not found
 */
router.delete("/webShop/:id", authShopMiddleware, deleteWebShop)

/**
 * @openapi
 * /webShop/{id}/photo:
 *   patch:
 *     summary: Update the photo for a specific webShop
 *     security:
 *       - BearerAuth: []
 *     tags: [WebShop]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the webShop
 *     requestBody:
 *       description: Photo data to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *             example:
 *               photo: swaggerPhoto.jpg
 *     responses:
 *       200:
 *         description: Photo updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: WebShop not found
 */
router.patch("/webShop/:id/photo", authShopMiddleware, validatorWebShopPhoto, patchWebShopPhoto)

/**
 * @openapi
 * /webShop/{id}/text:
 *   patch:
 *     summary: Update the text for a specific webShop
 *     security:
 *       - BearerAuth: []
 *     tags: [WebShop]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the webShop
 *     requestBody:
 *       description: Text data to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *             example:
 *               text: swaggertext
 *     responses:
 *       200:
 *         description: Text updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: WebShop not found
 */
router.patch("/webShop/:id/text", authShopMiddleware, validatorWebShopText, patchWebShopText)

/**
 * @openapi
 * /webShop/{id}/photo:
 *   get:
 *     summary: Get the photo for a specific webShop
 *     security:
 *       - BearerAuth: []
 *     tags: [WebShop]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the webShop
 *     responses:
 *       200:
 *         description: Photo retrieved successfully
 *         content:
 *           image/jpeg:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: WebShop not found
 */
router.get("/webShop/:id/photo", authShopMiddleware, getWebShopPhoto)

/**
 * @openapi
 * /webShop/{id}/text:
 *   get:
 *     summary: Get the text for a specific webShop
 *     security:
 *       - BearerAuth: []
 *     tags: [WebShop]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the webShop
 *     responses:
 *       200:
 *         description: Text retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: WebShop not found
 */
router.get("/webShop/:id/text", authShopMiddleware, getWebShopText)

/**
 * @openapi
 * /webShop/{id}/reviews:
 *   get:
 *     summary: Get all reviews for a specific webShop
 *     security:
 *       - BearerAuth: []
 *     tags: [WebShop]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the webShop
 *     responses:
 *       200:
 *         description: Reviews retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: WebShop not found
 */
router.get("/webShop/:id/reviews", authShopMiddleware, getWebShopReviews)

/** Admin --- shop
 * 
 * GET /shop - Get shop
 * GET /shop/:id - Get shop by id 
 * POST /shop - Create shop 
 * PUT /shop/:id - Update shop
 * PATCH /shop/:id - Soft delete shop
 * DELETE /shop/:id - Delete shop (physically)
 * 
**/

/**
 * @openapi
 * /shopAdmin:
 *   get:
 *     summary: Get all shops
 *     security:
 *       - BearerAuth: []
 *     tags: [Shop]
 *     responses:
 *       200:
 *         description: Shops retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Shop'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get("/shopAdmin", authUserMiddleware, checkRol(["admin"]), getShop)

/**
 * @openapi
 * /shopAdmin/{id}:
 *   get:
 *     summary: Get a shop by its ID
 *     security:
 *       - BearerAuth: []
 *     tags: [Shop]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the shop
 *     responses:
 *       200:
 *         description: Shop retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shop'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Shop not found
 */
router.get("/shopAdmin/:id", authUserMiddleware, checkRol(["admin"]), getShopById)

/**
 * @openapi
 * /shopAdmin:
 *   post:
 *     summary: Create a new shop
 *     security:
 *       - BearerAuth: []
 *     tags: [Shop]
 *     requestBody:
 *       description: Shop data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *               cif:
 *                 type: string
 *               city:
 *                 type: string
 *               activity:
 *                 type: string
 *               phone:
 *                 type: number
 *             example:
 *               cif: E12
 *               name: shopSwagger
 *               email: shopSwagger@example.com
 *               password: Password123!
 *               city: NewYork
 *               activity: Swagger
 *               phone: 12341234
 *     responses:
 *       201:
 *         description: Shop created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post("/shopAdminRegister", authUserMiddleware, checkRol(["admin"]), validatorShopData, postShop)

/**
 * @openapi
 * /shopAdmin/{id}:
 *   put:
 *     summary: Replace a shop by its ID
 *     security:
 *       - BearerAuth: []
 *     tags: [Shop]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the shop
 *     requestBody:
 *       description: Shop data to replace
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *               cif:
 *                 type: string
 *               city:
 *                 type: string
 *               activity:
 *                 type: string
 *               phone:
 *                 type: number
 *             example:
 *               cif: E12
 *               name: shopSwaggerPut
 *               email: shopSwagger@example.com
 *               password: Password123!
 *               city: NewYork
 *               activity: Swagger
 *               phone: 12341234
 *     responses:
 *       200:
 *         description: Shop replaced successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Shop not found
 */
router.put("/shopAdmin/:id", authUserMiddleware, checkRol(["admin"]), validatorShop, validatorShopData, putShop)

/**
 * @openapi
 * /shopAdmin/{id}:
 *   patch:
 *     summary: Update a shop by its ID
 *     security:
 *       - BearerAuth: []
 *     tags: [Shop]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the shop
 *     requestBody:
 *       description: Shop data to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: shopSwaggerPatch
 *     responses:
 *       200:
 *         description: Shop updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Shop not found
 */
router.patch("/shopAdmin/:id", authUserMiddleware, checkRol(["admin"]), validatorShop, patchShop)

/**
 * @openapi
 * /shopAdmin/{id}:
 *   delete:
 *     summary: Delete a shop by its ID
 *     security:
 *       - BearerAuth: []
 *     tags: [Shop]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the shop
 *     responses:
 *       200:
 *         description: Shop deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Shop not found
 */
router.delete("/shopAdmin/:id", authUserMiddleware, checkRol(["admin"]), validatorShop, deleteShop)

/** UnregisteredUser & RegisteredUser --- shop
 * 
 * GET /shop - Get shop
 * GET /shop/:id - Get shop by id
 * GET /shop/search/:name - Get shop by name
 * GET /shop/search/:city - Get shop by city
 * GET /shop/search/:activity - Get shop by activity
 * GET /shop/search/:city/:activity - Get shop by city and activity
 * GET /shop/search/?score:true - Get shop by score
 * GET /shop/search/?score:true&city=city - Get shop by score and city
 * GET /shop/search/?score:true&activity=activity - Get shop by score and activity
 * GET /shop/search/?score:true&city=city&activity=activity - Get shop by score, city and activity
 * 
**/

/**
 * @openapi
 * /sho/search:
 *   get:
 *     summary: Search for a shop
 *     tags: [Shop]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: The name of the shop to search for
 *     responses:
 *       200:
 *         description: Search completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Shop'
 *       400:
 *         description: Bad request
 */
router.get("/sho/search", getShop)

/**
 * @openapi
 * /shop/search/id/{id}:
 *   get:
 *     summary: Get a shop by its ID
 *     tags: [Shop]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the shop
 *     responses:
 *       200:
 *         description: Shop retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shop'
 *       404:
 *         description: Shop not found
 */
router.get("/shop/search/id/:id", getShopById)

/**
 * @openapi
 * /shop/search/name/{name}:
 *   get:
 *     summary: Get a shop by its name
 *     tags: [Shop]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the shop
 *     responses:
 *       200:
 *         description: Shop retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shop'
 *       404:
 *         description: Shop not found
 */
router.get("/shop/search/name/:name", getShopByName)

/**
 * @openapi
 * /shop/search/city/{city}:
 *   get:
 *     summary: Get shops by city
 *     tags: [Shop]
 *     parameters:
 *       - in: path
 *         name: city
 *         schema:
 *           type: string
 *         required: true
 *         description: The city where the shop is located
 *     responses:
 *       200:
 *         description: Shops retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Shop'
 *       404:
 *         description: Shops not found
 */
router.get("/shop/search/city/:city", getShopsCity)

/**
 * @openapi
 * /shop/search/activity/{activity}:
 *   get:
 *     summary: Get shops by activity
 *     tags: [Shop]
 *     parameters:
 *       - in: path
 *         name: activity
 *         schema:
 *           type: string
 *         required: true
 *         description: The activity of the shop
 *     responses:
 *       200:
 *         description: Shops retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Shop'
 *       404:
 *         description: Shops not found
 */
router.get("/shop/search/activity/:activity", getShopByActivity)

/**
 * @openapi
 * /shop/search/cityActivity/{city}/{activity}:
 *   get:
 *     summary: Get shops by city and activity
 *     tags: [Shop]
 *     parameters:
 *       - in: path
 *         name: city
 *         schema:
 *           type: string
 *         required: true
 *         description: The city where the shop is located
 *       - in: path
 *         name: activity
 *         schema:
 *           type: string
 *         required: true
 *         description: The activity of the shop
 *     responses:
 *       200:
 *         description: Shops retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Shop'
 *       404:
 *         description: Shops not found
 */
router.get("/shop/search/cityActivity/:city/:activity", getShopsCityAndActivity)

/**
 * @openapi
 * /shop/search/score:
 *   get:
 *     summary: Get shops by score
 *     tags: [Shop]
 *     parameters:
 *       - in: query
 *         name: score
 *         schema:
 *           type: boolean
 *         description: The score filter
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: The city where the shop is located
 *       - in: query
 *         name: activity
 *         schema:
 *           type: string
 *         description: The activity of the shop
 *     responses:
 *       200:
 *         description: Shops retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Shop'
 *       404:
 *         description: Shops not found
 */
router.get("/shop/search/score", getShopByScore)

/**  RegisteredUser --- user, shop
 *  
 * Review shop
 * PATCH /shop/:id - Review shop
 * 
**/

/**
 * @openapi
 * /postReview/{id}:
 *   patch:
 *     summary: Post a review to a shop
 *     tags: [Shop]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the shop
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               score:
 *                 type: number
 *               text:
 *                 type: string
 *             example:
 *               score: 5
 *               text: swagger review
 *     responses:
 *       200:
 *         description: Review posted successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.patch("/postReview/:id", authUserMiddleware, checkRol(["user"]), validatorShop, validatorReview, postReviewToShop)

module.exports = router