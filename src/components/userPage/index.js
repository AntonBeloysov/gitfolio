import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, doc, getDoc } from 'firebase/firestore';
import db from '../../firebase';
import { Helmet } from 'react-helmet';

function UserPage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const userRef = doc(collection(db, 'Users'), userId);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setUser(userDoc.data());
          setName(user.user.name);
        } else {
          console.log('User not found');
        }
      } catch (error) {
        console.log("Error user token");
        console.error(error);
      }
    }
    fetchUser();
  }, [userId, user]);

  return (
    <div className="square-box__reg">
      <Helmet>
          <title>{ name }</title>
      </Helmet>
      <div className="wrap_user">
        {user ? (
          <div className="flex-wrap__user-inf">
            <div className="bgc-box__inf">
              <div className="user-logo box-inf">
                <img className="img-logo" alt="" src={user.user.photoUrl} />
              </div>
              <div className="box-inf">
                <h1 className="title-inf">Name:</h1>
                <p className="title-inf__user">{user.user.name}.</p>
              </div>
              <div className="box-inf">
                <h1 className="title-inf">Email:</h1>
                <p className="title-inf__user">{user.user.email}.</p>
              </div>
              <div className="box-inf">
                <h1 className="title-inf">Education:</h1>
                <p className="title-inf__user">{user.user.educ}.</p>
              </div>
              <div className="box-inf">
                <h1 className="title-inf">Expiriens:</h1>
                <p className="title-inf__user">{user.user.exp}.</p>
              </div>
              <div className="box-inf">
                <h1 className="title-inf">Languages:</h1>
                <p className="title-inf__user">{user.user.lang}.</p>
              </div>
            </div>
            <div>
              <h1 className="title-works">Works.</h1>
              <div className="scroll wrap-user-works">
                {user.user.repsUser.map(repo => (
                  <a key={repo.name} href={repo.url} className="box-li__user-works">
                    <li className="title-map__works-user">{repo.name}</li>
                    <hr className="line-inf" />
                    <div className="inf-map__work-user">
                      {repo.language < 1 ? (
                          null
                        ) : (
                          <div className="inf__">
                            <img alt="" src="/img/code.png" />
                            <h1>{repo.language}</h1>
                          </div>
                        )}
                      <div className="inf__">
                        <img alt="" src="/img/eye.png" />
                        <h1>{repo.watchers}</h1>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="wrap_reg">
            <div className="lds-ripple"><div></div><div></div></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserPage;
