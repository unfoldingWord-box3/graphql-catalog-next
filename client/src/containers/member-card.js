import React from 'react';
import styled from '@emotion/styled';
import { colors } from '../styles';

const MemberCard = ({member}) => {
    return (
        <>
            <MemberInfo>
                <MemberAvatarContainer><MemberAvatar src={`https://${member.avatarUrl}`} alt={member.name}/></MemberAvatarContainer>
                <MemberName>{member.name}</MemberName>
            </MemberInfo>
        </>
    )
}

export default MemberCard;

const MemberInfo = styled.div({
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gridGap: 10,
    marginBottom: 15
})

const MemberAvatarContainer = styled.div({
    width:'50px'
})

const MemberAvatar = styled.img({
    width: '100%',
})

const MemberName = styled.div({
    fontWeight: 600,
    color: colors.blue.darkest
})