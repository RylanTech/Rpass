import { useContext, useState } from 'react'
import { Button, Container, Form, Row } from 'react-bootstrap'
import { UserContext } from '../contexts/UserContext'
import { useNavigate } from 'react-router-dom'

function Loginpage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [message, setMessage] = useState()

    const { login } = useContext(UserContext)
    const navigate = useNavigate()

    async function handleSubmit() {
        try {
            let credentials = {
                email,
                password,
                token
            }
            let res = await login(credentials)
            if (res.status === 200) {
                navigate('/')
            } else if (res.status === 203) {
                setMessage("Incorrect email, password or 2FA key")
            }
        } catch {
            navigate('/login')
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
                        <Form.Group>
                            <Form.Label>2FA key (If set up)</Form.Label>
                            <Form.Control
                                type='token'
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                            />
                        </Form.Group>
                    </div>
                </Row>
                <center>
                    <br />
                    <Row>
                    <div className='col-md-2'/>
                    <div className='col-12, col-md-8'>
                        {message ? (
                            <>
                            <div className='message'>
                            {message}
                            </div>
                            <br/>
                            </>
                        ) : (
                            <>
                            </>
                        )}
                    </div>
                    </Row>
                    <Button onClick={handleSubmit}>Login</Button>
                </center>
            </Container>
        </>
    )
}
export default Loginpage