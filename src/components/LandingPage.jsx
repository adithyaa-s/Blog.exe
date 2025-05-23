import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthButton from './AuthButton';
import "../App.css"

export default function LandingPage() {
    const align = {
        textAlign: 'center'
    }
    const variant = "Dark";
    return (
        <div className='landingPage'>
            <div>
                <br />
                <h1 style={{fontSize: "50px", textAlign: "center"}}> Welcome to Blog.exe</h1>
            </div>
            <div  className="d-flex justify-content-center align-items-center"
            style={{height: '80vh'}}
            >
                <Card 
                    bg={variant.toLowerCase()}
                    key={variant}
                    text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
                    style={{ width: '25rem' , height: '30rem', display: 'flex', flexDirection: "column"}}
                    className="mb-2 "
                >
                    <Card.Header style={{fontSize: "30px", textAlign: "center"}}>Welcome Back</Card.Header>
                    <Card.Body className='d-flex flex-column'>
                        <Card.Title className="mt-2" style={align}>Sign Up or Login </Card.Title>
                        {/* <br /> */}
                        {/* <Card.Text> */}
                        <div className='flex-grow-1 d-flex flex-column justify-content-center'>
                            <Form>
                                <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control size="sm" type="email" placeholder="name@example.com" />
                                </Form.Group>
                                <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    id="inputPassword5"
                                    aria-describedby="passwordHelpBlock"
                                    size="sm"
                                />
                            </Form>
                            </div>
                            <br />
                            <div className='mt-auto text-center'>
                                <AuthButton buttonValue="Login" />
                            </div>
                        {/* </Card.Text> */}
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}



