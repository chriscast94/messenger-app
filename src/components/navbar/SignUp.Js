import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap/esm/Button";

export default function signUp() {
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        userName: "",
        password: "",
        confirmPassword: "",
    });

    const [newUser, setNewUser] = useState(null);

    function validateForm() {
        return (

            fields.password.length > 8 &&
            fields.password === fields.confirmPassword
        );
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <div className="Login">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={fields.email}
                        onChange={handleFieldChange}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="userName">
                    <Form.Label>Username </Form.Label>
                    <Form.Control
                        type="userName"
                        value={fields.userName}
                        onChange={handleFieldChange}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={fields.password}
                        onChange={handleFieldChange}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={fields.confirmPassword}
                        onChange={handleFieldChange}
                    />
                </Form.Group>
                <Button block size="lg" type="submit" disabled={!validateForm()}>
                    Login
                </Button>
            </Form>
        </div>
    );
}