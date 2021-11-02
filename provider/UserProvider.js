import React, {useState} from 'react';

const UserContext = React.createContext();

const UserProvider = props => {
  const [id, setID] = useState();
  const [fname, setFName] = useState();
  const [mname, setMName] = useState();
  const [lname, setLName] = useState();
  const [brgy, setBrgy] = useState();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [profilePic, setProfilePic] = useState();
  const [contactNo, setContactNo] = useState();
  const [isBlocked, setIsBlocked] = useState();
  const [homeAdd, setHomeAdd] = useState();

  return (
    <UserContext.Provider
      value={{
        id,
        fname,
        mname,
        lname,
        brgy,
        email,
        pass,
        profilePic,
        contactNo,
        isBlocked,
        homeAdd,
        setID,
        setFName,
        setMName,
        setLName,
        setBrgy,
        setEmail,
        setPass,
        setProfilePic,
        setContactNo,
        setIsBlocked,
        setHomeAdd,
      }}>
      {props.children}
    </UserContext.Provider>
  );
};

export {UserProvider, UserContext};
