import { useContext, useState } from 'react'
import { Button, Container, Form, Row } from 'react-bootstrap'
import { UserContext } from '../contexts/UserContext'
import { useNavigate } from 'react-router-dom'

function Loginpage() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const {login} = useContext(UserContext)
    const navigate = useNavigate()

    async function handleSubmit() {
        let credentials = {
            email,
            password
        }
        let res = await login(credentials)
        navigate('/')
    }

    return (
        <>
            <Container>
                <Row>
                    <Form.Group>
                        <Form.Label>Name or Email</Form.Label>
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
                </Row>
                <Button onClick={handleSubmit}>Login</Button>
            </Container>
        </>
    )
}
export default Loginpage