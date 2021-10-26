import React, {useState} from 'react';

const UserContext = React.createContext();

const UserProvider = props => {
  const [id, setID] = useState();
  const [fname, setFName] = useState('test');
  const [mname, setMName] = useState('test');
  const [lname, setLName] = useState('test');
  const [brgy, setBrgy] = useState('test');
  const [email, setEmail] = useState('test');
  const [pass, setPass] = useState('test');
  const [profilePic, setProfilePic] = useState('test');
  const [contactNo, setContactNo] = useState('test');
  const [isBlocked, setIsBlocked] = useState('test');
  const [homeAdd, setHomeAdd] = useState('test');

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
      }}>
      {props.children}
    </UserContext.Provider>
  );
};

export {UserProvider, UserContext};
