import { RequestHandler } from "express";
import { pass } from "../models/pass";
import { verifyUser } from "../services/authService";
import { decryptString, encryptString } from "../services/stringEncryption";
import { comparePasswords } from "../services/auth";

export const getPassTitles: RequestHandler = async (req, res, next) => {
    try {
        let passArray
        let usr = await verifyUser(req)
        if (usr) {
            let entries = await pass.findAll({ where: { userId: usr.userId } })
            entries.map((entry) => {
                passArray.push(entry.serviceName)
            })

            console.log(passArray)

            res.status(200).json(passArray)
        } else {
            res.status(401).send()
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getPass: RequestHandler = async (req, res, next) => {
    try {
        const masterPass = req.body.masterPass

        if (masterPass) {

        } else {
            res.status(400).send("masterPass required")
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

export const createPass: RequestHandler = async (req, res, next) => {
    try {
        let usr = await verifyUser(req)
        if (usr) {
            let passEntry = req.body
            if (passEntry.serviceName) {
                const masterPass = req.body.masterPass
                if (masterPass) {
                    const masterPass = req.body.masterPass

                const passwordMatch = await comparePasswords(masterPass, usr.password)

                if (passwordMatch) {
                    let storedPass = passEntry

                    storedPass.userId = usr.userId

                    if (passEntry.email) {
                        storedPass.email = await encryptString(passEntry.email, masterPass)
                    }

                    if (passEntry.password) {
                        storedPass.password = await encryptString(passEntry.password, masterPass)
                    }

                    if (passEntry.username) {
                        storedPass.username = await encryptString(passEntry.username, masterPass)
                    }

                    if (passEntry.twoFactorKey) {
                        storedPass.twoFactorKey = await encryptString(passEntry.twoFactorKey, masterPass)
                    }

                    if (passEntry.otherNotes) {
                        storedPass.otherNotes = await encryptString(passEntry.otherNotes, masterPass)
                    }

                    const created = pass.create(storedPass)
                    res.status(200).send(created)
                } else {
                    res.status(401).send("Invalid Master Password")
                }
                } else {
                    res.status(400).send("masterPass required")
                }
            } else {
                res.status(400).send("ServiceName required")
            }
        } else {
            res.status(401).send()
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

export const editPass: RequestHandler = async (req, res, next) => {
    try {
        let id = req.params.id
        let usr = await verifyUser(req)
        if (usr) {
            let passEntry = req.body
            const oldEntry = await pass.findByPk(id)
            if (oldEntry) {
                if (usr.userId === oldEntry.userId) {
                    if (passEntry.serviceName) {
                        const updated = pass.update(passEntry, { where: { userId: id } })
                        res.status(200).send(updated)
                    }
                } else {
                    res.status(401).send("Not the same user")
                }
            } else {
                res.status(400).send("No such entry")
            }
        } else {
            res.status(401).send()
        }
    } catch (error) {
        res.status(500).send(error)
    }
}