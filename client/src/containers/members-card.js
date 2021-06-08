import React from 'react';
import styled from '@emotion/styled';
import { colors } from '../styles';
import MemberCard from './member-card'
import { Alert } from '../components/alert';

const MembersCard = ({ org }) => {

    console.log("userinfo", org)

    return(
    <MembersCardContainer>
        <MembersCardTitle>
            Members
        </MembersCardTitle>
        <MembersGridContainer>
            {org.members ? org.members.map( member => <MemberCard member={member}/>) : <Alert>There are no members in this organization.</Alert>}
        </MembersGridContainer>
    </MembersCardContainer>
    )

}

export default MembersCard;

const MembersCardContainer = styled.div({
    backgroundColor: colors.white,
    margin: 10,
    width: '100%',
    minWidth: '200px'
})

const MembersCardTitle = styled.div({
    padding: 15,
    fontWeight: 600,
    backgroundColor: colors.silver.base,
})

const MembersGridContainer = styled.div({
    background: colors.white,
    padding: 10,
    overflow: 'auto',
})
