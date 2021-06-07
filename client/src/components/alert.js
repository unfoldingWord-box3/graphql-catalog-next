import styled from '@emotion/styled';
import { colors } from '../styles';

export const Alert = styled.div( props => ({
    background: props.error ? colors.red.lighter : colors.silver.base,
    padding: 10,
    width: "100%",
    marginTop: 25,
    borderRadius: "0.5rem"
}));
