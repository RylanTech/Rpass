import { useContext, useEffect, useState } from "react"
import { Button, Container, Form, Modal, Row } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import { PassContext } from "../contexts/PassContext"

function EditPassPage() {
    const [serviceName, setServiceName] = useState()
    const [email, setEmail] = useState()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [twoFactorKey, setTwoFactorKey] = useState()
    const [otherNotes, setOtherNotes] = useState()
    const [passId, setPassId] = useState()
    const [masterPass, setMasterPass] = useState()
    const [message, setMessage] = useState()
    const [show, setShow] = useState()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {editPass, getPass } = useContext(PassContext)
    const navigate = useNavigate()
    let params = useParams()

    useEffect(() => {
        handleShow()
    },[])

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
        console.log(pass)

        let res = await editPass(pass, passId)
        if (res === true) {
            navigate("/")
        } else {
            setMessage("Incorrect Master Password")
        }
    }

    async function handleGet() {
        let pass = await getPass(params.name, masterPass)

        if (pass) {
            setEmail(pass.email)
            setOtherNotes(pass.otherNotes)
            setPassword(pass.password)
            setUsername(pass.username)
            setServiceName(pass.serviceName)
            setTwoFactorKey(pass.twoFactorKey)
            setPassId(pass.passId)

            handleClose()
        }
    }

    return (
        <>
        <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Master Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {message ? (
                            <>
                                <div className="col-12 message">
                                    {message}
                                </div>
                                <br />
                            </>
                        ) : (
                            <></>
                        )}
                        <Form.Control
                            type="password"
                            value={masterPass}
                            onChange={(e) => setMasterPass(e.target.value)}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Link to={"/"}>
                        <Button variant="secondary">
                            Close
                        </Button>
                    </Link>
                    <Button onClick={handleGet}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        <div className="searchNav">
                <Container>
                    <Row>
                        <div className="col-3">
                            <center>
                                <h3 className="passName"><b>Edit</b></h3>
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
                                <Button onClick={handleSubmit}>Edit</Button>
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
export default EditPassPage