import { styled, css } from "styled-components";

export const StyledMessage = styled.p`
  text-align: center;
  font-size: 1.3rem;
  padding: 40px 20px;
`;

export const StyledHeadline = styled.h2`
  font: var(--main-headline);
  text-align: center;
  padding-top: 35px;
`;

export const StyledHeadlineWithPadding = styled.h2`
  font: var(--main-headline);
  text-align: center;
  padding-top: 35px;
  padding-bottom: 30px;
`;

export const StyledSubheading = styled.h3`
  font: var(--sub-headline);
  text-align: center;
  padding: 5px 0 30px 0;
`;

export const StyledSuccessMessage = styled.p`
  font: var(--main-headline);
  text-align: center;
  color: var(--primary-green);
  padding: 0 30px 50px 30px;
`;

export const StyledAccessDeniedMessage = styled.h2`
  font: var(--sub-headline);
  text-align: center;
  padding: 100px 30px;
`;

export const StyledFormHeadline = styled.h2`
  font: var(--form-headline);
  text-align: center;
  padding-top: 20px;
`;
