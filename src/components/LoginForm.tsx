import { useState } from "react";

type User = {
    username: string;
    password: string;
}

export default function LoginForm() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // när vi loggar in ska vi få tillbaka en token
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const userData: User = { username, password };
        console.log('här är vi');
        const API_URL = "https://a1voqdpubd.execute-api.eu-north-1.amazonaws.com/auth/login";
        try {
            console.log(userData);
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            console.log(response);
            if (!response.ok) {
                throw new Error('Något gick snett med POST-förfrågan vi gjorde :(((')
            }
            const data = await response.json();
            console.log(data);
            sessionStorage.setItem('token', data.token);
        } catch (error: any) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Användarnamn:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => { setUsername(e.target.value) }}
                ></input>
            </label>
            <label>
                Lösenord:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                ></input>
            </label>
            <button type="submit">Logga in</button>
        </form>
    )
}
