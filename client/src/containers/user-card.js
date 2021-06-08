import React from 'react';
import styled from '@emotion/styled';
import { colors } from '../styles';

const UserCard = ({ user }) => {

    console.log("userinfo", user)

    return(
        <CardContainer>
            <UserAvatarContainer>
                <UserAvatar src={`https://git.door43.org/user/avatar/${user.name}/290`} alt={user.fullName}/>
            </UserAvatarContainer>
            <UserInfo>
                <UserFullName>{user.fullName}</UserFullName>
                <UserName>{user.login}</UserName>
                <UserEmail href={`mailto:${user.login}@dummyemail.com`}>{user.login}@dummyemail.com</UserEmail>               
            </UserInfo>
        </CardContainer>
    )

}

export default UserCard;

const CardContainer = styled.div({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    width: 'calc(90% - 10)',
    margin: 10,
    background: colors.white,
    padding: 15,
})

const UserInfo = styled.div({
    marginLeft: 15, 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
})

const UserAvatarContainer = styled.div({
    flexGrow: 0,
})

const UserAvatar = styled.img({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '100%',
})

const UserEmail = styled.a({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '100%',
    color: colors.grey.dark
})

const UserName = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '100%',
})

const UserFullName = styled.div({
    fontWeight: 'bold',
    fontSize: '1.2rem',
    color: colors.blue.dark,
})