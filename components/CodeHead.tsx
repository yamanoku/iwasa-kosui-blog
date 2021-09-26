import styled from "@emotion/styled";
import { FunctionComponent } from "react";

const Wrapper = styled.div`
border: 1px solid #ddd;
border-bottom: none;
padding: 2px 8px;
border-radius: 4px 4px 0 0;
margin-bottom: -16px;
`

const Body = styled.div`
p {
    margin: 0;
}
`

const CodeHead: FunctionComponent = ({ children }) => {
    return <Wrapper>
        <Body>
            { children }
        </Body>
    </Wrapper>
}

export default CodeHead