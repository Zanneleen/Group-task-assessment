import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import axios from 'axios';

class Landing extends Component {

    componentDidMount() {
        // axios.get('/api/auth')
        // .then(response => {
        //     console.log(response)
        // })
        fetch('/api/auth')
            .then(response => console.log(response))
    }

    onGoogleLinkClick = () => {
        axios.get('/api/auth/', (res, req) => {
            res.redirect('/login')
        })
    }

    render() {
        return (
            <div style={{ height: "90vh" }} className="container valign-wrapper">
                <div className="row">
                    <div className="col s12 center-align">
                        <h3>
                            <b>Welcome back to you group assignment task manager!</b>
                        </h3>
                        <br />
                        <div className="container">
                            <div className="row">
                                <div className="col-4">
                                    <BrowserRouter>
                                        <a
                                            href="/register"
                                            style={{
                                                width: "300px",
                                                borderRadius: "9px",
                                                letterSpacing: "1.5px",
                                                height: "50px"
                                            }}
                                            className="btn btn-large waves-effect waves-light hoverable lightgrey accent-3"
                                        >
                                            Register
                                            </a>
                                    </BrowserRouter>
                                    <br />
                                    <br />
                                </div>
                                <div className="col-4">
                                    <BrowserRouter>
                                        <a
                                            href="/login"
                                            style={{
                                                width: "300px",
                                                borderRadius: "9px",
                                                letterSpacing: "1.5px",
                                                height:"50px"
                                            }}
                                            className="btn btn-large waves-effect waves-light hoverable blue white-text"
                                        >
                                            Log In
                                            </a>
                                        <br />
                                        <br />
                                    </BrowserRouter>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Landing;