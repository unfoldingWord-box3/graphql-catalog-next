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
                <UserName>{user.name}</UserName>
                <UserEmail href={`mailto:${user.email}`}>{user.email}</UserEmail>               
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
    width:'100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'start',
    alignContent: 'space-between',
})

const UserAvatarContainer = styled.div({
    flexGrow: 0,
})

const UserAvatar = styled.img({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    maxHeight: 150,
    height: '100%',
})

const UserEmail = styled.a({
    color: colors.grey.dark
})

const UserName = styled.div({

})

const UserFullName = styled.div({
    fontWeight: 'bold',
    fontSize: '1.8rem',
    color: colors.blue.dark,
})