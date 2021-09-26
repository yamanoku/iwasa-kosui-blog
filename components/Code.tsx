import React, { FunctionComponent } from 'react'
import Prism, { defaultProps } from 'prism-react-renderer'
import github from 'prism-react-renderer/themes/github';
import styled from '@emotion/styled';

const Languages = [
    "markup",
    "bash",
    "clike",
    "c",
    "cpp",
    "css",
    "javascript",
    "jsx",
    "coffeescript",
    "actionscript",
    "css-extr",
    "diff",
    "git",
    "go",
    "graphql",
    "handlebars",
    "json",
    "less",
    "makefile",
    "markdown",
    "objectivec",
    "ocaml",
    "python",
    "reason",
    "sass",
    "scss",
    "sql",
    "stylus",
    "tsx",
    "typescript",
    "wasm",
    "yaml"] as const

type LanguagesTuple = typeof Languages
type Language = LanguagesTuple[number]

const Pre = styled.pre`
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8;
    background: white !important;
    overflow: scroll;
    font-size: 0.9rem;
`

const Code: FunctionComponent<{ className?: string }> = (props) => {
    const { children, className } = props
    const match = className?.match(/language-([A-Za-z]+)/)
    let languageFromClassName = (match != null ? match[1] : '') ?? ''
    let language: Language = 'markup'
    if (Languages.find(l => l === languageFromClassName)) {
        language = languageFromClassName as Language
    }
    
    return (
        <Prism {...defaultProps} theme={github} code={children as string} language={language}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <Pre className={className} style={{ ...style}}>
                    {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line, key: i })}>
                            {line.map((token, key) => (
                                <span key={key} {...getTokenProps({ token, key })} />
                            ))}
                        </div>
                    ))}
                </Pre>
            )}
        </Prism>
    )
}

export default Code