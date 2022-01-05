import { ButtonStyles } from "./Button.styles";

export function Button({
    children, 
    click, 
    ml = 0, 
    mr = 0,
    round = false,
    fontSize = '0.9rem',
    size = 40
}) {
    return(
        <ButtonStyles 
            onClick={(e) => click(e)} 
            marginLeft={ml} 
            marginRight={mr} 
            $round={round}
            fontSize={fontSize}
            size={size}
            >
                {children}
            </ButtonStyles>
    )
}