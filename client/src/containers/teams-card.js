import React from 'react';
import styled from '@emotion/styled';
import { colors } from '../styles';
import TeamCard from './team-card'
import { Alert } from '../components/alert';

const TeamsCard = ({ org }) => {

    console.log("userinfo", org)

    return(
    <TeamsCardContainer>
        <TeamsCardTitle>
            Teams
        </TeamsCardTitle>
        <TeamsGridContainer>
            {org.teams ? org.teams.map( team => <TeamCard team={team}/>) : <Alert>There are no teams in this organization.</Alert>}
        </TeamsGridContainer>
    </TeamsCardContainer>
    )

}

export default TeamsCard;

const TeamsCardContainer = styled.div({
    backgroundColor: colors.white,
    margin: 10,
    width: '100%',
    minWidth: '200px'
})

const TeamsCardTitle = styled.div({
    padding: 15,
    fontWeight: 600,
    backgroundColor: colors.silver.base,
})

const TeamsGridContainer = styled.div({
    background: colors.white,
    padding: 10,
    overflow: 'auto',
})
