import React, { useState } from "react"

type User = {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
};

export default function CreateAccount() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [firstname, setFirstname] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // förhindra att formuläret laddar om sidan

        // fetch mot API:et
        // API:ets endpoint tar ett objekt med un, ps, fn, ln
        // https://a1voqdpubd.execute-api.eu-north-1.amazonaws.com/
        const userData: User = {username, password, firstname,lastname};
        try {
            const response = await fetch('https://a1voqdpubd.execute-api.eu-north-1.amazonaws.com/auth/signup', {
                method: 'POST', // använd post-metoden här!
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            if (!response.ok) {
                throw new Error('Något gick galet');
            }
            const data = await response.json();
            console.log(data);
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
                onChange={(e) => {setUsername(e.target.value)}}
            ></input>
        </label>
        <label>
            Lösenord:
            <input
                type="password"
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}
            ></input>
        </label>
        <label>
            Förnamn:
            <input
                type="text"
                value={firstname}
                onChange={(e) => {setFirstname(e.target.value)}}
            ></input>
        </label>
        <label>
            Efternamn:
            <input
                type="text"
                value={lastname}
                onChange={(e) => {setLastname(e.target.value)}}
            ></input>
        </label>
        <button type="submit">Skapa konto</button>
    </form>
  )
}
