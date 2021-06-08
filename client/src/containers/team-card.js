import React from 'react';
import styled from '@emotion/styled';
import { colors } from '../styles';

const TeamCard = ({team}) => {
    return (
        <>
            <TeamInfo>
                <TeamName>{team.name}</TeamName>
                <TeamMembers>{team.members.length} {team.members.length > 1  ? "members" : "member"}</TeamMembers>
                <TeamRepos>{team.teamRepos.length} {(team.teamRepos.length > 1 || team.teamRepos.length === 0) ? "repositories" : "repository"} </TeamRepos>
            </TeamInfo>
        </>
    )
}

export default TeamCard;

const TeamInfo = styled.div({
    marginBottom:10

})
const TeamMembers = styled.div({


})
const TeamRepos = styled.div({


})

const TeamName = styled.div({
    fontWeight: 600,
    color: colors.blue.darkest
})
