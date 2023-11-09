import { useContext, useEffect, useState } from "react"
import { PassContext } from "../contexts/PassContext"
import { Link, useParams } from "react-router-dom"
import { Button, Container, Form, Modal, Row } from "react-bootstrap"

function PassPage() {
    const [pass, setPass] = useState()
    const [show, setShow] = useState(false);
    const [show2, set2Show] = useState(false)
    const [masterPass, setMasterPass] = useState()
    const [message, setMessage] = useState()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handle2Close = () => set2Show(false);
    const handle2Show = () => set2Show(true);

    const { getPass } = useContext(PassContext)
    const params = useParams()
    const passName = params.name

    useEffect(() => {
        // async function gettingPass() {
        //     let pass = await getPass(passName)
        //     setPass(pass)
        // }
        // gettingPass()
        handleShow()
    }, [])

    async function handleSubmit() {
        let pass = await getPass(passName, masterPass)
        console.log(pass)
        if (pass === false) {
            setMessage("Incorrect Password")
        } else {
            setPass(pass)
            handleClose()
        }
    }

    function handleDelete() {
        handle2Show()
    }

    function deletePass() {

    }

    function goThroughStuff() {
        const formattedMessage = pass.otherNotes.replace(/\n/g, '<br>');
        return (
            <>
                {pass.email ? (
                    <div className="col-12 col-lg-6 entry">
                        Email: <div className="fl">{pass.email}</div>
                    </div>
                ) : (
                    <></>
                )}
                {pass.username ? (
                    <div className="col-12 col-lg-6 entry">
                        Username: <div className="fl">{pass.username}</div>
                    </div>
                ) : (
                    <></>
                )}
                {pass.password ? (
                    <div className="col-12 col-lg-6 entry">
                        Password: <div className="fl">{pass.password}</div>
                    </div>
                ) : (
                    <></>
                )}
                {pass.twoFactorKey ? (
                    <div className="col-12 col-lg-6 entry">
                        Two Factor Key: <div className="fl">{pass.twoFactorKey}</div>
                    </div>
                ) : (
                    <></>
                )}
                {pass.otherNotes ? (
                    <div className="col-12 col-lg-6 entry">
                        Other Notes: <br />
                        <div dangerouslySetInnerHTML={{ __html: formattedMessage }} />
                    </div>
                ) : (
                    <></>
                )}
                {pass.serviceName ? (
                    <>
                        <Button variant="danger" className="col-3 delBtn" onClick={handleDelete}>Delete</Button>
                    </>
                ) : (
                    <></>
                )}
            </>
        )
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
                    <Button onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={show2} onHide={handle2Close}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Pass</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        Are you sure you want to delete this pass?
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handle2Close} variant="secondary">
                        Close
                    </Button>
                    <Button variant="danger" onClick={deletePass}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="searchNav">
                <Container>
                    <Row>
                        <div className="col-3">
                            <center>
                                <h3 className="passName"><b>{passName}</b></h3>
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
                    {pass ? (
                        goThroughStuff()
                    ) : (
                        <></>
                    )}
                </Row>
            </Container>
        </>
    )
}
export default PassPage