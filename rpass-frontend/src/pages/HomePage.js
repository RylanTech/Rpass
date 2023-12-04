import { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import { Link, useNavigate } from "react-router-dom"
import { Button, Container, Form, Modal, Row } from "react-bootstrap"
import { PassContext } from "../contexts/PassContext"

function Homepage() {
    const [passes, setPasses] = useState()
    const [searchArr, setSearchArr] = useState()
    const [show, setShow] = useState()
    const [secondShow, setSecondShow] = useState()
    const [thirdShow, setThirdShow] = useState()
    const [fourthShow, setFourthShow] = useState()
    const [status, setTwoFactorStatus] = useState()
    const [remove2faPassword, setRemove2faPassword] = useState("")
    const [add2faPassword, setAdd2faPassword] = useState("")
    const [twoFactorSecret, setTwoFactorSecret] = useState("")
    const [test2faToken, setTest2faToken] = useState("")
    const [message, setMessage] = useState();
    const [successMessage, setSuccessMessage] = useState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const secondHandleClose = () => setSecondShow(false);
    const secondHandleShow = () => setSecondShow(true);

    const thirdHandleClose = () => setThirdShow(false);
    const thirdHandleShow = () => setThirdShow(true);

    const fourthHandleClose = () => setFourthShow(false);
    const fourthHandleShow = () => setFourthShow(true);

    const { verify, twoFactorStatus, deleteTwoFactor, addTwoFactor, testTwoFactor } = useContext(UserContext)
    const { getPasses, searchPasses } = useContext(PassContext)
    const navigate = useNavigate()

    useEffect(() => {
        async function startup() {
            let res = await verify()
            console.log(res)
            if (!res) {
                navigate('/login')
            }

            try {
                let passes = await getPasses();
                setPasses(passes);

                let status = await twoFactorStatus()
                setTwoFactorStatus(status)
            } catch {
                navigate('/login')
            }
        }
        startup()
    }, [])

    async function handleChange(e) {
        if (!e.target.value) {
            setSearchArr(null)
        } else {
            let services = await searchPasses(e.target.value)
            setSearchArr(services)
        }
    }

    function handle2faRemove() {
        handleClose()
        secondHandleShow()
    }

    function handleDelete2fa() {
        const masterPass = {
            masterPass: remove2faPassword
        }
        deleteTwoFactor(masterPass).then(() => {
            secondHandleClose()
        })
        setTwoFactorStatus(false)
    }

    function handle2faAdd() {
        handleClose()
        thirdHandleShow()
    }

    async function handleAdd2fa() {
        const masterPass = {
            masterPass: add2faPassword
        }
        const secret = await addTwoFactor(masterPass)
        thirdHandleClose()
        setTwoFactorSecret(secret)
        fourthHandleShow()
    }

    async function testingTwoFactor() {
        const token = {
            token: test2faToken
        }
        let results = await testTwoFactor(token)
        if (results === true) {
            setMessage(null)
            setSuccessMessage("Success! 2FA is set up!")
        } else if (results === false) {
            setSuccessMessage(null)
            setMessage("Something went wrong, please try again. If this keeps happening, close this prompt, delete 2FA in the menu and then start over.")
        }
    }

    function copyToClipboard(text) {
        // Create a new asynchronous clipboard write promise
        navigator.clipboard.writeText(text)
          .then(() => {
            console.log('Text successfully copied to clipboard');
          })
          .catch(err => {
            console.error('Unable to copy text to clipboard', err);
          });
      }

    function mapThroughSearches() {
        if (searchArr) {
            return searchArr.map((title, index) => {
                const marginTop = index * 40; // Calculate margin-top based on index

                return (
                    <div className="col-12" key={index}>
                        <Link to={`/pass/${title}`}>
                            <div className="col-8 searchBox" style={{ marginTop: `${marginTop}px` }}>
                                <h2>{title}</h2>
                            </div>
                        </Link>
                    </div>
                );
            });
        }
    }

    function mapThroughPassess() {
        if (passes) {
            return passes.map((pass) => {
                return (
                    <div className="col-12 col-md-6" key={pass}>
                        <Link className="textNone" to={`/pass/${pass}`}>
                            <div className="col-12 box">
                                <center>
                                    <h2>{pass}</h2>
                                </center>
                            </div>
                        </Link>
                    </div>
                )
            })
        }
    }

    return (
        <>
            <Modal show={fourthShow} onHide={fourthHandleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><b>Verify 2FA</b></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="col-12">
                            <Form.Label>2FA Secret</Form.Label>
                            <Form.Control
                                value={twoFactorSecret}
                            />
                        </Form.Group>
                        <center>
                            <br />
                            <Button className="col-3" onClick={() => copyToClipboard(twoFactorSecret)}>
                                Copy
                            </Button>
                            <br /><br />
                        </center>
                    </Form>
                    <div>Take the 2FA secret and put it inside of an authenticator app (like google authenticator). From there, take the token (a 6 digit code) in the authenticator app and put it in the testing input.</div>
                    <br/>
                    {message ? (
                        <>
                        <div className="message">{message}</div>
                        </>
                    ) : (
                        <>
                        </>
                    )}
                    {successMessage ? (
                        <>
                        <div className="successMessage">{successMessage}</div>
                        </>
                    ) : (
                        <>
                        </>
                    )}
                    <br/>
                    <Form>
                        <Form.Group>
                            <Form.Label>2FA token</Form.Label>
                            <Form.Control
                            value={test2faToken}
                            onChange={(e) => setTest2faToken(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                    <br/><br/>
                    <Button onClick={testingTwoFactor}>
                        Test 2FA
                    </Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={fourthHandleClose} variant="secondary">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={thirdShow} onHide={thirdHandleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><b>Add 2FA</b></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>MasterPass</Form.Label>
                            <Form.Control
                                value={add2faPassword}
                                type="password"
                                onChange={(e) => setAdd2faPassword(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                    <div>
                        <br />
                        Note: 2FA can be removed and added with only the masterPass, but you will need it to login.
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={thirdHandleClose} variant="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleAdd2fa}>
                        Add 2FA
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={secondShow} onHide={secondHandleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><b>Remove 2FA</b></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>MasterPass</Form.Label>
                            <Form.Control
                                value={remove2faPassword}
                                type="password"
                                onChange={(e) => setRemove2faPassword(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleDelete2fa} variant="danger">
                        Delete
                    </Button>
                    <Button onClick={secondHandleClose} variant="secondary">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><b>Rpass</b></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Link className="textNone" to={'/create'}>
                        <div>
                            <div className="col-12 box">
                                <center>
                                    <h2>Create Pass</h2>
                                </center>
                            </div>
                        </div>
                    </Link>
                    <Link className="textNone" to={'/reset'}>
                        <div>
                            <div className="col-12 box">
                                <center>
                                    <h2>Reset Master Pass</h2>
                                </center>
                            </div>
                        </div>
                    </Link>
                    {status ? (
                        <>
                            <div className="col-12 box" onClick={handle2faRemove}>
                                <center>
                                    <h2>Remove 2FA</h2>
                                </center>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="col-12 box" onClick={handle2faAdd}>
                                <center>
                                    <h2>Add 2FA</h2>
                                </center>
                            </div>
                        </>
                    )}
                    <br /><br /><br />
                    <Link className="textNone" to={'/howitworks'}>
                        <div>
                            <div className="col-12 box">
                                <center>
                                    <h2>How It Works</h2>
                                </center>
                            </div>
                        </div>
                    </Link>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} variant="secondary">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="searchNav">
                <Container>
                    <Row>
                        <Form.Group
                            className="col-9 searchBar">
                            <Form.Control
                                onChange={handleChange}
                            />
                            {searchArr ? (
                                <>
                                    <Row>
                                        <Container>
                                            <Row>
                                                {mapThroughSearches()}
                                            </Row>
                                        </Container>
                                    </Row>
                                </>
                            ) : (
                                <></>
                            )}
                        </Form.Group>
                        <div className="col-3">
                            <center>
                                <Button
                                    className="createBtn col-12"
                                    onClick={handleShow}
                                >
                                    Menu
                                </Button>
                            </center>
                        </div>
                    </Row>
                </Container>
            </div>
            <Container>
                <Row>
                    {mapThroughPassess()}
                </Row>
            </Container>
        </>
    )
}
export default Homepage