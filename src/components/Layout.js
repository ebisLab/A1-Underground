import React from 'react';
import Head from "next/head"

export default function Layout(props) {
    return (
        <div>
            <Head>
                <title>A1 Underground</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/> 
                <link href="https://fonts.googleapis.com/css2?family=Saira+Stencil+One&display=swap" rel="stylesheet"/>
                <link rel="stylesheet" href="https://unpkg.com/purecss@2.0.5/build/pure-min.css" integrity="sha384-LTIDeidl25h2dPxrB2Ekgc9c7sEC3CWGM6HeFmuDNUjX76Ert4Z4IY714dhZHPLd" crossOrigin="anonymous"></link>
            </Head>
            {props.children}
         </div>
    )
}
