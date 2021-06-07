import React from 'react';
import styled from '@emotion/styled';
import { colors } from '../styles';

const TeamCard = ({team}) => {
    return (
        <>
            <TeamInfo>
                <TeamName>{team.name}</TeamName>
            </TeamInfo>
        </>
    )
}

export default TeamCard;

const TeamInfo = styled.div({


})

const TeamName = styled.div({
    fontWeight: 600,
    color: colors.blue.darkest
})