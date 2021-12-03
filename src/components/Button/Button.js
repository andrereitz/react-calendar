import { ButtonStyles } from "./Button.styles";

export function Button({children, click, ml = 0, mr = 0}) {
    return(
        <ButtonStyles onClick={() => click()} marginLeft={ml} marginRight={mr}>{children}</ButtonStyles>
    )
}