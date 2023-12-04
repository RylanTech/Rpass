import { useContext, useState } from "react"
import { Button, Container, Form, Row } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/UserContext";

function CreateAccount() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState();

    const { createAccount } = useContext(UserContext)
    const navigate = useNavigate()

    async function handleSubmit() {
        const user = {
            email: email,
            name: name,
            password: password
        }

        let newAcc = await createAccount(user)
        if (newAcc.email && newAcc.userId) {
            navigate('/login')
        } else if (newAcc === "email in use") {
            setMessage("There is already and account associated with this email")
        } else {
            setMessage("There was an issue creating your account, please make sure all inputs are filled")
        }
    }


    return (
        <>
            <Container>
                <br /><br /><br />
                <Row>
                    <div className='col-md-2' />
                    <div className='col-12 col-md-8'>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                    </div>
                </Row>
                <center>
                    <br />
                    <Row>
                        <div className='col-md-2' />
                        <div className='col-12 col-md-8'>
                            {message ? (
                                <>
                                    <div className='message'>
                                        {message}
                                    </div>
                                    <br />
                                </>
                            ) : (
                                <>
                                </>
                            )}
                        </div>
                    </Row>
                    <Row>
                        <Link>
                            <div className='col-md-2' />
                            <Button
                                onClick={handleSubmit}
                                className='col-12 col-md-8'
                            >Create an Account</Button>
                        </Link>
                    </Row>
                    <br />
                    <Row>
                        <div className='col-md-2' />
                        <Link
                            to={'/login'}
                            className='col-12'>
                            <Button
                                variant='secondary'
                                className='col-12 col-md-8'
                            >Already have an account? Login</Button>
                        </Link>
                    </Row>
                </center>
            </Container>
        </>
    )
}
export default CreateAccount