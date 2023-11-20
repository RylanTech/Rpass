import { useContext, useEffect, useState } from "react"
import { Button, Container, Form, Row } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import { PassContext } from "../contexts/PassContext"

function CreatePage() {
    const [serviceName, setServiceName] = useState()
    const [email, setEmail] = useState()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [twoFactorKey, setTwoFactorKey] = useState()
    const [otherNotes, setOtherNotes] = useState()
    const [masterPass, setMasterPass] = useState()
    const [message, setMessage] = useState()

    const {createPass} = useContext(PassContext)
    const navigate = useNavigate()
    let params = useParams()

    async function handleSubmit() {
        const pass = {
            serviceName: serviceName,
            email: email,
            username: username,
            password: password,
            twoFactorKey: twoFactorKey,
            otherNotes: otherNotes,
            masterPass: masterPass
        }

        let res = await createPass(pass)
        if (res === true) {
            navigate("/")
        } else {
            setMessage("Incorrect Master Password")
        }
    }

    return (
        <>
        <div className="searchNav">
                <Container>
                    <Row>
                        <div className="col-3">
                            <center>
                                <h3 className="passName"><b>Create</b></h3>
                            </center>
                        </div>
                        <div className="col-9">
                            <Link to={"/"}>
                                <Button className="homeBtn">
                                    Home
                                </Button>
                            </Link>
                        </div>
                    </Row>
                </Container>
            </div>
        <Container>
            <Row>
                <div className="formBox">
                    <Form>
                        <Form.Group>
                            <Form.Label>Service Name</Form.Label>
                            <div className="minorText">
                                (No special char)
                            </div>
                            <Form.Control
                            placeholder="Required"
                            value={serviceName}
                            onChange={(e) => setServiceName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>two Factor Key</Form.Label>
                            <Form.Control
                            value={twoFactorKey}
                            onChange={(e) => setTwoFactorKey(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Other Notes</Form.Label>
                            <br/>
                            <textarea cols={35} rows={3}
                            value={otherNotes}
                            onChange={(e) => setOtherNotes(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Row>
                            <Form.Label>Master Password</Form.Label>
                            <div className="col-9">
                            <Form.Control
                            type="password"
                            value={masterPass}
                            onChange={(e) => setMasterPass(e.target.value)}
                            />
                            </div>
                            <div className="col-3">
                                <Button onClick={handleSubmit}>Create</Button>
                            </div>
                            </Row>
                        </Form.Group>
                    </Form>
                    <br/>
                    {message ? (
                        <>
                        <div className="col-12 message">
                        {message}
                    </div>
                    </>
                    ) : (
                        <></>
                    )}
                </div>
            </Row>
        </Container>
        </>
    )
}
export default CreatePage