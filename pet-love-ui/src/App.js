import MainDrawer from './menu/MainDrawer';

const makeUserName = ({fname, lname, username}) => {
    return username;
    // return `${fname} ${lname}`;
};

export default function App({user, logoutAction}) {
    const mainPageTitle = "Pet Love";

    return (
                <MainDrawer title={mainPageTitle}
                            user={makeUserName(user)}
                            logoutAction={logoutAction}/>
    )

}

