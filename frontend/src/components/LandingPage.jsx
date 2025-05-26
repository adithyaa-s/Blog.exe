import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthButton from './AuthButton';
import AuthForms from './AuthForm';
import "../App.css"

export default function LandingPage() {
    const align = {
        textAlign: 'center'
    }
    const variant = "Light";
    return (
        <div className='landingPage'>
            <div>
                <br />
                <h1 style={{fontSize: "50px", textAlign: "center"}}> Blog.exe</h1>
            </div>
            <div  className="d-flex justify-content-center align-items-center"
            style={{height: '80vh'}}
            >
                <AuthForms />
            </div>
        </div>
    )
}


