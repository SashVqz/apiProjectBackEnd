const express = require("express")
const router = express.Router()

const { registerCtrl, registerCtrlAdmin, loginCtrl, putUser, patchUser, deleteUser , getUsersFiltered} = require("../controllers/user")
const { userValidatorRegister, userValidatorLogin, userValidator, userValidatorUserData } = require("../validators/user")

const { authShopMiddleware }  = require("../middleware/jwt") 

/** Admin --- admin
 *  POST /register - Register admin
**/

/**
 * @openapi
 * /registerAdmin:
 *   post:
 *     summary: Register a new admin
 *     tags: [Admin]
 *     requestBody:
 *       description: Admin data to register
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
 *               age:
 *                 type: number
 *               city:
 *                 type: string
 *               interests:
 *                 type: string
 *               allowsReceivingOffers:
 *                 type: boolean
 *               role:
 *                 type: string
 *             example:
 *               email: adminSwagger@admin.com
 *               name: admin
 *               password: Password123!
 *               age: 25
 *               city: admin
 *               interests: admin
 *               allowsReceivingOffers: false
 *               role: admin
 *     responses:
 *       200:
 *         description: Admin registered successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/registerAdmin", registerCtrlAdmin)

/**  RegisteredUser --- user
 * 
 * POST /login - Login user
 * PUT /user/:id - Update user
 * PATCH /user/:id - Soft delete user
 * DELETE /user/:id - Delete user (physically)   
 * 
**/

/**
 * @openapi
 * /login:
 *   post:
 *     summary: Log in a user
 *     tags: [User]
 *     requestBody:
 *       description: User login data
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
 *                email: adminSwagger@admin.com
 *                password: Password123! 
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/login", userValidatorLogin, loginCtrl)

/**
 * @openapi
 * /user/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       description: User data to update
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
 *               age:
 *                 type: number
 *               city:
 *                 type: string
 *               interests:
 *                 type: string
 *               allowsReceivingOffers:
 *                 type: boolean
 *               role:
 *                 type: string
 *             example:
 *               email: userSwagger@admin.com
 *               name: userSwaggerUpdate
 *               password: Password123!
 *               age: 25
 *               city: Madrid
 *               interests: Programming
 *               allowsReceivingOffers: true
 *               role: user
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put("/user/:id" , userValidator, userValidatorUserData, putUser)

/**
 * @openapi
 * /user/patch/{id}:
 *   patch:
 *     summary: Update a user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       description: User data to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               city:
 *                 type: string
 *               interests:
 *                 type: string
 *               allowsReceivingOffers:
 *                 type: boolean
 *             example:
 *               city: Miami
 *               allowsReceivingOffers: false
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.patch("/user/patch/:id", userValidator, patchUser)

/**
 * @openapi
 * /user/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.delete("/user/:id", userValidator, deleteUser)

/** UnregisteredUser --- user
 * 
 * POST /register - Register user
 * 
**/

/**
 * @openapi
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       description: User data to register
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
 *               age:
 *                 type: number
 *               city:
 *                 type: string
 *               interests:
 *                 type: string
 *               allowsReceivingOffers:
 *                 type: boolean
 *               role:
 *                 type: string
 *             example:
 *               email: userSwagger@admin.com
 *               name: userSwaggerUpdate
 *               password: Password123!
 *               age: 25
 *               city: Madrid
 *               interests: Programming
 *               allowsReceivingOffers: true
 *               role: user
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/register", userValidatorRegister, registerCtrl)

/** Shop --- User
 * 
 * GET /user/?allowsReceivingOffers=true&city=city - Get user by allowsReceivingOffers and city
 * GET /user/?allowsReceivingOffers=true&interests=interests - Get user by allowsReceivingOffers and interests
 * 
**/

/**
 * @openapi
 * /userShop:
 *   get:
 *     summary: Get filtered users
 *     security:
 *       - BearerAuth: []
 *     tags: [User]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get("/userShop", authShopMiddleware, getUsersFiltered)

module.exports = router