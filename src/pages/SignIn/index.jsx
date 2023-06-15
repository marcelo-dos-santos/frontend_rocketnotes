import {FiMail, FiLock} from "react-icons/fi"
import { Container, Form } from "./styles";
import { Input } from "../../components/Input"
import { Button } from "../../components/Button"
import { Background } from "./styles";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext, useAuth } from "../../hooks/auth";


export function SignIn() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

    const {signIn} = useAuth();

    function handleSignIn() {
        signIn({email, password});
    }


    return(
        <Container>
            <Form>
                <h1>Rocket Notes</h1>
                <p>Aplicação para salvar e gerenciar seus links úteis</p>

                <h2>Faça seu login</h2>
                <Input icon={FiMail} placeholder="E-mail" type="text" onChange={e => setEmail(e.target.value)} />
                <Input icon={FiLock} placeholder="Senha" type="password" onChange={e => setPassword(e.target.value)} />
                <Button title="Entrar" onClick={handleSignIn} />
                <Link to="/register">Criar Conta</Link>
            </Form>
            <Background />
        </Container>
    )
}

