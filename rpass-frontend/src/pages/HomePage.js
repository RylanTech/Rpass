import { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import { Link, useNavigate } from "react-router-dom"
import { Container, Form, Row } from "react-bootstrap"
import { PassContext } from "../contexts/PassContext"

function Homepage() {
    const [passes, setPasses] = useState()
    const [searchArr, setSearchArr] = useState()
    const [isSearch, setIsSearch] = useState()

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
        if (searchArr) {
            return searchArr.map((title) => {
                console.log(title)
                return (
                    <Link>
                        <div className="col-8 searchBox">
                            {title}
                        </div>
                    </Link>
                )
            })
        }
    }

    function mapThroughPassess() {
        if (passes) {
            return passes.map((pass) => {
                return (
                    <div className="col-12 col-md-6">
                        <div className="col-12 box">
                            <center>
                                <h2>{pass}</h2>
                            </center>
                        </div>
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
                                <h3 className="search"><b>Search</b></h3>
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
                                        {mapThroughSearches()}
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