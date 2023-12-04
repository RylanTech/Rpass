import { RequestHandler } from "express";
import { user } from "../models/user";
import { comparePasswords, hashPassword, verifyTwoFactor } from "../services/auth";
import { signUserToken, verifyUser } from "../services/authService";
import speakeasy from 'speakeasy'

export const getUser: RequestHandler = async (req, res, next) => {
    let usr = await verifyUser(req)

    if (usr) {
        let users = user.findAll()
        res.status(200).json(users)
    } else {
        res.status(401).send()
    }
}

export const getallUsers: RequestHandler = async (req, res, next) => {
    let usr = await verifyUser(req)

    if (usr) {
        let users = await user.findAll();
        res.status(200).json(users)
    } else {
        res.status(401).send()
    }
};

export const createUser: RequestHandler = async (req, res, next) => {
    try {
        let newUser: user = req.body;

        if (newUser.email && newUser.password && newUser.name) {
            let maybeSameEmail = await user.findOne({ where: { email: newUser.email } })
            console.log(maybeSameEmail)
            if (!maybeSameEmail) {
                let hashedPassword = await hashPassword(newUser.password);
                newUser.password = hashedPassword;
                let created = await user.create(newUser);
                res.status(201).json({
                    email: created.email,
                    userId: created.userId
                });
            } else {
                res.status(200).send("email in use")
            }
        }
        else {
            res.status(200).send('email, password and name required');
        }
    } catch {
        res.status(500).send()
    }
}

export const loginUser: RequestHandler = async (req, res, next) => {

    if (req.body.email && req.body.password) {
        // Look up user by their email
        let existingUser: user | null = await user.findOne({
            where: { email: req.body.email }
        });

        // If user exists, check that password matches
        if (existingUser) {
            let passwordsMatch = await comparePasswords(req.body.password, existingUser.password);

            // If passwords match, check 2FA
            if (passwordsMatch) {
                if (existingUser.twoFactorKey !== null) {
                    if (req.body.token) {
                        let verified = await verifyTwoFactor(req.body.token, existingUser.userId)
                        //If 2FA token is verified, return the JWT token
                        if (verified) {
                            let token = await signUserToken(existingUser);
                            res.status(200).send(token)
                        } else {
                            res.status(203).send("Invalid 2FA code")
                        }
                    } else {
                        res.status(203).send("token required")
                    }
                } else {
                    let token = await signUserToken(existingUser);
                    res.status(200).json(token);
                }
            }
            else {
                res.status(203).json('Invalid password');
            }
        }
    }
    else {
        res.status(203).json('Invalid email');
    }
}

export const verify: RequestHandler = async (req, res, next) => {
    try {
        let usr = await verifyUser(req)

        if (usr) {
            res.status(200).send(true)
        } else {
            res.status(200).send(false)
        }
    } catch {
        res.status(500).send()
    }
}

export const addTwoFactor: RequestHandler = async (req, res, next) => {
    try {
        let usr = await verifyUser(req)
        if (usr && req.body.masterPass) {
            let currentUser = await user.findByPk(usr.userId)
            if (currentUser) {
                let passwordsMatch = await comparePasswords(req.body.masterPass, currentUser.password)

                if (passwordsMatch) {
                    let secret = await speakeasy.generateSecret()
                    currentUser.twoFactorKey = JSON.stringify(secret)

                    await user.update(currentUser.dataValues, { where: { userId: currentUser.userId } });
                    res.status(200).send(JSON.parse(currentUser.twoFactorKey).base32)
                } else {
                    res.status(401).send("Wrong MasterPass")
                }
            }
        } else {
            res.status(401).send("Missing fields")
        }
    } catch {
        res.status(500).send()
    }
}

export const removeTwoFactor: RequestHandler = async (req, res, next) => {
    try {
        let usr = await verifyUser(req)
        console.log(req.body)
        if (usr && req.body.masterPass) {
            let currentUser: any = await user.findByPk(usr.userId)
            if (currentUser) {
                let passwordsMatch = await comparePasswords(req.body.masterPass, currentUser.password)
                if (passwordsMatch) {
                    currentUser.twoFactorKey = null

                    let updatedUser = await user.update(currentUser.dataValues, { where: { userId: currentUser.userId } });
                    res.status(200).send("deleted")
                } else {
                    res.status(401).send("Wrong MasterPass")
                }
            }
        } else {
            res.status(401).send()
        }
    } catch {
        res.status(500).send()
    }
}

export const getTwoFactorStatus: RequestHandler = async (req, res, next) => {
    try {
        let usr = await verifyUser(req)
        if (usr) {
            let currentUser: any = await user.findByPk(usr.userId)
            if (currentUser) {
                if (currentUser.twoFactorKey !== null) {
                    res.status(200).send(true)
                } else {
                    res.status(200).send(false)
                }
            } else {
                res.status(401).send("User does not exist")
            }
        } else {
            res.status(401).send()
        }
    } catch {
        res.status(500).send()
    }
}

export const testTwoFactor: RequestHandler = async (req, res, next) => {
    try {
        let usr = await verifyUser(req)
        if (usr && req.body.token) {
            let currentUser: any = await user.findByPk(usr.userId)
            if (currentUser) {
                if (currentUser.twoFactorKey !== null) {
                    let verified = await verifyTwoFactor(req.body.token, currentUser.userId)
                    if (verified) {
                        res.status(200).send(true)
                    } else {
                        res.status(200).send(false)
                    }
                } else {
                    res.status(200).send(false)
                }
            } else {
                res.status(401).send("User does not exist")
            }
        } else {
            res.status(401).send()
        }
    } catch {
        res.status(500).send()
    }
}