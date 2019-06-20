import * as React from "react"
import {render} from "react-dom";
import {Component} from "../core";
import styled from "styled-components"
import {HTMLProps, SyntheticEvent} from "react";
import {pushState} from "./history";

export class XLink extends Component {
    static getName(): string {
        return 'x-link'
    }

    get href(): string {
        return this.getAttribute("href")
    }

    get text(): string {
        return this.getAttribute("text")
    }

    render(root: HTMLDivElement) {
        render(
            <Link
                href={this.href}
            >
                {this.text}
            </Link>,
            root,
        )
    }
}

class Link extends React.Component {
    props: {
        href: string,
        children: string,
    };

    onClick = (event: SyntheticEvent) =>  {
        event.preventDefault();

        pushState(
            null,
            "",
            this.props.href
        )
    };

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <StyledLink
                onClick={this.onClick}
                href={this.props.href}
            >
                {this.props.children}
            </StyledLink>
        )
    }
}

const StyledLink = styled.a`
    color: blue;
    &:visited {
        color: blue;
    }
`;