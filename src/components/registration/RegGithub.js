import React from 'react';

export default function RegGit({ github, error }) {
    return (
        <div className="wrap_reg-git">
            <h1 className="error__message">{error}</h1>
            <div onClick={github} className="reg">
                <img className="img__logo-reg__github" alt="" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" />
                <h1 className="title-reg__github">Registration from GitHub</h1>
            </div>
        </div>
    )
}