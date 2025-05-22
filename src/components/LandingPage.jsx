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
                <h1 style={align}> Welcome to Blog.exe</h1>
            </div>
            <div  className="d-flex justify-content-center align-items-center"
            style={{height: '80vh'}}
            >
                <Card 
                    bg={variant.toLowerCase()}
                    key={variant}
                    text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
                    style={{ width: '18rem' }}
                    className="mb-2"
                >
                    <Card.Header style={align}>Welcome Back</Card.Header>
                    <Card.Body>
                        <Card.Title style={align}>Sign Up or Login </Card.Title>
                        <br />
                        <Card.Text>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
                            <br />
                            <div style={align}>
                                <AuthButton buttonValue="Login" />
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}



