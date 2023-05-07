import React from 'react';
import RegGit from './RegGithub';
import RegInfRes from './RegInfRes';

import { auth, githubProvider } from '../../firebase';
import { signInWithPopup } from "firebase/auth";

export default function Reg() {
    const [activeStep, setActiveStep] = React.useState(1);
    const [key, setKey] = React.useState(0);

    const [user, setUser] = React.useState([]);
    const [accessToken, setAccessToken] = React.useState('');
    const [repos, setRepos] = React.useState([]);

    const [error, setError] = React.useState("");

    const nextStep = () => {
      setActiveStep(activeStep + 1);
      setKey(key + 1);
    }

    const signInWithGithub = () => {
        signInWithPopup(auth, githubProvider)
        .then((result) => {
            const user = result.user;
            setUser(user.reloadUserInfo);
            const Astoken = user.reloadUserInfo.screenName;
            setAccessToken(Astoken);
            nextStep();
        }).catch((error) => {
            setError(error);
        });
    };

    React.useEffect(() => {
        if (accessToken) {
            const getRep = async (username) => {
                const response = await fetch(`https://api.github.com/users/${username}/repos`);
                const data = await response.json();
                setRepos(data); 
            }
            getRep(accessToken)
        }
    }, [accessToken]);

    React.useEffect(() => {
        document.title = 'Registration';
      }, []);
    
    const stepReg = [
        {
            step: 1,
            content: <RegGit error={error} github={signInWithGithub} />
        },
        {
            step: 2,
            content: <RegInfRes repos={repos} githubInf={user} />
        }
    ]

    const indexStepInf = stepReg[activeStep - 1];

    return (
        <div>
            {
                indexStepInf.content
            }
        </div>
    )
}