
    import styled from 'styled-components';

    export const Container = styled.div`
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
    `;

    export const CountryCard = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 16px;
        margin: 10px;
        transition: all 0.3s ease;

        &:hover {
            transform: scale(1.05);
        }
    `;

    export const Input = styled.input`
        padding: 10px;
        margin: 20px 0;
        width: 100%;
        max-width: 400px;
        border-radius: 5px;
        border: 1px solid #ccc;
    `;

    export const Select = styled.select`
        padding: 10px;
        margin: 20px 0;
        width: 100%;
        max-width: 200px;
        border-radius: 5px;
        border: 1px solid #ccc;
    `;
    