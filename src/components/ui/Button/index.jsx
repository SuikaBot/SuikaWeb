import styled, { css } from "styled-components";

const Button = styled.button`
  border: none;
  border-radius: 6px;
  cursor: pointer;
  text-decoration: none;

  color: ${function (props) {
    if (props.fontcolor) {
      return props.theme.colors[props.fontcolor].main;
    } else {
      return props.theme.colors.light.main;
    }
  }};

  padding: ${function (props) {
    if (props.size) {
      return props.theme.buttons[props.size].padding;
    } else {
      return props.theme.buttons.md.padding;
    }
  }};

  font-size: ${function (props) {
    if (props.size) {
      return props.theme.buttons[props.size].fontSize;
    } else {
      return props.theme.buttons.md.fontSize;
    }
  }};

  background-color: ${function (props) {
    if (props.type) {
      return props.theme.colors[props.type].main;
    } else {
      return props.theme.colors.primary.main;
    }
  }};

  /* Hover */
  &:hover {
    background-color: ${function (props) {
      if (props.type) {
        return props.theme.colors[props.type].hover;
      } else {
        return props.theme.colors.primary.hover;
      }
    }};
  }

  ${function (props) {
    return (
      props.full &&
      css`
        width: 100%;
        display: block;
      `
    );
  }}
`;

export default Button;
