import React from 'react';
import db from '../../firebase';
import { collection, setDoc, doc } from "firebase/firestore";
// import { parseCookies } from 'nookies';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';


export default function RegInf({ 
    githubInf,
    repos
}) {
    const [name, setName] = React.useState("");
    const [educ, setEduc] = React.useState("");
    const [exp, setExp] = React.useState("");
    const [lang, setLang] = React.useState("");

    const [error, setError] = React.useState("");

    const cookies = new Cookies();

    const history = useNavigate();

    const tokenId = githubInf.localId;

    const email = githubInf.email;
    const photoUrl = githubInf.photoUrl;
    const repsUser = repos.map(repo => {
        return {
          name: repo.name,
          url: repo.clone_url,
          language: repo.language,
          watchers: repo.watchers
        };
    });
      

    const user = {
        email,
        photoUrl,
        name,
        exp,
        educ,
        lang,
        repsUser
    }

    const endReg = async () => {
        if(name.length < 10) {
            return null;
        } else {
            console.log("Successful ✨");
            console.log(repos);
            cookies.set("tokenId", tokenId);
            try {
                const userRef = doc(collection(db, 'Users'), tokenId);
                await setDoc(userRef, { user });
                console.log(repos);
                // rout
                history(`/user/${tokenId}`); // create user page
            } catch (err) {
                setError(err);
            }
        }
    }

    return (
       <div className="square-box__reg">
            <div className="wrap_reg">
                <div className="container__inpt-reg__inf">
                    <h1 className="error__message">{error}</h1>
                    <h1 className="title-inf__reg">Заповніть інформацію.</h1>
                    <input onChange={(e) => setName(e.target.value)} placeholder="Name" className="inpt__reg-inf" type="text" />
                    <input onChange={(e) => setEduc(e.target.value)} placeholder="Education" className="inpt__reg-inf" type="text" />
                    <input onChange={(e) => setExp(e.target.value)} placeholder="Expiriens" className="inpt__reg-inf" type="text" />
                    <input onChange={(e) => setLang(e.target.value)} placeholder="Languages" className="inpt__reg-inf" type="text" />
                    <button onClick={endReg} className="button__inpt-reg__create">Create Account</button>
                </div>
            </div>
       </div>
    )
}