import { Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function HowItWorks() {
    return (
        <>
            <div className="searchNav">
                <Container>
                    <Row>
                        <div className="col-7 col-sm-5 col-lg-3">
                            <center>
                                <h3 className="passName"><b>How It Works</b></h3>
                            </center>
                        </div>
                        <div className="col-5 col-sm-7 col-lg-8">
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
                <br />
                <Row>
                    Rpass operates on pure encryption, meaning what's stored in the database is just random strings that don't mean anything without your master password ("MasterPass"), so don't lose it.
                </Row>
                <Row>
                    <br />
                    Here's what's happening with each action:
                    <br /><br />
                    Homepage loadup: <br /> Upon loadup, All the password entries ("Passes" or "Pass") that are yours are searched through to get the only text that's not encrypted in them, the service name. All of those are then delivered to you in the homepage.
                    <br /><br />
                    Service name selected: <br /> Upon you selecting your Pass, either through the search bar or what's displayed on the homepage, It will ask you for a your MasterPass. It uses this to unEncrypt all of the information stored: password, username, other notes and anything else, except the service name which is already unEncrypted.
                    <br /><br />
                    Editing entry: <br /> When you edit a Pass, it requires once again for you to enter your MasterPass, this is because your MasterPass isn't stored on the website, so it doesn't remember it. Once you put your MasterPass in, it gets your old Pass information, unEncrypts it, and puts it in each field respectively for you to edit. Then once you submit the new infomation, it reEncrypts the Pass and stores it.
                    <br /><br />
                    Resetting master password: <br /> When you reset your MasterPass, a lot happens. Firstly, it uses your old MasterPass to unEncrypt all of your Passes. After that happens, it will take in your new MasterPass and reEncrypt your Passes, then stores them. Once that has finished, it resets your Account to login with that MasterPass

                    <br /><br /><br />
                    Info for nerds:
                    <br /><br /> All encryption takes place on the backend, meaning your passwords are prone to Man-In-The-Middle attacks if you are on a untrusted network. I recommend running the backend on your own network, then using a VPN to access your Passes. This eliminates the a lot of cybersecurity threats.
                    <br /><br />
                </Row>
            </Container>
        </>
    )
}
export default HowItWorks