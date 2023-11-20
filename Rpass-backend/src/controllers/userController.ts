import { RequestHandler } from "express";
import { user } from "../models/user";
import { comparePasswords, hashPassword } from "../services/auth";
import { signUserToken, verifyUser } from "../services/authService";

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

        if (newUser.email && newUser.password) {
            let hashedPassword = await hashPassword(newUser.password);
            newUser.password = hashedPassword;
            let created = await user.create(newUser);
            res.status(201).json({
                email: created.email,
                userId: created.userId
            });
        }
        else {
            res.status(400).send('email and password required');
        }
    } catch {
        res.status(500).send()
    }
}

export const loginUser: RequestHandler = async (req, res, next) => {

    try {
        // Look up user by their email
        let existingUser: user | null = await user.findOne({
            where: { email: req.body.email }
        });

        // If user exists, check that password matches
        if (existingUser) {
            let passwordsMatch = await comparePasswords(req.body.password, existingUser.password);

            // If passwords match, create a JWT
            if (passwordsMatch) {
                let token = await signUserToken(existingUser);
                res.status(200).json(token);
            }
            else {
                res.status(401).json('Invalid password');
            }
        }
        else {
            res.status(401).json('Invalid email');
        }
    } catch {
        res.status(500).send()
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