import styled from "styled-components"

const ContainerCentered = styled.div`
        margin-left: auto;
        margin-right: auto;
        max-width: ${ (props) => props.maxWidth || 1200 }px;
    `;

export {
    ContainerCentered
}
