import { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import { Link, useNavigate } from "react-router-dom"
import { Button, Container, Form, Modal, Row } from "react-bootstrap"
import { PassContext } from "../contexts/PassContext"

function Homepage() {
    const [passes, setPasses] = useState()
    const [searchArr, setSearchArr] = useState()

    const { verify } = useContext(UserContext)
    const { getPasses, searchPasses } = useContext(PassContext)
    const navigate = useNavigate()

    useEffect(() => {
        async function startup() {
            let res = await verify()
            if (!res) {
                navigate('/login')
            }

            let passes = await getPasses()
            setPasses(passes)
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

    function mapThroughSearches() {
        console.log(searchArr)
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
                    <div className="col-12 col-md-6">
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
            <div className="searchNav">
                <Container>
                    <Row>
                        <div className="col-3">
                            <center>
                                <Link to={"/create"}>
                                    <Button className="createBtn">
                                        Create
                                    </Button>
                                </Link>
                            </center>
                        </div>
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