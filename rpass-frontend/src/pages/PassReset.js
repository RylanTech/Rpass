import { useContext, useState } from "react";
import { Button, Container, Form, Modal, Row } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { PassContext } from "../contexts/PassContext";

function PassReset() {
    const [masterPass, setMasterPass] = useState()
    const [newMasterPass, setNewMasterPass] = useState()
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { resetPass } = useContext(PassContext)
    const navigate = useNavigate()

    async function handleSubmit() {
        console.log(newMasterPass)
        if (newMasterPass === "") {
            setMessage("New MasterPass requires a value")
        } else if (newMasterPass === undefined) {
            setMessage("New MasterPass requires a value")
        } else {
            const MasterPases = {
                masterPass: masterPass,
                newMasterPass: newMasterPass
            }
            let i = await resetPass(MasterPases)
            if (i) {
                navigate('/')
            } else {
                setMessage("Wrong Password")
            }
        }
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><b>MasterPass Reset</b></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        Resetting your MasterPass cannot be undone, are you sure you want to change the MasterPass to "{newMasterPass}"
                    </div>
                </Modal.Body>
                <Modal.Footer>
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
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>


            <div className="searchNav">
                <Container>
                    <Row>
                        <div className="col-6">
                            <center>
                                <h3 className="passName"><b>Reset Master Pass</b></h3>
                            </center>
                        </div>
                        <div className="col-6">
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
                    <Form.Group>
                        <Form.Label>Old MasterPass</Form.Label>
                        <Form.Control
                            value={masterPass}
                            onChange={(e) => setMasterPass(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>New MasterPass</Form.Label>
                        <Form.Control
                            value={newMasterPass}
                            onChange={(e) => setNewMasterPass(e.target.value)}
                        />
                    </Form.Group>
                </Row>
                <center>
                    <br />
                    <Button onClick={handleShow}>
                        Submit
                    </Button>
                </center>
            </Container>
        </>
    )
}
export default PassReset