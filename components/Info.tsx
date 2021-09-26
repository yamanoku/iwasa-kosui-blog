import styled from "@emotion/styled";
import { FunctionComponent } from "react";

interface Props {
    title: string
}


const Wrapper = styled.div`
    border-radius: 8px;
    padding: 4px;
    margin-bottom: 2rem;
`

const Title = styled.div`
    background: #008de1;
    color: #fff;
    border-radius: 8px 8px 0 0;
    padding: 8px;
    display: inline;
`

const Body = styled.div`
    border: 2px solid #008de1;
    border-radius: 0 8px 8px 8px;
    padding: 16px;
`

const Info: FunctionComponent<Props> = ({ children, title }) => {
    return <Wrapper>
        <Title> { title } </Title>
        <Body>
            { children }
        </Body>
    </Wrapper>
}

export default Info